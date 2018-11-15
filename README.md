# JavaScript Form Validator

A simple utility for managing form validation.

## Validation on Submit

### Form Markup

```html
<form id="login" name="login" novalidate>

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

### Set the Froms Validation Rules

rules.js
```javascript
export const addUserFormRules = {
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

### Add form Submit Logic
```javascript
import { FormValidator, ErrorMessageRouterm, formToJson } from 'javascript-form-validator';
import { addUserFormRules } from './rules';

const handleFormSubmit = () => {
    const formData = formToJson(new FormData(addUserForm));
    const validationResponse = addUserFormValidator.validate(formData);
    const isValid = validationResponse.errors === 0;

    if (!isValid) {
        // Handle validation errors
        return;
    }
    
    // Submit form
};

addUserForm.onsubmit = e => {
    e.preventDefault();
    handleFormSubmit();
};
```

### Validation Respose
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

You can use the validation response to set your ouwn custom error messaging, or you use the `ErrorMessageRouter` class to handle the error messaging automagically.

