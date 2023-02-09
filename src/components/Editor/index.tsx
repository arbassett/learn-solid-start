import type { editor as mEditor} from 'monaco-editor';
import type { Component} from "solid-js";
import { createEffect} from "solid-js";
import { onCleanup, onMount } from "solid-js";

export const Editor: Component = () => {
  let parent!: HTMLDivElement;
  let editor: mEditor.IStandaloneCodeEditor;

  onMount(async () => {
    const liftOff = await (await import('./setupSolid')).liftOff;
    const {editor: mEditor, Uri} = (await import('monaco-editor'));
    editor = mEditor.create(parent, {
      model: null,
      automaticLayout: true,
      // readOnly: props.disabled,
      fontSize: 14,
      lineDecorationsWidth: 5,
      lineNumbersMinChars: 3,
      padding: { top: 15 },
      minimap: {
        enabled: false,
      },
    });
      mEditor.createModel(`
import { Title } from "solid-start";
import Counter from "~/components/Counter";
      
export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <p>
      Visit{" "}
      <a href="https://start.solidjs.com" target="_blank">
        start.solidjs.com
      </a>{" "}
      to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
`, undefined, Uri.parse('file:///index.tsx'));
      console.log('liftOff', liftOff)
      await liftOff();
      console.log('model', mEditor.getModel(Uri.parse('file:///index.tsx')));
      editor.setModel(mEditor.getModel(Uri.parse('file:///index.tsx')));

      mEditor.setTheme('vs-dark-plus');
  });

  onCleanup(() => editor?.dispose());
  


  return <div class="h-full min-h-0 p-0" ref={parent} />;
};