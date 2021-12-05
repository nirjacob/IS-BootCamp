const {getReviewById, saveReviewToDb} = require('../services/review')

const addNewReview = async (req, res) => {
    try {
        const newReview = req.body
        await saveReviewToDb(newReview)
        return res.status(200).send('Review has been successfully added')
    } catch
        (err) {
        return res.status(400).send(`Unable to add new review, ${err.message}`)
    }
}

const getReview = async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        const reviewInfo = await getReviewById(id)
        if (!reviewInfo) return res.status(404).send('No review found!')
        return res.status(200).send(reviewInfo)
    } catch
        (err) {
        return next(err)
    }
}

module.exports = {getReview, addNewReview}
