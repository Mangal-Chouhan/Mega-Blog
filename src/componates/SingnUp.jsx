import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import {login as storeLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'



function SignUp() {

    const navigate = useNavigate()
    const [ Error ,setError] = useState()
    const dispach = useDispatch()
    const {register,handelSubmit} = useForm()



    const signup = async (data) =>{

        setError ("")

        try {

            const creat = await authService.creatAccount(data)
            if (creat)
                 {
                  const userData = await authService.getCurrentUser()
                  if(userData) dispach(storeLogin(userData))
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
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline">

                    Sign Up
                
                </Link>

            </p>

            {Error && <p className="text-red-600 mt-8 text-center"></p>
            }
            <form onSubmit={handelSubmit(signup)} className="mt-8" >

                <div className=" space-y-5">

                <Input
                    lable = 'Name'
                    placeholedr= ' Enter Your Full Name'
                    type = 'Name'
                    {...register('Name',{required:true})}
                    />


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
                    Singn in
                    </Button> 

                </div>

            </form>

        </div>
        
        </div>

  )
}

export default SignUp