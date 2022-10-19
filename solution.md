# Project Purple Cow
## Jamison "JJ" Vulopas
## October 20, 2022

This is a proof-of-concept submission for the Project Purple Cow exercise. The app is served over port 3000, and the postgres database runs on standard port 5432. To run the application, in the root directory, run:

	docker compose up 

The service is accessible through the /items endpoint. 

| Endpoint  | Action | Parameters | Description |
| --------| ------ | ------ | -------- |
| /items  | GET | /items?id=desired_id | fetch item entry having id desired_id |
| /items/all  | GET | none | fetch all items |
| /items  | POST | /items?id=desired_id&name=desired_name | create new item with id desired_id and name desired_name |
| /items/multiple  | POST | array of JSON objects called "payload" in body of request | create multiple new items |
| /items  | PUT | /items?id=desired_id&name=desired_name | modify item - update name to desired_name for item with id desired_id |
| /items/all  | PUT | array of JSON objects called "payload" in body of request | replace all items in the set with new items |
| /items  | DELETE | /items?id=desired_id | delete item having id desired_id |
| /items/all  | DELETE | none | delete all items from the set |

Some assumptions, invariants, and notes:

+ As per must-have #3, transactions respond with a JSON object/JSON object array payload where approprirate. Requests that involve acting on one item (find one item, modify name, delete one item, etc) can be parameterized through the request query string. Those affecting multiple items require a JSON body attachment to the http request.
+ I decided to use the sequelize ORM as the database interface instead of writing raw sql requests within the endpoints. This was done for a few reasons:
	+ Abstracts away the choice of database implementation from the app logic
	+ Easier to do bulk transactions - can do a single eg. bulkCreate call instead of having to parse an array and reconstruct sql code within the endpoint
	+ Easier to test object-oriented interface
	+ More customizable - transaction and rollback functionality means don't need to write stored procedures
	+ Protects against SQL injection - possible to parameterize raw SQL code, but sequelize has this built-in
+ I followed test-driven development paradigm to build this: steps are to understand the problem, formalize the interface, define and write test cases, and then implement the solution. Hopefully the commit history reflects this.
+ The docker-compose file makes the project_purple_cow container depend on the postgres service, and then establishes the 'items-db' volume. This will allow the data to persist even if the container is disrupted.
+ I decided to make id a primary key, enforcing the invariant that two items cannot have the same id.

Additional next steps might include:

+ Beefing up the error handling. Right now, invalid requests will kick back 404's with the error stack. Those can be made even more specific
+ Implementing an authorization/authentication middleware. Using JWT to further validate responses.
+ Create client front-end using React-Redux framework. Leverage socket.io to so that multiple can clients using application at once with consistent state.

I look forward to hearing your feedback! Thank you.