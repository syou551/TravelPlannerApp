'use client';

import Link from "next/link";
import Image from "next/image";
import {memo, useState} from "react";
import clsx from "clsx";
import { signIn, useSession, signOut } from "next-auth/react";

const Header = ({Title} : {Title?: string}) =>{
    const [isShow, setIsShow] = useState<Boolean>(false);
    const {data : session} = useSession();
    //AuthProviderのコンテキストから状態を把握してLogin表示と切り替える処理を記述する
    const links = [
        {href : "/myIdea", Name : "Idea一覧"},
        {href : "/setting", Name : "設定"},
        {href : "/", Name : "Log out"}
    ]
    const callbackUrl = "/login";

    return (
        <>
        <header className="bg-white lg:w-full shadow-md mt-3">
            <nav className="flex justify-between items-center">
                <div className="flex lg:flex-1 mb-3 ml-4 w-5 h-5">
                    <Link href={"/"}>
                        <Image src={""/*"/sample.jpg"*/} width={30} height={30} alt="App Icon" className="">
                            
                        </Image>
                    </Link>
                </div>
                <p className="flex text-xl">{Title ? Title : ""}</p>
                <div className="flex items-center mb-3 mr-5">
                    <button className="flex justifu-center py-1 px-3 bg-blue-100 hover:bg-blue-400 hover:text-white" onClick={session?.user ? ()=> signOut() : ()=>location.replace("/login") }>
                        <p>{session?.user ? "Logout" : "Log in"}</p>
                    </button>
                    <button className="flex  w-10 h-10 mr-5">
                        <Image src={session?.user?.image ? session?.user?.image! : "/sample.jpg"} width={50} height={50} alt="User Icon" className="flex transition rounded-full hover:scale-110"></Image>
                    </button>
                    <button className={clsx(
                        "transition hover:rounded-md hover:bg-blue-100",
                        {
                            'rounded-md bg-blue-100': isShow,
                        })} onClick={()=>setIsShow(!isShow)}>
                        <p className="flex ml-3 mr-3 mb-3 mt-3">Menu</p>
                    </button>
                </div>
            </nav>
        </header>
        <div className="flex items-center fixed right-[0%] mr-3 z-index-10 z-50 bg-white">
            <nav className="flex justify-center items-center">
                <ul className={clsx("flex transition shadow-md items-center flex-col bg-gray-10",
                    {'hidden': !isShow,})}>
                        <div className="flex flex-col items-center ml-3 mr-3 mb-3 mt-3 gap-2 text-md ">
                        {links.map((link, index)=>(
                        <div className="flex grow hover:rounded-md hover:bg-blue-100" key={index}>
                            <Link href={link.href} className="ml-3 mr-3 mt-2 mb-2">{link.Name}</Link>
                        </div>))}
                        </div>
                </ul>
            </nav>
        </div>
        </>
    );
}

export default memo(Header);