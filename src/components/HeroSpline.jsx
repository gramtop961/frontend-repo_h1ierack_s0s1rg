import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroSpline = () => {
  return (
    <section className="relative w-full h-[340px] sm:h-[420px] md:h-[520px] overflow-hidden rounded-b-3xl shadow-lg">
      <Spline scene="https://prod.spline.design/qMOKV671Z1CM9yS7/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white drop-shadow-md">Aesthetic Countdown Timer</h1>
        <p className="mt-2 text-white/80 text-sm sm:text-base">Minimal, modern and interactive — count down to your next big moment</p>
      </div>
    </section>
  );
};

export default HeroSpline;
