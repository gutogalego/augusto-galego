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

      <main className="flex min-h-screen w-screen flex-col items-center bg-neutral-100 py-20">
        <div className="flex w-full flex-col items-center">
          {posts.map((post) => (
            <div
              key={post.url}
              className="mx-auto my-4 flex w-1/3 items-center space-x-4"
            >
              <span className="text-sm text-gray-500">{post.date}</span>
              <Link className="block" href={`/blog/${post.url}`}>
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
