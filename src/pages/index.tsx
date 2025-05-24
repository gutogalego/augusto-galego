import Head from "next/head";
import Link from "next/link";
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
          href="/blog"
        >
          <h3 className="text-2xl font-bold">Blog →</h3>
          <div className="text-lg">
            As every dev, I reinvented the wheel of blogging
          </div>
        </Link>
      </main>
    </>
  );
}
