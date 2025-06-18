"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation";
import { BreadCrums } from "./BreadCrums";

export const Header = () => {
    const { user } = useUser();
    const router = useRouter();
    function navigateHome() {
        router.push('/')
    }


    return <div className="flex items-center justify-between p-6">
        {user ? (
            <h1 onClick={ navigateHome } className=" cursor-pointer text-2xl">
                {user?.firstName}
                {`'s`} Space
                {}
            </h1>
        ) : (
            <h1 className="text-2xl">
                WriteSpace
            </h1>
        )}

        {/* Breadcrums */}
        <BreadCrums />


        <div>
            <SignedOut>
                <SignInButton/>
            </SignedOut>

            <SignedIn>
                <UserButton/>
            </SignedIn>
        </div>
    </div>
}