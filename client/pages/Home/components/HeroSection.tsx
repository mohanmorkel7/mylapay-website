import React from "react";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/reveal";
import HeroVideo from "@/pages/assets/videos/index_hero.mp4"

  export default function ScrollStack() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);
 // Dummy video list to cycle through as background (public sample clips)
  const videoList = [
    HeroVideo,
  ];
  const [currentVideo, setCurrentVideo] = useState(0);

  // Attempt to play whenever the video source changes
  useEffect(() => {
    const tryPlay = async () => {
      try {
        await videoRef.current?.play();
        setNeedsInteraction(false);
      } catch (err) {
        // Autoplay blocked, show play button
        setNeedsInteraction(true);
      }
    };

    tryPlay();
  }, [currentVideo]);

  // Cycle videos every 12 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentVideo((v) => (v + 1) % videoList.length);
    }, 12000);
    return () => clearInterval(id);
  }, []);
    const handleManualPlay = async () => {
    try {
      await videoRef.current?.play();
      setNeedsInteraction(false);
    } catch (e) {
      // ignore
    }
  };
    return (
        <section
        aria-labelledby="hero-heading"
        className="relative flex min-h-screen flex-col items-start justify-end px-6 pt-16 pb-16 md:pb-20 lg:pb-24 text-left text-white overflow-hidden z-10 bg-black"
      >
        {/* Video background inside hero only */}
        <div className="absolute inset-0 -z-10">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={videoList[currentVideo]}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            tabIndex={-1}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        </div>

        <div className="w-full max-w-5xl pl-6 md:pl-12 lg:pl-20">
          <Reveal
            as="h1"
            id="hero-heading"
            variant="fadeUp"
            duration={800}
            delay={0}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)] "
          >
            Powering the
            <br />
            Future of Payments
          </Reveal>
<div className="flex">

          <Reveal
            as="div"
            variant="fadeUp"
            duration={800}
            delay={200}
            className="mt-8 flex items-center gap-4 mr-2"
          >
            <a
              href="#"
              className="inline-flex text-white items-center rounded-full bg-[#1f2b5c] px-5 py-3 text-sm font-medium text-slate-900 shadow-md hover:bg-white hover:text-black hover:shadow-lg transition-colors duration-200"
            >
              Integrate with us
            </a>
          </Reveal>


          <Reveal
            as="div"
            variant="fadeUp"
            duration={800}
            delay={200}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="/schedule-demo"
              className="inline-flex items-center bg-[#2cade3] text-white rounded-full px-5 py-3 text-sm font-medium text-slate-900 shadow-md hover:bg-white hover:text-black hover:shadow-lg transition-colors duration-200"
               target="_blank" rel="noopener noreferrer"

            >
              
              Schedule Demo
            </a>
          </Reveal>
          </div>
        </div>

        {/* Play overlay if autoplay blocked */}
        {needsInteraction && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* <button
              onClick={handleManualPlay}
              className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-white backdrop-blur hover:bg-white/20 transition"
              aria-label="Play background video"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
              </svg>
              Play background
            </button> */}
          </div>
        )}
      </section>
    );

  }