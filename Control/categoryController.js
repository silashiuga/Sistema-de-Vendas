import { CategoryModel } from "../Model/categoryModel.js";
import { CategoryView } from "../View/categoryView.js";
import { MessageModel } from "../Model/messageModel.js";
import { MessageView } from "../View/messageView.js";

export class CategoryController {

  constructor(token){
    this._token = token;
    this._selectCategory = document.getElementById('filter-status');
  }
  _token;
  _modelEdit;
  _selectCategory;

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

  async selectCategory(status,action){
    const categoryModel = new CategoryModel();
    const categoryView = new CategoryView();
    const list = await categoryModel.selectCategory(status, this._token);
    if(action === 'list'){
      categoryView.selectCategory(list); 
    } else if(action === 'createProduct'){
      categoryView.selectCategoryinCreateProduct(list)
    }
  }

  handleFilterStatus(select){
    select.addEventListener('change', () => {
      this.listTable(select); 
    })
  }

  // Se o usuário clicar no botão de editar categoria
  // handleBtnOpenUpdateModal(){
  //   const btnEdit = document.querySelectorAll('.btn-edit');
  //   btnEdit.forEach((item) =>{
  //     item.addEventListener('click', (item) => {
  //       const id = item.dataset.category;
  //       this.updateCategory(id);
  //     })
  //   })
  // }

  // Add event listener, para fechar o modal create se o usuário clicar fora 
  handleContainerCreateModal(){
    const containerCreateModal = document.querySelector('.modal-create-container');
    containerCreateModal.addEventListener('click', (event)=>{
      
      if(event.target === containerCreateModal){
        event.preventDefault();
        this.closeCreateModal();
      }
    })
  }

  // Add event listener, para fechar o modal update se o usuário clicar fora 
  handleContainerUpdateModal(){
    const containerUpdateModal = document.querySelector('.modal-update-container');
    containerUpdateModal.addEventListener('click', (event)=>{
      
      if(event.target === containerUpdateModal){
        event.preventDefault();
        this.closeUpdateModal();
      }
    })
  }

  // Se o usuário clicar no botão de fechar o modal de create
  handleBtnCloseCreateModal(){
    const btnClose = document.querySelector('#btn-close-create');
    btnClose.addEventListener('click', (event)=>{
      event.preventDefault();
      this.closeCreateModal();
    })
  }

   // Se o usuário clicar no botão de fechar o modal de update
  handleBtnCloseUpdateModal(){
    const btnClose = document.querySelector('#btn-close-update');
    btnClose.addEventListener('click', (event)=>{
      event.preventDefault();
      this.closeUpdateModal();
    })
  }

  // Se o usuário clicar em criar dentro do modal
  handleBtnCreateModal(){
    const btnCreate = document.querySelector('.btn-create');
    btnCreate.addEventListener('click', (event)=>{
      event.preventDefault();
      this.createCategory();
    })
  }
  // Se o usuário clicar em atualizar dentro do modal
  handleBtnUpdateModal(){
    const btnCreate = document.querySelector('.btn-update');
    btnCreate.addEventListener('click', (event)=>{
      event.preventDefault();
      console.log('foi')
      this.updateCategory();
    })
  }

  // Se o usuário clicar em delete dentro do modal
  handleBtnDeleteModal(){
    const btnDelete = document.querySelector('.btn-delete');
    btnDelete.addEventListener('click', (event)=>{
      event.preventDefault();
      this.deleteCategory();
    })
  }

  // Se o usuário clicar no botão de adicionar
  handleBtnCreate(){
    const createBtn = document.querySelector('.add-btn');
    createBtn.addEventListener('click', (event)=>{
      event.preventDefault();
      this.openCreateModal();
    })
  }

  //Abrir modal create
  openCreateModal(){
    const modal = document.querySelector('.modal-create-container');
    modal.classList.add('active');
  }

  //Fechar modal create
  closeCreateModal(){
    //Resetar o conteúdo do modal;
    const modal = document.querySelector('.modal-create-container');
    const form = document.forms.create.elements;
    const categoryView = new CategoryView();
    categoryView.resetModal(form);
    //Apagar o modal create;
    modal.classList.remove('active');
  }

  //Abrir o modal de update
  openUpdateModal(element){
    const modal = document.querySelector('.modal-update-container');
    modal.classList.add('active');

    this._modelEdit = new CategoryModel();
    const categoryView = new CategoryView();

    const name = element.dataset.name;
    const id = element.dataset.id;
    const status = element.dataset.status;

    this._modelEdit.setId(id);

    categoryView.setInputValue(name, status);
    console.log("update modal")
  }

  //Fechar o modal de update
  closeUpdateModal(){
    //Resetar o conteúdo do modal;
    const modal = document.querySelector('.modal-update-container');
    const form = document.forms.update.elements;
    const categoryView = new CategoryView();
    categoryView.resetModal(form);
    //Apagar o modal create;
    modal.classList.remove('active');
  }

  async createCategory(){

    const categoryModel = new CategoryModel();
    const categoryView = new CategoryView();

    const messageContainer = document.querySelector('.message-container');
    console.log(messageContainer)
    const messageModel = new MessageModel();
    const messageView = new MessageView(messageContainer);
    try{
      categoryView.getInputValue(categoryModel);

      const result = await categoryModel.create(this._token);

      if(result.hasOwnProperty('info')){
        messageModel.setMessage(result.info)
        messageView.update(messageModel, 'success');

        await this.listTable(this._selectCategory);
        this.closeCreateModal();
      }

    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
      console.log(error)
    }
  }

  async updateCategory(){

    const categoryView = new CategoryView();

    const messageContainer = document.querySelector('.message-container');
    const messageModel = new MessageModel();
    const messageView = new MessageView(messageContainer);

    categoryView.getInputValueUpdate(this._modelEdit);

    try{
      const categoryUpdated = await this._modelEdit.update(this._token);

      if(categoryUpdated.hasOwnProperty('info')){
        messageModel.setMessage(categoryUpdated.info);
        messageView.update(messageModel, 'success');
        this.closeUpdateModal();
        await this.listTable(this._selectCategory);
      }
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
      console.log(error)
    }
  }

  async deleteCategory(){
    const messageContainer = document.querySelector('.message-container');
    const messageModel = new MessageModel();
    const messageView = new MessageView(messageContainer);

    try{
      const categoryDeleted = await this._modelEdit.delete(this._token);

      if(categoryDeleted.hasOwnProperty('info')){
        messageModel.setMessage(categoryDeleted.info);
        messageView.update(messageModel, 'success');
        this.closeUpdateModal();
        await this.listTable(this._selectCategory);
      }
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
      console.log(error)
      this.closeUpdateModal();
    }
  }

  handleEventTable(){
    const containerTable = document.querySelector('#table-container');
    containerTable.addEventListener('click', (event)=> {
      if(event.target.closest('.btn-edit')){
        console.log(event.target.parentNode)
        this.openUpdateModal(event.target.parentNode);
      }
    });
  }

  async listTable(selectedStatus){
    const categoryModel = new CategoryModel();
    const categoryView = new CategoryView();

    const messageContainer = document.querySelector('.message-container');
    const messageModel = new MessageModel();
    const messageView = new MessageView(messageContainer);
  
    try{
      const list = await categoryModel.selectCategory(selectedStatus.value, this._token);
     
      categoryView.categoryTable(list);

    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

}