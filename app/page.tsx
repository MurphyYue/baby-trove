import Timeline from "@/components/Timeline";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="max-w-lg w-full">
        <Navbar />
        <Timeline />
      </div>
    </div>
  );
}
