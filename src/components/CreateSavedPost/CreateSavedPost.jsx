export async function CreateSavedPost(session, postId) {
  try {
    await fetch("/api/saved", {
      method: "POST",
      body: JSON.stringify({
        email: session.data.user.email,
        postid: postId,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}
