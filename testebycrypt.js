const bcrypt = require('bcryptjs');


const senha = '123456';
let senhaCriptografada;

function criptografa(){
  senhaCriptografada = bcrypt.hashSync(senha);
  console.log(senhaCriptografada)

}

function decriptografa(){
  const comparaSenha = bcrypt.compareSync('123456', senhaCriptografada);
  console.log(comparaSenha)
}

criptografa();
decriptografa();

