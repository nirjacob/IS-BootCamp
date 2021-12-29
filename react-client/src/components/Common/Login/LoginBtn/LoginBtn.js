import style from './LoginBtn.module.scss'
import React from 'react'
import Proptypes from 'prop-types'
import { useNavigate } from 'react-router'

const LoginBtn = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()

  const btnClicked = () => {
    if (isLoggedIn) {
      localStorage.clear()
      setIsLoggedIn(false)
      navigate(window.location)
    } else {
      navigate('/login')
    }
  }

  return (
    <div className={style.btnWrapper}>
      <button className={style.btn} onClick={btnClicked}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  )
}

LoginBtn.propTypes = {
  isLoggedIn: Proptypes.bool,
  setIsLoggedIn: Proptypes.func
}

export default LoginBtn