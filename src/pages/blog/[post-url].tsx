import { useRouter } from "next/router";
import { posts } from "~/../data/posts";

const BlogPost = () => {
  const router = useRouter();
  const rawPostUrl = router.query["post-url"];
  const postUrl = Array.isArray(rawPostUrl) ? rawPostUrl[0] : rawPostUrl;

  // Find the post that matches the URL
  const post = postUrl ? posts.find((p) => p.url === `/${postUrl}`) : null;
  console.log(postUrl);

  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;
