class PurchaseItemRepository {

  con = require('../../connection.js');

  async create(queryItems){
    const query = `INSERT INTO items_compras (quantidade, valor_unitario, nome, codigo_produto, codigo_compra)
                         VALUES ${queryItems}`;
    
    return new Promise((resolve, reject) =>{
      this.con.query(query, (error) => {
       
        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve({info:'Produtos salvos da venda'});
      })
    })
  }

  async delete(saleId){ 

    const query = `DELETE FROM items_compras WHERE codigo_compra = ${saleId}`;
    return new Promise((resolve, reject) =>{
      this.con.query(query, (error) => {

        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve();
      })
    })
  }
  
}

module.exports = PurchaseItemRepository;