import React from "react";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/reveal";

  export default function ScrollStack() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);
 // Dummy video list to cycle through as background (public sample clips)
  const videoList = [
    "https://www.shutterstock.com/shutterstock/videos/3889646053/preview/stock-footage-digital-recruitment-and-online-hiring-virtual-headhunting-smart-recruitment-platforms-talent.mp4",
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
        className="relative flex min-h-screen flex-col items-start justify-end px-6 pt-16 pb-16 md:pb-20 lg:pb-24 text-left text-white overflow-hidden"
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
          >
            ACQUIRING SUPPORT
            <br />
            
          </Reveal>

          <Reveal
            as="p"
            variant="fadeUp"
            duration={800}
            delay={100}
            className="mt-6 max-w-2xl text-lg md:text-xl text-white/85"
          >
            Enhance your acquiring payment program with flexible, stand-alone solutions
          </Reveal>

          <Reveal
            as="div"
            variant="fadeUp"
            duration={800}
            delay={200}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-white px-10 py-3 text-sm font-medium text-slate-900 shadow-md hover:bg-[#2caee4] hover:text-white hover:shadow-lg transition-colors duration-200"
            >
              Integrate with ws
            </a>
          </Reveal>
        </div>

        {/* Play overlay if autoplay blocked */}
        {needsInteraction && (
          <div className="absolute inset-0 flex items-center justify-center">
          </div>
        )}
      </section>
    );

  }