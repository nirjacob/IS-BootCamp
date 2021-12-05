import React from "react";
import style from "./PodcastCard.module.css"
import {BrowserRouter as Router, Navigate, Link, Route, Routes} from "react-router-dom";

const PodcastCard = (props) => {
    return (
        <Link to={{pathname: `/podcast/${props.id}`}} style={{textDecoration: 'inherit'}}>
            <div className={style.podcastCard}>
                <img src={props.imageUrl} alt={'img'}/>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </Link>
    )
}

export default PodcastCard;