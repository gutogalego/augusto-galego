import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import fs from "fs";
import { Navbar } from "../../components/blog/Navbar";
import Link from "next/link";

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

export default function BlogPost({ mdxSource }: Props) {
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
      <article className="prose mx-auto w-1/2 max-w-full items-center space-x-4 bg-neutral-100 py-10 lg:prose-xl">
        <MDXRemote {...mdxSource} />
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
  const postsDirectory = path.join(
    process.cwd(),
    "data",
    "posts",
    params["post-url"],
    "en.mdx"
  ); // assuming 'en.mdx' is the English MDX file
  const mdxText = fs.readFileSync(postsDirectory, "utf8");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const mdxSource = (await serialize(mdxText)) as MDXRemoteSerializeResult;
  return { props: { mdxSource } };
}
