import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React from "react";

const Category = [
  "Fronted Developer",
  "Backed Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Devops Developer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Video Engineer",
  "Graphics Designer",
];
const Categories = () => {
  return (
    <div>
         <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-blue-700">
                Categories
            </h1>
            <p className="text-gray-600 text-xl">Explore our extensive job market</p>
         </div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent className="">
        
         
            {
                Category.map((category,index)=>{
                   return (
                    <CarouselItem className="md:basis-1/2 " key={index}>
                  <Button>{category}</Button>
                    </CarouselItem>
                   )
                })
            }
        
          
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
};

export default Categories;
