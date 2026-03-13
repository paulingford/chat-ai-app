import { Sidebar } from "@/components/sidebar";
import { ChatCanvas } from "@/components/chat-canvas";

export default function Home() {
  return (
    <div className="flex h-screen bg-neutral-50 p-3">
      <div className="flex w-full gap-3">
        <Sidebar />
        <ChatCanvas />
      </div>
    </div>
  );
}
