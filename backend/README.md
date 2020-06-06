# Group_Assignment_HyperConnect

This repository contains the mockup server for HyperParking of team **HyperConnect**.

This version of mockup server contains REST api for three core functionalities.



Our team have set up an account for demonstration:

- UserName: demo
- Email: demo@gmail.com
- Password: demonstration



Feel free to sign up for new accounts if needed.



## 1. Authentication

### Sign up

| url           | https://hyper-connect.herokuapp.com/users/signup |
| ------------- | ------------------------------------------------ |
| **method**    | POST                                             |
| **parameter** | None                                             |
| **body**      | userName, email, password                        |



**Example use case 1**

Sign up successfully using new and valid email.



**body**:

```
{
	'userName': 'tutor',
 	'email': 'tutor@gmail.com',
	'password': 'tutor'
}
```



**Expected results**

Status: 200 Ok

Message: informing user that account is created.





**Example use case 2**

Sign up using email that has been used.



**body**:

```
{
	'userName': 'demo',
 	'email': 'demo@gmail.com',
	'password': 'demonstration'
}
```



**Expected results**

Status: 409 Conflict

Message: Email has been registered.





**Example use case 3**

Sign up using invalid email.



**body**:

```
{
	'userName': 'asd',
 	'email': 'asdgmail.com',
	'password': 'asdasdasd'
}
```



**Expected results**

Status: 500 Internal Server Error

Message: Email is not valid.





---

### Log in

| url           | https://hyper-connect.herokuapp.com/users/login |
| ------------- | ----------------------------------------------- |
| **method**    | POST                                            |
| **parameter** | None                                            |
| **body**      | email, password                                 |



**Example use case 1**

Log in with correct email and password.



**body**:

```
{
 	'email': 'demo@gmail.com',
	'password': 'demonstration'
}
```



**Expected results**

Status: 200 Ok

Message: Authentication succeeded.





**Example use case 2**

Log in using incorrect email or password.



**body**:

```
{
 	'email': 'demo@gmail.com',
	'password': 'demo'
}
```



**Expected results**

Status: 401 Unauthorized

Message: Authentication failed.







---

### Log out 

| url           | https://hyper-connect.herokuapp.com/users/logout |
| ------------- | ------------------------------------------------ |
| **method**    | POST                                             |
| **parameter** | None                                             |
| **body**      | None                                             |



**Example use case 1**

Log out after successful log in.



**Expected results**

Status: 200 Ok

Message: Log out successfully.







## 2. ParkingBays

### Get all parking bays information

| url           | https://hyper-connect.herokuapp.com/parkingBays |
| ------------- | ----------------------------------------------- |
| **method**    | GET                                             |
| **parameter** | None                                            |
| **body**      | None                                            |



**Example use case**

Request for all parking bays information from server.



**Expected results**

Status: 200 Ok

Message: All the parking bays information





---

### Find nearest parking bays information 

| url           | https://hyper-connect.herokuapp.com/parkingBays/find?lat=latitude&lon=longitude |
| ------------- | ------------------------------------------------------------ |
| **method**    | GET                                                          |
| **parameter** | lat=latitude, lon=longitude                                  |
| **body**      | None                                                         |



**Example use case**



Request for 10 nearest parking bays from location with latitude of 33 and longitude of 33.

https://hyper-connect.herokuapp.com/parkingBays/find?lat=33&lon=33



**Expected results**

Status: 200 Ok

Message: At most 10 nearest available parking bays from the search location.







## 3. FavoritesParkingBays

### Add a parking bay as favorite bay

| url           | https://hyper-connect.herokuapp.com/users/favorites/id |
| ------------- | ------------------------------------------------------ |
| **method**    | POST                                                   |
| **parameter** | id                                                     |
| **body**      | tag                                                    |



**Note**: id should be of type `mongoose.Schema.Types.ObjectId`, you can get the `_id` of a parking bay from our previous feature "Get all parking bays information" or "Find nearest parking bays information" and copy from the response message. We implemented it this way as we planned to let user select a parking bay from the front-end which would have the information sent from the back-end including the `_id` of the bay, and add it to the favorites list.



**Example use case 1**

Log in before adding a parking bay as favorite bay



**url**

https://hyper-connect.herokuapp.com/users/favorites/5ead1d429b8745daf8368a05



**body**:

```
{
	"tag": "Melbourne Central"
}
```



**Expected results**

Status: 200 Ok

Message: Notify user the parking bay is added to the favorite list, together with a list of all favorite parking bays of the user.





**Example use case 2**

Accessing route without logging in first.



**url**:

https://hyper-connect.herokuapp.com/users/favorites/5ead1d429b8745daf8368a05



**body**:

```
{
	"tag": "Melbourne Central"
}
```



**Expected results**

Status: 401 Unauthorized

Message: Authentication failed.





**Example use case 3**

Accessing route without logging in first.



**url**:

https://hyper-connect.herokuapp.com/users/favorites/5ead1d429b8745da8a05

(a string which is not a valid ObjectId)



**body**:

```
{
	"tag": "Melbourne Central"
}
```



**Expected results**

Status: 400 Bad Request

Message: Invalid Request.







---

### Get all favorite parking bays

| url           | https://hyper-connect.herokuapp.com/users/favorites/ |
| ------------- | ---------------------------------------------------- |
| **method**    | GET                                                  |
| **parameter** | None                                                 |
| **body**      | None                                                 |



**Example use case 1**

Log in before getting all favorite parking bay



**Expected results**

Status: 200 Ok

Message: List of all favorite parking bays of the user.





**Example use case 2**

Accessing route without logging in first.



**Expected results**

Status: 401 Unauthorized

Message: Authentication failed.