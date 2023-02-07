import type { VoidComponent } from 'solid-js';
import { A } from 'solid-start';

import logo from '../assets/logo.svg?url';

export const Header: VoidComponent = () => {
  return (
    <header class="dark:bg-solid-darkbg border-b-2px sticky top-0 z-10 flex items-center gap-x-4 border-slate-200 bg-white p-1 px-2 text-sm dark:border-neutral-800">
      <A href="/">
        <img src={logo} alt="solid-js logo" class="w-8" />
      </A>
      <h1 class="leading-0 uppercase tracking-widest">
          Learn <b>Solid Start</b>
        </h1>
    </header>
  );
};
                              