import React, { useState, useRef, useEffect } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';


export default function Notes({ title, description, date, handleUpdate, handleDelete, openDropdownId, setOpenDropdownId, noteId }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpenDropdownId]);

  const handleShow=()=>{
    setOpenDropdownId(openDropdownId === 'notes' ? null : 'notes');
  }
  return (
   <>
   


  <div className="card position-relative rounded-3 border shadow-sm note-card"> {/* Changed rounded-4 to rounded-3, added border and shadow-sm, changed background color to white */}
  <div className="card-body p-3"> {/* Added p-3 for more padding */}
    <h5 className="card-title text-capitalize fs-5 fw-bold mb-2">{title}</h5>
    {description && (
      <p className="card-text text-muted mb-3" style={{ maxHeight: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}> {/* Increased maxHeight */}
        {description}
      </p>
    )}

    <div className='bottomContent d-flex justify-content-between align-items-center mt-3'>
        <div className='Date '>
            <h5 className='fs-6 text-secondary mb-0' >{date}</h5>
             <div  className='d-flex gap-2'>
               
                {/* <div className='Dropdown d-flex gap-2' ref={dropdownRef}> */}
                <FaEdit size={18} cursor={"pointer"} className="text-primary" onClick={() => handleUpdate({ _id: noteId, title, description })} data-bs-toggle="modal" data-bs-target="#eiditModal"/> {/* Smaller icon, primary color */}
                <MdDelete size={22} color='red' cursor={"pointer"} onClick={() => handleDelete(noteId)} data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal"/>
                
                {/* </div> */}
               {/* Conditionally render three dots if dropdown functionality is still desired */}
               {/* <HiDotsVertical size={25} cursor={'pointer'} onClick={handleShow}/> */}
             </div>
        </div>
    </div>

    
  </div>
</div>
   </>
  )
}
