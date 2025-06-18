"use client"

import * as Y from "yjs";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormEvent, useState, useTransition } from "react";
import { BrainCircuit, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";

type Language = 
    | "english"
    | "spanish"
    | "portuguese"
    | "french"
    | "german"
    | "chinese"
    | "hindi"
    | "arabic"
    | "russian"
    | "japanese"

const languages: Language[] = [
     "english",
     "spanish",
     "portuguese",
     "french",
     "german",
     "chinese",
     "hindi",
     "arabic",
     "russian",
     "japanese",
];    


export const TranslateDocument = ({doc}: { doc: Y.Doc}) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [summary, setSummary] = useState("");
    const [ language, setLanguage ] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault();



        startTransition(async () => {
        const documentData = doc.get("document-store").toJSON();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    documentData,
                    targetLang: language,
                })
            }
        );

        if (res.ok) {
            const { translated_text } = await res.json();

            setSummary(translated_text);
            toast.success("Translated Summary successfully!");
        }
    })
    };


    
    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <Button asChild variant="outline">
                    <DialogTrigger>
                        <LanguagesIcon />
                        Translate
                    </DialogTrigger>
                </Button> 
                    <DialogContent>
                        <DialogHeader >
                        <DialogTitle className="text-center">Translate the Document</DialogTitle>
                        <DialogDescription className="text-center">
                            Select a Language and AI will translate a summary of the document in the selected language.
                        </DialogDescription>

                       
                        </DialogHeader>



                        {summary && (
                            <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                                <div className="flex">
                                    <BrainCircuit className="w-10 flex-shrink-0"/>
                                    <p className="font-bold">
                                        AI {isPending ? " is thinking..." : "Says"}
                                    </p>
                                </div>
                                <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown> }</p>
                            </div>
                        )}

                        <form className="flex gap-2" onSubmit={handleAskQuestion}>
                            <Select value={language}
                                    onValueChange = {(value) => setLanguage(value)} 
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder= "Select a Language"/>

                                </SelectTrigger>

                                <SelectContent>
                                    {languages.map((language) => (
                                        <SelectItem key={language} value={language}>
                                            {language.charAt(0).toUpperCase() + language.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button type="submit" disabled={!language || isPending}>
                                {isPending ? "Translating..." : "Translate"}
                            </Button>
                           
                        </form>
                    </DialogContent>
            </Dialog>
}            
