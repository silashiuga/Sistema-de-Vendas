const UserRepository = require("../repositories/user.repository.js");

class CreateUserService {
  execute(data){
    //validação

    if(!data.username){
      throw new Error('Username é obrigatório');
    }

    const userRepository = UserRepository;

    const existUser = userRepository.findByUserName(data.username)

    if(existUser){
      throw new Error('Usuário já existe');
    }

    return userRepository.save(data);
  }
}

module.exports = CreateUserService;