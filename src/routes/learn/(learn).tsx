import { Suspense, type VoidComponent } from "solid-js";
import { A, Head, Title, Meta, Link } from "solid-start";

const Home: VoidComponent = () => {
  return (
    <>
      <Head>
        <Title>Learn solid start</Title>
      </Head>
      <main class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#026d56] to-[#152a2c]" >
        <h1 class="text-4xl font-bold text-white">Learn Solid Start</h1>
      </main>
    </>
  );
};

export default Home;
