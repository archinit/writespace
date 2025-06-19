"use client"

import { Document } from "@/components/Document"
import { useParams } from "next/navigation"

 
export default function DocumentPage ()  {

    const params = useParams();
    const id = params.id as string

    return  <div className="flex flex-col flex-1 min-h-screen">
        <Document id = {id}/> 
    </div>
}