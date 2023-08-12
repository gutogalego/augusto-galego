import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "~/components/Navigation";

export default function Home() {
  return (
    <>
      <Head>
        <title>Augusto Galego</title>
        <meta name="description" content="Galego's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="flex min-h-screen w-screen flex-col items-center  bg-gradient-to-b from-slate-950 to-indigo-950 py-20">
        <Link
          className="flex w-3/5 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="https://www.roadmapinvestidor.com.br/"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">Roadmap Investidor →</h3>
          <div className="text-lg">
            An open source Roadmap, in Portuguese, that helps people in Brazil
            to learn about investing
          </div>
        </Link>
      </main>
    </>
  );
}
