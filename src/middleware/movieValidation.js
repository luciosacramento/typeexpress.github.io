"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const movieCreateValidation = () => {
    return [
        (0, express_validator_1.body)("title")
            .isString()
            .withMessage("O título é obrigatório")
            .isLength({ min: 5 })
            .withMessage("O título precisa ter no mínimo 5 caracteres"),
        (0, express_validator_1.body)("rating")
            .isNumeric()
            .withMessage("Rating precisa ser um número")
            .custom((value) => {
            if (value < 0 || value > 10) {
                throw new Error("A nota precisa ser entre 0 e 10");
            }
            return true;
        }),
        (0, express_validator_1.body)("description")
            .isString()
            .withMessage("A descrição é obrigatória.")
            .isLength({ min: 5 })
            .withMessage("A descrição precisa ser maior que 5."),
        (0, express_validator_1.body)("director")
            .isString()
            .withMessage("O nome do diretor é obrigatória.")
            .isLength({ min: 5 })
            .withMessage("A diretor precisa ser maior que 5."),
        (0, express_validator_1.body)("poster")
            .isURL()
            .withMessage("O poster precisa ser uma URL")
    ];
};
exports.movieCreateValidation = movieCreateValidation;
