export class ClientModel {

  _cpf

  valueClientSearch(cpf){
    this._cpf = cpf;
  }

  async fetchFindByCpf(token){
    console.log(this._cpf)
    const url = `http://192.168.0.31:3002/client/findByCPF?cpf=${this._cpf}`;
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

  async findList(token){
    const url = 'http://192.168.0.31:3002/client/findAll';
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
}