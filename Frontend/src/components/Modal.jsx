import React, { useEffect } from 'react'


export default function Modal({Modaltitle,handleChange,value = {},handleNoteSubmit,closeModal}) {
  useEffect(() => {
    if (closeModal) {
      const modalElement = document.getElementById('exampleModal');
      if (window.bootstrap) {
        const modal = window.bootstrap.Modal.getInstance(modalElement) || new window.bootstrap.Modal(modalElement);
        modal.hide();
      }
    }
  }, [closeModal]);

  return (
   <>
   <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content border-0">
      <div className="modal-header">
        <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">{Modaltitle}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-floating mb-3">
  <textarea className="form-control"  id="floatingTextarea" onChange={handleChange} value={value.title} name="title" placeholder="Enter Title" style={{height: "100px"}}></textarea>
  <label htmlFor="floatingTextarea">Enter Title</label>
</div>

<div className="form-floating">
  <textarea className="form-control"  id="floatingTextarea2" onChange={handleChange} value={value.description} name="description" placeholder="Enter Description" style={{minHeight: "200px"}}></textarea>
  <label htmlFor="floatingTextarea2">Enter Description</label>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary"  onClick={handleNoteSubmit}>Save changes</button>
      </div>
    </div>
  </div>
</div>
   
   </>
  )
}
