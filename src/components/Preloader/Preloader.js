
import React from 'react';
import './Preloader.css';
function Preloader () {

  return (
    <div className='preloader'>
      <i className="preloader__spinner"></i>
      <p className='preloader__title'>Идет поиск новостей...</p>
    </div>
  )
}

export default Preloader;