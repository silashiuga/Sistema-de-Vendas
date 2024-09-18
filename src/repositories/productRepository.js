class ProductRepository {

  con = require('../../connection.js');

  async findAddProduct(nome){
    const query =  `SELECT * FROM produtos WHERE nome = '${nome}'`;
    return new Promise((resolve, reject) =>{
      this.con.query(query, (error, result) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }
        console.log(result)
        return resolve(result);
      })
    })
  }

  async findByName(nome){

    const query = `SELECT p.codigo, p.nome, p.descricao, p.estoque, p.valor, c.nome AS categoria, c.ativo AS status_categoria, p.ativo
                    FROM produtos AS p INNER JOIN categorias AS c
                      ON p.codigo_categoria = c.codigo
                      WHERE p.nome = '${nome}'`;

    return new Promise((resolve, reject) =>{
      this.con.query(query, (error, result) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }
  
        return resolve(result)
      })
    })
  }

  async findById(id){
    const query =  `SELECT * FROM produtos WHERE codigo = '${id}'`;
    return new Promise((resolve, reject) =>{
      this.con.query(query, (error, result) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }
  
        return resolve(result);
      })
    })
  }

  async create(product){
    const { estoque, preco, status, nome, descricao, codigo_categoria } = product;

    const query =  `INSERT INTO produtos (nome, descricao, estoque, valor, ativo, codigo_categoria)
    VALUES ('${nome}', '${descricao}', ${estoque}, ${preco}, ${status}, ${codigo_categoria})`;

    return new Promise((resolve, reject) =>{
      this.con.query(query, (error) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }
  
        return resolve({info:'Criado com sucesso.'})
      })
    })
  }

  async findProductListAllCategories(data){
    const {status, ordem_quantidade} = data;
    const query = `SELECT p.codigo, p.nome, p.descricao, p.estoque, p.valor, c.nome AS categoria, c.ativo AS status_categoria, p.ativo
                    FROM produtos AS p INNER JOIN categorias AS c
                      ON p.codigo_categoria = c.codigo
                      WHERE p.ativo = ${status} 
                      ORDER BY p.estoque ${ordem_quantidade}`;
                      
    return new Promise((resolve, reject) =>{
      this.con.query(query, (error, result) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }
  
        return resolve(result)
      })
    })
  }

  async findProductList(data){
    const {codigo_categoria, status, ordem_quantidade} = data;
    const query = `SELECT p.codigo, p.nome, p.descricao, p.estoque, p.valor, c.nome AS categoria, c.ativo AS status_categoria, p.ativo
                    FROM produtos AS p INNER JOIN categorias AS c
                      ON p.codigo_categoria = c.codigo
                      WHERE p.ativo = ${status} AND c.codigo = ${codigo_categoria}
                      ORDER BY p.estoque ${ordem_quantidade}`;

    return new Promise((resolve, reject) =>{
      this.con.query(query, (error, result) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }
  
        return resolve(result)
      })
    })
  }

  async update(product){
    const { codigo, estoque, preco, status, nome, descricao, codigo_categoria } = product;
    const query = `UPDATE produtos
    SET estoque = ${estoque},
        valor = ${preco},
        ativo = ${status},
        nome = '${nome}',
        descricao = '${descricao}',
        codigo_categoria = ${codigo_categoria}
    WHERE codigo = ${codigo}`;
    return new Promise((resolve, reject) => {
      this.con.query(query, (error) => {
        if(error){
         return reject(new Error('Erro ao consultar o banco de dados.'));
        }

        return resolve({info: 'Atualizado com sucesso.'});
      })
    }); 
  }

  async amountUpdate(productId, amount){
    const query = `UPDATE produtos SET estoque = ${amount} WHERE codigo = ${productId}`;
    return new Promise((resolve, reject) => {
      this.con.query(query, (error) => {
        if(error){
         return reject(new Error('Erro ao consultar o banco de dados.'));
        }

        return resolve();
      })
    }); 
  }

  async productInPurchase(codigo){
    const query = `SELECT * FROM items_compras WHERE codigo_produto = ${codigo}`;
    return new Promise((resolve, reject) => {
      this.con.query(query, (error, result) => {
        if(error){
         return reject(new Error('Erro ao consultar o banco de dados.'));
        }

        return resolve(result);
      })
    }); 
  }

  async delete(codigo){
    const query = `DELETE FROM produtos WHERE codigo = ${codigo}`;
    return new Promise((resolve, reject) => {
      this.con.query(query, (error, result) => {
        if(error){
         return reject(new Error('Erro ao consultar o banco de dados.'));
        }

        return resolve({info:"Deletado com sucesso."});
      })
    }); 
  }

}

module.exports = ProductRepository;