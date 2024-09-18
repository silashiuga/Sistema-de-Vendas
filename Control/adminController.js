import { AdminModel } from "../Model/adminModel.js";
import { AdminView } from "../View/adminView.js"; 
import { MessageView } from "../View/messageView.js";
import { MessageModel } from "../Model/messageModel.js";

export class AdminController {

  _token;

  constructor(token = ''){
    if(token){
      this._token = token;
    }
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

  handleBtnSearch(){
    const buttonSearch = document.getElementById('btn-search');
    buttonSearch.addEventListener('click', async (event)=>{
      event.preventDefault();
      await this.adminSearch();
    })
  }

  handleBtnCloseSearch(){
    let buttonCloseResult = document.getElementById('btn-close-result');
    buttonCloseResult.addEventListener('click', (event)=>{
      let table = document.getElementById('adminSearched');
     
      if(table){
        table.parentNode.removeChild(table);
      }
      let closeSearch = document.getElementById('search-result');
      closeSearch.classList.remove('ativo');

      table = null;
      closeSearch = null;
      buttonCloseResult = null;
    })
  }

  async adminSearch(){
    const adminView = new AdminView();
    const adminModel = new AdminModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    adminView.inputAdminSearch(adminModel);

    try {
      let adminFound = await adminModel.fetchFindByCpf(this._token);
      if(adminFound.length > 0){
        adminView.adminTable(adminFound, 'search');
        
      } else {
        messageModel.setMessage('Adimistrador não encontrado');
        messageView.update(messageModel, 'alert');
      }
      
    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async handleLogin(){
    let token;

    const adminView = new AdminView();
    const adminModel = new AdminModel();

    const login = document.querySelector('#signIn');
    login.addEventListener('click', async (event)=>{
      event.preventDefault();
      adminView.login(adminModel);
      const messageContainer = document.querySelector('.message-container');
      const messageView = new MessageView(messageContainer);
      const messageModel = new MessageModel();
      try{
        token = await adminModel.fetchLogin();
        let codigo = token[0].codigo
        token = token[0].authorization;
        
        sessionStorage.setItem('userToken', token);
        sessionStorage.setItem('id', codigo);
        window.location.href = '../Pages/admin.html';
      } catch(error){
        console.log(error);
        messageModel.setMessage(error)
        messageView.update(messageModel, 'error');
      }
    })
  }

  async listAdmin(){
    const adminView = new AdminView();
    const adminModel = new AdminModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();
    try{
      console.log(this._token)
      const list = await adminModel.findList(this._token);

      adminView.adminTable(list, 'list');
    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }
  
}