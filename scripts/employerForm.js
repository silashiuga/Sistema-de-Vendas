import { EmployerFormController } from "../Control/employerFormController.js";

document.addEventListener('DOMContentLoaded', async () => {
  const token = sessionStorage.getItem('userToken');
  
  if(token){
    const params = new URLSearchParams(window.location.search);
    
    const type = params.get('type');
    const user = params.get('user');
    const accountSelf = params.get('account');

    const employerFormController = new EmployerFormController(token, user);
    const buttonContainerEdit = document.querySelector('.button-container-edit');
    const buttonContainerCreate = document.querySelector('.button-container-create');
    employerFormController.handleLogout();

    if(type === 'rg'){

      employerFormController.handleBtnCancel();
      employerFormController.handleBtnCreate();

      const title = document.getElementById('title-form');
      if(user === 'administrator'){
        title.innerHTML = 'Cadastrar Administrador';
      } else if(user === 'seller'){
        title.innerHTML = 'Cadastrar Vendedor';
      }

      if(buttonContainerEdit.classList.contains('ativo')){
        buttonContainerEdit.classList.remove('ativo');
      }

      if(!buttonContainerCreate.classList.contains('ativo')){
        buttonContainerCreate.classList.add('ativo');
      }
    } else if(type === 'edit'){
      const id = params.get('codigo');
      
      const title = document.getElementById('title-form');
      if(user === 'administrator'){
        title.innerHTML = 'Editar Administrador';
      } else if(user === 'seller'){
        title.innerHTML = 'Editar Vendedor';
      }


      if(buttonContainerCreate.classList.contains('ativo')){
        buttonContainerCreate.classList.remove('ativo');
      }

      if(!buttonContainerEdit.classList.contains('ativo')){
        buttonContainerEdit.classList.add('ativo');
      }

      employerFormController.handleBtnDelete(id);
      employerFormController.handleBtnUpdate(id);
      employerFormController.handleBtnCancelUpdate(accountSelf);
      await employerFormController.initialize(id);
      
    }

  } else {
    window.location.href='../index.html';
  }

})