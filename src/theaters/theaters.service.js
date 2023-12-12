const knex = require("../db/connection")

function list() {
    return knex("theaters").select("*");
}

function listMovies(theaterId) {
    return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .where ({ "theater_id": theaterId })
    .select("m.*", "mt.created_at", "mt.updated_at", "mt.is_showing", "mt.theater_id")
}

function listTheaterbyMovieId(movieId) {
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select(
        "t.*",
        "mt.is_showing",
        "mt.movie_id"
    )
    .where(
        {"movie_id": movieId}
    )
}

module.exports = {
    list,
    listMovies,
}