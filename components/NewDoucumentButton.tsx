"use client"

import { useTransition } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { createNewDocument } from "@/actions/actions"

export const NewDocumentButton = () => {

    const router = useRouter();
    const [ isPending, startTransition ] = useTransition();

    const handleCreateNewDocument = () => {
        startTransition( async () => {
            //create new document
            const { docId } = await createNewDocument();
            router.push(`/doc/${docId}`)
        })
    }

    return <div>
        <Button onClick={ handleCreateNewDocument } disabled={ isPending }>
            { isPending ? "Creating..." : "New Document" }
        </Button>
    </div>
}