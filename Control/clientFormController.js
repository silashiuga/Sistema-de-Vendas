import { MessageModel } from "../Model/messageModel.js";
import { MessageView } from "../View/messageView.js";
import { ClientFormModel } from "../Model/clientFormModel.js";
import { ClientFormView } from "../View/clientFormView.js";

export class ClientFormController {
  _token;
  constructor(token){
    this._token = token;
  }

  handleAccount(id){
    const btnAccount = document.querySelector('.conta');
    btnAccount.setAttribute('href', `../Pages/sellerAccountForm.html?codigo=${id}&type=edit&user=seller&account=1`);
  }

  handleLogout(){
    const logout = document.querySelector('.logout');
  
    logout.addEventListener('click', (event)=> {
      event.preventDefault();
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('userToken');

      window.location.href = "../index.html";
    })
  }

  handleBtnCancel(){
    const btnCancel = document.querySelector('.btn-cancel');
    btnCancel.addEventListener('click', ()=>{
      window.location.href = '../Pages/client.html';
    });
  }

  handleBtnDelete(id){
    const btnDelete = document.querySelector('.btn-delete');
    btnDelete.addEventListener('click', (event)=>{
      event.preventDefault();
      this.deleteClient(id);
    })
  }

  handleBtnUpdate(id){
    const btnUpdate = document.querySelector('.btn-update');
    btnUpdate.addEventListener('click', (event) => {
      event.preventDefault();
      this.updateClient(id);
      
    })
  }

  handleBtnCancelUpdate(){
    const btnCancel = document.querySelector('.btn-cancel-update');
    btnCancel.addEventListener('click', ()=>{
      window.location.href = '../Pages/client.html';
    })
  }

  handleBtnCreate(){
    const btnCreate = document.querySelector('.btn-create');
    btnCreate.addEventListener('click', (event)=>{

      event.preventDefault()
      this.createCLiente()
    });
  }

  async initialize(id){
    const clientFormModel = new ClientFormModel();
    const clientFormView = new ClientFormView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      const clientFound = await clientFormModel.findById(this._token, id);
      console.log(clientFound)
      if(clientFound.length > 0){
        clientFormView.setInputValue(clientFound)
      } else {
        messageModel.setMessage('Produto não encontrado');
        messageView.update(messageModel, 'alert');
      }
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async createCLiente(){

    const clientFormModel = new ClientFormModel();
    const clientFormView = new ClientFormView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      clientFormView.getInputValue(clientFormModel);
      const result = await clientFormModel.create(this._token);
      
      if(result.hasOwnProperty('info')){
        messageModel.setMessage(result.info);
        messageView.update(messageModel, 'success');
      }
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
      console.log(error)
    }
  }

  async updateClient(id){

    const clientFormModel = new ClientFormModel();
    const clientFormView = new ClientFormView();
    
    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{

      clientFormView.getInputValue(clientFormModel);
      const result = await clientFormModel.update(this._token, id);

      if(result.hasOwnProperty('info')){
        messageModel.setMessage(result.info);
        messageView.update(messageModel, 'success', 'back');
      }

    } catch(error){
      console.log(error);
      messageModel.setMessage(error);
      messageView.update(messageModel, 'error');
    }
  }

  async deleteClient(id){
    const clientFormModel = new ClientFormModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{

      const result = await clientFormModel.delete(this._token, id);

      if(result.hasOwnProperty('info')){
        messageModel.setMessage(result.info);
        messageView.update(messageModel, 'success', 'back');
      }

    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }
}