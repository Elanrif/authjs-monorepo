"use client";
import {
    Menubar,
    MenubarMenu,
} from "@/components/ui/menubar"
import Link from "next/link";
import SignInButton from "@/components/sign-in-button";
import {usePathname} from "next/navigation";

export function MenubarHeeader() {
    const pathname = usePathname();
   if(pathname === "/") {
       return (
           <Menubar className={"p-7 bg-slate-50 drop-shadow-sm flex items-center justify-between"}>
               <div className={"flex items-center gap-x-4"}><MenubarMenu>
                   <Link href={"/"} className={"hover:text-primary/90"}>Home Page</Link>
               </MenubarMenu>
                   <MenubarMenu>
                       <Link href={"/dashboard"} className={"hover:text-primary/90"}>Dashboard</Link>
                   </MenubarMenu></div>
               <div className={"flex items-center gap-x-4"}>
                   <SignInButton/>
               </div>
           </Menubar>
       )
   }
}
