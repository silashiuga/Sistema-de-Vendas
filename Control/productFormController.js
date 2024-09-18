import { CategoryController } from "./categoryController.js";
import { ProductFormModel } from "../Model/productFormModel.js";
import { ProductFormView } from "../View/productFormView.js";
import { MessageModel } from "../Model/messageModel.js";
import { MessageView } from "../View/messageView.js";

export class ProductFormController {

  _categoryController;
  _token;

  constructor(token){
    this._token = token;
  }

  handleAccount(id){
    const btnAccount = document.querySelector('.conta');
    console.log(btnAccount)
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

  handleSelectCategoryForCreate(){
    this._categoryController = new CategoryController(this._token);
    this._categoryController.selectCategory(1, 'createProduct');
  }

  async handleSelectCategoryForUpdate(){
    this._categoryController = new CategoryController(this._token);
    await this._categoryController.selectCategory(2, 'createProduct');
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

  handleBtnDelete(id){
    const btnDelete = document.querySelector('.btn-delete');
    btnDelete.addEventListener('click', (event)=>{
      event.preventDefault();
      this.deleteProduct(id);
    })
  }

  handleBtnUpdate(id){
    const btnUpdate = document.querySelector('.btn-update');
    btnUpdate.addEventListener('click', (event) => {
      event.preventDefault();
      this.updateProduct(id);
      
    })
  }

  handleBtnCreate(){
    const btnCreate = document.querySelector('.btn-create');
    btnCreate.addEventListener('click', (event)=>{

      event.preventDefault()
      this.createProduct()
    });
  }

  async initialize(id){
    const productFormModel = new ProductFormModel();
    const productFormView = new ProductFormView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      const productFound = await productFormModel.findById(this._token, id);
      if(productFound.length > 0){
        productFormView.setInputValue(productFound)
      } else {
        messageModel.setMessage('Produto não encontrado');
        messageView.update(messageModel, 'alert');
      }
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }

  }

  async deleteProduct(id){
    const productFormModel = new ProductFormModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{

      const result = await productFormModel.delete(this._token, id);

      if(result.hasOwnProperty('info')){
        messageModel.setMessage(result.info);
      }
      messageView.update(messageModel, 'success', 'back');

    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
      console.log(error)
    }
  }

  async updateProduct(id){
    const productFormModel = new ProductFormModel();
    const productFormView = new ProductFormView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      productFormView.getInputValue(productFormModel);
      const result = await productFormModel.update(this._token, id);

      if(result.hasOwnProperty('info')){
        messageModel.setMessage(result.info);
        messageView.update(messageModel, 'success', 'back');
      }

    } catch(error){
      messageModel.setMessage(error);
      messageView.update(messageModel, 'error');
      console.log(error);
    }
  }

  async createProduct(){
  
    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    const productFormModel = new ProductFormModel();
    const productFormView = new ProductFormView();

    console.log('create_product')
    try{
      productFormView.getInputValue(productFormModel);
      const result = await productFormModel.create(this._token);
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
}