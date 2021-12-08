import React from 'react'
import style from './Login.module.scss'
import { useState, useEffect } from 'react'
import UsernameIcon from '../../components/Common/Login/UsernameIcon/UsernameIcon'
import PasswordIcon from '../../components/Common/Login/PasswordIcon/PasswordIcon'
// import { Link } from 'react-router-dom'

const Login = () => {
  const [loginInfo, setLoginInfo] = useState('')


  useEffect(() => {

    document.body.style.background = 'linear-gradient(to right, #11998e 0%, #38ef7d 100%)'
    document.body.style.color = '#074d47'
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setLoginInfo(prevValue => {
      return {
        [name]: value,
        ...prevValue
      }
    })
    console.log(loginInfo)
  }


  return (
    <div className={style.container}>
      <div className={style.loginContainer}>
        <img src='../../images/podcastLogo.png' alt='logo' className={style.logo} />
        <h1>Podcast Web App</h1>
        <div className={style.textBox}>
          <UsernameIcon />
          <input type='text' placeholder='Username' onChange={handleChange} />
        </div>
        <div className={style.textBox}>
          <PasswordIcon />
          <input type='password' placeholder='Password' />
        </div>
        <input type='button' className={style.loginButton} value='Login' onChange={handleChange} />
      </div>
    </div>
  )
}

export default Login