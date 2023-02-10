import { Suspense, type VoidComponent } from "solid-js";
import { A, Head, Title, Meta, Link, Outlet } from "solid-start";
import { Header } from "~/components/Header";

const Home: VoidComponent = () => {
  return (
    <div class="dark:bg-solid-darkbg relative flex h-screen flex-col overflow-auto bg-white font-sans text-slate-900 dark:text-slate-50">
      <Head>
        <Title>Learn solid start</Title>
      </Head>
      <Header />
      <main class="dark:bg-solid-darkbg grid h-full min-h-0 bg-white font-sans text-black dark:text-white wrapper dark" >        
          <Outlet />
      </main>
    </div>
  );
};

export default Home;
