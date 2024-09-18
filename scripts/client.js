import { ClientController } from "../Control/clientController.js";

document.addEventListener('DOMContentLoaded', async() => {
  const userToken = sessionStorage.getItem('userToken');

  if(userToken) {
    const clientController = new ClientController(userToken);
    await clientController.listClient();
    clientController.handleBtnSearch();
    clientController.handleBtnCloseSearch();
    const id = sessionStorage.getItem('id');
    clientController.handleAccount(id);
    clientController.handleLogout();
  } else {
    window.location.href='../index.html';
  }
})