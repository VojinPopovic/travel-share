import MainDiv from "@/components/MainDiv/MainDiv";
import Navbar from "@/components/Navbar/Navbar";
import Post from "@/components/Post/Post";

async function getPosts() {
  try {
    const data = await fetch("https://travel-share.vercel.app/api/posts/group");
    return data.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function New() {
  const postData = await getPosts();

  return (
    <>
      <MainDiv>
        <Navbar />
        <div className="w-full px-[3%]">
          {postData
            ?.slice()
            .reverse()
            .map((post) => {
              if (postData.slice().reverse().indexOf(post) < 5) {
                return <Post key={post._id} post={post} />;
              }
            })}
        </div>
      </MainDiv>
    </>
  );
}
