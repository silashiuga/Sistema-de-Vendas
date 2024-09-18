export class ProductModel {
 
  _nome;


  valueProductSearch(nome){
    this._nome = nome;
  }

  async fetchFindByName(token){
    const url = `http://192.168.0.31:3002/product/findByName?nome=${this._nome}`;
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

  async findList(filterCategory, filterAmount, filterStatus, token){
    const url = `http://192.168.0.31:3002/product/findList?codigo_categoria=${filterCategory}&ordem_quantidade=${filterAmount}&status=${filterStatus}`;
    console.log(url)
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
}