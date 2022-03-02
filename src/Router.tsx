import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home} from './Routes/Home'
import {TV} from './Routes/TV'
import { Search } from './Routes/Search'
import {Header} from './Components/Header'

export const Router = () => {
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header/>
          <Routes>
              <Route path='/*' element={<Home/>}/>
              <Route path='/tv' element={<TV/>}/>
              <Route path='/search' element={<Search/>}/>
          </Routes>
        </BrowserRouter>
    )
}