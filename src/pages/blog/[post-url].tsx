import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import fs from "fs";

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

export default function BlogPost({ mdxSource }: Props) {
  return (
    <article className="prose max-w-full lg:prose-xl">
      <MDXRemote {...mdxSource} />
    </article>
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
