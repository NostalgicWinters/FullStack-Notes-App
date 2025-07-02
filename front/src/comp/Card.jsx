import React from 'react'

function Card({id,heading, para, onDelete}) {
  return (
    <div className='flex flex-col justify-between p-[16px] bg-[#FAF9F6] rounded-2xl mx-[64px] my-[32px] w-[25%]'>
        <h1 className='text-purple-700 text-2xl m-[8px] font-bold'>{heading}</h1>
        <p className='text-gray-600 m-[8px]'>{para}</p>
        <button className='m-[16px] hover:cursor-pointer' onClick={()=>onDelete(id)}><img src='icons8-bin-50.png' className='h-[20px] w-[20px] flex justify-self-end' /></button>
    </div>
  )
}

export default Card