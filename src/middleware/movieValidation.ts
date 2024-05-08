import { body } from "express-validator";

// regras de validação para o cadastro
export const movieCreateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("Titulo é obrigatório")
      .isLength({ min: 5 })
      .withMessage("Titulo deve ter no mínimo 5 caracteres"),
    body("rating")
      .isNumeric()
      .withMessage("A nota precisa ser numérica")
      .custom((value: number) => {
        if (value < 0 || value > 10) {
          throw new Error("A nota precisa ser entre 0 e 10");
        }
        return true;
      }),
    body("description")
      .isString()
      .withMessage("Descrição é obrigatória")
      .isLength({ min: 10 })
      .withMessage("Descrição deve ter no mínimo 10 caracteres"),
    body("director")
      .isString()
      .withMessage("Diretor é obrigatório")
      .isLength({ min: 5 })
      .withMessage("Diretor deve ter no mínimo 5 caracteres"),
    body("poster").isURL().withMessage("Poster precisa ser um URL válido"),
  ];
};
