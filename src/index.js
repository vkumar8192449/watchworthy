"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const moviesRoutes_1 = __importDefault(require("./routes/moviesRoutes"));
const ratingRoutes_1 = __importDefault(require("./routes/ratingRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Register the user routes
app.use("/api/users", userRoutes_1.default);
// Create a movie
app.use("/api/movies", moviesRoutes_1.default);
// Create or Get a rating/s
app.use("/api/rating", ratingRoutes_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
