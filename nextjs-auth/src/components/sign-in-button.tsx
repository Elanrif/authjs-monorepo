"use client";
import {useSession} from "next-auth/react";
import Link from "next/link";

const SignInButton = () => {
    const {data: session} = useSession();

    if(session && session.user){
        console.log(session.user);
        return(
            <div className={"flex gap-4 ml-auto"}>
                <p className={"text-sky-600"}>{session.user.name}</p>

                <Link href={`/api/auth/signout`} className={"flex gap-4 ml-auto text-red-600"}>
                    Sign Out
                </Link>
            </div>
        )
    }

    return (
        <div className={"flex gap-4 ml-auto items-center"}>
            <Link href={`/api/auth/signin`} className={"flex gap-4 ml-auto text-green-600"}>
                Sign In
            </Link>
            <Link href={`/sign-up`} className={"flex gap-4 ml-auto px-2 py-2 rounded-md bg-green-600 text-green-200"}>
                Sign Up
            </Link>
        </div>
    )

}

export default SignInButton;