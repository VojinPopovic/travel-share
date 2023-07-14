import Image from "next/image";
import SearchIcon from "../../../public/searchIcon.svg";

export default function SearchBar({ setSearchValue }) {
  function updateSearchValue(e) {
    e.preventDefault();
    setSearchValue(e.target[0].value);
  }
  return (
    <div className="w-2/3 max-w-[900px] _card-gradient _post-border rounded-full my-3 ml-[3%]">
      <div className="w-full h-[40px] relative flex justify-start">
        <Image src={SearchIcon} className="w-[40px]" alt=""></Image>
        <form
          onSubmit={updateSearchValue}
          className="w-full h-full flex items-center bg-transparent rounded-full"
        >
          <input
            type="text"
            placeholder="Search by group name"
            className="w-full h-full bg-transparent rounded-full pl-2 placeholder:text-black opacity-50"
          />
        </form>
      </div>
    </div>
  );
}
