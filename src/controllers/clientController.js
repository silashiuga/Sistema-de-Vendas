const ClientService = require('../services/clientService.js');


class CilentController {


  async create(req, res){
    const {body} = req;
    
    try {
      const clientService = new ClientService(); 
      const result = await clientService.create(body);
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
      const clientService = new ClientService(); 
      const result = await clientService.update(body);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  };

  async findByCPF(req, res){

    try {
      const clientService = new ClientService(); 
      const result = await clientService.findByCPF(req.query);
      return res.json(result); 

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  }

  async findById(req, res){

    try {
      const clientService = new ClientService(); 
      const result = await clientService.findById(req.query.codigo);
      return res.json(result); 

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  }

  async findAll(req, res){
    try {
      const clientService = new ClientService(); 
      const result = await clientService.findAll();
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
      const clientService = new ClientService(); 
      const result = await clientService.delete(body);
      return res.json(result); 

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  };
}

module.exports = CilentController;