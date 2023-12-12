const knex = require("../db/connection")

function read(reviewId) {
    return knex("reviews")
    .select("*")
    .where({ "review_id": reviewId })
    .first()
}

// function getReviewsWithCritic(reviewId) {
//     return knex("reviews as r")
//     .join("critics as c", "r.critic_id", "c.critic_id")
//     .select("r.*")
//     .where({ "r.review_id": reviewId })
// }

function getCritic(criticId) {
    return knex("critics")
    .select("*")
    .where({ "critic_id": criticId })
}

function destroy(reviewId) {
    return knex("reviews")
    .where({ "review_id": reviewId })
    .del()
}

function update(updatedReview, id) {
    return knex("reviews")
    .select("*")
    .where({ review_id: id })
    .update({...updatedReview})
    //.then((updatedRecords) => updatedRecords[0])
}

module.exports = {
    read,
    delete: destroy,
    getCritic,
    update,
}