import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { PostMetadata, getPosts } from "~/utils/getPosts";

const Navbar = () => {
  return (
    <div className="bg-neutral-100  text-neutral-900 sm:py-8">
      <nav className="flex items-center justify-between">
        <div className="w-1/4" />

        <h1 className="w-1/4 text-center text-lg font-medium">
          Augusto Galego&apos;s blog
        </h1>

        <div className="flex w-1/4 items-center justify-center space-x-5">
          <Link
            href="https://twitter.com/RealGalego"
            className="text-xl"
            target="_blank"
          >
            𝕏
          </Link>
          <Link
            href="https://github.com/gutogalego"
            className=""
            target="_blank"
          >
            <Image
              src={"/github-dark.svg"}
              alt="Github"
              className="h-5 w-5"
              width={0}
              height={0}
            />
          </Link>
        </div>
        <div className="w-1/4" />
      </nav>
    </div>
  );
};

type props = {
  posts: PostMetadata[];
};

export default function Home(props: props) {
  const posts = props.posts;
  return (
    <>
      <Head>
        <title>Augusto Galego | Blog</title>
        <meta name="description" content="Galego's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="flex min-h-screen w-screen flex-col items-center bg-neutral-100 py-20">
        <div className="flex w-full flex-col items-center">
          {posts.map((post) => (
            <div key={post.url} className="mb-4 flex w-full justify-center">
              <div className="h-20 w-1/3" />
              <Link className="text-center0 w-1/3" href={`/blog/${post.url}`}>
                {post.title}
              </Link>
              <div className="w-1/3" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps = () => {
  const posts = getPosts();

  return {
    props: {
      posts,
    },
  };
};
