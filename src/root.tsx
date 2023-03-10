// @refresh reload

import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";

import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';
import './assets/main.css'
import { AppContextProvider } from "./context";

export default function Root() {
  return (
    <Html lang="en" class="dark">
      <Head>
        <Title>Create JD App</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <AppContextProvider>
                  <FileRoutes />
                </AppContextProvider>
              </Routes>
            </ErrorBoundary>
          </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}