export class AdminView {
  constructor(){

  }

  login(adminModel){
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    adminModel.createLogin(email, password);
  }

  inputAdminSearch(adminModel){
    const adminValue = document.querySelector('.search-input').value.trim();

    adminModel.valueAdminSearch(adminValue);

    document.querySelector('.search-input').value = '';
  }

  adminTable(list, action){

    let sectionTable;
    let id = '';
    
    if(action == 'list'){
      sectionTable = document.getElementById('table-container');
     
     if(sectionTable.childNodes.length > 0){
       let tableRemoved = sectionTable.childNodes[0];
       tableRemoved.parentNode.removeChild(tableRemoved);
       tableRemoved = null;
     }
     id = "adminFound";

    } else if(action == 'search'){
      sectionTable = document.getElementById('search-result');
      console.log(sectionTable.childNodes)
      if(sectionTable.childNodes.length > 3){
        let tableRemoved = sectionTable.childNodes[3];
        tableRemoved.parentNode.removeChild(tableRemoved);
        tableRemoved = null;
        console.log('removeu')
      }
      id = "adminSearched";
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
        ${list.map((admin) => {
          return `
            <tr> 
              <td>${admin.codigo}</td>
              <td>${admin.nome}</td>
              <td>${admin.email}</td>
              <td>${admin.cpf}</td>
              <td><a href="../Pages/adminForm.html?codigo=${admin.codigo}&type=edit&user=administrator&account=0" ><img src="../assets/icons/edit.svg"></a></td>
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