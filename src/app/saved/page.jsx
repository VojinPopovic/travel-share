async function getSaved() {
  try {
    const saved = await fetch("http://localhost:3000/api/saved");
    return saved.json()
  } catch (error) {
    console.log(error);
  }
}
async function getPosts() {}

export default async function Saved() {
  const data = await getSaved();
  console.log(data);

  return <div>page</div>;
}
