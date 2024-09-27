import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext,CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "MERN Stack Developer",
  "Dot net Developer",
];

const Category = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselPrevious/>
        <CarouselContent>
          {category.map((element, index) => {
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center items-center">
                <Button>{element}</Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Category;
