const CategoryRepository = require('../repositories/categoryRepository');
const CategoryValidations = require('../validations/categoryValidations.js');

class CategoryService {

  constructor(){
    this.categoryRepository = new CategoryRepository();
  }

  categoryRepository;

  async create(data){
    const categoryValidations = new CategoryValidations();
    const validateData = categoryValidations.saveCategory(data);

    if(!validateData){
      throw new Error('Dado de entrada inválido.');
    }

    const nomeExist = await this.categoryRepository.validSave(data.nome);
    if(nomeExist.length != 0){
      throw new Error('Nome de categoria já está em uso.');
    }

    const categoryCreated = await this.categoryRepository.create(data);
    return categoryCreated;

  }

  async findByStatus(data){
    // Encontrar todas as categorias
    data.satus = +data.status;
    
    if(data.status == 2){
      const categories = await this.categoryRepository.findAll();
      return categories;
    }
    const categories = await this.categoryRepository.findByStatus(data.status);
    return categories;
  }

  async findActiveCategory(codigo_categoria){
    
    const categories = await this.categoryRepository.findActiveCategory(codigo_categoria);
    return categories;
  }


  async update(data){

    const categoryValidations = new CategoryValidations();
    const validateData = categoryValidations.saveCategory(data);

    if(!validateData){
      throw new Error('Dado de entrada inválido.');
    }

    const nomeExist = await this.categoryRepository.validSave(data.nome);
    console.log(nomeExist);
    if(nomeExist.length != 0){
      if(nomeExist[0].codigo != data.codigo){
        throw new Error('Nome da categoria já está em uso.');
      }
    }

    const categoryUpdated = await this.categoryRepository.update(data);
    return categoryUpdated;
  }

  async changeState(data){
    const categoryValidations = new CategoryValidations();
    const validateData = categoryValidations.saveCategory(data)

    if(validateData){
      throw new Error('Dado de entrada inválido.');
    }

    const categoryUpdated = await this.categoryRepository.changeState(data);
    return categoryUpdated;
  }

  async delete(data){
    data.codigo = +data.codigo;
    const categoryValidations = new CategoryValidations();
    const validateId = categoryValidations.checkNumber(data.codigo)
  
    if(!validateId){
      throw new Error('Dado de entrada inválido.');
    }

    const checkCategoryInUse = await this.categoryRepository.checkCategoryInUse(data.codigo);
    if(checkCategoryInUse.length > 0){
      throw new Error('Não é possível deletar pois a categoria já está em uso');
    }

    const categoryDeleted = await this.categoryRepository.delete(data.codigo);
    return categoryDeleted;
  }
}

module.exports = CategoryService;