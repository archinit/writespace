"use client"
import { RoomProvider as RoomProviderWrapper, ClientSideSuspense } from "@liveblocks/react/suspense"
import { LoadingSpinner } from "./LoadingSpinner"
import React from "react"
import { LiveCursorProvider } from "./LiveCursorProvider";

export const RoomProvider = ({ roomId, children }: {
    roomId: string,
    children: React.ReactNode 
}) => {
    return (
        <div>
            <RoomProviderWrapper 
                id={roomId}
                initialPresence={{
                    cursor: null,
                }}
            >
                <ClientSideSuspense fallback={<LoadingSpinner/>}>
                <LiveCursorProvider>
                    {children}
                </LiveCursorProvider>
                </ClientSideSuspense> 
            </RoomProviderWrapper>
        </div>
    );
};