const ClientRepository = require('../repositories/clientRepository.js');
const ClientValidations = require('../validations/userValidations/clientValidations.js');

class ClientService {

  constructor(){
    this.clientRepository = new ClientRepository();
  }

  clientRepository;



  async alreadyRegisteredValidation(cpf, email){
  
    const userExist =  await this.clientRepository.findUser(cpf, email);;

    if(userExist.length > 0){
      return true;
    }
    return false;
  }

  async updateValidation(codigo, cpf, email){
    const sellerTable = 'vendedores';
    const administratorTable = 'administradores';
    const clientTable = 'clientes';

    const cpfSellerExist = await this.clientRepository.findByCPF(sellerTable, cpf);
    const cpfAdministratorExist = await this.clientRepository.findByCPF(administratorTable, cpf);
    const cpfClientExist = await this.clientRepository.findByCPF(clientTable, cpf);


    const emailSellerExist = await this.clientRepository.findByEmail(sellerTable, email);
    const emailAdministratorExist = await this.clientRepository.findByEmail(administratorTable, email);
    const emailClientExist = await this.clientRepository.findByEmail(clientTable, email);

    let cpfValid = false;
    let emailValid = false;

    // Verifica a existência de cpf
    console.log(cpfClientExist);
    if(cpfClientExist.length > 0){
      if(cpfClientExist[0].codigo == codigo){
        cpfValid = true; 
      }
    } else if(cpfAdministratorExist.length == 0 && cpfSellerExist.length == 0){
      cpfValid = true;
    }

    // Verfica a existência de email
    if(emailClientExist.length > 0){
      if(emailClientExist[0].codigo == codigo){
        emailValid = true;
      }
    } else if(emailAdministratorExist.length == 0 && emailSellerExist.length == 0){
      emailValid = true;
    }

    const userValid = emailValid && cpfValid; 
    console.log(userValid)
    return userValid;
  }
  

  async create(data){

    const clientValidations = new ClientValidations();
    const validateData = clientValidations.saveValidation(data);
    if(!validateData){
      throw new Error('Dado inválido');
    }

    const {cpf, email} = data;
    const alreadyRegister = await this.alreadyRegisteredValidation(cpf, email);

    if(alreadyRegister){
      throw new Error('Usuário já cadastrado');
    }
      const clientCreated = await this.clientRepository.create(data);
      return clientCreated;
  }

  async update(data){

    const clientValidations = new ClientValidations();
    const validateData = clientValidations.saveValidation(data);

    if(!validateData){
      throw new Error('Dado inválido');
    }

    const {codigo, cpf, email} = data;
    const alreadyRegister = await this.updateValidation(codigo, cpf, email);

    if(!alreadyRegister){
      throw new Error('Dados já cadastrados em outra conta');
    }

    const clientUpdated = await this.clientRepository.update(data);
    return clientUpdated;
  }
  
  async findByCPF(data){
    const clientValidations = new ClientValidations();
    const cpfValid = clientValidations.checkCPF(data.cpf);

    if(!cpfValid){
      throw new Error('CPF incorreto');
    }
    const table = 'clientes'
    const client = await this.clientRepository.findByCPF(table, data.cpf);
    return client;
  }

  async findById(id){
    const clientValidations = new ClientValidations();
    const validateId = clientValidations.checkId(id);

    if(!validateId){
      throw new Error('Código incorreto');
    }
    const table = 'clientes'
    const client = await this.clientRepository.findById(table, id);
    return client;
  }

  async findAll(){
    const table = 'clientes';
    const all = await this.clientRepository.findAll(table);
    console.log('find all clientes')
    return all;
  }

  async delete(data){
    const clientFound = await this.findById(data.codigo);
    if(clientFound.length == 0){
      throw new Error('Cliente não encontrado.');
    }

    const clientCpf = clientFound[0].cpf;
    const purchaseFound = await this.clientRepository.findPurchase(clientCpf);

    if(purchaseFound.length > 0){
      throw new Error('Cliente não pode ser deletado por estar em registro de compra.');
    }

    const table = 'clientes';

    const clientDeleted = await this.clientRepository.delete(table, data.codigo);
    return clientDeleted;
  }
}

module.exports = ClientService;