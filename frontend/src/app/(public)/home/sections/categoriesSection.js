"use client";
import { useRef } from "react";


export default function CategoriesSection(){
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behaviour: "smooth"});
    };

     const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };


      const categories =[
         { name: "aqua hour", img: "/aqua hour .jpeg" },
         { name: "covered in roses", img: "/covered in roses .jpeg" },
         { name: "cozy vanilla bourbon", img: "/cozy vanilla bourbon.jpeg" },
         { name: "floral fantasy", img: "/floral fantasy.jpeg" },
         { name: "forever red", img: "/forever red.jpeg" },
         { name: "loyal to you", img: "/loyal to you .jpeg" },
         { name: "macaron cloud", img: "/macaron cloud.jpeg" },
         { name: "madam mystique", img: "/madam mystique.jpeg" },
         { name: "magic in the air", img: "/magic in the air .jpeg" },
         { name: "midnight addiction", img: "/midnight addiction .jpeg" },

      ]


    return(
        <section className="bg-[#E9EAED] h-70 rounded-2xl ">
       <h1 className="text-3xl font-bold mb-6" style={{}}> Browse By Category</h1>

        <div className="flex gap-5 overflow-x-auto">
            {categories.map((mist) => (
                <div
                key={mist.name}
                className=" min-w-[160px] bg-white rounded-xl shadow-sm p-3 cursor-pointer hover:shadow-md transition ">
                    
                    <div className="h-28 w-full rounded-lg overflow-hidden mb-2">
                        <img
                        src={mist.img}
                        alt= {mist.name}
                        className="w-full h-full object-cover"
                        />
                    </div>

                    <p className="text-sm font-medium text-center">
              {mist.name}
            </p>
            </div>
            ))}
        </div>
        </section>
    );
}