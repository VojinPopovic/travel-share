import Post from "@/components/Post/Post";
import MainDiv from "@/components/MainDiv/MainDiv";

async function getSaved(email) {
  try {
    const saved = await fetch(
      `https://travel-share.vercel.app/api/saved?email=${email}`,
      { cache: "no-store" }
    );
    return saved.json();
  } catch (error) {
    console.log(error);
  }
}
async function getPosts() {
  try {
    const posts = await fetch(
      `https://travel-share.vercel.app/api/posts/email`
    );
    return posts.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function Saved({ params }) {
  const email = decodeURI(params.id).replaceAll("%40", "@");
  console.log(email);
  const data = await getSaved(email);
  const posts = await getPosts();

  let savedPosts = [];

  data.forEach((item) => {
    savedPosts.push(posts.filter((post) => item.postid === post._id));
  });
  savedPosts.forEach((item) => item);
  let content = savedPosts.map((item) => {
    return <Post key={item[0]._id} post={item[0]} />;
  });

  return (
    <MainDiv>
      <div>{content}</div>
    </MainDiv>
  );
}
