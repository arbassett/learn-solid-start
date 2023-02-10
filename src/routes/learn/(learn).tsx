import type { FileSystemTree, WebContainer } from '@webcontainer/api';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import onigasm from 'onigasm/lib/onigasm.wasm?url';
import { Suspense, type VoidComponent, onMount, onCleanup, createSignal, lazy } from 'solid-js';
import { A, Head, Title, Meta, Link, useRouteData, unstable_island, unstable_clientOnly } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { createWebContainer } from '~/lib/webcontainer';

import logo from '~/assets/logo.svg?url';
import { Transition } from 'solid-transition-group';
import { isServer } from 'solid-js/web';
import { GridResizer } from '~/components/GridResizer';
import { createMediaQuery } from '@solid-primitives/media';

const Editor = unstable_clientOnly(() => import('~/components/Editor'));
const MonacoFiles = unstable_clientOnly(() => import('~/components/Editor/MonacoFiles'));

export function routeData() {
  return createServerData$(() => {
    const contentPaths = Object.fromEntries(
      Object.entries(import.meta.glob('/content/common/**/*', { as: 'raw', eager: true })).map(([path, content]) => [
        path.replace('/content/common/', ''),
        content,
      ]),
    );

    return contentPaths;
  });
}

if (!isServer) {
  window.MonacoEnvironment = {
    getWorker(_moduleId: unknown, label: string) {
      switch (label) {
        case 'css':
          return new cssWorker();
        case 'typescript':
        case 'javascript':
          return new tsWorker();
        default:
          return new editorWorker();
      }
    },
    onigasm,
  };
}

const LearnPage: VoidComponent = () => {
  const vm: WebContainer | null = null;

  const data = useRouteData<typeof routeData>();
  const state = createWebContainer({ initalfileSystem: data() });

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
        <MonacoFiles files={data()} />
        <Editor url="file:///src/routes/index.tsx" fallback={(<div />)} />
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
