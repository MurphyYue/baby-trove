import Timeline from "@/components/Timeline";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/Loading";

export const metadata: Metadata = {
  title: 'Baby Trove',
  description: 'my baby, my trove'
}

export default async function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="max-w-lg w-full">
        <Suspense fallback={<Loading />}>
          <Timeline />
        </Suspense>
      </div>
    </div>
  );
}
