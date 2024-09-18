import { SellerModel } from "../Model/sellerModel.js";
import { SellerView } from "../View/sellerView.js";
import { MessageView } from "../View/messageView.js";
import { MessageModel } from "../Model/messageModel.js";

export class SellerController {

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
  };

  handleBtnSearch(){
    const buttonSearch = document.getElementById('btn-search');
    buttonSearch.addEventListener('click', async (event)=>{
      event.preventDefault();
      await this.sellerSearch();
    })
  }

  handleBtnCloseSearch(){
    let buttonCloseResult = document.getElementById('btn-close-result');
    buttonCloseResult.addEventListener('click', (event)=>{
      let table = document.getElementById('sellerSearched');
     
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

  async listSeller(){
    const sellerView = new SellerView();
    const sellerModel = new SellerModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      const list = await sellerModel.findList(this._token);

      sellerView.sellerTable(list, 'list');
    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async sellerSearch(){
    const sellerView = new SellerView();
    const sellerModel = new SellerModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    sellerView.inputSellerSearch(sellerModel);

    try {
      let sellerFound = await sellerModel.fetchFindByCpf(this._token);
      if(sellerFound.length > 0){
        sellerView.sellerTable(sellerFound, 'search');
      } else {
        messageModel.setMessage('Vendedor não encontrado');
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

    const sellerView = new SellerView();
    const sellerModel = new SellerModel();

    const login = document.querySelector('#signIn');
    login.addEventListener('click', async (event)=>{
      event.preventDefault();
      sellerView.login(sellerModel);

      const messageContainer = document.querySelector('.message-container');
      const messageView = new MessageView(messageContainer);
      const messageModel = new MessageModel();
      try{
        token = await sellerModel.fetchLogin();
        let codigo = token[0].codigo
        token = token[0].authorization;

        sessionStorage.setItem('userToken', token);
        sessionStorage.setItem('id', codigo);
        window.location.href = '../Pages/product.html';
      } catch(error){
        console.log(error);
        messageModel.setMessage(error)
        messageView.update(messageModel, 'error');
      }
    })
  }
  
}

