import {
  BetweenHorizontalStart,
  Heart,
  Home,
  Languages,
  Search,
  ShoppingCart,
  Store,
  TicketIcon,
  User,
  X,
} from "lucide-react";
import Link from "next/link";

export default function NavDrawer({ close }) {
  return (
    <div className="fixed z-80 bg-black/30 lg:hidden w-full h-screen top-0 left-0  backdrop-filter-20  transition-transform ease-in-out duration-4">
      <div className="bg-white w-[70vw] h-full rounded-l-2xl  flex flex-col p-8 shadow-2xl">
        <div className="flex justify-between">
          <span className="flex gap-2 items-center text-2xl font-bold">
            <Store className="w-8 h-8" />S H O P O N E
          </span>
          <X className="w-10 h-10 self-end text-gray-400" onClick={close} />
        </div>
        <div className="flex flex-col gap-10 h-full py-40 text-gray-400">
          <Link href={"/"} className="flex gap-2 text-2xl items-center ">
            <Home className="w-8 h-8" />
            Home
          </Link>
          <Link href={"/"} className="flex gap-2 text-2xl items-center">
            <BetweenHorizontalStart className="w-8 h-8" />
            Category
          </Link>
          <Link href={"/"} className="flex gap-2 text-2xl items-center">
            <TicketIcon className="w-8 h-8" />
            Promo
          </Link>
          <div className=" flex gap-2 bg-gray-200 px-4  py-2 rounded-xl text-2xl">
            <Search className="w-8 h-8" />
            <input placeholder="Search" className="focus:outline-none" />
          </div>
          <span className="flex justify-around">
            <button className="">
              <Languages />
            </button>
            <span className="relative ">
              <Heart className=" w-8 h-8" />
              <p className="absolute top-[-1] left-3 text-xs bg-green-600 text-white p-[1.5px] rounded-full">
                10
              </p>
            </span>
            <User className=" w-8 h-8" />
            <div className=" rounded-full relative">
              <ShoppingCart className=" w-8 h-8" />
              <p className="absolute top-[-9] left-4 text-xs bg-green-600 text-white p-[1.5px] rounded-full">
                10
              </p>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
