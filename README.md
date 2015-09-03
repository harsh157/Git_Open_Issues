# Git_Open_Issues
Count Open Issues for git repo

Implemented the solution in node js.

app.js in root directory defines the configuration and handles the library required.
Used routes module to route the request to appropriate method.
index.js handles the request to be routed to appropriate method.
content js handles all the request in this app.

Used request module of node to request github api to search issues which returns
json with count of request.

Views folder has all the views. In this case only homepage is required.

In future would handle the request as ajax request and populate data using
callback function and make the UI better.
