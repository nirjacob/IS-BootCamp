import style from './AddButton.module.css'
import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'react-router-dom'

const AddButton = ({ href, text, customStyle }) => {
  const btnContainer = customStyle ? customStyle : style.btnContainer

  return (
    <div className={btnContainer}>
      <Link to={{ pathname: `/podcast/${href}` }} style={{ textDecoration: 'inherit' }}>
        <button className={style.addNewBtn}>
          <div className={style.toolTip}>{text}</div>
          <i className={'far fa-plus-square fa-4x'} />
        </button>
      </Link>
    </div>
  )
}

AddButton.propTypes = {
  href: Proptypes.string,
  text: Proptypes.string,
  customStyle: Proptypes.string
}

export default AddButton
