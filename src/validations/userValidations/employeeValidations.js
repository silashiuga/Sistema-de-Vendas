const UserValidations = require("./userValidations");

class EmployeeValidations extends UserValidations {

  saveValidation(data, type){
    if(type === 'create'){
      const {nome, email, senha, cpf} = data;
      const validName = super.checkName(nome);
      const validEmail = super.checkEmail(email);
      const validPassword = this.checkPassword(senha);
      const validCPF = super.checkCPF(cpf);
    
      if(validName && validEmail && validPassword && validCPF){
        return true;
      }
      return false;
    } else if (type === 'update'){
      const {nome, email, cpf} = data;
      const validName = super.checkName(nome);
      const validEmail = super.checkEmail(email);
      const validCPF = super.checkCPF(cpf);
    
      if(validName && validEmail && validCPF){
        return true;
      }
      return false;
    }
  }

  checkPassword(senha){
    if(!senha){
      return false;
    } else if(senha.length > 30) {
      return false;
    }
    return true;
  }
}

module.exports = EmployeeValidations;