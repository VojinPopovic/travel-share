export async function CreateComment(commentContent, profileEmail, session) {
  let email = profileEmail;
  let comment = commentContent;
  let userimage = session?.data?.user?.image;
  let commentmaker = session?.data?.user?.email;

  try {
    await fetch("/api/comments/profile/", {
      method: "POST",
      body: JSON.stringify({
        email,
        comment,
        userimage,
        commentmaker,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}
