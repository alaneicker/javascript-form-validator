
export class FormValidator {
  constructor(formRules) {
    this.formRules = formRules;
  }
  validate(fields) {
    let data = {};
    let totalErrors = 0;
    
    for (let fieldName in fields) {
      if (fields.hasOwnProperty(fieldName)) {
          const fieldValidations = data[fieldName] = {
            errors: 0,
            results: [],
          };

          let rules = this.formRules[fieldName];
          
          if (typeof rules === 'undefined') {
            rules = [];
          }
        
          rules.forEach(rule => {    
            const { data, validator, message } = rule;
            
            const result = FormValidator[validator](
              fields[fieldName], 
              data
            ) === true ? 'valid' : 'invalid';
            
            
            if (result === 'invalid') {
              ++totalErrors;
              ++fieldValidations.errors;
            }
            
            fieldValidations.results.push(
              Object.assign(
                { [validator]: result }, 
                result === 'invalid' ? { message } : null
              )
            );
          });
      }
    }
    
    return {
      totalErrors,
      data,
    };
  }
  
  addValidators(validator) {
    Object.assign(FormValidator, validator);
  }
  
  static required(value) {
    return value !== '';
  }
  
  static minLength(value, data) {
    if (value !== '') {
      return value.length >= data;
    } else {
      return true;
    }
  }
  
  static maxLength(value, data) {
    if (value !== '') {
      return value.length <= data;
    } else {
      return true;
    }
  }
  
  static alpha(value) {
    if (value !== '') {
      return value.match(/^[A-Za-z]+$/);
    } else {
      return true;
    }
  }
  
  static number(value) {
    if (value !== '') {
      return isNaN(value) ? false : true;
    } else {
      return true;
    }
  }

  static string(value) {
    if (value !== '') {
      return typeof value === 'string';
    } else {
      return true;
    }
  }

  static email(value) {
    if (value !== '') {
      var regex = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      return regex.test(value.toLowerCase());
    } else {
      return true;
    }
  }
}
