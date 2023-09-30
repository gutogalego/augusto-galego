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

      <main className="flex min-h-screen w-screen flex-col items-center  space-y-6 bg-gradient-to-b from-slate-950 to-indigo-950 py-20">
      <Link
          className="link flex w-3/5 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="/ui"
        >
          <h3 className="text-2xl font-bold">UI (2023) →</h3>
          <div className="text-lg">
            A UI showcase using shadCN
          </div>
        </Link>
        <Link
          className="link flex w-3/5 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="https://www.roadmapinvestidor.com.br/"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">Roadmap Investidor (2023) →</h3>
          <div className="text-lg">
            An open source Roadmap, in Portuguese, that helps people in Brazil
            to learn about investing
          </div>
        </Link>

        <Link
          className="link flex w-3/5 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="https://mycoverletter.io/"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">
            MyCoverLetter (2023) [DISCONTINUED] →
          </h3>
          <div className="text-lg">
            An API wrapper around GPT to generate cover letters with minimal
            effort.
          </div>
        </Link>

        <div className="pt-11">
          <img
            src="https://ghchart.rshah.org/gutogalego"
            alt="Gutogalego's Github chart"
            width={1000}
            height={1000}
          />
        </div>
      </main>
    </>
  );
}
