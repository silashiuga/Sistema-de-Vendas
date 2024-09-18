export class SellerView {
  constructor(){

  }

  login(sellerModel){
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    sellerModel.createLogin(email, password);
  }

  inputSellerSearch(sellerModel){
    const sellerValue = document.querySelector('.search-input').value.trim();

    sellerModel.valueSellerSearch(sellerValue);

    document.querySelector('.search-input').value = '';
  }

  sellerTable(list, action){
    let sectionTable;
    let id = '';
    
    if(action == 'list'){
      sectionTable = document.getElementById('table-container');
     
     if(sectionTable.childNodes.length > 0){
       let tableRemoved = sectionTable.childNodes[0];
       tableRemoved.parentNode.removeChild(tableRemoved);
       tableRemoved = null;
     }
     id = "sellerFound";

    } else if(action == 'search'){
      sectionTable = document.getElementById('search-result');
      
      if(sectionTable.childNodes.length > 3){
        let tableRemoved = sectionTable.childNodes[3];
        tableRemoved.parentNode.removeChild(tableRemoved);
        tableRemoved = null;
      }
      id = "sellerSearched";
    }

    const table = `
    <table id='${id}'> 
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Email</th>
          <th>CPF</th>     
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        ${list.map((seller) => {
          return `
            <tr> 
              <td>${seller.codigo}</td>
              <td>${seller.nome}</td>
              <td>${seller.email}</td>
              <td>${seller.cpf}</td>
              <td><a href="../Pages/sellerForm.html?codigo=${seller.codigo}&type=edit&user=seller&account=0" ><img src="../assets/icons/edit.svg"></a></td>
            </tr>
            `
        }).join('')}
      </tbody>
    </table> `;
    let doc = new DOMParser().parseFromString(table, "text/html");
    sectionTable.appendChild(doc.getElementById(id));

    if(action == 'search'){
      sectionTable.classList.add('ativo')
    }

    doc = null;
    sectionTable = null;
  }
}