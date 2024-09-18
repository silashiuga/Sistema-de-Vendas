const SaleSevice = require('../services/saleService.js');

class SaleController {

  async create(req, res){
    const {body} = req;

    try {
      const saleSevice = new SaleSevice(); 
      const result = await saleSevice.create(body);
      return res.json(result);

    } catch(error){

      return res.status(400).json({
              error: error.message
            })
    }
  }

  async findList(req, res){
 
    try {
      const saleSevice = new SaleSevice(); 
      const result = await saleSevice.findList(req.query);
      return res.json(result);

    } catch(error){

      return res.status(400).json({
              error: error.message
            })
    }
  }

  async findPurchaseItems(req, res){

    try {
      const saleSevice = new SaleSevice(); 
      const result = await saleSevice.findPurchaseItems(req.query);
      return res.json(result);

    } catch(error){

      return res.status(400).json({
              error: error.message
            })
    }
  }

  async findPurchaseByCpf(req, res){
   
    try {
      const saleSevice = new SaleSevice(); 
      const result = await saleSevice.findPurchaseByCpf(req.query);
      return res.json(result);

    } catch(error){

      return res.status(400).json({
              error: error.message
            })
    }
  }
}

module.exports = SaleController;