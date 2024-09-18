import { MessageView } from "../View/messageView.js";
import { MessageModel } from "../Model/messageModel.js";
import { SaleModel } from "../Model/saleModel.js";
import { SaleView } from "../View/saleView.js";

export class SaleController {

  _token;
  _purchase;

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
      this.saleSearch();
    })
  }

  handleBtnClientSearch(){
    const buttonSearch = document.getElementById('btn-search-client');
    buttonSearch.addEventListener('click', (event)=>{
      event.preventDefault();
      this.clientSearch();
    })
  }

  handleBtnCloseSearch(){
    const buttonCloseResult = document.getElementById('btn-close-result');
    buttonCloseResult.addEventListener('click', (event)=>{
      const table = document.getElementById('saleSearched');
     
      if(table){
        table.parentNode.removeChild(table);
      }
      // const closeSearch = document.getElementById('search-result');
      // closeSearch.classList.remove('ativo');
    })
  }

  handleBtnCloseClientSearch(){
    const buttonCloseResult = document.getElementById('btn-close-client-result');
    const containerName = document.querySelector('#info-client-name');
    const containerCpf = document.querySelector('#info-client-cpf');

    if(containerName.innerText){
      containerName.innerText ="";
    }
    if(containerCpf.innerText){
      containerCpf.innerText = "";
    }
    buttonCloseResult.addEventListener('click', (event)=>{
      event.preventDefault();
          // Apagar o client do model
      this._purchase.setClient(null);
      const closeSearch = document.querySelector('.section-client');
      closeSearch.classList.remove('active');
    })
  }

  handleBtnCancelProductSearch(){
    const btnCancel = document.querySelector('.btn-cancel-product');
    btnCancel.addEventListener('click', (event)=> {
      event.preventDefault();
      this.cancelProduct();
    })
  }

  handleCloseModal(){
    const btnCloseModal = document.querySelector('#btn-close-items');
    btnCloseModal.addEventListener('click', (event) => {
      event.preventDefault();
      this.closeItemsSaleModal();
    })
  }

  handleContainerModal(){
    const containerModal = document.querySelector('.modal-items-container');
    containerModal.addEventListener('click', (event)=>{
      
      if(event.target === containerModal){
        event.preventDefault();
        this.closeItemsSaleModal();
      }
    })
  }

  handleFilterAction(){
    const filterDate = document.getElementById('filter-date');

    if(!filterDate.value){
      filterDate.selectedIndex = 0;
    }

    filterDate.addEventListener('change', (item)=>{
      console.log(item.target.value);
      this.setListSale();
    });

    const filterValue = document.getElementById('filter-value');

    if(!filterValue.value){
      filterValue.selectedIndex = 0;
    }
    
    filterValue.addEventListener('change', (item)=>{
      console.log(item.target.value);
      this.setListSale();
    });
  }

  handleDate(){
    const dateElement = document.querySelector('.date');
    const objDate = new Date();
    const saleView = new SaleView();
    saleView.setDate(objDate, dateElement, this._purchase);

  }

  handleBtnSearchProduct(){
    const btnSearchProduct = document.querySelector('#btn-search-product');
    btnSearchProduct.addEventListener('click', (event) => {
      event.preventDefault();
      this.searchProduct();
    })
  }

  handleBtnAddProductInList(){
    const btnAddProduct = document.querySelector('.btn-add-product');
    btnAddProduct.addEventListener('click', (event) => {
      event.preventDefault();
      this.addProductInList();
    })
  }

  handleTotalValue(){
    const saleView = new SaleView();
    this._purchase.setTotalValue();

    saleView.setTotalValue(this._purchase);
  }

  handleBtnFinalize(){
    const btnFinalize = document.querySelector('.btn-finalize');
    btnFinalize.addEventListener('click', (event) => {
      event.preventDefault();
      this.finalizePurchase();
    })
  }

  async addProductInList(){
    const saleView = new SaleView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    let form = saleView.getFormProduct();
    try {

      this._purchase.addProduct(form);
      saleView.resetInputProduct();
      

      saleView.setProductInList(this._purchase);
      this.handleTotalValue();

    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  handleEventContainerTable(){
    const saleView = new SaleView();
    const containerList = document.querySelector('.container-list-product');
    saleView.setProductInList(this._purchase, containerList);
 
    containerList.addEventListener('click', (event) => {
      console.log('event')
      if(event.target.closest('.btn-remove-item')){
        const id = event.target.closest('.btn-remove-item').dataset.id;
        this.removeProduct(id);
      }
    })
    
  }

  removeProduct(id){
    const saleView = new SaleView();

    this._purchase.removeProductInList(id);
    
  
    saleView.setProductInList(this._purchase);
    this.handleTotalValue();
  }

  async finalizePurchase(){
    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      const purchase = await this._purchase.finalize(this._token);
    
      if(purchase.hasOwnProperty('info')){
        messageModel.setMessage(purchase.info)
      messageView.update(messageModel, 'success', 'back');
      }
    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async searchProduct(){
    const saleView = new SaleView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try {
      saleView.getProductInput(this._purchase);

      let productFound = await this._purchase.findProduct(this._token);

      if(productFound.length > 0){

        this._purchase.setProduct(productFound[0]);
        console.log(this._purchase.getProduct());

        saleView.setInputSearchProduct(this._purchase);

      } else {
        messageModel.setMessage('Produto não encontrado.')
        messageView.update(messageModel, 'error');
      }

    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async clientSearch(){
    const saleView = new SaleView();
  
    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      saleView.getClientCpf(this._purchase);

      let clientFound = await this._purchase.findClient(this._token);

      if(clientFound.length > 0){
        this._purchase.setClient(clientFound[0]);
        
        saleView.setInfoClient(this._purchase);

        const containerInfoClient = document.querySelector('.section-client');
        containerInfoClient.classList.add('active');
      } else {
        messageModel.setMessage('Cliente não encontrado.')
        messageView.update(messageModel, 'alert');
      }
    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  cancelProduct(){
    const saleView = new SaleView();
    saleView.resetInputProduct();

    this._purchase.setProductName('');
    this._purchase.setProduct('');
  }

  async findSeller(id){
    const saleView = new SaleView();
    this._purchase = new SaleModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
       let seller = await this._purchase.findSeller(id, this._token);
       console.log(seller)
       if(seller.length > 0){
        this._purchase.setSeller(seller[0]);

        saleView.setNameSeller(this._purchase);
       }
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async saleSearch(){
    const saleView = new SaleView();
    const saleModel = new SaleModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    saleView.inputSaleSearch(saleModel);

    try { 
      let saleFound = await saleModel.fetchFindByCpf(this._token);

      if(saleFound.length > 0){
        saleView.saleTable(saleFound, 'search');

      } else {
        messageModel.setMessage('Venda não encontrada.');
        messageView.update(messageModel, 'alert');
      }
    }catch(error){
      console.log('catch')
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  setListSale(){
    const filterDate = document.getElementById('filter-date').value;
    const filterValue = document.getElementById('filter-value').value;
    this.listSales(filterDate, filterValue);
  }

  handleEventListSales(){
    const containerTable = document.querySelector('#table-container');
 
    containerTable.addEventListener('click', (event)=> {
      if(event.target.closest('.saleItems')){
        this.openItemsSaleModal(event.target);
      }
    });
    this.setListSale();
  }

  async listSales(filterDate, filterValue){
    const saleView = new SaleView();
    const saleModel = new SaleModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      const list = await saleModel.findList(filterDate, filterValue, this._token);
      
      saleView.saleTable(list, 'list');
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  closeItemsSaleModal(){
    //Resetar o conteúdo do modal;
    const table = document.querySelector('#itemFound');
    if(table){
      table.parentNode.removeChild(table);
    }
    //Apagar o modal create;
    const modalContainer = document.querySelector('.modal-items-container');
    modalContainer.classList.remove('active');
  }

  async openItemsSaleModal(element){
    const saleView = new SaleView();
    const saleModel = new SaleModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    const {id} = element.dataset;
   
    try{
      let items = await saleModel.findItems(id, this._token);
      if(items.length > 0){
        saleView.itemsTable(items);
   
      } else {
        messageModel.setMessage('Não foram encontrados produtos.');
        messageView.update(messageModel, 'alert');
      }
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }
}