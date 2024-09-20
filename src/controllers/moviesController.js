"use strict";
// controllers/moviesController.ts
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
exports.createMoviesController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMoviesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, genre, release_year, description } = req.body;
    try {
        const movie = yield prisma.movie.create({
            data: { title, genre, release_year, description },
        });
        res.json(movie);
    }
    catch (error) {
        res.status(400).json({ error: "Movie creation failed" });
    }
});
exports.createMoviesController = createMoviesController;
