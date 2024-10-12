# COMP3123 Assignment One
## Ian McDonald - 101419262

### Installation Details
<li>Download & Install NodeJS</li>
<li>Install Dependencies: `npm install`</li>
<li>Run Project: `npm run start`</li>

### Endpoints
`/` accepts GET requests, displays welcome message
`/api/v1/user/signup` POST request to sign up a new user, requires username, email, password
`/api/v1/user/login` POST request to login, requires email & password
`/api/v1/emp/employee` GET request to display all employees in JSON format
`/api/v1/emp/employee` POST request to create a new employee
`/api/v1/emp/employee/{eid}` GET request to list a singular employees details
`/api/v1/emp/employee/{eid}` PUT request to update a singular employees details
`/api/v1/emp/employee/{eid}` DELETE request to delete a singular employee
