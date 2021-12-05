import style from './AddButton.module.css'
import React from 'react'
import Proptypes from 'prop-types'

const AddButton = ({ href, text }) => {

  return (
    <div>
      <button className={style.addNewBtn}>
        <div className={style.toolTip}>{text}</div>
        <a href={href}><i className={'far fa-plus-square fa-4x'} /> </a>
      </button>
    </div>
  )
}

AddButton.propTypes = {
  href: Proptypes.string,
  text: Proptypes.string
}

export default AddButton
