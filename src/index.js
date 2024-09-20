"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
// Create a new user
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = yield prisma.user.create({
            data: { username, email, password },
        });
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: "User creation failed" });
    }
}));
// Create a movie
app.post("/movies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// Create a rating
app.post("/ratings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// Get movie ratings
app.get("/movies/:id/ratings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
