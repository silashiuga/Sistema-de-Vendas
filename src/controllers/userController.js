const CreateUserService = require("../services/create.user.service.js");

class UserController {
  handle(req, res) {

    const {body} = req;

    try{

      const createUserService = new CreateUserService();
      const result = createUserService.execute(body);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
        error: error.message
      })
    }
  }
}

module.exports = UserController;