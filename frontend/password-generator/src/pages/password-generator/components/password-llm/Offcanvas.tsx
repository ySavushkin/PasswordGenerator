import { useState } from 'react'

export default function Offcanvas() {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <>
      {/* <button 
        className="btn btn-primary" 
        type="button"
        onClick={handleShow}
      >
        Переключатель справа offcanvas
      </button> */}

      <div 
        className={`offcanvas-my offcanvas-end ${show ? 'show' : ''}`}
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{ visibility: show ? 'visible' : 'hidden' }}
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Offcanvas зправа</h5>
          <button 
            type="button" 
            className="btn-close text-reset" 
            onClick={handleClose}
            aria-label="Закрыть"
          ></button>
        </div>
        <div className="offcanvas-body">
          Склад offcanvas
        </div>
      </div>

      {show && (
        <div 
          className="offcanvas-backdrop fade show" 
          onClick={handleClose}
        ></div>
      )}
    </>
  )
}