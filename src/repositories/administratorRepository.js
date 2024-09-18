const UserRepository = require('./userRepository.js');

class AdministratorRepository extends UserRepository{

  con = require('../../connection.js');

  // async findById(id){
  //   const querySqlId = `SELECT * FROM administradores WHERE codigo = '${id}'`;
    
  //   return new Promise((resolve,reject) =>{
  //     this.con.query(querySqlId, (error, result) => {
 
  //       if(error){
  //         return reject(new Error ('Error na consultar o banco de dados'));
  //       }
        
  //       return resolve(result);
  //     })
  //   })
  // }


  async create(administrator){
    const {nome, email, senha, cpf} = administrator;
    const querySqlId = `INSERT INTO administradores (nome, email, senha, cpf) 
                              VALUES ('${nome}', '${email}', '${senha}', '${cpf}');`;
    
    return new Promise((resolve,reject) =>{
      this.con.query(querySqlId, (error, result) => {
 
        if(error){
          return reject(new Error ('Error na consultar o banco de dados'));
        }
        
        return resolve({info: 'Criado com sucesso'});
      })
    })
  }

  async update(administrator){
    const {codigo, nome, email, senha, cpf } = administrator
    const query = `UPDATE administradores
                   SET nome = '${nome}',
                       email = '${email}',
                       cpf = '${cpf}',
                       senha = '${senha}'
                   WHERE codigo = ${codigo}`;
    return new Promise((resolve,reject) =>{
    this.con.query(query, (error) => {

      if(error){
        return reject(new Error (error));
      }
      
      return resolve({info:'Alterado com sucesso'});
      })
    })
  }

  async updateWithoutPassword(administrator){
    const {codigo, nome, email, cpf } = administrator
    const query = `UPDATE administradores
                   SET nome = '${nome}',
                       email = '${email}',
                       cpf = '${cpf}'
                   WHERE codigo = ${codigo}`;
    return new Promise((resolve,reject) =>{
    this.con.query(query, (error) => {

      if(error){
        return reject(new Error (error));
      }
      
      return resolve({info:'Alterado com sucesso'});
      })
    })
  }
}

module.exports = AdministratorRepository