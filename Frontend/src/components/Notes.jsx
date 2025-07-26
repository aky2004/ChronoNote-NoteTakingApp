import React, { useRef, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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

  return (
    <div className="card position-relative rounded-3 border shadow-sm note-card">
      <div className="card-body p-3">
        <h5 className="card-title text-capitalize fs-5 fw-bold mb-2">{title}</h5>
        {description && (
          <p className="card-text text-muted mb-3" style={{ maxHeight: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {description}
          </p>
        )}
        <div className='bottomContent d-flex justify-content-between align-items-center mt-3'>
          <div className='Date '>
            <h5 className='fs-6 text-secondary mb-0'>{date}</h5>
            <div className='d-flex gap-2'>
              <FaEdit size={18} cursor={"pointer"} className="text-primary" onClick={() => handleUpdate({ _id: noteId, title, description })} data-bs-toggle="modal" data-bs-target="#eiditModal" />
              <MdDelete size={22} color='red' cursor={"pointer"} onClick={() => handleDelete(noteId)} data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
