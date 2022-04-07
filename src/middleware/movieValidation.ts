import { body } from "express-validator"

export const movieCreateValidation = () =>{
    return [

        body("title")
        .isString()
        .withMessage("O título é obrigatório")
        .isLength({min: 5})
        .withMessage("O título precisa ter no mínimo 5 caracteres"),

        body("rating")
        .isNumeric()
        .withMessage("Rating precisa ser um número")
        .custom((value:number) => {
            if(value < 0 || value > 10){
                throw new Error("A nota precisa ser entre 0 e 10");
            }
            return true;
        }),

        body("description")
        .isString()
        .withMessage("A descrição é obrigatória.")
        .isLength({min: 5})
        .withMessage("A descrição precisa ser maior que 5."),

        body("director")
        .isString()
        .withMessage("O nome do diretor é obrigatória.")
        .isLength({min: 5})
        .withMessage("A diretor precisa ser maior que 5."),

        body("poster")
        .isURL()
        .withMessage("O poster precisa ser uma URL")

    ]
}