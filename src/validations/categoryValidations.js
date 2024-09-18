class CategoryValidations {

  saveCategory(data){
    const {status, nome} = data;
    const validStatus = this.checkNumber(status);
    const validName = this.checkName(nome);

    if(validStatus && validName ){
      return true;
    }
  }

  checkNumber(number){
    if(typeof number != 'number'){
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
}

module.exports = CategoryValidations;