import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import introVideo from '../assets/intro.mp4';

interface Props {
  onFinish: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 10500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      onClick={onFinish}
      className="fixed inset-0 z-[99999] bg-black flex items-center justify-center w-screen h-screen overflow-hidden cursor-pointer"
    >
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
        onError={onFinish}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};