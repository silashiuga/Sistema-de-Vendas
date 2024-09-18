export class SaleModel {

  _cpf;
  _seller;
  _client;
  _productName;
  _searchProduct;
  _datePurchase;
  _listProduct = [];
  _totalValue = 0;

  setCpf(cpf){
    this._cpf = cpf;
  }

  setSeller(seller){
    this._seller = seller;
  }

  getSeller(){
    return this._seller;
  }

  setClient(client){
    this._client = client;
    console.log(this._client)
  }

  getClient(){
    return this._client;
  }

  setProductName(name){
    this._productName = name;
  }

  setProduct(product){
    this._searchProduct = product;
  }

  getProduct(){
    return this._searchProduct;
  }

  setDatePurchase(date){
    this._datePurchase = date;
  }

  getDatePurchase(){
    return this._datePurchase;
  }

  getListProduct(){
    return this._listProduct;
  }

  setTotalValue(){
    let value = 0;
    if(this._listProduct.length > 0){
      this._listProduct.forEach((item) => {
        value += (item.quantidade * item.valor_unitario);
      })
      this._totalValue = value;
    } else if(this._listProduct.length == 0){
      this._totalValue = value;
    }
  }

  getTotalValue(){
    return this._totalValue;
  }

  addProduct(form){

    if(!this._searchProduct){
      throw new Error('Produto não encontrado.');
    };
    
    let amount = form[4].value;

    if(!amount){
      throw new Error('Informe a quantidade.');
    }

    const regexAmountFormat = /^\d+$/;
    
    if(!regexAmountFormat.test(amount)){
      throw new Error('Informe a quantidade em números inteiros.');
    } else if(amount <= 0){
      throw new Error('Informe a quantidade em um número maior que zero.');
    }

    this._listProduct.forEach((product) => {
      if(product.codigo_produto == this._searchProduct.codigo){
        throw new Error('Produto já adicionado.');
      }
    });

    amount = parseInt(amount);
    console.log(this._searchProduct.estoque)
    if(amount > this._searchProduct.estoque){
      throw new Error('Quantidade excedida.');
    }

    const price = parseFloat((+this._searchProduct.valor).toFixed(2));
    const productItem = new Object({
      quantidade:amount,
      valor_unitario:price,
      nome:this._searchProduct.nome,
      codigo_produto:this._searchProduct.codigo
    });

    this._listProduct.push(productItem);
    console.log(this._listProduct);
  }
  
  removeProductInList(id){
    this._listProduct = this._listProduct.filter((item) => {
      if(item.codigo_produto != id){
        return item;
      }
    })
  }

  async findList(filterDate, filterValue, token){
    console.log(filterDate);
    console.log(filterValue)
    const url = `http://192.168.0.31:3002/sale/findList?dateOrder=${filterDate}&valueOrder=${filterValue}`;
    console.log(url)
    let response = await fetch(url, {
      method:'get', 
      cache:"no-store",
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

  async findSeller(id, token){
    const url = `http://192.168.0.31:3002/seller/findById?codigo=${id}`;
    let response = await fetch(url, {
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

  async fetchFindByCpf(token){
    const url = `http://192.168.0.31:3002/sale/findPurchaseByCpf?cpf=${this._cpf}`;
    let response = await fetch(url, {
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

  async findClient(token){
    console.log(this._cpf)
    const url = `http://192.168.0.31:3002/client/findByCpf?cpf=${this._cpf}`;
    let response = await fetch(url, {
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

  async findItems(id, token){
    console.log(id)
    const url = `http://192.168.0.31:3002/sale/findPurchaseItems?codigo=${id}`;
    let response = await fetch(url, {
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

  async findProduct(token){
    const url = `http://192.168.0.31:3002/product/findAddProduct?nome=${this._productName}`;
    let response = await fetch(url, {
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

  async finalize(token){
    if(!this._client){
      throw new Error('Cliente não encontrado.')
    }

    if(this._listProduct.length == 0){
      throw new Error('Não há produtos na lista de compras.')
    }

    if(!this._seller){
      throw new Error('Vendedor não encontrado.')
    }

    if(this._totalValue == 0){
      throw new Error('Valor total zerado.');
    }

    if(!this._datePurchase){
      throw new Error('Não há data.');
    }

    let response = await fetch('http://192.168.0.31:3002/sale/create', {
      method:'post', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      },
      body: JSON.stringify({
        "codigo_vendedor":this._seller.codigo,
        "codigo_cliente": this._client.codigo,
        "data_compra": this._datePurchase,
        "valor":this._totalValue,
        "listaProduto": this._listProduct
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