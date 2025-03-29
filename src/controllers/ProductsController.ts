import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

class ProductsController {
  // index - GET para listar vários registros
  // show - GET para buscar um registro específico
  // create - POST para criar um novo registro
  // update - PUT para atualizar um registro
  // remove - DELETE para remover um registro

  index(request: Request, response: Response) {
    const { page, limit } = request.query;
    response.send(`Page: ${page} Limit: ${limit}`);
  }
  create(request: Request, response: Response) {
    const { name, price } = request.body;

    if (!name) {
      throw new AppError("Nome do produto é obrigatório");
    }

    if (name.trim().length < 6) {
      throw new AppError("Nome do produto precisa ter pelo menos 6 caracteres");
    }

    if (!price) {
      throw new AppError("Preço do produto é obrigatório");
    }

    if (price < 0) {
      throw new AppError("Preço do produto não pode ser negativo");
    }
    // Foi criado para ver se o erro era do cliente ou servidor
    // throw new Error("Erro ao tentar criar um produto!");
    // throw new AppError("Erro ao tentar criar um produto");

    response.status(201).json({ name, price, user_id: request.user_id });
  }
}
export { ProductsController };
