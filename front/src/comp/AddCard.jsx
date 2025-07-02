import React from 'react'
import { useState } from 'react';

function AddCard({pressed, onClick, onCancel, handleAdd}) {

    const [heading, setHeading] = useState('');
    const [para, setPara] = useState('');

    const submitNote = () => {
        if (!heading.trim() || !para.trim()) return;
        handleAdd(heading, para);        
        setHeading('');
        setPara('');
        onCancel();
    };

  return (
    <div onClick={!pressed ? onClick : undefined} className='border-2 border-dotted border-purple-500 flex flex-col justify-center items-center p-[16px] bg-[#FAF9F6] rounded-2xl mx-[64px] my-[32px] w-[25%] hover:scale-110 transition-transform duration-200 hover:cursor-pointer'>
        { pressed?(
            <>
                <input value={heading} onChange={(e)=>setHeading(e.target.value)} placeholder='Enter heading...' className='p-[8px]'></input>
                <input value={para} onChange={(e)=>setPara(e.target.value)} placeholder='Enter content...' className='p-[8px]'></input>
                <div>
                    <button onClick={(e)=>{
                        e.stopPropagation();
                        submitNote();
                    }} className='bg-green-500 text-white p-[4px] rounded-lg hover:cursor-pointer'>Submit</button>
                    <button onClick={onCancel} className='bg-red-600 text-white p-[4px] rounded-lg m-2 hover:cursor-pointer'>Cancel</button>
                </div>
            </> 
        ):(
            <>
                <span className='text-purple-500 text-3xl'>+</span>
                <span className='text-purple-500'>Add Note</span>
            </>
        ) }
        
    </div>
  )
}
export default AddCard