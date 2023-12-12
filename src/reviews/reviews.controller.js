const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { up } = require("../db/migrations/20231211140755_createCriticsTable");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params
    const review = await service.read(reviewId)

    if (review) {
        res.locals.review = review
        return next();
    }
    return next ({ status: 404, message: `Review cannot be found`})
}

function hasScoreAndBody(req, res, next) {
    const { data: { score = null, content = null } = {} } = req.body 
    let updatedObject = {}
    if (!score && !content) {
        return next({ status: 400, message: "missing score and/or content"})
    }
    if (score) {
        updatedObject.score = score;
    }
    if (content) {
        updatedObject.content = content;
    }
    res.locals.update = updatedObject
    next()
}

async function destroy(req, res) {
    const { review } = res.locals
    await service.delete(review.review_id)
    res.sendStatus(204)
}

async function update(req, res) {
    const { review } = res.locals
    const { update } = res.locals
    
    await service.update(update, review.review_id)

    const updatedReview = await service.read(review.review_id)
    const critic = await service.getCritic(review.critic_id)

    res.status(200).json({ data: { ... updatedReview, critic: critic[0]} })
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), hasScoreAndBody, asyncErrorBoundary(update)]
}