export class MessageView {
  _element
  constructor(element){
    this._element = element;
  }

  displayMessage(message,type){
    return `<div class="message ${type}"><p>${message.getMessage()}</p><div>`
  }

  update(message, type, back){
    if(type==='error' || type==='alert'){
    
      this._element.innerHTML = this.displayMessage(message, type)
      setTimeout(() => {
        
        this._element.innerHTML = '';
        
      }, 3000);
     
    } else {
      if(back == 'back'){

        const promise = new Promise((resolve, reject) => {
          this._element.innerHTML = this.displayMessage(message, type)
          setTimeout(() => {
            
            resolve(this._element.innerHTML = '');
            
          }, 1000);
        });

        promise.then(() =>{
          window.history.back()
        })
      } else {
        this._element.innerHTML = this.displayMessage(message, type)
          setTimeout(() => {
            
            this._element.innerHTML = '';
            
          }, 2000);

      }

    }

  }
  
}