import type { WebContainer } from '@webcontainer/api';
import { Suspense, type VoidComponent, onMount, onCleanup, createSignal, createEffect } from 'solid-js';
import { A, Head, Title, Meta, Link, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { createWebContainer } from '~/lib/webcontainer';

import logo from '~/assets/logo.svg?url';
import { Transition } from 'solid-transition-group';
import { Editor } from '~/components/Editor';

export function routeData() {
  return createServerData$(() => {
    const contentPaths = Object.fromEntries(
      Object.entries(import.meta.glob('/content/common/**/*', { as: 'raw', eager: true })).map(([path, content]) => [
        path.replace('/content/common/', ''),
        content,
      ]),
    );

    // return contentPaths;
    return Object.keys(contentPaths).reduce((acc, path) => {
      const parts = path.split('/');
      console.log('parts', parts);
      let node = acc;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
          node[part] = {
            file: {
              contents: contentPaths[path],
            },
          };
        } else {
          console.log('part', part);
          node[part] = node[part] || { directory: {} };
          console.log('node[part]', node);
          node = node[part].directory;
        }
      }
      return acc;
    }, {});
  });
}

const run = async (vm: WebContainer, command: string, args: string[]) => {
  const process = await vm.spawn(command, args, {
    output: true,
  });
  const reader = process.output.getReader();
  // process.output.
  reader.read().then(function readValue({ value }) {
    console.log(`[dev] ${value}`);
    reader.read().then(readValue);
  });

  await process.exit;
};

const LearnPage: VoidComponent = () => {
  const vm: WebContainer | null = null;

  const data = useRouteData<typeof routeData>();
  const state = createWebContainer({ initalfileSystem: data() });
  console.log('data', data && data());

  const [iframeSource, setIframeSource] = createSignal<string | null>(null);

  // onMount(async () => {
  //   if (vm) vm.teardown();
  //   vm = await WebContainer.boot();
  //   console.log('vm', vm   );
  //   vm.on('server-ready', (_port, base) => {
  //     console.log('Server is ready');
  //     setIframeSource(base);
  //   });

  //   await vm.mount(data());
  //   // await run(vm, 'cd', ['--help']);
  //   await run(vm, 'turbo', ['install']);
  //   await run(vm, 'turbo', ['run','dev']);
  //   // await run(vm,'turbo', ['create', 'solid', '--example', 'bare'])
  // });

  // onCleanup(() => {
  //   vm && vm.teardown();
  // });

  // createEffect(() => {
  //   data && console.log('data', data());
  // })

  return (
    <div
      class="dark:bg-solid-darkbg wrapper dark grid h-full min-h-0 bg-white font-sans text-black dark:text-white"
      style={{
        '--left': `${1.25}fr`,
        '--right': `${2 - 1.25}fr`,
      }}
    >
      <Editor />
      <div class="relative">
        <iframe src={state().vm?.base ?? ''} class="dark:bg-other block h-full w-full overflow-auto bg-white p-0" />

        <Transition
          onEnter={(el, done) => {
            const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 600,
            });
            a.finished.then(done);
          }}
          onExit={(el, done) => {
            const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 600,
            });
            a.finished.then(done);
          }}
        >
          {state().status === 'loading' && (
            <div class="dark:bg-other absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center gap-4">
              <img src={logo} alt="solid-js logo" class="w-24" />
              <div class="h-2 w-40 rounded">
                <div
                  class="transition-width h-full rounded bg-white duration-200 ease-out"
                  style={{ width: `${state().progress * 100}%` }}
                />
              </div>
              <span>{state().text ?? 'Ready'}</span>
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default LearnPage;
