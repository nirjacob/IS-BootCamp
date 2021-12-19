import style from './LoginBtn.module.scss'
import React from 'react'
import Proptypes from 'prop-types'
import { useNavigate } from 'react-router'

const LoginBtn = ({ text }) => {
  const navigate = useNavigate()

  const btnClicked = () => {
    if (text === 'Logout') {
      localStorage.clear()
      window.location.reload()
    } else {
      navigate('/login')
    }
  }
  
  return (
    <div className={style.btnWrapper}>
      <button className={style.btn} onClick={btnClicked}>
        {text}
      </button>
    </div>
  )
}

LoginBtn.propTypes = {
  text: Proptypes.string
}

export default LoginBtn