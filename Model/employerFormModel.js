export class EmployerFormModel {
  _name;
  _email;
  _password;
  _cpf;

  dataValidate(type){
    const errorInfo = new Object({
      status:false,
      content:''
    })
    
    if(type === 'create'){
      if(!this._name || !this._email || !this._password  || !this._cpf) {
        errorInfo.content = 'É necessário preencher todos os campos. ';
        errorInfo.status = true;
      }
    } else if(type === 'update'){
      if(!this._name || !this._email || !this._cpf) {
        errorInfo.content = 'É necessário preencher os campos nome, email, cpf. ';
        errorInfo.status = true;
      }
    }

    return errorInfo;
  }

  setInputValues(form){
    this._name = form[0].value.trim();
    this._email = form[1].value.trim();
    this._cpf = form[2].value.trim();
    this._password = form[3].value.trim();


    /**this._form[0].value = nome;
    this._form[1].value = email;
    this._form[2].value = cpf;
    this._form[3].value = senha; */
  }

  async findById(token, id, user){
    console.log(token)
    let response = await fetch(`http://192.168.0.31:3002/${user}/findById?codigo=${id}`, {
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

  async update(token, id, user){
    const validate = this.dataValidate('update');
    if(validate.status){
      throw new Error(validate.content);
    }

    let response = await fetch(`http://192.168.0.31:3002/${user}/update?codigo=${id}`, {
      method:'put', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      },
      body: JSON.stringify({
        "codigo":id,
        "nome": this._name,
        "email": this._email,
        "cpf":this._cpf,
        "senha":this._password
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

  async create(token, user){
    const validate = this.dataValidate('create');
    if(validate.status){
      throw new Error(validate.content);
    }

    let response = await fetch(`http://192.168.0.31:3002/${user}/create`, {
      method:'post', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      },
      body: JSON.stringify({
       "nome": this._name,
        "email": this._email,
        "cpf":this._cpf,
        "senha":this._password
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

  async delete(token, id, user){
    let response = await fetch(`http://192.168.0.31:3002/${user}/delete?codigo=${id}`, {
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