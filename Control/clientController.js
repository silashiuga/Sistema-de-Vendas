import { MessageView } from "../View/messageView.js";
import { MessageModel } from "../Model/messageModel.js";
import { ClientView } from "../View/clientView.js";
import { ClientModel } from "../Model/clientModel.js";

export class ClientController {

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

  handleBtnSearch(){
    const buttonSearch = document.getElementById('btn-search');
    buttonSearch.addEventListener('click', (event)=>{
      event.preventDefault();
      this.clientSearch();
    })
  }

  handleBtnCloseSearch(){
    let buttonCloseResult = document.getElementById('btn-close-result');
    buttonCloseResult.addEventListener('click', (event)=>{
      let table = document.getElementById('clientSearched');
     
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

  async listClient(){
    console.log('carregou')
    const clientView = new ClientView();
    const clientModel = new ClientModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try {
      const list = await clientModel.findList(this._token);

      clientView.clientTable(list, 'list');
    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async clientSearch(){
    const clientView = new ClientView();
    const clientModel = new ClientModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    clientView.inputClientSearch(clientModel);


    try{
      let clientFound = await clientModel.fetchFindByCpf(this._token);
      if(clientFound.length > 0){
        clientView.clientTable(clientFound, 'search');

      } else {
        messageModel.setMessage('Cliente não encontrado');
        messageView.update(messageModel, 'alert');
      }
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }
}