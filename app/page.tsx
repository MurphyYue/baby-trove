import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/Loading";
import Navbar from "@/components/Navbar";
import HomeUi from '@/components/ui/Home';

export const metadata: Metadata = {
  title: 'Baby Trove',
  description: 'my baby, my trove'
}

export default async function Home() {
  return (
    <div className="flex h-full justify-center bg-white dark:bg-black">
      <div className="max-w-lg w-full h-full">
        <Navbar />
        <Suspense fallback={<Loading />}>
          <HomeUi />
        </Suspense>
      </div>
    </div>
  );
}
