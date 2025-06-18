import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return <div>

        <div className="flex space-x-2 items-center animate-pulse">
          <ArrowLeftCircle className=" w-10 h-10"/>
          <h1 className="font-extrabold ">
            Get Started with Creating a New Document
          </h1>
      </div>


      
<div className=" text-center py-16 ">
    <h1 className="text-6xl font-extrabold mb-4 mt-20 text-black">
        WriteSpace
    </h1>

    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
        Your app for 
        <span className="text-black font-semibold"> real-time collaboration</span>, 
        <span className="text-black font-semibold"> document chat with AI</span>, and 
        <span className="text-black font-semibold"> AI-powered summary translation</span>.
    </p>

</div>
    </div>
}