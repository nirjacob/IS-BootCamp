import "./Tag.module.css"
import style from "./Tag.module.css"

const Tag = (props) => {
    return (
        <div className={style.tag}>{props.text}</div>
    )
}

export default Tag;