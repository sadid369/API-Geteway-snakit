const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require('../utils/errors/app-error');
class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create (data) {

    const response = await this.model.create(data);
    return response;
  }
  async destroy (data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    console.log(response + 'error');
    if (!response) {
      console.log(response + 'error2');
      const error = new AppError('Not able to found the resource', StatusCodes.NOT_FOUND);
      console.log(error);
      console.log(response + 'error3');
      throw error;
    }
    console.log("here");
    return response;
  }
  async get (data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError('Not able to fund the resource', StatusCodes.NOT_FOUND);
    }
    return response;

  }

  async getAll (data) {
    const response = await this.model.findAll();
    return response;
  }
  async update (id, data) {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    return response;
  }
}

module.exports = CrudRepository;
