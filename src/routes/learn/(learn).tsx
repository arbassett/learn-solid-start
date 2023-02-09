import type { WebContainer } from '@webcontainer/api';
import onigasm from 'onigasm/lib/onigasm.wasm?url';
import { Suspense, type VoidComponent, onMount, onCleanup, createSignal, createEffect } from 'solid-js';
import { A, Head, Title, Meta, Link, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { createWebContainer } from '~/lib/webcontainer';

import logo from '~/assets/logo.svg?url';
import { Transition } from 'solid-transition-group';
import { Editor } from '~/components/Editor';
import { isServer } from 'solid-js/web';
import { GridResizer } from '~/components/GridResizer';
import { createMediaQuery } from '@solid-primitives/media'

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

if(!isServer){
window.MonacoEnvironment = {
  // getWorker(_moduleId: unknown, label: string) {
  //   switch (label) {
  //     case 'css':
  //       return new cssWorker();
  //     case 'typescript':
  //     case 'javascript':
  //       return new tsWorker();
  //     default:
  //       return new editorWorker();
  //   }
  // },
  onigasm,
};
}

const LearnPage: VoidComponent = () => {
  const vm: WebContainer | null = null;

  const data = useRouteData<typeof routeData>();
  const state = createWebContainer({ initalfileSystem: data() });
  console.log('data', data && data());

  const clampPercentage = (percentage: number, lowerBound: number, upperBound: number) => {
    return Math.min(Math.max(percentage, lowerBound), upperBound);
  };

  let grid!: HTMLDivElement;
  let resizer!: HTMLDivElement;
  const [left, setLeft] = createSignal(1.25);

  const isLarge = createMediaQuery('(min-width: 768px)');
  const isHorizontal = () => !isLarge();

  const changeLeft = (clientX: number, clientY: number) => {
    let position: number;
    let size: number;

    const rect = grid.getBoundingClientRect();

    if (isHorizontal()) {
      position = clientY - rect.top - resizer.offsetHeight / 2;
      size = grid.offsetHeight - resizer.offsetHeight;
    } else {
      position = clientX - rect.left - resizer.offsetWidth / 2;
      size = grid.offsetWidth - resizer.offsetWidth;
    }
    const percentage = position / size;
    const percentageAdjusted = clampPercentage(percentage * 2, 0.5, 1.5);

    setLeft(percentageAdjusted);
  };

  return (
    <div
    ref={grid}
      class="dark:bg-solid-darkbg wrapper dark grid h-full min-h-0 bg-white font-sans text-black dark:text-white"
      style={{
        '--left': `${left()}fr`,
        '--right': `${2 - left()}fr`,
      }}
    >
      <Editor files={data()}/>
      <GridResizer ref={resizer} isHorizontal={false} onResize={changeLeft} />
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
