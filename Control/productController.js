import { MessageView } from "../View/messageView.js";
import { MessageModel } from "../Model/messageModel.js";
import { ProductModel } from "../Model/productModel.js";
import { ProductView } from "../View/productView.js";

export class ProductController {

  _token 
  constructor(token){
    this._token = token;
  }

  handleAccount(id){
    const btnAccount = document.querySelector('.conta');
    console.log(id)
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
      this.productSearch();
    })
  }

  handleBtnCloseSearch(){
    console.log('button close');
    let buttonCloseResult = document.getElementById('btn-close-result');
    buttonCloseResult.addEventListener('click', (event)=>{
      let table = document.getElementById('productSearched');
     
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

  handleBtnCancel(){
    const btnCancel = document.querySelector('.btn-cancel');
    btnCancel.addEventListener('click', ()=>{
      window.location.href = '../Pages/product.html';
    })
  }

  handleBtnCancelUpdate(){
    const btnCancel = document.querySelector('.btn-cancel-update');
    btnCancel.addEventListener('click', ()=>{
      window.location.href = '../Pages/product.html';
    })
  }

  handleFilterAction(){
    const filterCategory = document.getElementById('listCategory');
    filterCategory.addEventListener('change', (item)=>{
      this.setListProduct();
    });

    const filterAmount = document.getElementById('filter-amount');

    if(!filterAmount.value){
      filterAmount.selectedIndex = 0;
    }

    filterAmount.addEventListener('change', (item)=>{
      console.log(item.target.value);
      this.setListProduct();
    })

    const filterStatus = document.getElementById('filter-status');

    if(!filterStatus.value){
      filterStatus.selectedIndex = 0;
    }
    
    filterStatus.addEventListener('change', (item)=>{
      console.log(item.target.value);
      this.setListProduct();
    })
  }

  setListProduct(){
    const filterCategory = document.getElementById('listCategory').value;
    const filterAmount = document.getElementById('filter-amount').value;
    const filterStatus = document.getElementById('filter-status').value;
    this.listProducts(filterCategory, filterAmount, filterStatus);
  }

  async listProducts(filterCategory, filterAmount, filterStatus){

    const productView = new ProductView();
    const productModel = new ProductModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      const list = await productModel.findList(filterCategory, filterAmount, filterStatus, this._token);
      
      productView.productTable(list, 'list');
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
    
  }



  async productSearch(){
    const productView = new ProductView();
    const productModel = new ProductModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    //Pega o valor do campo e atribui a classe model do produto
    productView.inputProductSearch(productModel);

    try { 
      let productFound = await productModel.fetchFindByName(this._token);
       // Se encontrou produto
      if(productFound.length > 0){    
        productView.productTable(productFound, 'search');
        
      } else {
        messageModel.setMessage('Produto não encontrado');
        messageView.update(messageModel, 'alert');
      }
    }catch(error){
      console.log('catch')
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }
}
