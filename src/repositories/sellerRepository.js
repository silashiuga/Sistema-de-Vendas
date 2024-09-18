const UserRepository = require('./userRepository.js');

class SellerRepository extends UserRepository{
  
  con = require('../../connection.js');
  
  async create(seller){
    const {nome, email, senha, cpf} = seller;
    const query = `INSERT INTO vendedores (nome, email, senha, cpf) 
                              VALUES ('${nome}', '${email}', '${senha}', '${cpf}');`;
    
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error) => {
 
        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve({info:'Criado com sucesso'});
      })
    })
  }

  async update(seller){
    const {codigo, nome, email, senha, cpf } = seller
    const query = `UPDATE vendedores
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

  async updateWithoutPassword(seller){
    const {codigo, nome, email, cpf } = seller;
    const query = `UPDATE vendedores
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

  async findPurchase(cpf){
    const query = `SELECT v.nome AS Vendedor FROM compras AS co INNER JOIN vendedores AS v
                        ON co.codigo_vendedor = v.codigo
                            WHERE v.cpf = '${cpf}'`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve(result);
      })
    })
  }
}

module.exports = SellerRepository;