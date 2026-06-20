import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrainCircuit, MessageSquare, X, Send, Cpu, Calendar, Code, Sparkles, MessageSquareCode } from "lucide-react";
import { ChatMessage } from "../types";

const SUGGESTIONS = [
  "What are Waqar's core skills?",
  "How can I contact or hire Waqar?",
  "Tell me about the AI Fitness project",
  "Is Waqar open for remote work?"
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I am Waqar Haider's Virtual AI Portoflio Assistant model. You can ask me anything about his credentials, machine learning models, active research focus, or location details. Let me know what you are looking for!",
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  // Initialize or fetch unique session ID
  useEffect(() => {
    let sid = sessionStorage.getItem("portfolio_chat_session_id");
    if (!sid) {
      sid = "session_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now();
      sessionStorage.setItem("portfolio_chat_session_id", sid);
    }
    setSessionId(sid);
  }, []);

  // Auto scroll to latest statement
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessageObj: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessageObj]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Map prior messages into turn sequences for contextual history
      const historyContext = messages.slice(-5).map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        text: m.text
      }));

      // Call Express Full Stack Proxy Endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: textToSend, 
          history: historyContext,
          sessionId: sessionId || sessionStorage.getItem("portfolio_chat_session_id") || "unknown"
        })
      });

      if (!response.ok) {
        throw new Error("Local full-stack chat endpoint returned a failure state.");
      }

      const responseData = await response.json();
      
      const botMessageObj: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: responseData.text || "I was unable to retrieve a response packet. Please reach Waqar Haider directly at waqarhaidertufian@gmail.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessageObj]);

    } catch (err) {
      console.error("Chat client fetch failure:", err);
      // Fallback message printed cleanly
      const fallbackMessageObj: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: "It looks like my communications pipeline is running in offline local mode. However, I can let you know that Waqar Haider is a Senior AI Engineer specializing in Deep Learning, Computer Vision, and Full Stack development based in Faisalabad, Pakistan. You can reach him directly at waqarhaidertufian@gmail.com or WhatsApp (+92 327 1086970)!",
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMessageObj]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] select-none font-sans flex flex-col items-end">
      {/* 1. Conversations Sliding Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 35 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-[90vw] sm:w-[380px] h-[520px] bg-[#090520] border border-white/10 rounded-2xl flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(3,0,20,0.85)] mb-4"
          >
            {/* Header coordinates */}
            <div className="px-4 py-4 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-400/20 flex items-center justify-center font-bold text-cyan-400">
                  <Cpu className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                </div>
                <div>
                  <h4 className="text-xs font-sans font-bold text-slate-100 flex items-center gap-1.5 uppercase tracking-wide">
                    WAQAR_CO-BOT v1.2
                  </h4>
                  <p className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                    ONLINE
                  </p>
                </div>
              </div>

              {/* Close Drawer trigger */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 duration-150 cursor-pointer"
                aria-label="Minimize Chat Module"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body Scroll Container */}
            <div
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin select-text"
            >
              {messages.map((m) => {
                const isBot = m.sender === "bot";
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 max-w-[85%] ${
                      isBot ? "mr-auto" : "ml-auto flex-row-reverse"
                    }`}
                  >
                    {/* Tiny avatar box */}
                    <div
                      className={`w-6 h-6 rounded-full border text-[10px] uppercase font-bold flex items-center justify-center shrink-0 select-none ${
                        isBot
                          ? "bg-purple-950/30 border-purple-400/25 text-purple-400"
                          : "bg-cyan-950/30 border-cyan-400/25 text-cyan-400"
                      }`}
                    >
                      {isBot ? "W" : "U"}
                    </div>

                    <div className="flex flex-col">
                      <div
                        className={`p-3 text-[12px] rounded-xl leading-relaxed ${
                          isBot
                            ? "bg-white/[0.02] border border-white/5 text-slate-200 rounded-tl-none"
                            : "bg-cyan-600 font-sans font-medium text-slate-950 rounded-tr-none shadow-[0_4px_12px_rgba(6,182,212,0.2)]"
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[8px] font-mono text-slate-500 mt-1 self-end uppercase">
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Bot typing simulation ball */}
              {isTyping && (
                <div className="flex items-center gap-2.5 max-w-[60%] mr-auto">
                  <div className="w-6 h-6 rounded-full bg-purple-950/15 border border-purple-500/10 flex items-center justify-center font-bold text-[9px] text-purple-400">
                    W
                  </div>
                  <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-200" />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick chips suggested links */}
            {messages.length < 3 && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-white/5 bg-black/10 select-none">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSendMessage(item)}
                    className="text-[9px] font-mono tracking-wide text-slate-400 hover:text-cyan-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full text-left duration-200 select-none cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {/* Form messaging input text-area controller */}
            <form
              onSubmit={handleFormSubmit}
              className="px-4 py-3 border-t border-white/5 bg-white/[0.01] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask model about Waqar..."
                className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/5 text-slate-200 text-xs focus:ring-1 focus:ring-cyan-400 transition"
                aria-label="Type message query"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-2 rounded-lg bg-cyan-400 text-slate-900 hover:scale-105 duration-150 disabled:opacity-30 disabled:scale-100 cursor-pointer"
                aria-label="Send message query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating robotic core toggle circle trigger & Label */}
      <div className="flex flex-col items-center gap-1.5 mt-2">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-[0_8px_30px_rgba(6,182,212,0.35)] cursor-pointer outline-none relative hover:brightness-110"
          aria-label="Toggle AI Virtual Assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-slate-950" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-6 h-6 text-slate-950 animate-pulse"
                >
                  {/* Outer W */}
                  <path d="M 3 6 L 7.5 18 L 11.2 9 L 14.8 18 L 19.3 6" />
                  {/* Inner Parallel W */}
                  <path d="M 4.5 6 L 8.7 16 L 11.2 11 L 13.7 16 L 17.8 6" />
                  {/* Top left serif */}
                  <path d="M 1.5 6 H 4.5" />
                  {/* Top right serif */}
                  <path d="M 17.8 6 H 20.8" />
                  {/* Middle peak serif */}
                  <path d="M 10.2 9 H 12.2" />
                  {/* Bottom left serif */}
                  <path d="M 6 18 H 9" />
                  {/* Bottom right serif */}
                  <path d="M 13.3 18 H 16.3" />
                  {/* Brand dot */}
                  <circle cx="21.2" cy="17.2" r="1.1" fill="currentColor" stroke="none" />
                </svg>
                {/* Green notification indicator */}
                <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-950 inline-block" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase select-none">
          AI Chatbot
        </span>
      </div>
    </div>
  );
}
