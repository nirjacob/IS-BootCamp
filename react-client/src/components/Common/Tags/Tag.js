import './Tag.module.scss'
import style from './Tag.module.scss'
import React from 'react'
import Proptypes from 'prop-types'


const Tag = ({ text }) => {
  return (
    <div className={style.tag}>{text}</div>
  )
}

Tag.propTypes = {
  text: Proptypes.string
}

export default Tag