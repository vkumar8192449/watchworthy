"use strict";
// controllers/ratingController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieRatingsController = exports.createRatingController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createRatingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, movie_id, rating, review } = req.body;
    try {
        const newRating = yield prisma.rating.create({
            data: { user_id, movie_id, rating, review },
        });
        res.json(newRating);
    }
    catch (error) {
        res.status(400).json({ error: "Rating creation failed" });
    }
});
exports.createRatingController = createRatingController;
const getMovieRatingsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ratings = yield prisma.rating.findMany({
            where: { movie_id: Number(id) },
            include: { user: true },
        });
        res.json(ratings);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to retrieve ratings" });
    }
});
exports.getMovieRatingsController = getMovieRatingsController;
