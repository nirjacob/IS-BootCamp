import style from './AddButton.module.css'
import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'react-router-dom'

const AddButton = ({ href, text }) => {

  return (
    <div>
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
  text: Proptypes.string
}

export default AddButton
