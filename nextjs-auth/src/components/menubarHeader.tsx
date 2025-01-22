import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {Button} from "@/components/ui/button";
import Link from "next/link";

export function MenubarHeeader() {
    return (
        <Menubar className={"p-7 bg-slate-50 drop-shadow-sm flex items-center justify-between"}>
            <div className={"flex items-center gap-x-4"}><MenubarMenu>
                <Link href={"/home"} className={"hover:text-primary/90"}>Home Page</Link>
            </MenubarMenu>
                <MenubarMenu>
                    <Link href={"/dashboard"} className={"hover:text-primary/90"}>Dashboard</Link>
                </MenubarMenu></div>
            <div className={"flex items-center gap-x-4"}>
                <MenubarMenu>
                    <Button ><Link href={"/sign-in"}>Sign in</Link></Button>
                </MenubarMenu>
                <MenubarMenu>
                    <Button variant={"custom"}><Link href={"/sign-up"}>Sign Up</Link></Button>
                </MenubarMenu>
            </div>
        </Menubar>
    )
}
