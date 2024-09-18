export class ProductView {
  constructor(){

  }

  inputProductSearch(productModel){
    // Captar o valor do campo
    const productValue = document.querySelector('.search-input').value.trim();
    
    // Atribuir o valor a Model
    productModel.valueProductSearch(productValue);

    //Limpar campo
    document.querySelector('.search-input').value = "";
  }

  productSearched(product){
    const sectionProductSearched = document.getElementById('search-result');
    const productSearched = `
      <table id="productFound"> 
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>           
          <tr>
            <td>${product.codigo}</td>
            <td>${product.nome}</td>
            <td>${product.descricao}</td>
            <td>${product.categoria}</td>
            <td>${product.valor}</td>
            <td>${product.estoque}</td>
            <td><a href="../Pages/productForm.html?codigo=${product.codigo}&type=edit" class="productEdit"><img src="../assets/icons/edit.svg"></a></td>
          </tr>
        </tbody>
      </table>
    `; 
    const doc = new DOMParser().parseFromString(productSearched, "text/html");
    sectionProductSearched.appendChild(doc.getElementById('productFound'));
    console.log(sectionProductSearched)
  }



  productTable(list, action){
    
    let sectionTable;
    let id = '';
    
    if(action == 'list'){
      sectionTable = document.getElementById('table-container');
     
     if(sectionTable.childNodes.length > 0){
       let tableRemoved = sectionTable.childNodes[0];
       tableRemoved.parentNode.removeChild(tableRemoved);
       tableRemoved = null;
     }
     id = "productFound";

    } else if(action == 'search'){
      sectionTable = document.getElementById('search-result');
      console.log(sectionTable.childNodes)
      if(sectionTable.childNodes.length > 3){
        let tableRemoved = sectionTable.childNodes[3];
        tableRemoved.parentNode.removeChild(tableRemoved);
        tableRemoved = null;
      }
      id = "productSearched";
    }
    const table = `
      <table id="${id}"> 
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Situação</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          ${list.map((product) => {
            if(product.ativo === 0 && product.status_categoria === 0){
              return `
                <tr> 
                  <td>${product.codigo}</td>
                  <td>${product.nome}</td>
                  <td>${product.descricao}</td>
                  <td>${product.categoria}</td>
                  <td>${product.valor}</td>
                  <td>${product.estoque}</td>
                  <td>Inativo (categoria e produto)</td>
                  <td><a href="../Pages/productForm.html?codigo=${product.codigo}&type=edit"><img src="../assets/icons/edit.svg"></a></td>
                </tr>
              `
            } else if(product.ativo === 0 && product.status_categoria === 1){
              return `
                <tr>
                  <td>${product.codigo}</td>
                  <td>${product.nome}</td>
                  <td>${product.descricao}</td>
                  <td>${product.categoria}</td>
                  <td>${product.valor}</td>
                  <td>${product.estoque}</td>
                  <td>Inativo (produto)</td>
                  <td><a href="../Pages/productForm.html?codigo=${product.codigo}&type=edit"><img src="../assets/icons/edit.svg"></a></td>
                </tr>
              `
            } else if(product.ativo === 1 && product.status_categoria === 0){
              return `
                <tr>
                  <td>${product.codigo}</td>
                  <td>${product.nome}</td>
                  <td>${product.descricao}</td>
                  <td>${product.categoria}</td>
                  <td>${product.valor}</td>
                  <td>${product.estoque}</td>
                  <td>Inativo (categoria)</td>
                  <td><a href="../Pages/productForm.html?codigo=${product.codigo}&type=edit"><img src="../assets/icons/edit.svg"></a></td>
                </tr>
              `
            } else if(product.ativo === 1 && product.status_categoria === 1){
              return `
                <tr>
                  <td>${product.codigo}</td>
                  <td>${product.nome}</td>
                  <td>${product.descricao}</td>
                  <td>${product.categoria}</td>
                  <td>${product.valor}</td>
                  <td>${product.estoque}</td>
                  <td>Ativo</td>
                  <td><a href="../Pages/productForm.html?codigo=${product.codigo}&type=edit"><img src="../assets/icons/edit.svg"></a></td>
                </tr>
              `
            } 
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