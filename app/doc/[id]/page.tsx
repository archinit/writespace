"use client"

import { Document } from "@/components/Document"

 
export default function DocumentPage ({ params: {id} }: {
    params: {
        id: string
    }
})  {
    return  <div>
        <Document id = {id}/> 
    </div>
}