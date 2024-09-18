const ProductRepository = require('../repositories/productRepository.js');
const ProductValidations = require('../validations/productValidations.js');
const CategoryService = require('../services/categoryService.js');


class ProductService {
  constructor(){
    this.productRepository = new ProductRepository();
  }

  productRepository;

  async create(data){
    const productValidations = new ProductValidations();
    const validateData = productValidations.saveValidation(data);

    if(!validateData){
      throw new Error('Dado de entrada inválido.');
    }

    const nomeExist = await this.productRepository.findByName(data.nome);
    if(nomeExist.length != 0){
      throw new Error('Nome do produto já está em uso.');
    }

    const categoryService = new CategoryService();
    const findCategory = await categoryService.findActiveCategory(data.codigo_categoria);
    if(findCategory.length == 0){
      throw new Error('Categoria não encontrada.');
    }

    const productCreated = await this.productRepository.create(data);
    return productCreated;

  }

  async findList(data){
    /**
     *  codigo_categoria = 0 - todos
     *  ordem_quantidade = 'dec' ou 'asc'
     *  status = 0 ou 1
     */
    console.log(data)
    const productValidations = new ProductValidations();
    const validateOrderQuantity = productValidations.checkrOderQuantity(data.ordem_quantidade);
    const validateStatus = productValidations.checkNumber(data.status);
    const validateCategoryId = productValidations.checkNumber(data.codigo_categoria);
 
    if(!validateCategoryId || !validateStatus || !validateOrderQuantity){
      throw new Error('Dado de entrada inválido.');
    }

    data.status = +data.status;
    data.codigo_categoria = +data.codigo_categoria;

    if(data.codigo_categoria == 0){
      const productList = await this.productRepository.findProductListAllCategories(data);
      return productList;
    }

    const productList = await this.productRepository.findProductList(data);
    return productList;
  }

  async findAddProduct(data){

    const productValidations = new ProductValidations();
    const validateData = productValidations.checkName(data.nome);

    if(!validateData){
      throw new Error('Dado de entrada inválido.');
    }
    
    const productFound = await this.productRepository.findAddProduct(data.nome);

    if(productFound.length > 0){
      const categoryService = new CategoryService();
      const findCategory = await categoryService.findActiveCategory(productFound[0].codigo_categoria);
      if(findCategory.length == 0){
        throw new Error('Categoria não encontrada.');
      }
      if(productFound[0].ativo === 0){
        throw new Error('Produto não está ativo.');
      }
    } 
    return productFound;
  }

  async findByName(data){
 
    const productValidations = new ProductValidations();
    const validateData = productValidations.checkName(data.nome);

    if(!validateData){
      throw new Error('Dado de entrada inválido.');
    }
    
    const productFound = await this.productRepository.findByName(data.nome);

    return productFound;
  }

  async findById(id){

    const productFound = await this.productRepository.findById(id);
    return productFound;
  }

  async amountUpdate(productId, amount){
    await this.productRepository.amountUpdate(productId, amount);
  }

  async update(data){
    const productValidations = new ProductValidations();
    const validateData = productValidations.updateValidation(data);

    if(!validateData){
      throw new Error('Dado de entrada inválido.');
    }

    const nomeExist = await this.productRepository.findByName(data.nome);

    if(nomeExist.length != 0){
      if(nomeExist[0].codigo != data.codigo){
        throw new Error('Nome do produto já está em uso.');
      }
    } 


    const categoryService = new CategoryService();
    const findCategory = await categoryService.findActiveCategory(data.codigo_categoria);
    if(findCategory.length == 0){
      throw new Error('Categoria não encontrada.');
    }

    const productUpdated = await this.productRepository.update(data);
    return productUpdated;
  }

  async delete(data){
    const productValidations = new ProductValidations();
    const validateCodigo = productValidations.checkNumber(data.codigo);

    if(!validateCodigo){
      throw new Error('Dado de entrada inválido.');
    }

    const productExist = await this.findById(data.codigo);
    if(productExist.length == 0){
      throw new Error('Produto não encontrado.');
    }

    const productInPurchase = await this.productRepository.productInPurchase(data.codigo);
    if(productInPurchase.length > 0){
      throw new Error('Produto não pode ser deletado pois está no registro de vendas.');
    }

    const productDeleted = await this.productRepository.delete(data.codigo);
    return productDeleted;
  }

}

module.exports = ProductService;