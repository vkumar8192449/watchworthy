"use strict";
// routes/ratingRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ratingController_1 = require("../controllers/ratingController");
const router = (0, express_1.Router)();
router.post("/add-rating", ratingController_1.createRatingController);
router.get("/get-all-rating/:id", ratingController_1.getMovieRatingsController);
exports.default = router;
