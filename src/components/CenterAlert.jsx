import React from 'react'

const CenterAlert = ({text, type}) => {
    const badIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  

    const goodIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>

   const nillError = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
   <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
 </svg>
 
  
 const icon = type === 'good' ? goodIcon : type === 'bad' ? badIcon : nillError
  

  return (
    <div className='center-alert-container'>
        <div className="center-alert-body w-11/12 md:w-8/12">
            <div className=" mt-3">
                {icon}
            </div>
            <div className="text my-3 text-sm">
                {text}
            </div>
        </div>
    </div>
  )
}

export default CenterAlert