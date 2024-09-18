const SellerRepository = require('../repositories/sellerRepository.js');
const EmployeeValidations = require('../validations/userValidations/employeeValidations.js');
const bcrypt = require('bcryptjs');


class SellerService {
  constructor(){
    this.sellerRepository = new SellerRepository();
  }

  sellerRepository;


  async alreadyRegisteredValidation(cpf, email){
  
    const userExist = await this.sellerRepository.findUser(cpf, email);
    if(userExist.length > 0){
      return true;
    }
    return false;
  }

  async updateValidation(codigo, cpf, email){
    const sellerTable = 'vendedores';
    const administratorTable = 'administradores';
    const clientTable = 'clientes';

    const cpfSellerExist = await this.sellerRepository.findByCPF(sellerTable, cpf);
    const cpfAdministratorExist = await this.sellerRepository.findByCPF(administratorTable, cpf);
    const cpfClientExist = await this.sellerRepository.findByCPF(clientTable, cpf);


    const emailSellerExist = await this.sellerRepository.findByEmail(sellerTable, email);
    const emailAdministratorExist = await this.sellerRepository.findByEmail(administratorTable, email);
    const emailClientExist = await this.sellerRepository.findByEmail(clientTable, email);

    let cpfValid = false;
    let emailValid = false;

    // Verifica a existência de cpf
    if(cpfSellerExist.length > 0){
      if(cpfSellerExist[0].codigo == codigo){
        cpfValid = true;
      }
    } else if(cpfAdministratorExist.length == 0 && cpfClientExist.length == 0){
      cpfValid = true;
    }

    // Verfica a existência de email
    if(emailSellerExist.length > 0){
      if(emailSellerExist[0].codigo == codigo){
        emailValid = true;
      }
    } else if(emailAdministratorExist.length == 0 && emailClientExist.length == 0){
      emailValid = true;
    }

    const userValid = emailValid && cpfValid; 
    console.log(userValid)
    return userValid;
  }

  async create(data){

    const employeeValidations = new EmployeeValidations();
    const validateData = employeeValidations.saveValidation(data, 'create');

    if(!validateData){
      throw new Error('Dado inválido');
    }

    const {cpf, email} = data;
    const alreadyRegister = await this.alreadyRegisteredValidation(cpf, email);

    if(alreadyRegister){
      
      throw new Error('Usuário já cadastrado');
    }
    data.senha = bcrypt.hashSync(data.senha);
    const sellerCreated = await this.sellerRepository.create(data); 
    return sellerCreated;
   
  }

  async update(data){

    const employeeValidations = new EmployeeValidations();
    const validateData = employeeValidations.saveValidation(data,'update');

    if(!validateData){
      throw new Error('Dado inválido');
    }

    const {codigo, cpf, email, senha} = data;
    const alreadyRegister = await this.updateValidation(codigo, cpf, email);
    
    if(!alreadyRegister){
      throw new Error('Dados já cadastrados em outra conta');
    }
    if(senha){
      data.senha = bcrypt.hashSync(data.senha);
      const sellerUpdated = await this.sellerRepository.update(data);
      return sellerUpdated;
    } else {
      const sellerUpdated = await this.sellerRepository.updateWithoutPassword(data);
      return sellerUpdated;
    }
  }

  async findById(id){
    console.log(id)
    const employeeValidations = new EmployeeValidations();
    const idValid = employeeValidations.checkId(id);

    if(!idValid){
      throw new Error('Id incorreto');
    }
    const table = 'vendedores';
    const seller = await this.sellerRepository.findById(table, id);
    return seller;
  }

  async findByCPF(data){
    const employeeValidations = new EmployeeValidations();
    const cpfValid = employeeValidations.checkCPF(data.cpf);

    if(!cpfValid){
      throw new Error('CPF incorreto');
    }
    const table = 'vendedores'
    const seller = await this.sellerRepository.findByCPF(table, data.cpf);
    return seller;
  }

  async login(data){
    const employeeValidations = new EmployeeValidations();
    const validInputEmail = employeeValidations.checkEmail(data.email);
    const validInputPassword = employeeValidations.checkPassword(data.senha);

    if(!validInputEmail){
      throw new Error('Email incorreto');
    }

    if(!validInputPassword){
      throw new Error('Senha de entrada incorreta');
    }
    console.log(data)
    const table = 'vendedores'
    const seller = await this.sellerRepository.findByEmail(table, data.email);
    console.log(seller);
    if(seller.length == 0){
      throw new Error('Senha ou Email inválido')
    }

    const passwordCompare = bcrypt.compareSync(data.senha, seller[0].senha);
    if(!passwordCompare){
      throw new Error ('Senha ou Email inválido')
    }

    return seller;
  }

  async findAll(){
    const table = 'vendedores';
    const all = await this.sellerRepository.findAll(table);
    return all;
  }
  async delete(data){

    const sellerFound = await this.findById(data.codigo);
    if(sellerFound.length == 0){
      throw new Error('Vendedor não encontrado.');
    }
    const sellerCpf = sellerFound[0].cpf;
    const purchaseFound = await this.sellerRepository.findPurchase(sellerCpf);

    if(purchaseFound.length > 0){
      throw new Error('Vendedor não pode ser deletado por estar em registro de venda.');
    }

    const table = 'vendedores';
    const sellerDeleted = await this.sellerRepository.delete(table, data.codigo);

    return sellerDeleted;
  }
}

module.exports = SellerService;