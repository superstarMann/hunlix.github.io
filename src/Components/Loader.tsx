import React from 'react';

interface IProps{
    actionText: string;
}

export const Loader:React.FC<IProps> = ({actionText}) => {
    return(
        <div className='flex justify-center items-center pb-60 h-screen'>
            <span className='text-white text-2xl font-bold'>{actionText}</span>
        </div>
    )
}