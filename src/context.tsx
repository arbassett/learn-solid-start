import type { Accessor, ParentComponent } from 'solid-js';
import { createEffect } from 'solid-js';
import { createContext, createSignal, useContext } from 'solid-js';
import { isDarkTheme } from '~/lib/utils/isDarkTheme';

interface AppContextType {
  dark: Accessor<boolean>;
  toggleDark: () => void;
}

const AppContext = createContext<AppContextType>();

export const AppContextProvider: ParentComponent = (props) => {
  const [dark, setDark] = createSignal(isDarkTheme());
  document.body.classList.toggle('dark', dark());

  createEffect(() => {
    document.body.classList.toggle('dark', dark());
    localStorage.setItem('dark', String(dark()));
  });

  return (
    <AppContext.Provider
      value={{
        dark,
        toggleDark() {
          setDark(!dark());
        },
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
