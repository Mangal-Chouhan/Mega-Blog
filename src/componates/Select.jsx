import React from 'react'

function Select({
    options,
    lable,
    className,
    ...props
},ref) {

    const id = useid()
    
  return (
    <div className='w-full'>
        {lable && <lable hatmlFor={id} className=''></lable>}

        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py2 rounded-lg bg-whitetext-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} 
        >
            
            {options?.map((option)=>{

                <option key={option} value = {option}> 

                    {option}

                </option>

            })}

            </select>
    </div>
  )
}

export default React.forwardRef(Select)