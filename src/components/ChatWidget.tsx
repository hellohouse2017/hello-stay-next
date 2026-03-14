"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const BNB_API = process.env.NEXT_PUBLIC_BNB_API || "https://bnb-mgmt-system.vercel.app";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("chat_session_id");
            if (stored) return stored;
            const id = crypto.randomUUID();
            localStorage.setItem("chat_session_id", id);
            return id;
        }
        return "";
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Welcome message on first open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    role: "assistant",
                    content: "你好！我是訂房小助手 🏠\n\n您可以直接跟我說想找哪天的住宿，例如：\n「我想找 3/15-3/17 的空房，大約 10 個人」\n\n或是直接去 [查詢空房](/book) 頁面操作！",
                    timestamp: new Date(),
                },
            ]);
        }
    }, [isOpen, messages.length]);

    const sendMessage = useCallback(async () => {
        if (!input.trim() || loading) return;

        const userMsg: Message = { role: "user", content: input.trim(), timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${BNB_API}/api/web/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId, message: input.trim() }),
            });

            if (res.ok) {
                const data = await res.json();
                setMessages(prev => [
                    ...prev,
                    { role: "assistant", content: data.reply || "抱歉，我暫時無法回應。", timestamp: new Date() },
                ]);
            } else {
                setMessages(prev => [
                    ...prev,
                    { role: "assistant", content: "連線異常，請稍後再試。您也可以直接到 [查詢空房](/book) 頁面操作哦！", timestamp: new Date() },
                ]);
            }
        } catch {
            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: "網路連線異常 😢\n\n建議您可以：\n1. 前往 [查詢空房](/book) 直接搜尋\n2. 或加 LINE 官方帳號詢問",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    }, [input, loading, sessionId]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                data-chat-toggle="true"
                className="fixed z-[998] flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                style={{
                    bottom: "30px",
                    right: "30px",
                    width: "60px",
                    height: "60px",
                    backgroundColor: "var(--c-accent)",
                    color: "white",
                    fontSize: "24px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 5px 20px rgba(197,160,101,0.4)",
                }}
                aria-label="AI 訂房助手"
            >
                <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-comments"} />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="fixed z-[997] flex flex-col overflow-hidden shadow-2xl"
                    style={{
                        bottom: "100px",
                        right: "30px",
                        width: "380px",
                        maxWidth: "calc(100vw - 40px)",
                        height: "500px",
                        maxHeight: "calc(100vh - 140px)",
                        borderRadius: "16px",
                        backgroundColor: "#fff",
                        border: "1px solid rgba(0,0,0,0.1)",
                        animation: "slideUp 0.3s ease",
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center gap-3 px-5 py-4 shrink-0"
                        style={{
                            backgroundColor: "var(--c-primary)",
                            color: "white",
                            borderBottom: "3px solid var(--c-accent)",
                        }}
                    >
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                            style={{ backgroundColor: "var(--c-accent)" }}
                        >
                            <i className="fa-solid fa-robot" />
                        </div>
                        <div>
                            <div className="font-bold text-sm">訂房小助手</div>
                            <div className="text-[0.7rem] opacity-70">AI 智能客服 · 即時回覆</div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: "#f8f9fa" }}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className="max-w-[80%] px-4 py-3 rounded-2xl text-[0.9rem] leading-relaxed whitespace-pre-wrap"
                                    style={
                                        msg.role === "user"
                                            ? { backgroundColor: "var(--c-accent)", color: "white", borderBottomRightRadius: "4px" }
                                            : { backgroundColor: "white", color: "var(--c-primary)", border: "1px solid #eee", borderBottomLeftRadius: "4px" }
                                    }
                                    dangerouslySetInnerHTML={{
                                        __html: msg.content.replace(
                                            /\[(.+?)\]\((.+?)\)/g,
                                            '<a href="$2" style="color:' + (msg.role === "user" ? "white" : "var(--c-accent)") + ';text-decoration:underline;">$1</a>'
                                        ),
                                    }}
                                />
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="px-4 py-3 rounded-2xl bg-white border border-gray-100" style={{ borderBottomLeftRadius: "4px" }}>
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2 px-4 py-3 shrink-0" style={{ borderTop: "1px solid #eee", backgroundColor: "white" }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="輸入您的問題..."
                            className="flex-1 px-4 py-2.5 rounded-full border text-[0.9rem] focus:outline-none transition"
                            style={{ borderColor: "#ddd" }}
                            disabled={loading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-none cursor-pointer transition-all disabled:opacity-40"
                            style={{ backgroundColor: "var(--c-accent)", color: "white" }}
                        >
                            <i className="fa-solid fa-paper-plane text-[0.85rem]" />
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </>
    );
}
