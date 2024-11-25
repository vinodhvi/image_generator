import React from "react";
import { assets } from "../assets/assets";
import {  motion } from "framer-motion"
const About = () => {
  return (
    <motion.div className=" items-center flex flex-col justify-center my-32 p-6 md:px-28" 
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Turn your imagination into visuals
      </p>
      <div className="flex  gap-5 md:gap-14 md:flex-row items-center sm:flex-col">
        <img src={assets.sample_img_1} alt="assets"
         className="w-80 xl:w-96 rounded-lg" />
         <div>
            <h2 className="text-2xl sm:text-4xl font-semibold mb-2">Introducing the AI-Powered Text to Image Generator</h2>
            <p className="text-gray-600 mb-4">Start by creating a new Vite project if you don’t have one set up already. The most common approach is to use Create Vite.Start by creating a new Vite project if you don’t have one set up already. The most common approach is to use Create Vite.</p>
            <p className="text-gray-600">Start by creating a new Vite project if you don’t have one set up already. The most common approach is to use Create Vite.Start by creating a new Vite project if you don’t have one set up already. The most common approach is to use Create Vite.</p>
         </div>
      </div>
    </motion.div>
  );
};

export default About;
