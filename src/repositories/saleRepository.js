class SaleRepository {

  con = require('../../connection.js');

  async create(data){
    const {codigo_vendedor, codigo_cliente, data_compra, valor} = data;
    const query = `INSERT INTO compras (codigo_cliente, codigo_vendedor, data_compra, valor) 
                        VALUES (${codigo_cliente}, ${codigo_vendedor}, '${data_compra}', ${valor})`
    
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve(result.insertId);
      })
    })
  }

  async findList(data){
    const {dateOrder, valueOrder} = data;
    const query = `SELECT co.codigo, v.nome AS Vendedor, cli.nome AS Cliente, co.data_compra, co.valor AS valor_Total 
	                      FROM compras AS co INNER JOIN vendedores AS v ON co.codigo_vendedor = v.codigo
					              INNER JOIN clientes AS cli ON co.codigo_cliente = cli.codigo 
                        ORDER BY co.data_compra ${dateOrder}, co.valor ${valueOrder}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve(result);
      })
    })
  }

  async findPurchaseItems(codigo){
    const query = `SELECT it.quantidade, it.valor_unitario, it.nome 
                   FROM items_compras AS it WHERE codigo_compra = ${codigo}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {

        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve(result);
      })
    })
  }

  async findPurchaseByCpf(cpf){
    const query = `SELECT co.codigo, v.nome AS Vendedor, cli.nome AS Cliente, co.data_compra, co.valor AS valor_Total 
                        FROM compras AS co INNER JOIN vendedores AS v ON co.codigo_vendedor = v.codigo
                                  INNER JOIN clientes AS cli ON co.codigo_cliente = cli.codigo 
                                            WHERE cli.cpf = '${cpf}' OR v.cpf = '${cpf}'`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {

        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve(result);
      })
    })
  }

  async delete(saleId){
   
    const query = `DELETE FROM compras WHERE codigo = ${saleId}`;
    
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error) => {
  
        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve();
      })
    })
  }

}

module.exports = SaleRepository;