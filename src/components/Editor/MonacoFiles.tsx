import type { Component} from 'solid-js';
import { createEffect, onCleanup, untrack } from 'solid-js';
// import type { IDisposable } from 'monaco-editor';
import { Uri, editor } from 'monaco-editor';

const MonacoFiles: Component<{ files: Record<string,string> }> = (props) => {
  const key = (path:string) => `file:///${path}`;
  let currentTabs = new Map<string, { model: editor.ITextModel }>();
  let syncing = false;
  createEffect(() => {
    const newTabs = new Map<string, { model: editor.ITextModel }>();
    syncing = true;
    for (const [path, fileSource] of Object.entries(props.files)) {
      const keyValue = key(path);
      const lookup = currentTabs.get(keyValue);
      const source = untrack(() => fileSource);
      if (!lookup) {
        const uri = Uri.parse(keyValue);
        const model = editor.createModel(source, undefined, uri);
        // const watcher = model.onDidChangeContent(() => {
        //   if (!syncing) tab.source = model.getValue();
        // });
        newTabs.set(keyValue, { model });
      } else {
        lookup.model.setValue(source);
        // lookup.watcher.dispose();
        // lookup.watcher = lookup.model.onDidChangeContent(() => {
        //   if (!syncing) tab.source = lookup.model.getValue();
        // });
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
