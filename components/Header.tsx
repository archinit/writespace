"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs"

export const Header = () => {
    const { user } = useUser();


    return <div className="flex items-center justify-between p-6">
        {user && (
            <h1 className="text-2xl">
                {user?.firstName}
                {`'s`} Space
            </h1>
        )}

        {/* Breadcrums */}


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