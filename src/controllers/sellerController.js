const SellerSevice = require('../services/sellerService.js');
const jwt = require('jsonwebtoken');

class SellerController {

  // createTeste(req, res){
  //   const {body} = req;

  //   try {
  //     const sellerSevice = new SellerSevice(); 
  //     const result = sellerSevice.saveTest(body);
  //     return res.json(result);

  //   } catch(error){
  //     return res.status(400).json({
  //             error: error.message
  //           })
  //   }
  // };

  async create(req, res){
    const {body} = req;

    try {
      const sellerSevice = new SellerSevice(); 
      const result = await sellerSevice.create(body);
      return res.json(result);

    } catch(error){

      return res.status(400).json({
              error: error.message
            })
    }
  };

  async login(req, res){
    const {body} = req;

    try {
    
      const sellerSevice = new SellerSevice(); 
      const result = await sellerSevice.login(body);
      
      if(result[0].hasOwnProperty('codigo')){
        const id = result[0].codigo
        const token = jwt.sign({id:id, type:'seller'}, process.env.TOKEN_SECRET)
        result[0].authorization = token;
      }
      console.log('veio')
      return res.json(result); 

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  }

  async findByCPF(req, res){
 
    try {
      const sellerSevice = new SellerSevice(); 
      const result = await sellerSevice.findByCPF(req.query);
      return res.json(result); 

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  }

  async findById(req, res){

    try {
      const sellerSevice = new SellerSevice(); 
      const result = await sellerSevice.findById(req.query.codigo);
      return res.json(result); 

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  }

  async findAll(req, res){
    try {
      const sellerSevice = new SellerSevice(); 
      const result = await sellerSevice.findAll();
      return res.json(result); 

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  };

  async update(req, res){
    const {body} = req;

    try {
      const sellerSevice = new SellerSevice(); 
      const result = await sellerSevice.update(body);
      return res.json(result);

    } catch(error){

      return res.status(400).json({
              error: error.message
            })
    }
  };

  async delete(req, res){
    const {body} = req;

    try {
      const sellerSevice = new SellerSevice(); 
      const result = await sellerSevice.delete(body);
      return res.json(result);

    } catch(error){

      return res.status(400).json({
              error: error.message
            })
    }
  };
}

module.exports = SellerController;

