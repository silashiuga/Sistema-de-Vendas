import { SellerController } from "./Control/sellerController.js";
import { SellerView } from "./View/sellerView.js";
import { SellerModel } from "./Model/sellerModel.js";

let userToken;
document.addEventListener('DOMContentLoaded', async ()=>{
  if(document.querySelector('#initial')){

    const selectedAdmin = document.querySelector('#admin');
    selectedAdmin.addEventListener('click', ()=>{
      console.log(userToken)
    })
  }
  // if(document.querySelector('#initial')){
  //   const selectedSeller = document.getElementById('seller');
  //   const selectedAdmin = document.querySelector('#admin');

  //   selectedSeller.addEventListener('click', ()=>{
      // const userController = new SellerLoginController(document);
      // const userView = new SellerLoginView();
      // const userModel = new SellerLoginModel();
  //   });

  
  //   selectedAdmin.addEventListener('click', ()=>{
  //     const userController = new SellerLoginController();
  //     const userView = new SellerLoginView();
  //     const userModel = new SellerLoginModel();
  //   });
  // }

  if(document.querySelector('#sellerLogin')){
    const userController = new SellerController();
    await userController.handleLogin();
    console.log('voltou')
  }

 


  
 

})