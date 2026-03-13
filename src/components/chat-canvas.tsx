"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatInput } from "@/components/chat-input";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const cannedResponses = [
  "That's a great question. Let me think about that for a moment.\n\nBased on what I know, I'd suggest breaking this down into smaller steps. Start with the core problem, identify the constraints, and then work through each piece methodically. Would you like me to elaborate on any specific part?",
  "I'd be happy to help with that.\n\nHere are a few approaches you could consider:\n\n1. Start by defining your requirements clearly\n2. Research existing solutions that might apply\n3. Prototype a minimal version first\n4. Iterate based on what you learn\n\nWhat resonates most with your situation?",
  "Interesting — I've seen this come up before.\n\nThe short answer is that it depends on your specific context, but generally the most effective approach is to keep things simple at first and only add complexity when you have a clear reason to. Premature optimization is a common trap.",
  "Good question. Here's how I'd think about it:\n\nThe key insight is that most problems like this have a well-known solution pattern. The challenge is usually in adapting that pattern to your specific constraints. Let me know more about your setup and I can give you a more targeted answer.",
  "I can definitely help with that.\n\nFrom what you've described, it sounds like you're on the right track. The main thing I'd suggest is to validate your assumptions early — build the smallest thing that tests your hypothesis, then expand from there.",
  "That's a thoughtful way to frame it.\n\nI think the answer lies in balancing simplicity with completeness. You don't need to solve everything at once, but you do want a clear mental model of the full picture. Want me to walk through the tradeoffs?",
];

function pickResponse(index: number): string {
  return cannedResponses[index % cannedResponses.length];
}

export function ChatCanvas() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const responseCount = useRef(0);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  function handleSubmit(content: string) {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const delay = 600 + Math.random() * 800;
    const idx = responseCount.current++;

    setTimeout(() => {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: pickResponse(idx),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  }

  const hasMessages = messages.length > 0;

  return (
    <main className="flex flex-1 flex-col rounded-2xl border border-neutral-100 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      {!hasMessages ? (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="flex w-full max-w-[600px] flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="size-8 rounded-full bg-neutral-100" />
              <h1 className="text-[32px] font-medium leading-10 tracking-[-0.64px] text-text-heading">
                Welcome, John Doe
              </h1>
              <p className="text-xl font-medium leading-7 tracking-[-0.4px] text-text-subtitle">
                How can I assist you today?
              </p>
            </div>
            <ChatInput onSubmit={handleSubmit} />
          </div>
        </div>
      ) : (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-[600px] flex-col gap-5 px-4 py-8">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          </div>
          <div className="flex justify-center px-4 pb-4 pt-2">
            <ChatInput onSubmit={handleSubmit} />
          </div>
        </>
      )}
    </main>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? "bg-surface-primary text-white"
            : "bg-neutral-50 text-text-heading"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl bg-neutral-50 px-4 py-3">
        <span className="size-1.5 animate-pulse rounded-full bg-text-placeholder" />
        <span className="size-1.5 animate-pulse rounded-full bg-text-placeholder [animation-delay:150ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-text-placeholder [animation-delay:300ms]" />
      </div>
    </div>
  );
}
