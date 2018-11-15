# JavaScript Form Validator

A simple utility for managing form validation.

## FormValidator

### Installing the From Validator

Depending on your permissions, you may need to run the install command with `sudo`.

```
npm install -S @alaneicker/javascript-form-validator
```

### Form Markup

```html
<form id="login" name="login" novalidate>
    
    <ul id="adduser-error-summary"></ul>

    <div class="vr-3">
      <label class="label" for="username">
        <span class="label__asterisk">*</span>
        Username
      </label>
      <div class="vr-top">
        <input class="input" type="text" name="username" id="username">
        <ul class="error-container" data-error-for="username"></ul>
      </div>
    </div>

    <div class="vr-3">
      <label class="label" for="password">
        <span class="label__asterisk">*</span>
        Password
      </label>
      <div class="vr-top">
        <input class="input" type="text" name="password" id="password">
        <ul class="error-container" data-error-for="password"></ul>
      </div>
    </div>

    <button type="submit" class="button">Log In</button>

</form>
```

Note: The error containers below the form fields are not required unless using the `ErrorMessageRouter`.

### Import the FormValidator, ErrorMessageRouter and Optional Utilities
```javascript
import { FormValidator, ErrorMessageRouter } from 'javascript-form-validator';
import { formToJson } from 'javascript-form-validator/utilities';
```

### Set the Froms Validation Rules
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


### Validation Response Object
The `FormValidator` API returns a validation response object. 
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
               "required":"invalid",
               "message":"Last name is required"
            }
         ]
      }
   }
}
```

## Validation on Submit

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
