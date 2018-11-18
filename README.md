# JavaScript Form Validator

A simple utility for managing form validation.

### Installing the From Validator

Depending on your permissions, you may need to run the install command with `sudo`.

```
npm install javascript-form-validator
```

### Form Markup

```html
<form id="login-form" novalidate>

  <ul id="error-summary"></ul>
    
  <label for="username"><span>*</span> Username</label>
  <input type="text" name="username" id="username">
  <ul data-error-for="username"></ul> <!-- error container -->
  
  <label for="password"><span>*</span> Password</label>
  <input type="text" name="password" id="password">
  <ul data-error-for="password"></ul> <!-- error container -->
  
  <button type="submit">Log In</button>
  
</form>
```

Note: The error containers below the form fields are not required unless using the `ErrorMessageRouter`.

### Import the FormValidator, ErrorMessageRouter and Optional Utilities

Script tage on page
```javascript
<script src="node_modules/javascript-form-validator/dist/index.min.js"></script>
```

CommonJS
```javascript
const formValidator = require('javascript-form-validator');
```

ES6 Import
```javascript
import { FormValidator, ErrorMessageRouter, formToJson } from 'javascript-form-validator';
```

### Set the Form's Validation Rules
```javascript
const addUserFormRules = {
  first_name: [
    {
      validator: 'required',
      message: 'First name is required',
    },
  ],
  last_name: [
    {
      validator: 'required',
      message: 'Last name is required',
    },
  ],
};
```

### Validation on Submit
```javascript
document.querySelector('#add-user').onsubmit = e => {
    e.preventDefault();

    const form = e.target;
    const formValidator = new FormValidator(addUserFormRules);
    const errorSummary = document.querySelector('#adduser-error-summary');

    const formData = formToJson(new FormData(form));
    const validationResponse = formValidator.validate(formData);
    const isValid = validationResponse.errors === 0;

    if (!isValid) {
      const errorMessageRouter = new ErrorMessageRouter(form, validationResponse.data);
      
      errorMessageRouter
        .setInputErrors()
        .setErrorSummary(errorSummary);
    }
};
```

### Validation on Input
```javascript
const formValidator = new FormValidator(loginFormRules);
const form = document.querySelector('#login');
const inputs = form.querySelectorAll('.input');

[].forEach.call(inputs, input => {
    input.addEventListener('input', e => {
      const inputData = { [e.target.name]: e.target.value };
      const validationResponse = formValidator.validate(inputData);

      if (typeof validationResponse !== 'undefined') {
        const errorMessageRouter = new ErrorMessageRouter(form, validationResponse.data);
        
        errorMessageRouter.setInputErrors();
      }
    });
});
```

### Adding a Custom Validators
```javascript
const formValidator = new FormValidator(loginFormRules);

formValidator.addValidators({
    confirmPassword(value) {
        return value === formData.password;
    }
    ...
});
```

Note: Be sure to add a validation rule for your custom validator.

### Validation Response Object
The `FormValidator.validate()` API returns a validation response object containing validation data associated with each form field from the original form data object. 

Note: Only form fields with errors return an `message` property.
```json
{
   "totalErrors":2,
   "data":{
      "first_name":{
         "errors":1,
         "results":[
            {
               "required":"invalid",
               "message":"First name is required"
            }
         ]
      },
      "last_name":{
         "errors":1,
         "results":[
            {
               "required":"valid"
            }
         ]
      }
   }
}
```

### API

#### `validate`

Takes 1 required argument.

1. **Type:** [object]

```javascript
FormValidator.validate(formData)
```

## ErrorMessageRouter
You can use the validation response to set your own custom error messaging, or you use the `ErrorMessageRouter` class to handle the error messaging automagically.

For each of you inputs, add an error message container.
```html
<input type="text" name="first_name" id="first_name">
<ul class="error-container" data-error-for="first_name"></ul>
```

Once your form has validated and returns a response, initialize the `ErrorMessageRouter` class and call the `setErrors()` method.

```javascript
const addUserForm = document.querySelector('#add-user');
const validationResponse = addUserFormValidator.validate(formData); 
const isValid = validationResponse.errors === 0;

(!isValid && new ErrorMessageRouter(addUserForm, validationResponse.data).setInputErrors());
```

That's it! The ErrorMessageRouter will find the container associated with the error and append the appropriate message text.

### API

#### `constructor`

Takes 2 required arguments.

1. **Type:** [object HTMLFormElement]
2. **Type:** [object]

```javascript
const validationResponse = addUserFormValidator.validate(formData);

const errorMessageRouter = new ErrorMessageRouter(
    document.querySelector('#my-form'),
    validationResponse.data
);
```

#### `setInputErrors`

Uses the valiadtion data object to set error messages for individual input fields.

```javascript
errorMessageRouter.setInputErrors();
```

#### `setErrorSummary`

Uses the valiadtion data object to set an error summary listing all errors for a form.
```html
<ul id="error-summary" class="error-summary"></ul>
```
```javascript
const errorSummary = document.querySelector('#error-summary');
errorMessageRouter.setErrorSummary(errorSummary);
```
