class ProductValidations {

  saveValidation(data){
    const { estoque, preco, status, nome, descricao, codigo_categoria } = data;
    const validIdCategory = this.checkNumber(codigo_categoria);
    const validStock = this.checkNumber(estoque);
    const validPrice = this.checkNumber(preco);
    const validStatus = this.checkNumber(status);
    const validName = this.checkName(nome);
    const validDescription = this.checkDescription(descricao);

    if(validIdCategory && validStock && validPrice && validStatus && validName && validDescription){
      return true;
    }
    return false;
  }

  updateValidation(data){
    const { codigo, estoque, preco, status, nome, descricao, codigo_categoria } = data;
    const validId = this.checkNumber(codigo);
    const validIdCategory = this.checkNumber(codigo_categoria);
    const validStock = this.checkNumber(estoque);
    const validPrice = this.checkNumber(preco);
    const validStatus = this.checkNumber(status);
    const validName = this.checkName(nome);
    const validDescription = this.checkDescription(descricao);

    if(validId && validIdCategory && validStock && validPrice && validStatus && validName && validDescription){
      return true;
    }
    return false;
  }

  checkrOderQuantity(order){
    if(order == 'DESC' || order == 'ASC'){
      return true;
    }
    return false;
  }

  checkNumber(number){
    number = +number;
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

  checkDescription(descricao){
    if(!descricao){
      return false;
    } else if(descricao.length > 50) {
      return false;
    }
    return true;
  }
}

module.exports = ProductValidations;