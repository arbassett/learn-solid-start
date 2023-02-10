import { languages } from 'monaco-editor';

// Self generated .d.ts files until solid-start does it themselves
const solidStartFiles = import.meta.glob(['/types/solid-start/**/*.d.ts', '/types/solid-start/**/package.json'], {
  eager: true,
  as: 'raw',
});

// Import the files from solid-js
const solidFiles = import.meta.glob(['/node_modules/solid-js/**/*.d.ts', '/node_modules/solid-js/**/package.json'], {
  eager: true,
  as: 'raw',
});
const solidMetaFiles = import.meta.glob(
  ['/node_modules/@solidjs/meta/**/*.d.ts', '/node_modules/@solidjs/meta/**/package.json'],
  { eager: true, as: 'raw' },
);
const solidRouterFiles = import.meta.glob(
  ['/node_modules/@solidjs/router/**/*.d.ts', '/node_modules/@solidjs/router/**/package.json'],
  { eager: true, as: 'raw' },
);
// Tell monaco about the file from solid-js
function cm(source: string, pkg: string, path: string) {
  languages.typescript.typescriptDefaults.addExtraLib(source, `file:///node_modules/${pkg}/${path}`);
  languages.typescript.javascriptDefaults.addExtraLib(source, `file:///node_modules/${pkg}/${path}`);
}

for (const [path, source] of Object.entries(solidStartFiles)) {
  cm(source, 'solid-start', path.replace('/types/solid-start', ''));
}

for (const [path, source] of Object.entries(solidFiles)) {
  cm(source, 'solid-js', path.replace('node_modules/solid-js', ''));
}

for (const [path, source] of Object.entries(solidMetaFiles)) {
  cm(source, '@solidjs/meta', path.replace('/node_modules/@solidjs/meta', ''));
}

for (const [path, source] of Object.entries(solidRouterFiles)) {
  cm(source, '@solidjs/router', path.replace('/node_modules/@solidjs/router', ''));
}
