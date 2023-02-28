import React from 'react'

export default function Modal({modalID, title, message, callback}) {
  return (
    <div className="modal fade" tabIndex="-1" id={modalID}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="button btnAdd">Sí</button>
            <button type="button" className="button btnSecondary" data-bs-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  )
}
