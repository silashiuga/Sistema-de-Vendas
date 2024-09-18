export class AdminModel {
 
  _email;
  _password;
  _cpf;

  valueAdminSearch(cpf){
    this._cpf = cpf;
  }

  createLogin(email, password){
    this._email = email;
    this._password = password;
  }

  async fetchLogin(){
    
    let response = await fetch('http://192.168.0.31:3002/administrator/login', {
          method:'post', 
          headers:{
            'Content-Type':'application/json'
        },
          body: JSON.stringify({
            "email": this._email,
            "senha": this._password,
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

  getEmail(){
    return this._email;
  }

  getPassword(){
    return this._password;
  }

  async findList(token){
    const url = 'http://192.168.0.31:3002/administrator/findAll';
    console.log('fetch')
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

  async fetchFindByCpf(token){
    const url = `http://192.168.0.31:3002/administrator/findByCPF?cpf=${this._cpf}`;
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