export class CategoryModel {
  _id;
  _name;
  _status;

  async selectCategory(status, token){
  
  let response = await fetch(`http://192.168.0.31:3002/category/findByStatus?status=${status}`, {
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

  setInputValue(form){
    this._name = form[0].value;
    console.log(form[0])
    if(form[1].checked){
      this._status = 1;
    } else {
      this._status = 0;
    }
  }

  async create(token){
    console.log(this._name);
    console.log(this._status);
    let response = await fetch('http://192.168.0.31:3002/category/create', {
      method:'post', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      },
      body: JSON.stringify({
        "nome": this._name,
        "status":this._status
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

  async update(token){
    console.log(this._id);
    console.log(this._name);
    console.log(this._status);
    let response = await fetch('http://192.168.0.31:3002/category/update', {
      method:'put', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      },
      body: JSON.stringify({
        "codigo": this._id,
        "nome": this._name,
        "status":this._status
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

  async delete(token){
    console.log(this._id)
    let response = await fetch('http://192.168.0.31:3002/category/delete', {
      method:'delete', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      },
      body: JSON.stringify({
        "codigo": this._id,
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

  setName(name){
    this._name = name;
  }

  setId(id){
    this._id = id;
  }

  setStatus(status){
    this._status = status;
  }

  getName(){
    return this._name;
  }

  getId(){
    return this._id;
  }

  getStatus(){
    return this._status;
  }
}