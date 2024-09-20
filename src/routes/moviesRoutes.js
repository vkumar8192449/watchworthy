"use strict";
// routes/moviesRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const moviesController_1 = require("../controllers/moviesController");
const router = (0, express_1.Router)();
router.post("/add-movieshow", moviesController_1.createMoviesController);
exports.default = router;
