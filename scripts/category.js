import { CategoryModel } from '../Model/categoryModel.js';
import { CategoryView } from '../View/categoryView.js';
import { CategoryController } from '../Control/categoryController.js';

document.addEventListener('DOMContentLoaded', async () => {
  const userToken = sessionStorage.getItem('userToken');
  if(userToken){
    
    const categoryController = new CategoryController(userToken);
    const selectStatus = document.getElementById('filter-status');
    categoryController.handleFilterStatus(selectStatus);
    categoryController.handleBtnCreate();
    await categoryController.listTable(selectStatus);
    
    categoryController.handleContainerCreateModal();
    categoryController.handleContainerUpdateModal();
    categoryController.handleBtnCloseCreateModal();
    categoryController.handleBtnCloseUpdateModal();
    categoryController.handleBtnCreateModal();
    categoryController.handleBtnUpdateModal();
    categoryController.handleBtnDeleteModal();
    const id = sessionStorage.getItem('id');
    categoryController.handleAccount(id);
    categoryController.handleLogout();
    categoryController.handleEventTable();

  } else {
    window.location.href='../index.html';
  }
})