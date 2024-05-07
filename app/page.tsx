import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import TabBar from "@/components/TabBar";
import HomeUi from '@/components/ui/Home';

export const metadata: Metadata = {
  title: 'Baby Trove',
  description: 'my baby, my trove'
}

export default async function Home() {
  return (
    <div className="flex h-full justify-center bg-white dark:bg-black">
      <div className="max-w-lg w-full h-full">
        <TabBar />
        <Suspense fallback={<Loading />}>
          <HomeUi />
        </Suspense>
      </div>
    </div>
  );
}
