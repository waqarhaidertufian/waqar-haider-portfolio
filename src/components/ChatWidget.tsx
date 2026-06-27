import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "motion/react";
import { BrainCircuit, MessageSquare, X, Send, Cpu, Calendar, Code, Sparkles, MessageSquareCode, GripHorizontal } from "lucide-react";
import { ChatMessage } from "../types";

const SUGGESTIONS = [
  "What are Waqar's core skills?",
  "How can I contact or hire Waqar?",
  "Tell me about the AI Fitness project",
  "Is Waqar open for remote work?"
];

export default function ChatWidget() {
  const dragControls = useDragControls();
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
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
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

  // Play audio greeting on first user interaction (browsers block auto-play)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("portfolio_chat_has_visited");
    if (!hasVisited && !hasAutoOpened) {
      const handleUserInteraction = () => {
        setHasAutoOpened(true);
        sessionStorage.setItem("portfolio_chat_has_visited", "true");
        
        // Show notification banner for 3 seconds
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        
        // Play audio greeting using Web Speech API
        if ('speechSynthesis' in window) {
          setIsAudioPlaying(true);
          const utterance = new SpeechSynthesisUtterance("Hi Dear, how can I help you? I am a assistant of Waqar Haider");
          utterance.rate = 0.9;
          utterance.pitch = 1;
          utterance.volume = 1;
          utterance.onend = () => {
            setIsAudioPlaying(false);
          };
          speechSynthesis.speak(utterance);
        }
        
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
      
      // Add event listeners for user interaction
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
      
      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
    }
  }, [hasAutoOpened]);

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
    <motion.div
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.08}
      dragConstraints={{
        left: -window.innerWidth + (typeof window !== 'undefined' && window.innerWidth < 640 ? window.innerWidth * 0.85 : 330) + 24,
        right: 24,
        top: -window.innerHeight + 470,
        bottom: 24
      }}
      className="fixed bottom-6 right-6 z-[999] select-none font-sans flex flex-col items-end touch-none"
    >
      {/* Notification Banner near chatbot */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: 20 }}
            className="mb-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500/90 to-purple-600/90 backdrop-blur-md rounded-full border border-white/20 shadow-[0_4px_20px_rgba(6,182,212,0.3)] flex items-center gap-2 whitespace-nowrap"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-white tracking-wide">
              Hi Dear, how can I help you?
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Conversations Sliding Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 35 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-[85vw] sm:w-[330px] h-[450px] glass-crystal-panel rounded-2xl flex flex-col justify-between overflow-hidden mb-4 relative z-[999]"
          >
            {/* Animated Liquid Crystal Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-2xl">
              {/* Blob 1 */}
              <div className="absolute top-[-10%] left-[-10%] w-[65%] h-[65%] bg-gradient-to-br from-cyan-500/20 to-purple-500/10 rounded-full blur-[45px] liquid-blob-1" />
              {/* Blob 2 */}
              <div className="absolute bottom-[-10%] right-[-10%] w-[65%] h-[65%] bg-gradient-to-br from-purple-500/20 to-emerald-500/10 rounded-full blur-[45px] liquid-blob-2" />
              {/* Crystal Diagonal reflection sheen */}
              <div className="absolute inset-0 glass-reflection opacity-40 pointer-events-none" />
            </div>

            {/* Header coordinates (Draggable handle) */}
            <div 
              onPointerDown={(e) => {
                const target = e.target as HTMLElement;
                if (!target.closest('button')) {
                  dragControls.start(e);
                }
              }}
              className="px-3 py-2.5 bg-white/[0.01] border-b border-white/5 flex flex-col cursor-grab active:cursor-grabbing select-none z-10"
            >
              {/* Drag Handle Indicator Pill */}
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-2 shrink-0 opacity-40 hover:opacity-100 hover:bg-cyan-400/40 transition-all duration-200 flex items-center justify-center">
                <GripHorizontal className="w-3 h-3 text-white/40" />
              </div>

              <div className="flex items-center justify-between">
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
            </div>

            {/* Chat Body Scroll Container */}
            <div
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin select-text z-10 relative"
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
                          ? "bg-purple-950/40 border-purple-400/30 text-purple-400 shadow-[0_2px_8px_rgba(139,92,246,0.15)]"
                          : "bg-cyan-950/40 border-cyan-400/30 text-cyan-400 shadow-[0_2px_8px_rgba(6,182,212,0.15)]"
                      }`}
                    >
                      {isBot ? "W" : "U"}
                    </div>

                    <div className="flex flex-col">
                      <div
                        className={`p-2.5 text-[11px] rounded-xl leading-relaxed backdrop-blur-md border border-white/10 ${
                          isBot
                            ? "bg-white/[0.03] text-slate-200 rounded-tl-none shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                            : "bg-gradient-to-r from-cyan-500/80 to-purple-600/80 font-sans font-medium text-white rounded-tr-none shadow-[0_6px_15px_rgba(6,182,212,0.2)]"
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
                  <div className="w-6 h-6 rounded-full bg-purple-950/30 border border-purple-500/20 flex items-center justify-center font-bold text-[9px] text-purple-400">
                    W
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl rounded-tl-none flex items-center gap-1 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-200" />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick chips suggested links */}
            {messages.length < 3 && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-white/5 bg-black/20 select-none z-10">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSendMessage(item)}
                    className="text-[9px] font-mono tracking-wide text-slate-300 hover:text-cyan-300 bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/10 px-2.5 py-1 rounded-full text-left duration-250 select-none cursor-pointer backdrop-blur-sm transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {/* Form messaging input text-area controller */}
            <form
              onSubmit={handleFormSubmit}
              className="px-3 py-2.5 border-t border-white/5 bg-black/20 flex items-center gap-2 z-10"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask model about Waqar..."
                className="flex-1 px-3 py-2 rounded-xl glass-crystal-input text-slate-200 text-xs transition"
                aria-label="Type message query"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 hover:brightness-110 text-slate-950 font-bold hover:scale-105 active:scale-95 duration-150 disabled:opacity-30 disabled:scale-100 cursor-pointer shadow-[0_4px_12px_rgba(6,182,212,0.25)] flex items-center justify-center shrink-0"
                aria-label="Send message query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating robotic core toggle circle trigger & Label */}
      <div className="flex flex-col items-center gap-1.5 mt-2 z-[999]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onPointerDown={(e) => !isOpen && dragControls.start(e)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500/80 via-purple-600/80 to-cyan-400/80 flex items-center justify-center text-white border border-white/20 backdrop-blur-md shadow-[0_10px_35px_rgba(6,182,212,0.4),_inset_0_2px_4px_rgba(255,255,255,0.4)] cursor-pointer outline-none relative hover:brightness-110 duration-300 overflow-hidden active:cursor-grabbing"
          aria-label="Toggle AI Virtual Assistant"
        >
          {/* Animated Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-white" />
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
                  className="w-6 h-6 text-white animate-pulse"
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
                {/* Green notification indicator - pulsing when audio playing */}
                <span className={`absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full border border-slate-950 inline-block ${isAudioPlaying ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase select-none cursor-grab active:cursor-grabbing" onPointerDown={(e) => !isOpen && dragControls.start(e)}>
          Waqar AI
        </span>
      </div>
    </motion.div>
  );
}
