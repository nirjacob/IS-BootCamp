import "./AddButton.module.css"
import style from "./AddButton.module.css"

const AddButton = (props) => {
    return (
        <button className={style.addNewBtn}>
            <div className={style.toolTip}>{props.text}</div>
            <a href={props.href}><i className={"far fa-plus-square fa-4x"}></i></a>
        </button>
    )
}

export default AddButton;