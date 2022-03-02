import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import {getMovies, IGetMoviesResult} from '../api'
import {Loader} from '../Components/Loader'
import {makeImagePath} from '../utilits'

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

`

const Row = styled(motion.div)`
display: grid;
grid-template-columns: repeat(6, 1fr);
gap: 5px;
position: absolute;
background-color: black;
width: 100%;
`

const Box = styled(motion.div)`
height: 100px;
background-color: white;
`

const rowSider = {
    initial:{
        x: window.innerWidth + 5
    },
    animate:{
        x: 0
    },
    exit:{
        x: - window.innerWidth - 5
    }
}


export const Home = () => {
    const {data, isLoading} = useQuery<IGetMoviesResult>(['movies', "nowPlaying"], getMovies)
    const [index, setIndex] = useState(0)
    const [leaving, setLeaving] = useState(false)
    const onNext = () => {
        if(leaving) return
        toggleBox()
        setIndex(current => current + 1);
    }
    const toggleBox = () => {
        setLeaving(current => !current)
    }
    return(
        <div className='bg-black h-screen text-white'>
            {isLoading ? (<Loader actionText='Loading..... 🙇‍♂️'/>) : (
                <>
                <Banner onClick={onNext} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <div className='w-1/2 flex flex-col justify-center'>
                        <div className='text-6xl mb-5 font-light'>{data?.results[0].title}</div>
                        <div className='text-2xl w-10/12 opacity-80'>{data?.results[0].overview}</div>
                    </div>
                </Banner>
                <Sider className='-top-24 flex'>
                    <AnimatePresence onExitComplete={toggleBox}>
                    <Row variants={rowSider} 
                    initial={rowSider.initial} //대기
                    animate={rowSider.animate} //등장
                    exit ={rowSider.exit}      //퇴장
                    transition={{type:"tween", duration: 2}}
                    key={index}>
                        {[1,2,3,4,5,6].map(i => (
                            <Box className='text-red-500 flex justify-center items-center text-2xl font-bold'>
                                {i}
                            </Box>
                        ))}
                    </Row>
                    </AnimatePresence>
                </Sider>
                </>
            )}
        </div>
    )
}

