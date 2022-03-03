import React from 'react';
import { useParams } from 'react-router-dom';

interface IProps{
    movieId: string;
}

export const Detail = () => {
    const {movieId} = useParams() as unknown as IProps;
    console.log(movieId);
    return(
        <div>{movieId ? `${movieId}` : "null"}</div>
    )
}