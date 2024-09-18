const UserValidations = require("./userValidations");

class ClientValidations extends UserValidations {

  saveValidation(data){
    const {nome, email, cpf, telefone, rua} = data;
    const validName = super.checkName(nome);
    const validEmail = super.checkEmail(email);
    const validCPF = super.checkCPF(cpf);
    const validPhone = this.checkPhone(telefone);
    const validAddress = this.checkAddress(rua);

    if(validName && validEmail && validPhone && validCPF && validAddress){
      return true;
    }
    return false;
  }

  checkPhone(telefone){
    if(!telefone){
      return false;
    } else if(telefone.length > 20) {
      return false;
    }
    return true;
  }

  checkAddress(rua){
    if(!rua){
      return false;
    } else if(rua.length > 50) {
      return false;
    }
    return true;
  }
}

module.exports = ClientValidations;