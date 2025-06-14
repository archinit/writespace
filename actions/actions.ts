"use server"

import { adminDB } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export async function createNewDocument() {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
        redirect('/sign-in')
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