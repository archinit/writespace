"use client"

import { MenuIcon } from "lucide-react"
import { NewDocumentButton } from "./NewDoucumentButton"
import { useCollection } from "react-firebase-hooks/firestore";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useUser } from "@clerk/nextjs";
import { collectionGroup, DocumentData, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { SidebarOptions } from "./SidebarOptions";

interface RoomDocument extends DocumentData {
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
}


export const Sidebar = () => {

    const { user } = useUser();
    const [ groupedData, setGroupedData ] = useState<{
        owner: RoomDocument [],
        editor: RoomDocument []
    }>({
        owner: [],
        editor: []
    });

    const [ data ] = useCollection(
        user && (
            query(
                collectionGroup(db, 'rooms'), 
                where('userId', '==', user.emailAddresses[0].toString())
            )
        )
    );

    useEffect(() => {
        if (!data) return;

        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;

                if (roomData.role === "owner") {
                    acc.owner.push({
                        id: curr.id,
                        ...roomData
                    });
                } else {
                    acc.editor.push({
                        id: curr.id,
                        ...roomData
                    })
                }
                return acc;
            }, {
                owner: [],
                editor: []
            }
        )
        setGroupedData(grouped)
    }, [data])

    const menuOptions = (
        <>
            <NewDocumentButton />
            <div className="flex py-4 flex-col space-y-2 w-full">
                {/* My docs */}
                { groupedData.owner.length === 0 ? (
                    <h2 className="text-gray-500 font-semibold text-sm">
                        No documents found
                    </h2>
                ) : (
                    <div>
                        <h2 className="text-gray-500 font-semibold text-sm mb-2">
                            My Documents
                        </h2>
                        <div className="space-y-1">
                            {groupedData.owner.map((doc) => (
                                <SidebarOptions key={ doc.id } id={ doc.roomId } href={`/doc/${doc.roomId}`}/>
                            ))}
                        </div>
                    </div>
                )
            }   
            

            {/* share with me */}
            <div>
                {groupedData.editor.length > 0 && (
                    <div>
                        <h2 className= "text-gray-500 font-semibold text-sm mb-2" >
                            Shared with me
                        </h2>
                        {groupedData.editor.map((doc) => (
                            <SidebarOptions key={ doc.id } id={ doc.roomId } href={`/doc/${doc.roomId}`}/>
                        ))}
                    </div>
                )}
            </div>

        </div>    

            {/* Lists */}

        </>
    );
    return <div className="p-2 md:p-4 bg-gray-200 relative ">
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <MenuIcon className="p-2 hover:opacity-30 rounded-lg cursor-pointer" size={40}/>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader className="text-center">
                        <SheetTitle>Menu</SheetTitle>
                        <div>{menuOptions}</div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
        <div className="hidden md:inline">
            {menuOptions}
        </div>
    </div>
}