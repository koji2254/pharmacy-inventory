import React from 'react'

const Spinner = ({text='please wait...'}) => {
  return (
    <div className='spinner-container'>
        <div className="spinner-body w-11/12 md:w-8/12">
            <div className="loadingSpinner mt-3">
            </div>
            <div className="text my-3 text-sm">
                {text}
            </div>
        </div>
    </div>
  )
}

export default Spinner