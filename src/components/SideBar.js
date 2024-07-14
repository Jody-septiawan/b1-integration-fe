import Link from "next/link";
import React from "react";
import { MdOutlineFastfood } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/useUserStore";
import { setAuthToken } from "@/libs/api";

export const SideBar = () => {
  const { user, setUser, setToken } = useUserStore();
  const router = useRouter();
 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setAuthToken(null);
    
    router.push("/login");
  };

  return (
    <div className="h-screen w-[13rem] border-r border-primary sticky p-4 top-0 flex flex-col justify-between">
      <div className="flex flex-col gap-y-4">
        <Link
          href="/"
          className="text-xl flex items-center gap-x-1 justify-center"
        >
          <MdOutlineFastfood size={15} className="text-base-content" />{" "}
          <p>
            <span className="text-secondary text-md">Cemal</span>
            <span className="text-primary text-md">Cemil</span>
          </p>
        </Link>
        <div>
          <p className="text-xs">Welcome</p>
          <p className="truncate">{ user ? user.fullname : "-"}</p>
        </div>
        <div>
          <Link
            href="/dashboard"
            className="btn btn-sm btn-ghost flex justify-start items-center w-full"
          >
            <FaTableList /> Foods
          </Link>
        </div>
      </div>
      <button
        className="btn btn-sm btn-ghost border border-error"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
