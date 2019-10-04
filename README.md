## JavaScript Form Validator

The Form Validator provides a simple JavaScript API for managing form validation through simple configurations rules. 

### Installing the Form Validator

Depending on your permissions, you may need to run the install command with `sudo`.

```
npm install @alaneicker/js-form-validator
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
<script src="node_modules/@alaneicker/js-form-validator/dist/index.min.js"></script>
```

CommonJS
```javascript
const formValidator = require('@alaneicker/js-form-validator');
```

ES6 Import
```javascript
import { FormValidator, ErrorMessageRouter, formToJson } from '@alaneicker/js-form-validator';
```

### Set the Form's Validation Rules
```javascript
const loginFormRules = {
  username: [
    {
      validator: 'required',
      message: 'Username is required',
    },
  ],
  password: [
    {
      validator: 'required',
      message: 'Password is required',
    },
  ],
};
```

### Validation on Submit
```javascript
document.querySelector('#login-form').onsubmit = e => {
  e.preventDefault();
  
  const formValidator = new FormValidator(loginFormRules);
  const form = document.querySelector('#login-form');
  const formData = formToJson(new FormData(form));
  
  const validationResponse = formValidator.validate(formData);
  const errorMessageRouter = new ErrorMessageRouter(addUserForm, validationResponse.data);
  
  errorMessageRouter
    .setInputErrors()
    .setErrorSummary(addUserErrorSummary);
};
```

### Validation on Input
```javascript
const formValidator = new FormValidator(loginFormRules);
const inputs = document.querySelectorAll('#login-form .input');

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
   "totalErrors": 2,
   "data": {
      "username": {
         "errors": 1,
         "results": [
            {
               "required": "invalid",
               "message": "Username is required"
            }
         ]
      },
      "password": {
         "errors": 1,
         "results": [
            {
               "required": "valid"
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
<input type="text" name="username" id="username">
<ul class="error-container" data-error-for="username"></ul>
```

Once your form has validated and returns a response, initialize the `ErrorMessageRouter` class and call the `setErrors()` method.

```javascript
const formValidator = new FormValidator(loginFormRules);
const loginForm = document.querySelector('#login-form');
const validationResponse = formValidator.validate(formData); 
const isValid = validationResponse.errors === 0;

(!isValid && new ErrorMessageRouter(loginForm, validationResponse.data).setInputErrors());
```

That's it! The ErrorMessageRouter will find the container associated with the error and append the appropriate message text.

### API

#### `constructor`

Takes 2 required arguments.

1. **Type:** [object HTMLFormElement]
2. **Type:** [object]

```javascript
const validationResponse = formValidator.validate(formData);

const errorMessageRouter = new ErrorMessageRouter(
    document.querySelector('#login-form'),
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
