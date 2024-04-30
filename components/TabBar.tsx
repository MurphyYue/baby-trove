"use client";

import React from "react";
import type { FC } from "react";
import { TabBar } from "antd-mobile";
import { AppOutline, AddCircleOutline, UserOutline } from "antd-mobile-icons";
import { usePathname, useRouter } from "next/navigation";

const Bottom: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const setRouteActive = (value: string) => {
    router.push(value);
  };

  const tabs = [
    {
      key: "/",
      icon: <AppOutline />,
    },
    {
      key: "/create-post",
      icon: <AddCircleOutline />,
    },
    {
      key: "/user",
      icon: <UserOutline />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[999] bg-white">
      <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} />
      ))}
    </TabBar>
    </div>
  );
};

export default Bottom;