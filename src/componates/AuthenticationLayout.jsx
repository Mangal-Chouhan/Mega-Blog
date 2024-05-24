import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export default  function AuthenticationLayout({children,authentication = true}) {


    const navigate =useNavigate ()
    const [loader, setloader] = useState()
    const authstatus = useSelector(state=>state.auth.status)    
    
    useEffect(()=>{
        if (authentication && authstatus !== authentication) {
              navigate("/Login")
        } else if ( !authentication && authstatus !== authentication ) {
            navigate('/')
        }

        setloader( false)

    },[authstatus,navigate,authentication])




  return loader ? <h1 >Loading...</h1> : <>{children}</>
}

