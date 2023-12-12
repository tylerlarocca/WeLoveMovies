const knex = require("../db/connection")

function list(){
    return knex("movies").select("*");
}

function listIsShowing(){
   return knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
   .select(
       "m.movie_id",
       "m.title",
       "m.runtime_in_minutes",
       "m.rating",
       "m.description",
       "m.image_url")
   .where({ is_showing: true })

   
}

function read(movie_id){
    
  return knex("movies")
    .select("*")
    .where({ movie_id })
    .first();
   
}



function getTheaters(movieId) {
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*","mt.movie_id","mt.is_showing")
    .where({ "mt.movie_id":movieId })

}

function getCritic(criticId){
    return knex("critics")
    .select("*")
    .where({"critic_id":criticId})
}

// function listReviews(){
//     return knex("reviews").select("*")
//}

function getMovieReviews(movieId){
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id" )
    .select("r.*")
    .where({ "r.movie_id":movieId })
}


module.exports ={
    list,
    listIsShowing,
    read,
    getTheaters,
    getCritic,
    getMovieReviews,
};