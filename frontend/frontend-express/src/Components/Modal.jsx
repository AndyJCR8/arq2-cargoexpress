import React, { useRef, useState } from 'react'
import Loader from './Loader';
import bootstrap from 'bootstrap';

export default function Modal({modalID, title, message, callback, callbackData}) {
  const modalRef = useRef(null);

  const yesClicked = () => {
    callback(callbackData)
    document.getElementById(`btnClose-${modalID}`).click();
  }

  return (
    <div className="modal fade" tabIndex="-1" id={modalID} ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <i className='fa fa-trash'></i><h5 className="modal-title">{title}</h5>
            <button id={`btnClose-${modalID}`} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p> 
              {message.split("$")[0]}
              <br/>
              <br/>
              <b><i className='fa fa-database'></i>{message.split("$")[1]}</b>
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="button btnDelete" onClick={() => { yesClicked() }}><i className='fa fa-check'></i>Sí</button>
            <button type="button" className="button btnSecondary" data-bs-dismiss="modal"><i className='fa fa-xmark'></i>No</button>
          </div>
        </div>
      </div>
    </div>
  )
}
