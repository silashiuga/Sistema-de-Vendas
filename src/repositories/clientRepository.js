const UserRepository = require('./userRepository.js');

class ClientRepository extends UserRepository{

  con = require('../../connection.js');

  async create(client){
    const { nome, email, rua, telefone, cpf } = client
    const query = `INSERT INTO clientes (nome, email, rua, telefone, cpf) 
                        VALUES ('${nome}', '${email}', '${rua}', '${telefone}', '${cpf}');`;
    return new Promise((resolve,reject) =>{
    this.con.query(query, (error) => {

      if(error){
        return reject(new Error ('Erro ao consultar banco de dados'));
      }
      
      return resolve({info:'Criado com sucesso'});
      })
    })
  }

  async update(client){
    const {codigo, nome, email, rua, telefone, cpf } = client
    const query = `UPDATE clientes
                   SET nome = '${nome}',
                       email = '${email}',
                       cpf = '${cpf}',
                       rua = '${rua}',
                       telefone = '${telefone}'
                   WHERE codigo = ${codigo}`;
    return new Promise((resolve,reject) =>{
    this.con.query(query, (error) => {

      if(error){
        return reject(new Error ('Erro ao consultar banco de dados'));
      }
      
      return resolve({info:'Alterado com sucesso'});
      })
    })
  }
   async findPurchase(cpf){

    const query = `SELECT c.nome AS Cliente FROM compras AS co INNER JOIN clientes AS c
                        ON co.codigo_cliente = c.codigo
                            WHERE c.cpf = '${cpf}'`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error ('Erro ao consultar banco de dados'));
        }
        
        return resolve(result);
        })
    })
   }
}

module.exports = ClientRepository;