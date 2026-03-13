import {
  MessageSquare,
  Users,
  List,
  PenLine,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: MessageSquare, label: "Chat", active: true },
  { icon: Users, label: "Contacts" },
  { icon: List, label: "Details" },
  { icon: PenLine, label: "Notes" },
  { icon: FileText, label: "Files" },
];

export function Sidebar() {
  return (
    <nav className="flex w-[111px] shrink-0 flex-col gap-2 px-1.5 py-3">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={cn(
            "flex h-8 items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium tracking-[-0.084px]",
            item.active
              ? "bg-white text-text-nav-active shadow-[0px_0px_2px_0px_rgba(0,0,0,0.05),0px_4px_6px_0px_rgba(0,0,0,0.02)]"
              : "text-text-nav hover:bg-white/60"
          )}
        >
          <item.icon className="size-4 shrink-0" strokeWidth={1.75} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
