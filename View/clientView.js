export class ClientView {

  inputClientSearch(clientModel){
    const clientValue = document.querySelector('.search-input').value.trim();

    clientModel.valueClientSearch(clientValue);

    document.querySelector('.search-input').value = '';
  }

  // productSearched(client){
  //   const sectionClientSearched = document.getElementById('search-result');
  //   const clientSearched = `
  //     <table id="clientFound"> 
  //       <thead>
  //         <tr>
  //           <th>Código</th>
  //           <th>Nome</th>
  //           <th>Endereço</th>
  //           <th>Telefone</th>
  //           <th>CPF</th>
  //           <th>Email</th>
  //           <th>Editar</th>
  //         </tr>
  //       </thead>
  //       <tbody>           
  //         <tr>
  //           <td>${client.codigo}</td>
  //           <td>${client.nome}</td>
  //           <td>${client.rua}</td>
  //           <td>${client.telefone}</td>
  //           <td>${client.cpf}</td>
  //           <td>${client.email}</td>
  //           <td><a href="../Pages/clientForm.html?codigo=${client.codigo}&type=edit" class="clientEdit"><img src="../assets/icons/edit.svg"></a></td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   `; 
  //   const doc = new DOMParser().parseFromString(clientSearched, "text/html");
    
  //   sectionClientSearched.appendChild(doc.getElementById('clientFound'));
  // }

  clientTable(list, action){

    let sectionTable;
    let id = '';
    
    if(action == 'list'){
      sectionTable = document.getElementById('table-container');
     
     if(sectionTable.childNodes.length > 0){
       let tableRemoved = sectionTable.childNodes[0];
       tableRemoved.parentNode.removeChild(tableRemoved);
       tableRemoved = null;
     }
     id = "clientFound";
    }  else if(action == 'search'){
      sectionTable = document.getElementById('search-result');
      console.log(sectionTable.childNodes);

      if(sectionTable.childNodes.length > 3){
        let tableRemoved = sectionTable.childNodes[3];
        tableRemoved.parentNode.removeChild(tableRemoved);
        tableRemoved = null;
        console.log('removeu')
      }
      id = "clientSearched";
    }

    const table = `
      <table id='${id}'> 
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          ${list.map((client) => {
            return `
              <tr> 
                <td>${client.codigo}</td>
                <td>${client.nome}</td>
                <td>${client.rua}</td>
                <td>${client.telefone}</td>
                <td>${client.cpf}</td>
                <td>${client.email}</td>
                <td><a href="../Pages/clientForm.html?codigo=${client.codigo}&type=edit" class="clientEdit"><img src="../assets/icons/edit.svg"></a></td>
              </tr>
              `
          }).join('')}
        </tbody>
      </table>
    `;
    let doc = new DOMParser().parseFromString(table, "text/html");
    sectionTable.appendChild(doc.getElementById(id));

    if(action == 'search'){
      sectionTable.classList.add('ativo')
    }

    doc = null;
    sectionTable = null;
  }
}