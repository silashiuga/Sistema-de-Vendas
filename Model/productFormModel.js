export class ProductFormModel {
  _name;
  _category;
  _description;
  _price;
  _amount;
  _status;
  regexPriceFormat = /\d+([.,]\d+)?/;
  regexAmountFormat = /^\d+$/;

  // Atriubui os valores a classe
  getInputValues(form){
    this._name = form[0].value.trim();
    this._category = form[1].value;
    this._description = form[2].value.trim();
    this._price = form[3].value.trim();
    this._amount = form[4].value.trim();
    this._status = form[5];
  }

  // Valida os valores antes de enviar para o backend
  dataValidate(){
    const errorInfo = new Object({
      status:false,
      content:''
    })
    console.log(this._name )
    if(!this._name || !this._description || !this._price  || !this._amount) {
      errorInfo.content = 'É necessário preencher todos os campos. ';
      errorInfo.status = true;
    }

    if(this._category == '0'){
      errorInfo.content += 'É necessário selecionar uma categoria cadastrada. ';
      if(!errorInfo.status){
        errorInfo.status = true;
      }
    }

    if(!this.regexPriceFormat.test(this._price)){
      errorInfo.content += 'Infome o preço em números, tendo no máximo uma vírgula ou ponto. ';
      if(!errorInfo.status){
        errorInfo.status = true;
      }
    }

    if(!this.regexAmountFormat.test(this._amount)){
      errorInfo.content += 'Infome a quantidade em números inteiros, sem vírgula ou ponto. ';
      if(!errorInfo.status){
        errorInfo.status = true;
      }
    }

    return errorInfo;
  }

  async findById(token, id){
    let response = await fetch(`http://192.168.0.31:3002/product/findById?codigo=${id}`, {
      method:'get', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      }
    })
    .then(res=>{
      return res.json();
    }).then(json =>{
      if(json.hasOwnProperty('error')){
        console.log(Object.keys(json))
        throw new Error(json.error)
      }
      return json;
    })
    return response;
  }

  async create(token){
   
    const validate = this.dataValidate();
    if(validate.status){
      throw new Error(validate.content);
    }

    if(this._price.includes(',')){
      this._price = this._price.replace(',','.');
    }

    this._price = parseFloat(this._price);

    this._amount = parseInt(this._amount);

    if(this._status.checked){
      this._status = 1;
    } else {
      this._status = 0;
    }

    let response = await fetch('http://192.168.0.31:3002/product/create', {
      method:'post', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      },
      body: JSON.stringify({
        "nome": this._name,
        "preco": this._price,
        "status":this._status,
        "estoque":this._amount,
        "descricao":this._description,
        "codigo_categoria":this._category
      })
    })
    .then(res=>{
      return res.json();
    }).then(json =>{
      if(json.hasOwnProperty('error')){
        console.log(Object.keys(json))
        throw new Error(json.error)
      }
      return json;
    })
    return response;
  }

  async update(token, id){
    const validate = this.dataValidate();
    if(validate.status){
      throw new Error(validate.content);
    }

    if(this._price.includes(',')){
      this._price = this._price.replace(',','.');
    }
 
    this._price = parseFloat(this._price);
    this._amount = parseInt(this._amount);

    if(this._status.checked){
      this._status = 1;
    } else {
      this._status = 0;
    }

    let response = await fetch('http://192.168.0.31:3002/product/update', {
      method:'put', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      },
      body: JSON.stringify({
        "codigo":id,
        "nome": this._name,
        "preco": this._price,
        "status":this._status,
        "estoque":this._amount,
        "descricao":this._description,
        "codigo_categoria":this._category
      })
    })
    .then(res=>{
      return res.json();
    }).then(json =>{
      if(json.hasOwnProperty('error')){
        console.log(Object.keys(json))
        throw new Error(json.error)
      }
      return json;
    })
    return response;
  }

  async delete(token, id){

    let response = await fetch('http://192.168.0.31:3002/product/delete', {
      method:'delete', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      },
      body: JSON.stringify({
        "codigo":id
      })
    })
    .then(res=>{
      return res.json();
    }).then(json =>{
      if(json.hasOwnProperty('error')){
        console.log(Object.keys(json))
        throw new Error(json.error)
      }
      return json;
    })
    return response;
  }
}