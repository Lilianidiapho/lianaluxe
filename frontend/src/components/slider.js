"use client";
import { useRef, useState, useEffect } from "react";

export default function Slider() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;
  const autoScrollInterval = 3000
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      scrollToSlide(nextSlide);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [currentSlide]);
  function scrollToSlide(index) {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * window.innerWidth,
        behavior: "smooth",
      });
      setCurrentSlide(index);
    }
  }

  return (
    <div className="relative h-[60vh]">
      <div ref={sliderRef} className="flex w-full h-full overflow-x-scroll scroll-smooth  rounded-[40px] " style={{scrollbarWidth:"none"}}>
        <div className="  w-[100vw] h-full  snap-center flex-shrink-0 bg-center bg-cover" style={{backgroundImage:"url('/womens .jpeg')"}}>
          <div className=" h-full  w-[40%]  p-20 justify-center flex flex-col gap-6 ">
            <p className="font-bold text-4xl text-white">50% off for bodymists and candles</p>
            <button className="bg-green-700 text-white font-bold w-max px-8 py-2 rounded-xl">Shop Now</button>
          </div>
        </div>
        <div className="w-[100vw] h-full bg-center bg-cover snap-center flex-shrink-0" style={{backgroundImage:"url('/menss.jpeg')"}}>
          <div className=" h-full  w-[40%]  p-20 justify-center flex flex-col gap-6 ">
            <p className="font-bold text-4xl text-white">50% off for clothing and shoes</p>
            <button className="bg-green-700 text-white font-bold w-max px-8 py-2 rounded-xl">Shop Now</button>
          </div>
        </div>
        <div className="w-[100vw] h-full bg-center bg-coversnap-center flex-shrink-0" style={{backgroundImage:"url('/luxeries .jpeg')"}}>
         <div className=" h-full  w-[40%]  p-20 justify-center flex flex-col gap-6 ">
            <p className="font-bold text-4xl text-white">50% off for clothing and shoes</p>
            <button className="bg-green-700 text-white font-bold w-max px-8 py-2 rounded-xl">Shop Now</button>
          </div>
        </div>
        <div className="w-[100vw] h-full bg-center bg-cover snap-center flex-shrink-0" style={{backgroundImage:"url('/candle.jpeg')"}}>
         <div className=" h-full  w-[40%]  p-20 justify-center flex flex-col gap-6 ">
            <p className="font-bold text-4xl">50% off for clothing and shoes</p>
            <button className="bg-green-700 text-white font-bold w-max px-8 py-2 rounded-xl">Shop Now</button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-24 transform -translate-x-1/2 flex gap-3">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "bg-black w-8 h-2"
                : "bg-black/50 w-2 h-2 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
