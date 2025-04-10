// components/AnimatedEmail.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function AnimatedEmail() {
  const emailRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Marker at komponenten er monteret i klienten
    setIsMounted(true);
    
    if (emailRef.current) {
      // Start position
      gsap.set(emailRef.current, {
        autoAlpha: 0,
        x: -50
      });
      
      // Animation
      gsap.timeline({
        delay: 1.5
      })
      .to(emailRef.current, {
        autoAlpha: 0.4,
        x: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    }
  }, []);
  
  // Stil-objektet baseret på om komponenten er monteret
  // Dette sikrer at server og klient render matcher hinanden
  const initialStyle = isMounted ? 
    { visibility: "hidden", opacity: 0 } : 
    {}; // Tom objekt på første render (server-side)
  
  return (
    <div 
      ref={emailRef}
      className="fixed left-0 bottom-32 -translate-y-1/2 z-50 origin-center -ml-12.5 transform-gpu opacity-0"
      style={initialStyle}
    >
      <div className="rotate-270 whitespace-nowrap text-sm tracking-widest opacity-70 hover:opacity-100 transition-opacity">
        <a href="mailto:danielstanley@live.dk" className="font-light">
          danielstanley@live.dk
        </a>
      </div>
    </div>
  );
}