const AdministratorService = require('../services/administratorService.js');
const jwt = require('jsonwebtoken');

class AdministratorController {
 
  async create(req, res){
    const {body} = req;

    try {
      const administratorSevice = new AdministratorService();
      const result = await administratorSevice.create(body);
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
      console.log(body)
      const administratorService = new AdministratorService();
      const result = await administratorService.login(body);

      if(result[0].hasOwnProperty('codigo')){
        const id = result[0].codigo
        const token = jwt.sign({id:id, type:'adm'}, process.env.TOKEN_SECRET);
        result[0].authorization = token;
      }
      return res.json(result); 

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  }

  async findByCPF(req, res){

    try {
      const administratorService = new AdministratorService();
      const result = await administratorService.findByCPF(req.query);
      return res.json(result); 

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  };

  async findById(req, res){
    console.log(req.query.codigo)
    try {
      const administratorService = new AdministratorService();
      const result = await administratorService.findById(req.query.codigo);
      return res.json(result); 

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  };

  async findAll(req, res){
    try {
      const administratorService = new AdministratorService();
      const result = await administratorService.findAll();
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
      const administratorService = new AdministratorService();
      const result = await administratorService.update(body);
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
      const administratorService = new AdministratorService();
      const result = await administratorService.delete(body);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  };
}

module.exports = AdministratorController;