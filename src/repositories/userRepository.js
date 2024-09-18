class UserRepository{
  con = require('../../connection.js');
  async findUser(cpf, email) {
    const query = `SELECT nome FROM administradores WHERE email = '${email}' OR cpf = '${cpf}'
                           UNION 
                           SELECT nome FROM clientes WHERE email = '${email}' OR cpf = '${cpf}'
                           UNION
                           SELECT nome FROM vendedores WHERE email = '${email}' OR cpf = '${cpf}'`;
    
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
 
        if(error){
          return reject(new Error ('Error ao consultar o banco de dados'));
        }
        console.log(result)
        return resolve(result);
      })
    })
  }

  // findUserByCPF(cpf){
  //   const query = `SELECT codigo FROM administradores WHERE cpf = '${cpf}'
  //   UNION 
  //   SELECT codigo FROM clientes WHERE cpf = '${cpf}'
  //   UNION
  //   SELECT codigo FROM vendedores WHERE cpf = '${cpf}'`;

  //   return new Promise((resolve,reject) =>{
  //     this.con.query(query, (error, result) => {

  //       if(error){
  //         return reject(new Error ('Erro ao consultar o banco de dados'));
  //       }
  //         return resolve(result);
  //       })
  //   })
  // }

  // findUserByEmail(email){
  //   const query = `SELECT codigo FROM administradores WHERE email = '${email}'
  //   UNION 
  //   SELECT codigo FROM clientes WHERE email = '${email}'
  //   UNION
  //   SELECT codigo FROM vendedores WHERE email = '${email}'`;

  //   return new Promise((resolve,reject) =>{
  //     this.con.query(query, (error, result) => {

  //       if(error){
  //         return reject(new Error ('Erro ao consultar o banco de dados'));
  //       }
  //         return resolve(result);
  //       })
  //   })
  // }

  async findByCPF(table,cpf){
    const query = `SELECT * FROM ${table} WHERE cpf = '${cpf}'`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
 
        if(error){
          return reject(new Error ('Error na consultar o banco de dados'));
        }
      
        return resolve(result);
      })
    })
  }

  async findByEmail(table,email){
    const query = `SELECT * FROM ${table} WHERE email = '${email}'`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
 
        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve(result);
      })
    })
  }

  async findAll(table){
    const query = `SELECT * FROM ${table}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
 
        if(error){
          return reject(new Error ('Error na consultar o banco de dados'));
        }
        
        return resolve(result);
      })
    })
  }

  async findById(table, id){
    const querySqlId = `SELECT * FROM ${table} WHERE codigo = '${id}'`;
    
    return new Promise((resolve,reject) =>{
      this.con.query(querySqlId, (error, result) => {
 
        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve(result);
      })
    })
  }
  
  async delete(table, codigo){
    const query = `DELETE FROM ${table} WHERE codigo = ${codigo}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error) => {
 
        if(error){
          return reject(new Error ('Error na consultar o banco de dados'));
        }
        
        return resolve({info:"Deletado com sucesso."});
      })
    })
  }
}

module.exports = UserRepository;