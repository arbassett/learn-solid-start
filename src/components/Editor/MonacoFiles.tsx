import type { Component} from 'solid-js';
import { createEffect, onCleanup, untrack } from 'solid-js';
// import type { IDisposable } from 'monaco-editor';
import type { IDisposable } from 'monaco-editor';
import { Uri, editor, languages } from 'monaco-editor';

const MonacoFiles: Component<{ files: Record<string,string> }> = (props) => {
  const key = (path:string) => `file:///${path}`;
  let currentTabs = new Map<string, { model: editor.ITextModel, watcher: IDisposable }>();
  let syncing = false;
  createEffect(() => {
    const newTabs = new Map<string, { model: editor.ITextModel, watcher: IDisposable }>();
    syncing = true;
    for (const path of Object.keys(props.files)) {
      const keyValue = key(path);
      const lookup = currentTabs.get(keyValue);
      const source = untrack(() => props.files[path]);
      if (!lookup) {
        const uri = Uri.parse(keyValue);
        const model = editor.createModel(source, undefined, uri);
        // const lib = languages.typescript.typescriptDefaults.addExtraLib(
        //   source,
        //   uri.toString()
        // );
        const watcher = model.onDidChangeContent(() => {
          if (!syncing) props.files[path] = model.getValue();
        });
        newTabs.set(keyValue, { model, watcher });
      } else {
        lookup.model.setValue(source);
        // lookup.lib.dispose();
        lookup.watcher.dispose();
        lookup.watcher = lookup.model.onDidChangeContent(() => {
          if (!syncing) props.files[path] = lookup.model.getValue();
        });
        newTabs.set(keyValue, lookup);
      }
    }
    syncing = false;

    for (const [old, lookup] of currentTabs) {
      if (!newTabs.has(old)) lookup.model.dispose();
    }
    currentTabs = newTabs;
  });
  onCleanup(() => {
    for (const lookup of currentTabs.values()) lookup.model.dispose();
  });

  return <></>;
};
export default MonacoFiles;
