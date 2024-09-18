export class ClientFormModel{
  _name;
  _email;
  _address;
  _phone;
  _cpf;

  setInputValues(form){
    this._name = form[0].value.trim();
    this._cpf = form[1].value.trim();
    this._email = form[2].value.trim();
    this._address = form[3].value.trim();
    this._phone = form[4].value.trim();
  }

  dataValidate(){
    const errorInfo = new Object({
      status:false,
      content:''
    })
  
    if(!this._name || !this._email || !this._address  || !this._phone || !this._cpf) {
      errorInfo.content = 'É necessário preencher todos os campos. ';
      errorInfo.status = true;
    }

    return errorInfo;
  }

  async findById(token, id){
    console.log(id)
    let response = await fetch(`http://192.168.0.31:3002/client/findById?codigo=${id}`, {
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

    let response = await fetch('http://192.168.0.31:3002/client/create', {
      method:'post', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      },
      body: JSON.stringify({
        "nome": this._name,
        "email": this._email,
        "rua":this._address,
        "telefone":this._phone,
        "cpf":this._cpf
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

    let response = await fetch('http://192.168.0.31:3002/client/update', {
      method:'put', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
      },
      body: JSON.stringify({
        "codigo":id,
        "nome": this._name,
        "email": this._email,
        "rua":this._address,
        "telefone":this._phone,
        "cpf":this._cpf
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

    let response = await fetch('http://192.168.0.31:3002/client/delete', {
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