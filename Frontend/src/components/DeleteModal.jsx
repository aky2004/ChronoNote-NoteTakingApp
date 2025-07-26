import React, { useEffect } from 'react'


export default function DeleteModal({handelNotesDelete,closeModal}) {
  useEffect(() => {
    if (closeModal) {
      const modalElement = document.getElementById('deleteEmployeeModal');
      if (window.bootstrap) {
        const modal = window.bootstrap.Modal.getInstance(modalElement) || new window.bootstrap.Modal(modalElement);
        modal.hide();
      }
    }
  }, [closeModal]);

  return (
   <>
    <div id="deleteEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content border-0">
                        <form>
                            <div className="modal-header">
                                <h4 className="modal-title fs-5 fw-bold">Delete Note</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this note?</p>
                                <p className="text-warning"><small>This action cannot be undone.</small></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handelNotesDelete}>Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div></>
  )
}
