class SaleValidations {

  saveSaleValidation(data){
    const {codigo_vendedor, codigo_cliente, data_compra, valor, listaProduto} = data;
    const validIdSeller = this.checkNumber(codigo_vendedor);
    const validIdClient = this.checkNumber(codigo_cliente);
    const validDate = this.checkDate(data_compra);
    const validPrice = this.checkNumber(valor);
    const produtList = this.checkList(listaProduto);

    if(validIdSeller && validIdClient && validDate && validPrice && produtList){
      return true;
    }

    return false;
  }

  checkList(lista){
    let validAmount;
    let validItemValue;
    let validName;
    let validIdProduct;

    let validProduct;

    for(let i = 0; i < lista.length; i++){
      
      validAmount = this.checkAmount(lista[i].quantidade);
      validItemValue = this.checkNumber(lista[i].valor_unitario);
      validName = this.checkName(lista[i].nome);
      validIdProduct = this.checkNumber(lista[i].codigo_produto);

      validProduct = (validAmount && validItemValue && validName && validIdProduct);

      if(!validProduct){
        break;
      }
    }

    return validProduct;
  }

  checkDate(date){
    if(!date){
      return false;
    }
    return true;
  }

  checkOrder(order){
    if(order == 'DESC' || order == 'ASC'){
      return true;
    }
    return false;
  }

  checkAmount(amount){
    if(typeof amount != 'number'){
      return false
    }
    if(amount <= 0){
      return false
    }
    return true;
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
  
  checkCPF(cpf){
    if(!cpf){
      return false;
    } else if(cpf.length > 14) {
      return false;
    }
    return true;
  }
}

module.exports = SaleValidations;