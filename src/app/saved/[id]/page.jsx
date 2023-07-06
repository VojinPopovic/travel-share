import MainDiv from "@/components/MainDiv/MainDiv";
import SavedPosts from "@/components/SavedPosts/SavedPosts";
import Navigation from "@/components/Navigation/Navigation";

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
  const data = await getSaved(email);
  const posts = await getPosts();

  return (
    <MainDiv>
      <div>
        <SavedPosts data={data} posts={posts} email={email} />
      </div>
      <Navigation previousPage={"/home"} />
    </MainDiv>
  );
}
