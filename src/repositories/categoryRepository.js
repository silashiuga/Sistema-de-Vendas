class CategoryRepository {
  con = require('../../connection.js');

  async create(category){
    const {nome, status} = category;

    const query =  `INSERT INTO categorias (nome, ativo) 
    VALUES ('${nome}', ${status});`;

    return new Promise((resolve, reject) =>{
      this.con.query(query, (error, result) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }
  
        return resolve({info:'Criado com sucesso.'});
        //return resolve(result.insertId);

      })
    })
  }

  async validSave(nome){
    const query =  `SELECT codigo FROM categorias WHERE nome = '${nome}'`;
    return new Promise((resolve, reject) =>{
      this.con.query(query, (error, result) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }
  
        return resolve(result)
      })
    })
  }

  async findAll(){
    const query = `SELECT * FROM categorias`;

    return new Promise((resolve, reject) => {
      this.con.query(query, (error, result) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }

        return resolve(result);
      })
    })
  }

  async findByStatus(status){
    const query = `SELECT * FROM categorias WHERE ativo = ${status}`;

    return new Promise((resolve, reject) => {
      this.con.query(query, (error, result) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }
        
        return resolve(result);
      })
    })
  }

  async findActiveCategory(codigo){
    
    const query = `SELECT * FROM categorias WHERE ativo = 1 AND codigo = ${codigo}`;

    return new Promise((resolve, reject) => {
      this.con.query(query, (error, result) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }
 
        return resolve(result);
      })
    })
  }

  async update(category){
    const {nome, status, codigo} = category;
    const query = `UPDATE categorias
                   SET nome = '${nome}',
                       ativo = ${status}
                   WHERE codigo = ${codigo}`;
    return new Promise((resolve, reject) => {
      this.con.query(query, (error) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }

        return resolve({info: 'Atualizado com sucesso.'})
      })
    });
  }

  async checkCategoryInUse(codigo){
    const query = `SELECT * FROM produtos WHERE codigo_categoria = ${codigo}`;
    return new Promise((resolve, reject) => {
      this.con.query(query, (error, result) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }

        return resolve(result)
      })
    });
  }

  async changeState(category){
    const {status, codigo} = category
    const query = `UPDATE categorias
                   SET ativo = ${status}
                   WHERE codigo = ${codigo}`;
    return new Promise((resolve, reject) => {
      this.con.query(query, (error) => {
        if(error){
          return reject(new Error('Erro ao consultar o banco de dados.'));
        }

        return resolve({info: 'Atualizado com sucesso.'})
      })
    })
  }

  async delete(codigo){
    const query = `DELETE FROM categorias WHERE codigo = ${codigo}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve({info:'Categoria deletado com sucesso'});
      })
    })
  }
}

module.exports = CategoryRepository;