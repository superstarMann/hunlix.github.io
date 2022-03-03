import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import { Link, useMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const navVariants = {
    top: {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    scroll: {
      backgroundColor: "rgba(0, 0, 0, 1)",
    },
  };

export const Header = () => {
    const [searchBox , setSearchBox] = useState(false)
    const tvMatch = useMatch('/tv')
    const homeMatch = useMatch('/')
    const toggleBox = () => {setSearchBox(current => !current)}
    const navAnimation = useAnimation();
    const {scrollY} = useViewportScroll();
    useEffect(() => {
        scrollY.onChange(() => {
          if (scrollY.get() > 80) {
            navAnimation.start(navVariants.scroll);
        } else if(scrollY.get() < 80) {
            navAnimation.start(navVariants.top);
          }
        });
      }, [scrollY, navAnimation]);
    

    return(
        <motion.div variants={navVariants} animate={navAnimation} initial={navVariants.top} 
        className="text-white text-base fixed top-0 left-0 w-full shadow-xl"> 
            <div className='flex py-3 justify-between px-10'>
                <div className='flex gap-5 font-bold'>
                <Link to='/'>🖲</Link>
                <Link to='/'>
                    {homeMatch ? (<div className='opacity-100'>Home</div>) : (<div className='opacity-60'>Home</div>)}
                </Link>
                <Link to='tv'>
                {tvMatch ? (<div className='opacity-100'>TV</div>) : (<div className='opacity-60'>TV</div>)}
                </Link>
                </div>
                <div>
                <motion.input
                className='
                text-left bg-transparent origin-top-right pl-2 pr-4 mr-3 border-2 opacity-60'
                transition={{ type:"just"}}
                animate={{ scaleX: searchBox ? 1 : 0 }}
                initial={false}
                placeholder='Search for movie or tv...'/>
                <motion.span 
                  animate={{ x: searchBox ? 0 : -180 }}
                  transition={{ type: "linear" }}
                onClick={toggleBox}>
                    <FontAwesomeIcon className='text-white' icon={faMagnifyingGlass}/>
                </motion.span>
                </div>
            </div>
        </motion.div>
    )
}