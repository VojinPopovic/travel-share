import GroupCsr from "@/components/GroupsCSR/GroupCsr";

export async function getGroups() {
  const res = await fetch("https://restcountries.com/v3.1/all" );
  return res.json();
}

export default async function Groups() {
  const data = await getGroups();
  return <GroupCsr data={data} />;
}
