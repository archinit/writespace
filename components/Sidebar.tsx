import { MenuIcon } from "lucide-react"
import { NewDocumentButton } from "./NewDoucumentButton"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export const Sidebar = () => {

    const menuOptions = (
        <>
            <NewDocumentButton />

            {/* My docs */}
            {/* Lists */}

            {/* share with me */}
        </>
    );
    return <div className="p-2 md:p-4 bg-gray-200 relative">
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <MenuIcon className="p-2 hover:opacity-30 rounded-lg cursor-pointer" size={40}/>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader >
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