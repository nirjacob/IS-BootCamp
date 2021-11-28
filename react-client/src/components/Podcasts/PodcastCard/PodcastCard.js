import React from "react";
import style from "./PodcastCard.module.css"


// title: document.getElementById('title').value,
//     description: document.getElementById('description').value,
//     htmlDescription: document.getElementById('htmlDescription').value,
//     webUrl: document.getElementById('webUrl').value,
//     imageUrl: document.getElementById('imageUrl').value,
//     language: document.getElementById('language').value,
//     numberOfEpisodes: document.getElementById('numberOfEpisodes').value,
//     avgEpisodeLength: document.getElementById('avgEpisodeLength').value,
//     author: document.getElementById('author').value,
//     category: document.getElementById('category').value
const PodcastCard = (props) => {
    return (
        <div className={style.podcastCard}>
            <img src={props.imageUrl} alt={'img'}></img>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
    )
}

export default PodcastCard;