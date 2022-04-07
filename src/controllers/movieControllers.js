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
exports.updateMovie = exports.removeMovie = exports.getAllMovies = exports.findMovieById = exports.createMovie = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const Movie_1 = require("../models/Movie");
function createMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const movie = yield Movie_1.MovieModel.create(data);
            return res.status(201).json(movie);
        }
        catch (error) {
            logger_1.default.error(`Erro no sistema: ${error.message}`);
            return res.status(500).json({ error: "Por favor, tente mais tarde." });
        }
    });
}
exports.createMovie = createMovie;
function findMovieById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const movie = yield Movie_1.MovieModel.findById(id);
            if (!movie) {
                return res.status(404).json({ error: "O filme não existe." });
            }
            return res.status(200).json(movie);
        }
        catch (error) {
            logger_1.default.error(`Erro no sistema: ${error.message}`);
            return res.status(500).json({ error: "Por favor, tente mais tarde." });
        }
    });
}
exports.findMovieById = findMovieById;
function getAllMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const movies = yield Movie_1.MovieModel.find();
            if (!movies) {
                return res.status(404).json({ error: "Nâo existem filmes cadastrados." });
            }
            return res.status(200).json(movies);
        }
        catch (error) {
            logger_1.default.error(`Erro no sistema: ${error.message}`);
            return res.status(500).json({ error: "Por favor, tente mais tarde." });
        }
    });
}
exports.getAllMovies = getAllMovies;
function removeMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const movie = yield Movie_1.MovieModel.findById(id);
            if (!movie) {
                return res.status(404).json({ error: "O filme não existe." });
            }
            yield movie.delete();
            return res.status(200).json({ msg: "Filme revovido com sucesso" });
        }
        catch (error) {
            logger_1.default.error(`Erro no sistema: ${error.message}`);
            return res.status(500).json({ error: "Por favor, tente mais tarde." });
        }
    });
}
exports.removeMovie = removeMovie;
function updateMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const data = req.body;
            const movie = yield Movie_1.MovieModel.findById(id);
            if (!movie) {
                return res.status(404).json({ error: "O filme não existe." });
            }
            yield Movie_1.MovieModel.updateOne({ _id: id }, data);
            return res.status(200).json(data);
        }
        catch (error) {
            logger_1.default.error(`Erro no sistema: ${error.message}`);
            return res.status(500).json({ error: "Por favor, tente mais tarde." });
        }
    });
}
exports.updateMovie = updateMovie;
