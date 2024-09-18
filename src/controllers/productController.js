const ProductService = require('../services/productService');

class ProductController {

  async create(req, res){
    const {body} = req;
    try {
      const productService = new ProductService();
      const result = await productService.create(body);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
        error: error.message
      })
    }
  }

  async findList(req, res){
 
    try {
      const productService = new ProductService();
      const result = await productService.findList(req.query);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
        error: error.message
      })
    }
  }

  async findAddProduct(req, res){
    
    try {
      const productService = new ProductService();
      const result = await productService.findAddProduct(req.query);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
        error: error.message
      })
    }
  }

  async findByName(req, res){
    
    try {
      const productService = new ProductService();
      const result = await productService.findByName(req.query);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
        error: error.message
      })
    }
  }




  async findById(req, res){
    
    try {
      const productService = new ProductService();
      const result = await productService.findById(req.query.codigo);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
        error: error.message
      })
    }
  }

  async update(req, res){
    const {body} = req;
    try {
      const productService = new ProductService();
      const result = await productService.update(body);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
        error: error.message
      })
    }
  }

  async delete(req, res){
    const {body} = req;
    try {
      const productService = new ProductService();
      const result = await productService.delete(body);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
        error: error.message
      })
    }
  }

}

module.exports = ProductController;