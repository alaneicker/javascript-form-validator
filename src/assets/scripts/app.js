import { FormValidator, ErrorMessageRouter } from '../../../libs';
import { formToJson } from '../../../libs/utilities';
import { addUserFormRules, loginFormRules } from './rules';

(function () {

  'use strict';
  
  // Validate on submit
  // -------------------------------
  const addUserFormValidator = new FormValidator(addUserFormRules);
  const addUserForm = document.querySelector('#add-user');
  const addUserErrorSummary = document.querySelector('#adduser-error-summary');

  const handleFormSubmit = () => {
    const formData = formToJson(new FormData(addUserForm));
    const validationResponse = addUserFormValidator.validate(formData);
    const isValid = validationResponse.errors === 0;
    
    //(!isValid && new ErrorMessageRouter(addUserForm, validationResponse.data).setInputErrors());
    if (!isValid) {
      const errorMessageRouter = new ErrorMessageRouter(addUserForm, validationResponse.data);
      errorMessageRouter
        .setInputErrors()
        .setErrorSummary(addUserErrorSummary);
    }
  };

  addUserForm.onsubmit = e => {
    e.preventDefault();
    handleFormSubmit();
  };

  // validate on input
  // -------------------------------
  const loginFormValidator = new FormValidator(loginFormRules);
  const loginForm = document.querySelector('#login');
  const loginErrorSummary = document.querySelector('#login-error-summary');
  const inputs = loginForm.querySelectorAll('.input');

  [].forEach.call(inputs, input => {
    input.addEventListener('input', e => {
      const inputData = { [e.target.name]: e.target.value };
      const validationResponse = loginFormValidator.validate(inputData);
      
      if (typeof validationResponse !== 'undefined') {
        const errorMessageRouter = new ErrorMessageRouter(loginForm, validationResponse.data);
        errorMessageRouter
          .setInputErrors();
      }
    });
  });
}());