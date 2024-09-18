import { ProductFormController } from "../Control/productFormController.js";
import { CategoryController } from "../Control/categoryController.js";

document.addEventListener('DOMContentLoaded', async () => {

  const token = sessionStorage.getItem('userToken');
  const id = sessionStorage.getItem('id')
  const productFormController = new ProductFormController(token);
 
  if(token){
    const params = new URLSearchParams(window.location.search);

    const type = params.get('type');

    const buttonContainerEdit = document.querySelector('.button-container-edit');
    const buttonContainerCreate = document.querySelector('.button-container-create');
    productFormController.handleAccount(id);
    productFormController.handleLogout();
    if(type === 'rg'){
      productFormController.handleSelectCategoryForCreate()
      productFormController.handleBtnCancel();
      productFormController.handleBtnCreate();

      const title = document.getElementById('title-form');
      title.innerHTML = 'Cadastrar produto';

      if(buttonContainerEdit.classList.contains('ativo')){
        buttonContainerEdit.classList.remove('ativo');
      }

      if(!buttonContainerCreate.classList.contains('ativo')){
        buttonContainerCreate.classList.add('ativo');
      }
     

    } else if(type === 'edit'){
      const productId = params.get('codigo');
      
      const title = document.getElementById('title-form');
      title.innerHTML = 'Editar produto';

      if(buttonContainerCreate.classList.contains('ativo')){
        buttonContainerCreate.classList.remove('ativo');
      }

      if(!buttonContainerEdit.classList.contains('ativo')){
        buttonContainerEdit.classList.add('ativo');
      }
      
      await productFormController.handleSelectCategoryForUpdate();
      productFormController.handleBtnDelete(productId);
      productFormController.handleBtnUpdate(productId)
      productFormController.handleBtnCancelUpdate();
      await productFormController.initialize(productId)


    }
    //Não encontrado
  } else {
    window.location.href='../index.html';
  }

})