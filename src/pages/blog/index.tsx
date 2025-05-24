import Head from "next/head";
import Link from "next/link";
import { type PostMetadata, getPosts } from "~/utils/getPosts";
import { Navbar } from "../../components/blog/Navbar";

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
      <Link
        href="/"
        rel="nofollow"
        className="absolute left-10 top-10 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
      >
        {"<-"}
      </Link>

      <main className="flex min-h-screen w-screen flex-col items-center bg-neutral-100 py-10 md:py-16 lg:py-20">
        <div className="flex w-full flex-col items-center">
          {posts.map((post) => (
            <div
              key={post.url}
              className="my-4 flex w-full items-center space-x-4 px-4 sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3"
            >
              <span className="text-xs text-gray-500 sm:text-sm">
                {post.date}
              </span>
              <Link
                className="block text-base md:text-lg"
                href={`/blog/${post.url}`}
              >
                {post.title}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps = () => {
  const posts = getPosts();

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
};
