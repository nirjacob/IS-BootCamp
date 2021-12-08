import React from 'react'
import style from './Login.module.scss'
import { useState, useEffect } from 'react'
import UsernameIcon from '../../components/Common/Login/UsernameIcon/UsernameIcon'
import PasswordIcon from '../../components/Common/Login/PasswordIcon/PasswordIcon'
import { submitLogin } from '../../services/Podcasts'

const Login = () => {
  const [loginDetails, setLoginDetails] = useState('')

  useEffect(() => {
    document.body.style.background = 'linear-gradient(to right, #11998e 0%, #38ef7d 100%)'
    document.body.style.color = '#074d47'
    return () => {
      document.body.style.background = '#093637'
      document.body.style.color = 'rgba(0, 241, 255, 0.84)'
    }
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setLoginDetails(prevValue => {
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  async function submitLoginDetails() {
    // **WIP** (we need to plan login logic)
    await submitLogin(loginDetails)
    // **WIP** (we need to plan login logic)
  }

  return (
    <div className={style.container}>
      <div className={style.loginContainer}>
        <img src='../../images/podcastLogo.png' alt='logo' className={style.logo} />
        <h1>Podcast Web App</h1>
        <div className={style.textBox}>
          <UsernameIcon />
          <input type='text' name='username' placeholder='Username' onChange={handleChange} />
        </div>
        <div className={style.textBox}>
          <PasswordIcon />
          <input type='password' name='password' placeholder='Password' onChange={handleChange} />
        </div>
        <input type='button' className={style.loginButton} value='Login' onClick={submitLoginDetails} />
      </div>
    </div>
  )
}

export default Login