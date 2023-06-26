import SearchBar from "@/components/SearchBar/SearchBar";
import MainDiv from "@/components/MainDiv/MainDiv";
import Navigation from "@/components/Navigation/Navigation";
import GroupCard from "@/components/GroupCard/GroupCard";

export async function getGroups() {
  const res = await fetch("https://restcountries.com/v3.1/all", {
    cache: "force-cache",
  });
  return res.json();
}

export default async function Groups() {
  const data = await getGroups();
  return (
    <MainDiv>
      <SearchBar />
      <div className="w-full px-[3%]">
        <p className="font-semibold text-2xl _text-color mb-3">Browse groups</p>
        {data?.map((item) => {
          return <GroupCard item={item} />;
        })}
      </div>
      <Navigation previousPage="/home" />
    </MainDiv>
  );
}
