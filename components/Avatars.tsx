import { useOthers, useSelf } from "@liveblocks/react/suspense"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const Avatars = () => {
    const others = useOthers();
    const self = useSelf();

    const all = [self, ...others]

    return (
        <div className="flex gap-2 items-center ">
        <p className="font-light text-sm">Users currently editing this</p>

        <div className="flex -space-x-5">
            {all.map((other, i) => (
                <Tooltip key={other?.id + i}>
                    <TooltipTrigger>
                        <Avatar className="border-2 hover:z:50">
                            <AvatarImage src={other?.info.avatar}/>
                            <AvatarFallback>{other?.info.name}</AvatarFallback>
                        </Avatar> 
                    </TooltipTrigger>
                        <TooltipContent>
                            <p>{self?.id === other?.id ? "You" : other?.info.name }</p>
                        </TooltipContent>
                </Tooltip>
            ))}
        </div>
    </div>
)  
}