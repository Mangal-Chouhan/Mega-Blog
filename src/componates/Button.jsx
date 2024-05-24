import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    ClassName = "",
    ...props

}) {
  return (
    <button
    className={`px-4 py-2 rounded-lg ${bgColor} ${type} ${textColor} ${ClassName}`}{...props}>

        {children}
        
    </button>
  )
}

export default Button