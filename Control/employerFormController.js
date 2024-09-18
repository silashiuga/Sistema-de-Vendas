import { EmployerFormModel } from "../Model/employerFormModel.js";
import { EmployerFormView } from "../View/employerFormView.js";
import { MessageModel } from "../Model/messageModel.js";
import { MessageView } from "../View/messageView.js";

export class EmployerFormController {
  _token;
  _user;

  constructor(token, user){
    this._token = token;
    this._user = user;
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
      if(this._user === 'administrator'){
        window.location.href = '../Pages/admin.html';
      } else if (this._user === 'seller'){
        window.location.href = '../Pages/seller.html';
      } 
    });
  }

  handleBtnDelete(id){
    const btnDelete = document.querySelector('.btn-delete');
    btnDelete.addEventListener('click', (event)=>{
      event.preventDefault();
      this.deleteEmployer(id);
    })
  }

  handleBtnCreate(){
    const btnCreate = document.querySelector('.btn-create');
    btnCreate.addEventListener('click', (event)=>{

      event.preventDefault()
      this.createEmployer()
    });
  }

  handleBtnUpdate(id){
    const btnUpdate = document.querySelector('.btn-update');
    btnUpdate.addEventListener('click', async  (event) => {
      event.preventDefault();
      await this.updateEmployer(id);
    })
  }

  handleBtnCancelUpdate(accountSelf){
    const btnCancel = document.querySelector('.btn-cancel-update');
    btnCancel.addEventListener('click', ()=>{
      if(accountSelf === '1'){
        console.log('veio')
        window.history.back();
      }
      else if(this._user === 'administrator'){
        window.location.href = '../Pages/admin.html';
      } else if (this._user === 'seller'){
        window.location.href = '../Pages/seller.html';
      }
    })
  }

  async initialize(id){
    const employerFormView = new EmployerFormView();
    const employerFormModel = new EmployerFormModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      console.log(this._token)
      const employerFound = await employerFormModel.findById(this._token, id, this._user);

      if(employerFound.length > 0){
        employerFormView.setInputValue(employerFound)
      } else {
        messageModel.setMessage('Produto não encontrado');
        messageView.update(messageModel, 'alert');
      }
    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async updateEmployer(id){
    const employerFormView = new EmployerFormView();
    const employerFormModel = new EmployerFormModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{

      employerFormView.getInputValue(employerFormModel);
      const result = await employerFormModel.update(this._token, id, this._user);

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

  async createEmployer(){
    const employerFormView = new EmployerFormView();
    const employerFormModel = new EmployerFormModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      employerFormView.getInputValue(employerFormModel);
      const result = await employerFormModel.create(this._token, this._user);

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

  async deleteEmployer(id){
    const employerFormModel = new EmployerFormModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try {

      const result = await employerFormModel.delete(this._token, id, this._user);

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