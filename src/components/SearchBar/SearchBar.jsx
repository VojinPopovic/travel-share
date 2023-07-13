import Image from "next/image";
import SearchIcon from "../../../public/searchIcon.svg";

export default function SearchBar({setSearchValue}) {
  function updateSearchValue(e){
    setSearchValue(e.target.value)
  }
  return (
    <div className="w-2/3 max-w-[900px] _card-gradient _post-border rounded-full my-3">
      <div className="w-full h-[40px] relative flex justify-start">
        <Image src={SearchIcon} className="w-[40px]" alt=""></Image>
        <input
          type="text"
          placeholder="Search by group name"
          className="w-full bg-transparent rounded-full"
          onChange={updateSearchValue}
        />
      </div>
    </div>
  );
}
