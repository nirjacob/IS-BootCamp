import styles from "./Podcasts.module.css"
import PodcastCard from "../../components/Podcasts/PodcastCard/PodcastCard";
import {getPodcasts} from "../../services/Podcasts"
import {useState, useEffect} from "react";


const Podcasts = () => {
    const [podcasts, setPodcasts] = useState([])

    async function setData() {
        try {
            const podcastsArray = await getPodcasts(10)
            setPodcasts(podcastsArray)
        } catch (err) {
            console.error(`Error: ${err}`)
            setPodcasts([])
        }
    }

    useEffect(() => {
        setData()
    }, []);

    return (
        <div className={styles.pageBody}>
            <h2>Podcast App</h2>
            <div className={styles.podcastCardsContainer}>

                {podcasts.map((podcast) => {
                    return <PodcastCard
                        key={podcast.id}
                        title={podcast.title}
                        imageUrl={podcast.imageUrl}
                        description={podcast.description}
                    />
                })}

            </div>
        </div>
    )
}


export default Podcasts;