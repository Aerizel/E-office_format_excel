import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/textgenerate-effect";

const words = "E-Office: Simplifying Office Management, One Click at a Time.";

export default function Home() {
  return (
    <main className="w-screen h-screen p-5">
      <div className="flex flex-row justify-center items-center">
        <TextGenerateEffect words={words} />
      </div>
    </main>
  );
}
