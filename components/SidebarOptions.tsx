"use client"

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

export const SidebarOptions = ({href, id}: {
    href: string;
    id: string
}) => {

    const [ data ] = useDocumentData(doc(db, "documents", id));
    const pathname = usePathname();
    const isActive = href.includes(pathname) && pathname !== "/"

    return <Link 
    href={href}
    className={`border p-2 rounded-md block w-full mb-3
     ${isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"}`}>
        <p className="truncate">{data?.title}</p>
    </Link>
}