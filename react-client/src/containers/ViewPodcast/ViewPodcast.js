import {useEffect, useState} from "react";
import pageStyles from "../../components/Common/PageStyle/PageStyle.module.css"
import style from "./ViewPodcast.module.css"
import {useLocation} from "react-router-dom"
import PodcastCard from "../../components/Podcasts/PodcastCard/PodcastCard";
import Tag from "../../components/Common/Tags/Tag";
import {getPodcast} from "../../services/Podcasts";

const ViewPodcasts = () => {
    const [podcast, setPodcasts] = useState([])

    async function fetchData() {
        try {
            const podcast = await getPodcast(podcastId)
            setPodcasts(podcast)
        } catch (err) {
            console.error(`${err}`)
        }
    }

    useEffect(() => {
        document.body.classList.add(pageStyles.body);
        fetchData()
        return () => {
            document.body.classList.remove(pageStyles.body);
        };
    }, []);

    const location = useLocation()
    const podcastId = location.pathname.replace('/podcast/', '')

    return (
        <div className={style.mainContainer}>
            <div className={style.leftContainer}>

                {
                    // renders a modified Podcast Card
                }

            </div>
            <div className={style.middleContainer}>
                <div className={style.tagsContainer}>
                    <Tag text={podcast.category}/>
                    <Tag text={podcast.language}/>
                </div>
                {/*<div className="form-title">Podcast Title Placeholder</div>*/}
                {/*<label className="form-details">Author Placeholder</label>*/}
                {/*<div className="form-labels">Description</div>*/}
                {/*<div className="form-details">Description</div>*/}
                {/*<div className="form-labels">Number Of Episodes</div>*/}
                {/*<div className="form-details">Number Of Episodes</div>*/}
                {/*<div className="form-labels">Average Episode Length</div>*/}
                {/*<div className="form-details">Avg Episode Length</div>*/}
                {/*<input className="submit-button" id="edit-btn" type="submit" value="Edit Podcast">*/}
                {/*    <input className="submit-button" id="delete-btn" type="submit" value="Delete Podcast">*/}

            </div>
            <div className={style.rightContainer}>

            </div>

        </div>
    )
}


export default ViewPodcasts;