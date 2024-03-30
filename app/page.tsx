import Image from "next/image";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="max-w-lg w-full">
        <Timeline />
      </div>
    </div>
  );
}
