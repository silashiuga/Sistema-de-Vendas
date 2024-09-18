const AdministratorRepository = require('../repositories/administratorRepository.js');
const EmployeeValidations = require('../validations/userValidations/employeeValidations.js');
const bcrypt = require('bcryptjs');

class AdministratorService {

  constructor(){
    this.administratorRepository = new AdministratorRepository();
  }

  administratorRepository;

  async alreadyRegisteredValidation(cpf, email){
    
    const usersExist = await this.administratorRepository.findUser(cpf, email);
    if(usersExist.length > 0){ 
      return true;
    }
    return false;
  }

  async updateValidation(codigo, cpf, email){
    const sellerTable = 'vendedores';
    const administratorTable = 'administradores';
    const clientTable = 'clientes';

    const cpfSellerExist = await this.administratorRepository.findByCPF(sellerTable, cpf);
    const cpfAdministratorExist = await this.administratorRepository.findByCPF(administratorTable, cpf);
    const cpfClientExist = await this.administratorRepository.findByCPF(clientTable, cpf);


    const emailSellerExist = await this.administratorRepository.findByEmail(sellerTable, email);
    const emailAdministratorExist = await this.administratorRepository.findByEmail(administratorTable, email);
    const emailClientExit = await this.administratorRepository.findByEmail(clientTable, email);

    let cpfValid = false;
    let emailValid = false;

    // Verifica a existência de cpf
    if(cpfAdministratorExist.length > 0){
      if(cpfAdministratorExist[0].codigo == codigo){
        cpfValid = true;
      }
    } else if(cpfSellerExist.length == 0 && cpfClientExist.length == 0){
      cpfValid = true;
    }

    // Verfica a existência de email
    if(emailAdministratorExist.length > 0){
      if(emailAdministratorExist[0].codigo == codigo){
        emailValid = true;
      }
    } else if(emailSellerExist.length == 0 && emailClientExit.length == 0){
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
    const administradorCreated = await this.administratorRepository.create(data);
    return administradorCreated;

  }

  async findByCPF(data){
    const employeeValidations = new EmployeeValidations();
    const cpfValid = employeeValidations.checkCPF(data.cpf);

    if(!cpfValid){
      throw new Error('CPF incorreto');
    }
    const table = 'administradores'
    const adm = await this.administratorRepository.findByCPF(table, data.cpf);
    return adm;
  }

  async login(data){
    const employeeValidations = new EmployeeValidations();
    const validInputEmail = employeeValidations.checkEmail(data.email);
    const validInputPassword = employeeValidations.checkPassword(data.senha);

    if(!validInputEmail){
      throw new Error('Email de entrada incorreto');
    }

    if(!validInputPassword){
      throw new Error('Senha de entrada incorreta');
    }

    const table = 'administradores'
    const adm = await this.administratorRepository.findByEmail(table, data.email);
    console.log(adm)
    if(adm.length == 0){
      throw new Error('Senha ou Email inválido');
    }

    const passwordCompare = bcrypt.compareSync(data.senha, adm[0].senha);
    if(!passwordCompare){
      throw new Error('Senha ou Email inválido')
    }
    return adm;
  }

  async findById(codigo){
    const employeeValidations = new EmployeeValidations();
    const idValid = employeeValidations.checkId(codigo);
    
    if(!idValid){
      throw new Error('Código vazio');
    }
    const table = 'administradores';
    const adm = await this.administratorRepository.findById(table, codigo);
    return adm;
  }

  async findAll(){
    const table = 'administradores';
    const all = await this.administratorRepository.findAll(table);
    return all;
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
      const administratorUpdated = await this.administratorRepository.update(data);
      return administratorUpdated;
    } else {
      const administratorUpdated = await this.administratorRepository.updateWithoutPassword(data);
      return administratorUpdated;
    }
  }

  async delete(data){

    const admExist = await this.findById(data.codigo);

    if(admExist.length == 0){
      throw new Error('Administrador não encontrado');
    }

    const everyoneAdm = await this.findAll();
   
    if(everyoneAdm.length > 1){
      const table = 'administradores';
      const admDelete = this.administratorRepository.delete(table, data.codigo);
      return admDelete;
    } 
    return {info:"Não é possível deletar o adm, por ser o único no sistema"}
  }
}

module.exports = AdministratorService;