import { WebContainer } from '@webcontainer/api';
import { type FileSystemTree } from '@webcontainer/api';
import { createSignal, onCleanup, onMount } from 'solid-js';

type Props = { initalfileSystem: Record<string, string> };

interface Adapter {
  base: string;
  update: (paths: Record<string, string>) => void;
  reset: () => void;
  destroy: () => void;
}

type Status =
  | { status: 'loading'; progress: number; text: string }
  | { status: 'ready'; adapter: Adapter }
  | { status: 'error'; error: Error };

const pathsToTree = (paths: Record<string, string>) =>
  Object.keys(paths).reduce<FileSystemTree>((acc, path) => {
    const parts = path.split('/');
    console.log('parts', parts);
    let node = acc;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        node[part] = {
          file: {
            contents: paths[path],
          },
        };
      } else {
        node[part] = node[part] || { directory: {} };
        node = node[part].directory;
      }
    }
    return acc;
  }, {});

export const createWebContainer = ({ initalfileSystem }: Props) => {
  const [state, setState] = createSignal<Status>({ status: 'loading', progress: 1 / 5, text: 'Loading WebContainer' });
  let vm: WebContainer;

  onMount(async () => {
    vm = await WebContainer.boot();

    setState({ status: 'loading', progress: 2 / 5, text: 'Mounting file system' });
    await vm.mount(pathsToTree(initalfileSystem));

    setState({ status: 'loading', progress: 3 / 5, text: 'Installing dependencies' });
    const process = await vm.spawn('turbo', ['install']);

    const exitCode = await process.exit;

    if (exitCode !== 0) {
      setState({ status: 'error', error: new Error(`turbo install exited with code ${exitCode}`) });
      return;
    }

    setState({ status: 'loading', progress: 4 / 5, text: 'Running dev server' });

    const base = await new Promise((fulfil, reject) => {
      const error_unsub = vm.on('error', (error) => {
        error_unsub();
        reject(new Error(error.message));
      });

      const ready_unsub = vm.on('server-ready', (port, base) => {
        ready_unsub();
        fulfil(base); // this will be the last thing that happens if everything goes well
      });

      const run_dev = async () => {
        const process = await vm.spawn('turbo', ['run', 'dev']);
        // keep restarting dev server if it crashes
        process.exit.then((code) => {
          if (code !== 0) {
            setTimeout(() => {
              run_dev();
            }, 2000);
          }
        });
      };

      run_dev();
    });
    setState({ status: 'loading', progress: 5 / 5, text: 'Ready' });

    setState({
      status: 'ready',
      adapter: {
        base,
        async update(paths: Record<string, string>) {
          await vm.mount(pathsToTree(paths));
          await new Promise((f) => setTimeout(f, 200)); // wait for chokidar
        },
      },
    });
  });

  onCleanup(() => {
    console.log('shutting down');
    const test = vm && vm.teardown();
    console.log(test);
    vm = null;
  });

  return state;
};
