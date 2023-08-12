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

      <main className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-slate-950 to-indigo-950 py-20">
        <div className="">
          <div className="">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
