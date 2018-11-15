# JavaScript Form Validator

A simple utility for managing form validation.

## Validation on Submit

```html
<form id="login" name="login" style="max-width: 400px;" novalidate>

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

