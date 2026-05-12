"use client"
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CandleSection() {
    const slideRef = useRef(null);
    
    function scrollRight(){
        slideRef.current.scrollTo({
            left: slideRef.current.scrollLeft +
            window.innerWidth,
            behavior: "smooth",
        });
    }
    
  function scrollLeft() {
    slideRef.current.scrollTo({
      left: slideRef.current.scrollLeft - window.innerWidth,
      behavior: "smooth",
    });
  }
    const candles =[
         { name: "Aromatherapy", img: "/aromatherapy.jpeg" },
         { name: "Champagne Toast", img: "/champagnt toast.jpeg" },
         { name: "Fiji White Sands", img: "/fiji.jpeg" },
         { name: "Mahogany Teakwood", img: "/mahgany teakwood.jpeg" },
         { name: "Oceanside Lavender", img: "/oceanside.jpeg" },
         { name: "Summer Boardwalk", img: "/summer.jpeg" },
         { name: "Athousand Wishes", img: "/thousand wishes.jpeg" },
         { name: "Coconut Pina Colada", img: "/pina colada.jpeg" },
         { name: "Raspberries & Vanilla", img: "/raspberries.jpeg" },
         { name: "Into The Night", img: "/night candle.jpeg" },


    ]

    return (
        <section className="py-10 mb-45 h-40">

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold mb-6"> Scented Candles </h1>

                <span className=" space-x-4 ">
                    <button 
                    onClick={scrollLeft}
                    className="bg-pink-200 p-2 rounded-full text-gray-400"> <ChevronLeft />  </button>
                     <button 
                     onClick={scrollRight}
                     className="bg-pink-200 p-2 rounded-full text-gray-400"> <ChevronRight />  </button>
                </span>
            </div>
                
                <div
                ref={slideRef}
                className=" flex gap-4 items-center overflow-x-scroll w-full scroll-smooth scrollbar-hide">
                      {candles.map(( candle , index) => (
                        <div className=" border rounded-xl min-w-[160px] "
                         key={index}>
                            <div className="w-40 flex flex-col justify-center items-center">
                                <img
                                className="bg-black rounded-t-xl h-40 w-full object-cover"
                                src={candle.img}
                                alt={candle.namethous}
                                />
                                <p className="text-sm font-bold p-1">{candle.name}</p>
                                </div>
                            </div>
                      ))}
                </div>

        </section>
    );
}