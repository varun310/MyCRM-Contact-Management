# MyCRM - Personal Contact Management System REST API

This application is configured to run on IBM CLoud. If you want to test and run this application on local system, Please follow the below steps.

## Run the app locally

1. [Install Node.js][]
2. cd into this project's root directory
3. Run `npm install` to install the app's dependencies
4. Remove the below mentioned lines of code from app.js:\
`var cfenv = require('cfenv');`\
`var appEnv = cfenv.getAppEnv();`

5. Replace the `app.listen()` method with below code\

```
var server = app.listen(6001, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
```

6. Run `npm start` to start the app
7. Access the running app in a browser at <http://localhost:6001> or at <http://127.0.0.1:6001>

[Install Node.js]: https://nodejs.org/en/download/
