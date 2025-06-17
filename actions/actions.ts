"use server"

import { adminDB } from "@/firebase-admin";
import { liveblocks } from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server"



export async function createNewDocument() {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
        return { success: false };
    }

    const docCollectionRef = adminDB.collection("documents");
    const docRef = await docCollectionRef.add({
        title: "New Doc"
    })

    await adminDB.collection('users')
    .doc(sessionClaims?.email)
    .collection('rooms')
    .doc(docRef.id)
    .set({
        userId: sessionClaims?.email,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id
    });

    return { docId: docRef.id }
}

export async function deleteDocument(roomId: string): Promise<{ success: boolean }> {
    const { userId } = await auth();

    if (!userId) {
        return { success: false };
    }

    console.log("deleteDocument", roomId);

    try {
        // delete the document refrences itself
        await adminDB.collection("documents").doc(roomId).delete();

        const query = await adminDB
            .collectionGroup("rooms")
            .where("roomId", "==", roomId)
            .get();
        
        const batch = adminDB.batch();
        
        //delete the room refrences in the users collection from every user in the room

        query.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        await liveblocks.deleteRoom(roomId)

        return { success: true}

    } catch (error) {
        console.error(error);
        return { success: false}
    } 
    
}

export async function inviteUserToDocument(roomId: string, email: string)  {
    const { userId } = await auth();

    if (!userId) {
        return { success: false };
    }

    console.log("inviteUserToDocument", roomId, email);

    try {
        await adminDB
            .collection("users")
            .doc(email)
            .collection("rooms")
            .doc(roomId)
            .set({
                userId: email,
                role: "editor",
                createdAt: new Date(),
                roomId,
            });

        return { success: true}


    } catch (error) {
        console.error(error);
        return { success: false}
    }
    
}