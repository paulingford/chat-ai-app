"use client";

import { useRef, type KeyboardEvent } from "react";
import { Lightbulb, Paperclip, AtSign, ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSubmit?: (message: string) => void;
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const value = textareaRef.current?.value.trim();
    if (!value) return;
    onSubmit?.(value);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  return (
    <div className="flex w-full max-w-[600px] flex-col gap-4 rounded-2xl border-[0.5px] border-border-widget bg-white p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <textarea
        ref={textareaRef}
        placeholder="Ask me anything"
        rows={1}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        className="w-full resize-none bg-transparent text-sm leading-5 text-foreground placeholder:text-text-placeholder focus:outline-none"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ActionButton icon={Lightbulb} />
          <ActionButton icon={Paperclip} />
          <ActionButton icon={AtSign} />
        </div>
        <button
          onClick={submit}
          className="flex h-[26px] w-7 items-center justify-center rounded-lg bg-surface-primary text-white transition-colors hover:bg-surface-primary-hover"
        >
          <ArrowUp className="size-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon }: { icon: typeof Lightbulb }) {
  return (
    <button className="flex h-[26px] w-7 items-center justify-center rounded-lg border border-border-action bg-white transition-colors hover:bg-neutral-50">
      <Icon className="size-4 text-text-nav" strokeWidth={1.75} />
    </button>
  );
}
