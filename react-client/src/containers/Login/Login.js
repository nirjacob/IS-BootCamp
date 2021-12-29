import React from 'react'
import style from './Login.module.scss'
import { useState } from 'react'
import UsernameIcon from '../../components/Common/Login/UsernameIcon/UsernameIcon'
import PasswordIcon from '../../components/Common/Login/PasswordIcon/PasswordIcon'
import { submitLogin } from '../../services/Podcasts'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/podcastLogo.png'

const Login = () => {
  const [loginDetails, setLoginDetails] = useState('')
  const [isLoginError, setIsLoginError] = useState(false)
  const navigate = useNavigate()

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
    try {
      const jwtLoginToken = await submitLogin(loginDetails)
      localStorage.setItem('jwtLoginToken', jwtLoginToken)
      navigate('/podcasts')
    } catch (err) {
      setIsLoginError(true)
      console.error(err.message)
    }
  }

  const handleEnterPress = async (event) => {
    if (event.key === 'Enter') {
      await submitLoginDetails()
    }
  }

  return (
    <div className={style.container}>
      <div className={style.loginContainer}>
        <img src={logo} alt='logo' className={style.logo} />
        <h1>Podcast Web App</h1>
        <div className={style.textBox}>
          <UsernameIcon />
          <input type='text' name='username' placeholder='Username' onChange={handleChange}
                 onKeyDown={(e) => handleEnterPress(e)} />
        </div>
        <div className={style.textBox}>
          <PasswordIcon />
          <input type='password' name='password' placeholder='Password' onChange={handleChange}
                 onKeyDown={(e) => handleEnterPress(e)} />
        </div>
        <input type='button' className={style.loginButton} value='Login' onClick={submitLoginDetails} />
        {
          isLoginError && <div className={style.loginStat}>Incorrect username or password</div>
        }
      </div>
    </div>
  )
}

export default Login