export async function CreatePostComment(commentContent, id, session) {
  let comment = commentContent;
  let userimage = session?.data?.user?.image;
  let commentmaker = session?.data?.user?.email;

  try {
    await fetch("/api/comments/post/", {
      method: "POST",
      body: JSON.stringify({
        id,
        comment,
        userimage,
        commentmaker,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}
