import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {login as storelogin} from "../store/authSlice"
import {Button,Input,Logo} from "./index"
import { useDispatch } from "react-redux";
import { authService} from "../appwrite/auth"
import { useForm } from "react-hook-form";



// React hook form usege discibe in this particuler componates

function Login () {

    const navigate = useNavigate()
    const dispach =useDispatch()
    const {register,handelSubmit} = useForm()
    const {Error,setError} = useState()

    const login = async (data) => {

        setError('')

        try {

            const session = await authService.login(data)

             if (session)
                 {
                  const userdata = await authService.getCurrentUser()

                  if (userdata) dispach (storelogin(userdata))

                    navigate("/")
                 }
   
        } catch (error) { 
            setError(error.message)   
        }

    }

  return (

    <div 
    className="flex items-center justify-center w-full">
        <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

            <div
            className="mb-2 flex justify-center">
                <span
                className="inline-block w-full max-w-[100px]">
                    <Logo width ='100%'/>

                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight" > Sign in to your account </h2>

            <p className="mt-2 text-center text-base text-black/60 ">
                Don&apos;t have any account?&nbsp;
                <Link
                to="/Login"
                className="font-medium text-primary transition-all duration-200 hover:underline">

                    Sign In
                
                </Link>

            </p>

            {Error && <p className="text-red-600 mt-8 text-center"></p>
            }
            <form onSubmit={handelSubmit(login)} className="mt-8" >

                <div className=" space-y-5">

                    
                    <Input
                    lable = 'Email:'
                    placeholedr ='Enter your email'
                    type = 'email'
                    {...register
                        ( "email" ,
                    {required:true,
                        validate:
                        {
                            machPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                        }
                    }
                        )
                    }    

                    />

                    <Input
                    lable ='Password:'
                    type = 'password'
                    placeholedr = 'Enter your passowrd'
                    {...register ('password', {
                        required: true,
                    })}
                    />

                    <Button
                    type='submit'
                    className ='w-full'
                    > 
                    Creat New Account
                    </Button> 

                </div>

            </form>

        </div>
        
        </div>

)
}

export default Login;