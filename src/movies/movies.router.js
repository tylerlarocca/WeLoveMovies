const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/:movieId/reviews")
    .get(controller.getReviews)
    .all(methodNotAllowed);

router
    .route("/:movieId/theaters")
    .get(controller.getTheaters)
    .all(methodNotAllowed);

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

module.exports = router;