import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import fs from "fs";
import { Navbar } from "../../components/blog/Navbar";
import Link from "next/link";
import { useState } from "react";
import AppleSwitch from "~/components/blog/AppleSwitch";

interface Props {
  enMdxSource: MDXRemoteSerializeResult;
  ptMdxSource: MDXRemoteSerializeResult;
}

export default function BlogPost({ enMdxSource, ptMdxSource }: Props) {
  const [currentMdxSource, setCurrentMdxSource] =
    useState<MDXRemoteSerializeResult>(ptMdxSource);
  const [isPortuguese, setIsPortuguese] = useState(true);

  const toggleLanguage = () => {
    setIsPortuguese(!isPortuguese);
    setCurrentMdxSource(!isPortuguese ? enMdxSource : ptMdxSource);
  };

  return (
    <main className="min-h-screen bg-neutral-100">
      <Link
        href="/blog"
        rel="nofollow"
        className="absolute left-10 top-10 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
      >
        {"<-"}
      </Link>
      <Navbar />
      <div className="mb-4 flex justify-center">
        <div className="mb-4 flex items-center justify-center text-2xl">
          🇺🇸
          <AppleSwitch isOn={isPortuguese} handleToggle={toggleLanguage} />
          🇧🇷
        </div>
      </div>
      <article className="prose mx-auto w-full bg-neutral-100 px-4 py-10 lg:prose-xl sm:w-5/6 md:w-2/3 lg:w-1/2">
        <MDXRemote {...currentMdxSource} />
      </article>
    </main>
  );
}

export function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "data", "posts");
  const postFolders = fs.readdirSync(postsDirectory);

  const paths = postFolders.map((folderName) => ({
    params: { "post-url": folderName },
  }));

  return {
    paths,
    fallback: false, // Set this to "blocking" if you'd like to use ISR
  };
}

export async function getStaticProps({
  params,
}: {
  params: { "post-url": string };
}) {
  const baseDirectory = path.join(
    process.cwd(),
    "data",
    "posts",
    params["post-url"]
  );

  const enMdxPath = path.join(baseDirectory, "en.mdx");
  const ptMdxPath = path.join(baseDirectory, "pt.mdx");

  const enMdxText = fs.readFileSync(enMdxPath, "utf8");
  const ptMdxText = fs.readFileSync(ptMdxPath, "utf8");

  const enMdxSource = await serialize(enMdxText);
  const ptMdxSource = await serialize(ptMdxText);

  return {
    props: {
      enMdxSource,
      ptMdxSource,
    },
  };
}
