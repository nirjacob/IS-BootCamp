import React, {useEffect, useState} from "react";
import style from "./Search.module.css"
import {searchPodcasts} from "../../../services/Podcasts";

const Search = (props) => {
    const [searchString, setSearchString] = useState('');

    useEffect(async () => {
        async function fetchData() {
            return await searchPodcasts(searchString)
        }

        try {
            props.updateSearch(await fetchData())

        } catch (err) {
            console.error(`${err}`)
            searchString === '' ? await props.initialData() : props.updateSearch([])
        }
    }, [searchString]);


    return (
        <div>
            <input className={style.searchBar} type="text" placeholder={'Enter podcast name or author'}
                   onChange={(e) => setSearchString(e.target.value)}
            />
            <div>
                <button className={style.searchBtn}>Search</button>
            </div>
        </div>
    )
}

export default Search;