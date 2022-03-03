import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import {getMovies, IGetMoviesResult} from '../api'
import {Loader} from '../Components/Loader'
import {makeImagePath} from '../utilits'
import { Link, useNavigate } from 'react-router-dom';

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Sider = styled.div`
position: relative;
width: 100%;
`

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`

const NextArrow = styled.span`
position:absolute;
right: 0;
background-color: gray;
z-index: 50;
height: 100%;
padding: 0px 10px;
opacity: 0.5;
text-align: center;
display: flex;
align-items: center;
`

const PrevArrow = styled.span`
position:absolute;
left:0;
background-color: gray;
height: 100%;
padding: 0px 10px;
opacity: 0.5;
text-align: center;
display: flex;
align-items: center;
`

const Box = styled(motion.div)<{bgPhoto: string}>`
cursor: pointer;
height: 150px;
background-color: white;
background-image: url(${(props) => props.bgPhoto});
background-size: cover;
background-position: center center;
&:first-child{
    transform-origin: center left;
}
&:last-child{
    transform-origin: center right;
}
display: flex;
align-items: flex-end;
`

const Info = styled(motion.h4)`
width: 100%;
padding: 10px;
opacity: 0;
background-color: #dfe4ea;
span{
    font-weight: 500;
    color: black;
    font-size: 14px;
    text-align: center;
}
`

const rowSider = {
    initial:{
        x: window.innerWidth + 5 
    },
    animate:{
        x: 0,
        transition:{
            duration:1.5
        }
    },
    exit:{
        x: - window.innerWidth - 5,
        transition:{
            duration:1.5
        }
    }
}

const boxVariants = {
    normal: {
      scale: 1,
    },
    hover: {
      scale: 1.3,
      y: -80,
      transition: {
        delay: 0.5,
        duaration: 1,
        type: "tween",
      },
    },
  };

const infoVariants = {
    animate:{
        opacity: 0.8,
        transition:{
            delay:0.5,
            duration: 0.1,
            type:"tween"
        }
    }
}

const offset = 6;

export const Home = () => {
    const history = useNavigate()
    const [back, setBack] = useState(false);
    const {data, isLoading} = useQuery<IGetMoviesResult>(['movies', "nowPlaying"], getMovies)
    const [index, setIndex] = useState(0)
    const [leaving, setLeaving] = useState(false)
    const onNext = () => {
        if(data){
            if(leaving) return;
            toggleBox()
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.ceil(totalMovies / offset) -1;
            setIndex((current) => (current === maxIndex ? 0 : current + 1))
        }
    }
    const onPrev = () => {
        if(data){
            if(leaving) return;
            toggleBox();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) -1;
            setIndex((current) => (current === maxIndex ? 10 : current - 1))
        }
    }
    const toggleBox = () => {
        setLeaving(current => !current)
    }
    const onBoxClicked = (movieId: number) => {
        history(`/movie/${movieId}`)
    }
    return(
        <div className='bg-black h-screen text-white'>
            {isLoading ? (<Loader actionText='Loading..... 🙇‍♂️'/>) : (
                <>
                <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <div className='w-1/2 flex flex-col justify-center'>
                        <div className='text-6xl mb-5 font-light'>{data?.results[0].title}</div>
                        <div className='text-2xl w-10/12 opacity-80'>{data?.results[0].overview}</div>
                    </div>
                </Banner>
                <Sider className='-top-40 flex bg-transparent'>
                    <AnimatePresence initial={false} onExitComplete={toggleBox}>
                    <Row 
                    variants={rowSider} 
                    initial="initial" //대기
                    animate="animate" //등장
                    exit="exit"      //퇴장
                    transition={{type:"tween", duration: 2}}
                    key={index}>
                        <PrevArrow onClick={onPrev}>{"<"}</PrevArrow>
                      {data?.results.slice(1).slice(offset * index, offset * index + offset).map((movie) => (
                          <Box
                          onClick={() => onBoxClicked(movie.id)}
                          variants={boxVariants}
                          initial="normal"
                          whileHover="hover"
                          transition={{type: "tween"}}
                          key={movie.id} 
                          bgPhoto={makeImagePath(movie.backdrop_path, "w500")}>
                              <Info 
                              variants={infoVariants}
                              whileHover={infoVariants.animate}
                              ><span>{movie.title}</span></Info>
                          </Box>
                      ))}
                      <NextArrow onClick={onNext}>{">"}</NextArrow>
                    </Row>
                    </AnimatePresence>
                </Sider>
                <div className='py-20 bg-black'>

                </div>
                </>
            )}
        </div>
    )
}

