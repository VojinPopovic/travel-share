export default function page({ params }) {
  const groupName = params.id.replaceAll("%20", " ");
  return <div>{groupName}</div>;
}
