const {getPodcastById} = require('../services/podcast')

class CachedPodcast {
    constructor(podcastInfo, timeStamp) {
        this.podcastInfo = podcastInfo
        this.timeStamp = timeStamp
    }

    isExpired() {
        return this.timeStamp + cacheMillisecondsToLive < Date.now()
    }
}

let cacheDataMap = new Map()
let cacheMinutesToLive = 10
let cacheMillisecondsToLive = cacheMinutesToLive * 60 * 1000

const saveToCache = (podcast) => {
    cacheDataMap.set(podcast.id, new CachedPodcast(podcast, Date.now()))
}

const handleCachedData = (req, res, next) => {
    handlePodcastsCache(req, res, next)
}

const handlePodcastsCache = (req, res, next) => {
    const id = parseInt(req.params.id)
    const requestedPodcast = cacheDataMap.get(id)
    if (requestedPodcast) {
        if (requestedPodcast.isExpired()) {
            cacheDataMap.delete(id)
            next()
        } else {
            return res.status(200).send(requestedPodcast)
        }
    } else {
        saveToCache(getPodcastById(id))
        next()
    }
}

module.exports = {handleCachedData}