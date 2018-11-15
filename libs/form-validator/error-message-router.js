export class ErrorMessageRouter {
  constructor(form, validationData) {
    this.form = form;
    this.validationData = validationData;
  }
  setErrors() {
    const { validationData } = this;
    
    for (let field in validationData) {
      if (validationData.hasOwnProperty(field)) {
        const input = this.form.querySelector(`[name="${field}"]`);
        const errorContainer = this.form.querySelector(`[data-error-for="${field}"]`);
        const errorMessages = [];
        const errors = validationData[field].errors;
        
        validationData[field].results.forEach(validation => {
          const validators = Object.keys(validation);
    
          validators.forEach(rule => {
            if (validation[rule] === 'invalid') {
              errorMessages.push(`<li>${validation.message}</li>`);
            }
          });
        });
  
        errorContainer.innerHTML = errorMessages.join('');
  
        input.classList[errors > 0 ? 'add' : 'remove']('has-error');
      }
    }
  }
}