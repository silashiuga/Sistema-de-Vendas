class UserValidations {
  checkId(codigo){
    if(!codigo){
      return false;
    }
    return true;
  }

  checkName(nome){
    if(!nome){
      return false;
    } else if(nome.length > 50) {
      return false;
    }
    return true;
  }

  checkEmail(email){
    if(!email){
      return false;
    } else if(email.length > 50) {
      return false;
    }
    return true;
  }

  checkCPF(cpf){
    if(!cpf){
      return false;
    } else if(cpf.length > 14) {
      return false;
    }
    return true;
  }
}

module.exports = UserValidations;