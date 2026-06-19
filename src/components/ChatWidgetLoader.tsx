"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ChatWidget = dynamic(() => import("./ChatWidget"), {
  ssr: false,
});

export default function ChatWidgetLoader() {
  const pathname = usePathname() || "";
  const isHomePage = pathname === "/" || pathname === "/zh" || pathname === "/zh/";

  if (!isHomePage) return null;

  return <ChatWidget />;
}
