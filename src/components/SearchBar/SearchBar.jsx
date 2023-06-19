import Image from "next/image"
import SearchIcon from "../../../public/searchIcon.svg"

export default function SearchBar() {
  return (
    <div className="w-[200px] _card-gradient _post-border rounded-full">
        <div className="w-full h-[40px] relative flex justify-start">
            <Image src={SearchIcon} className="w-[40px]" alt=""></Image>
        </div>
    </div>
  )
}
