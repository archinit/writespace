import { LiveBlocksProvider } from "@/components/LiveBlocksProviders";

export default function PageLayout( { children }: { children: React.ReactNode } ) {
    return <LiveBlocksProvider>
        { children }
    </LiveBlocksProvider>
} 