import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { delay, motion } from "framer-motion"
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  const onClickhandler = () => {
      if(user) {
        navigate('/result')
      }else {
        setShowLogin(true)
      }
  }
  return (
    <motion.div
      className="flex flex-col justify-center items-center
      my-20"

      initial = {{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
    >
      <motion.div
        className="text-stone-500 inline-flex gap-2 text-center
         bg-white px-6 py-1 rounded-full border border-neutral-500"
         initial = {{opacity:0, y:-20}}
         animate={{opacity:1, y:0}}
         transition={{delay:0.3,duration:0.8}}
      
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="star" />
      </motion.div>
      <motion.h1 className="text-4xl max-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
         initial = {{opacity:0}}
         animate={{opacity:1}}
         transition={{delay:0.4,duration:2}}
      >
        Turn text to <span className="text-blue-600">image</span>, in seconds
      </motion.h1>
      <motion.p className="text-center max-w-xl mx-auto mt-5"
       initial = {{opacity:0, y:20}}
       animate={{opacity:1, y:0}}
       transition={{delay:0.6,duration:0.8}}
        >
        Start by creating a new Vite project if you don’t have one set up
        already. The most common approach is to use Create Vite.
      </motion.p>
      <motion.button onClick={onClickhandler}
      className="sm:text-lg text-white bg-black w-auto mt-8
      px-12 py-2.5 flex items-center gap-2 rounded-full"
      whileHover={{scale:1.05}}
      whileTap={{scale:0.95}}
      initial = {{opacity:0}}
      animate={{opacity:1}}
      transition={{default :{duration:0.5}, opacity:{delay:0.8, duration:1} }}
      >Generate Images 
        <img src={assets.star_group} alt="stargroup" className="h-6"/></motion.button>
        <motion.div className="flex gap-3 flex-wrap justify-center mt-10"
           initial = {{opacity:0}}
           animate={{opacity:1}}
           transition={{delay:1,duration:1}}
        >
                {Array(6).fill('').map((item, index)=> (
                <motion.img 
                whileHover={{scale:1.05, duration:0.1}}
                className=" cursor-pointer rounded 
                hover:scale-105 transition-all duration-300 max-sm:w-10" 
                src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} 
                alt="image1"
                 key={index} width={70}/>
                ))}
        </motion.div>
        <p className="mt-2 text-neutral-600">
            Generated images from imagify</p>
    </motion.div>
  );
};

export default Header;
