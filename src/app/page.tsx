"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

// Liste over billederne
const images = [
  { src: "/images/26.webp" },
  { src: "/images/2.webp" },
  { src: "/images/28.webp" },
  { src: "/images/4.webp" },
  { src: "/images/5.webp" },
  { src: "/images/6.webp" },
  { src: "/images/30.webp" },
  { src: "/images/8.webp" },
  { src: "/images/9.webp" },
  { src: "/images/10.webp" },
  { src: "/images/11.webp" },
  { src: "/images/12.webp" },
  { src: "/images/13.webp" },
  { src: "/images/14.webp" },
  { src: "/images/15.webp" },
  { src: "/images/16.webp" },
  { src: "/images/18.webp" },
  { src: "/images/19.webp" },
  { src: "/images/20.webp" },
  { src: "/images/21.webp" },
  { src: "/images/22.webp" },
  { src: "/images/23.webp" },
  { src: "/images/24.webp" },
  { src: "/images/25.webp" },
  { src: "/images/1.webp" },
  { src: "/images/27.webp" },
  { src: "/images/3.webp" },
  { src: "/images/39.webp" },
  { src: "/images/7.webp" },
  { src: "/images/31.webp" },
  { src: "/images/32.webp" },
  { src: "/images/33.webp" },
  { src: "/images/34.webp" },
  { src: "/images/35.webp" },
  { src: "/images/36.webp" },
  { src: "/images/37.webp" },
  { src: "/images/38.webp" },
  { src: "/images/29.webp" },
  { src: "/images/40.webp" },
  { src: "/images/41.webp" },
  { src: "/images/42.webp" },
  { src: "/images/43.webp" },
  
];

export default function RecentWork() {
  const logoRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [imagesVisible, setImagesVisible] = useState(false);
  
  useEffect(() => {
    // Ensure images are initially hidden
    setImagesVisible(false);
    
    const setupAnimation = () => {
      const logoElement = logoRef.current;
      if (!logoElement) return;
      
      // Find logo container
      const logoContainer = document.querySelector('.logo-container');
      if (!logoContainer) return;
      
      // Store the original position and dimensions
      const logoContainerRect = logoContainer.getBoundingClientRect();
      const logoRect = logoElement.getBoundingClientRect();
      
      // Calculate center position
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const centerX = viewportWidth / 2 - logoRect.width / 2;
      const centerY = viewportHeight / 2 - logoRect.height / 2;
      
      // Clone the logo element for the animation
      const logoClone = logoElement.cloneNode(true) as HTMLElement;
      logoClone.style.position = "fixed";
      logoClone.style.zIndex = "100";
      logoClone.style.pointerEvents = "none"; // Prevent interactions with the clone
      
      // Set initial position to center of viewport
      logoClone.style.top = `${centerY}px`;
      logoClone.style.left = `${centerX}px`;
      logoClone.style.opacity = "0"; // Start invisible for fade-in
      
      document.body.appendChild(logoClone);
      
      // Setup animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Show the original logo and remove clone when animation completes
          logoElement.style.opacity = "1";
          document.body.removeChild(logoClone);
          
          // Now show the images with animation
          setImagesVisible(true);
        }
      });
      
  // Animate the cloned logo with fade-in
  tl.fromTo(logoClone, 
    { opacity: 0,
      y: -40
     }, 
    {
      opacity: 1,
      y: 0,
      duration: .9,
      ease: "power2.inOut"
    })
      .to(logoClone, {
        duration: 0.3 // Pause in the center
      })
      .to(logoClone, {
        top: `${logoContainerRect.top}px`,
        left: `${logoContainerRect.left + (logoContainerRect.width/2) - (logoRect.width/2)}px`,
        duration: .8,
        ease: "power3.inOut"
      });
    };
    
    // Wait a brief moment to ensure everything is rendered
    const timer = setTimeout(() => {
      setupAnimation();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Image animation after logo animation completes
  useEffect(() => {
    if (!imagesVisible || !imagesContainerRef.current) return;
    
    const imagesTl = gsap.timeline();
    
    imagesTl.from(".image-item", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Debugging - log antal elementer
    console.log("Antal billeder i gallery:", document.querySelectorAll(".image-item").length);
    
  }, [imagesVisible]);

  return (
    <section className="px-6 py-12">
      {/* Logo med ref til animation */}
      <div className="text-center mb-12 logo-container">
        <div 
          ref={logoRef} 
          className="inline-block"
          style={{ opacity: 0 }} // Start med opacity 0
        >
          <Image
            src="/dsa-logo.png"
            alt="DSA Logo"
            width={200}
            height={50}
            className="mx-auto"
            priority 
          />
        </div>
      </div>

      {/* Galleri container - beholder original kolonnestruktur */}
      <div 
        ref={imagesContainerRef}
        className="mx-auto max-w-[1400px] columns-1 sm:columns-2 md:columns-3 gap-3 space-y-4"
        style={{ 
          display: imagesVisible ? 'block' : 'none'
        }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="image-item break-inside-avoid overflow-hidden rounded-sm shadow-md mb-4 cursor-default"
            style={{ height: '100%' }} // Fast højde for alle billeder
          >
            <Image
              src={img.src}
              alt={`Work ${idx + 1}`}
              width={800}
              height={600}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-103"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f3f4f6'/%3E%3C/svg%3E"
            />
          </div>
        ))}
      </div>
    </section>
  );
}