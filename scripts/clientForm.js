import { ClientFormController } from "../Control/clientFormController.js";

document.addEventListener('DOMContentLoaded', async () => {
  const token = sessionStorage.getItem('userToken');
  const clientFormController = new ClientFormController(token);

  if(token){
    const params = new URLSearchParams(window.location.search);

    const type = params.get('type');

    const idAccountSelf = sessionStorage.getItem('id');
      clientFormController.handleAccount(idAccountSelf);

    const buttonContainerEdit = document.querySelector('.button-container-edit');
    const buttonContainerCreate = document.querySelector('.button-container-create');

    if(type === 'rg'){
      clientFormController.handleBtnCancel();
      clientFormController.handleBtnCreate();

      const title = document.getElementById('title-form');
      title.innerHTML = 'Cadastrar cliente';

      if(buttonContainerEdit.classList.contains('ativo')){
        buttonContainerEdit.classList.remove('ativo');
      }

      if(!buttonContainerCreate.classList.contains('ativo')){
        buttonContainerCreate.classList.add('ativo');
      }

      clientFormController.handleLogout();

    } else if(type === 'edit'){
      const id = params.get('codigo');
      
      const title = document.getElementById('title-form');
      title.innerHTML = 'Editar Cliente';

      if(buttonContainerCreate.classList.contains('ativo')){
        buttonContainerCreate.classList.remove('ativo');
      }

      if(!buttonContainerEdit.classList.contains('ativo')){
        buttonContainerEdit.classList.add('ativo');
      }

      clientFormController.handleBtnDelete(id);
      clientFormController.handleBtnUpdate(id);
      clientFormController.handleBtnCancelUpdate();
      await clientFormController.initialize(id);

      const idAccountSelf = sessionStorage.getItem('id');
      clientFormController.handleAccount(idAccountSelf);
      
      clientFormController.handleLogout();
    }
  } else {
    window.location.href='../index.html';
  }
})