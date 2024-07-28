'use client'
import style from "./login.module.css"
import '../admin.css'
import Image from 'next/image'
import loginImg from './image/login.png'
import { useCallback, useEffect, useRef, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
export default function Login(){
    const [refreshToken,setRefreshToken]=useState('')
    const [accessToken,setAccessToken]=useState('')
    const userName=useRef()
    const password=useRef()
    const router=useRouter()
    useEffect(()=>{
        localStorage.setItem('refresh_token',refreshToken)
        localStorage.setItem('access_token',accessToken)
    },[refreshToken,accessToken])
    const signInBtn=useCallback(async(e)=>{
        e.preventDefault()
        if(!userName.current.value.trim()){
            alert('fill the userName input')
            return
        }
        if(!password.current.value.trim()){
            alert('fill the password input')
            return
        }
        const response=await axios.post('/api/auth/signin',{
            email:userName.current.value,
            password:password.current.value
        })
        console.log(response.data.user)
        setAccessToken(response.data.user.access_token)
        setRefreshToken(response.data.user.refresh_token)
        password.current.value=''
        userName.current.value=''
        if(response.status==200){
            router.push('/admin/panel')
        }else {
            console.error('Login failed:', response);
            alert('Login failed, please try again.');
        }
    },[router])
    return(
        <>
          <div className={style.container}>
            <div className={style.form}>
                <h1>Welcome admin</h1>
                <form>
                    <input placeholder='Username' ref={userName} type='text'/>
                    <input placeholder='Password' ref={password} type='password'/>
                    <button onClick={signInBtn}>sign in</button>
                </form>
            </div>
            <div className={style.imgDiv}>
                <Image className={style.img} src={loginImg} alt="login"/>
            </div>
          </div>
        </>
    )
}