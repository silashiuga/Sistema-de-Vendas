export class EmployerFormView {
  _form;

  constructor(){
    this._form = document.forms[0].elements;
  }

  getInputValue(formModel){
    formModel.setInputValues(this._form);

    this._form[0].value = "";
    this._form[1].value = "";
    this._form[2].value = "";
    this._form[3].value = "";
  }

  setInputValue(employerFound){
    const {nome, cpf, email, senha } = employerFound[0]
    this._form[0].value = nome;
    this._form[1].value = email;
    this._form[2].value = cpf;
   
  }
}