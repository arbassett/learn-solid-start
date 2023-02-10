import { editor as mEditor, Uri } from 'monaco-editor';
import type { Component } from 'solid-js';
import { createEffect } from 'solid-js';
import { onCleanup, onMount } from 'solid-js';
import { liftOff } from './setup';

interface Props {
  url: string;
}

const Editor: Component<Props> = (props) => {
  let parent!: HTMLDivElement;
  let editor: mEditor.IStandaloneCodeEditor;

  const model = () => mEditor.getModel(Uri.parse(props.url));

  onMount(async () => {
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

    editor.setModel(mEditor.getModel(Uri.parse('file:///index.tsx')));
    mEditor.setTheme('vs-dark-plus');
  });

  onCleanup(() => editor?.dispose());

  createEffect(() => {
    editor.setModel(model());
    liftOff();
  });

  return <div class="h-full min-h-0 p-0" ref={parent} />;
};

export default Editor;