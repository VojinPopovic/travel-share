export async function CreateUser(session) {
  const username = session.data.user.name;
  const email = session.data.user.email;
  const img = session.data.user.image;

  try {
    await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        img,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}
