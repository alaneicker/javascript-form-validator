import { FormValidator, ErrorMessageRouter } from '../../../libs';
import { formToJson } from '../../../libs/utilities';
import { addUserFormRules, loginFormRules } from './rules';

(function () {

  'use strict';
  
  // Validate on submit
  // -------------------------------
  const addUserFormValidator = new FormValidator(addUserFormRules);
  const addUserForm = document.querySelector('#add-user');

  const handleFormSubmit = () => {
    const formData = formToJson(new FormData(addUserForm));
    const validationResponse = addUserFormValidator.validate(formData);
    const isValid = validationResponse.errors === 0;
    
    (!isValid && new ErrorMessageRouter(addUserForm, validationResponse.data).setErrors());
  };

  addUserForm.onsubmit = e => {
    e.preventDefault();
    handleFormSubmit();
  };

  // validate on input
  // -------------------------------
  const loginFormValidator = new FormValidator(loginFormRules);
  const loginForm = document.querySelector('#login');
  const inputs = loginForm.querySelectorAll('.input');

  [].forEach.call(inputs, input => {
    input.addEventListener('input', e => {
      const inputData = { [e.target.name]: e.target.value };
      const validationResponse = loginFormValidator.validate(inputData);
      
      if (typeof validationResponse !== 'undefined') {
        return new ErrorMessageRouter(loginForm, validationResponse.data).setErrors();
      }

      return;
    });
  });
}());