# HyperParking

This repository contains the final submission of project HyperParking built by team HyperConnect. 

Team HyperConnect members (alphabetical order) :

- Hui Ouyang

- Jialin Li
- Jielin Zheng
- Tangyoucheng Fu
- Xingyu Chen



### Functionalities description

#### Group 1: Authentication

- Log in to access advanced features such as the favorites parking bays, this allows our daily users to quickly check for availability of parking bays around their favorite locations without having to type in the search bar

- Sign up allows user to register for an account which could be used to logged into the system

- Log out from application after user has finished using it

    

#### Group 2: Parking Bays

- Displaying user’s current location on map, this is the default location of the center of the map, which could help the user to visualize availability of parking bays around 
- Search for a specific location in the search bar, this would move the center of the map to the search location, to help users who are checking availability of parking bays around their destination in advance.
- Displaying parking bays information on a map, the green and red icons indicating whether a parking bay is available or occupied respectively.
- Displaying favorites locations stored by user, user could simply click the button next to the stored locations list and redirect the map to center at that location
- Display detailed information for a specific parking bay, this allows the user to see the specific address of a parking bay as well as the parking restrictions. There would be hints to guide the users to understand the restrictions.
- Add a parking bay to the favorites location, user can easily add the search location into their favorite locations list



#### Group 3: User Profile

- Edit user name, allows users to change their user name in the system.
- Delete stored favorites locations, users could remove accidentally stored locations or unwanted locations from their profile.
- View favorite locations. Users could view the location they stored previously on the website





### URLs to access functionalities on frontend

- Home Page: https://hyper-connect.herokuapp.com
- Log in: https://hyper-connect.herokuapp.com/#/users/login
- Sign up: https://hyper-connect.herokuapp.com/#/users/signup
- Parking bays: https://hyper-connect.herokuapp.com/#/parkingBays
- User Profile (only available after log in): https://hyper-connect.herokuapp.com/#/users/profile

- Sample log in details (feel free to create new accounts on the sign up page):

    - username: sample
    - email: sample@gmail.com
    - password: sample123

    





### Related files for each functionality

#### Authentication

| Functionality | View                                                         | Route                                                        | Controller                            | Model                   |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------- | ----------------------- |
| Login         | frontend/src/components/SignInForm.js<br/>frontend/src/pages/SigninPage.js | frontend/src/API/userAPI.js<br/>backend/routes/usersRouter.js | backend/controllers/usersContrller.js | backend/models/users.js |
| Signup        | frontend/src/components/SignupForm.js<br/>frontend/src.pages/SignupPage.js | frontend/src/API/userAPI.js<br/>backend/routes/usersRouter.js | backend/controllers/usersContrller.js | backend/models/users.js |
| Log out       | frontend/src/components/Nav.js                               | frontend/src/API/userAPI.js<br/>backend/routes/usersRouter.js | backend/controllers/usersContrller.js | backend/models/users.js |



#### Parking Bays

| Functionality                                              | View                             | Route                                                        | Controller                                   | Model                         |
| ---------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------ | -------------------------------------------- | ----------------------------- |
| Displaying user’s current location on map                  | frontend/src/pages/SearchPage.js | NA                                                           | NA                                           | NA                            |
| Search for a specific location in the search bar           | frontend/src/pages/SearchPage.js | NA                                                           | NA                                           | NA                            |
| Displaying parking bays information on a map               | frontend/src/pages/SearchPage.js | frontend/src/API/parkingBaysAPI.js<br/>backend/routes/parkingBaysRouter.js | backend/controllers/parkingBaysController.js | backend/models/parkingBays.js |
| Displaying favorites locations stored by user              | frontend/src/pages/SearchPage.js | frontend/src/API/userAPI.js<br/>backend/routes/usersRouter.js | backend/controllers/usersContrller.js        | backend/models/users.js       |
| Displaying detailed information for a specific parking bay | frontend/src/pages/SearchPage.js | NA                                                           | NA                                           | NA                            |
| Add a parking bay to the favorites location                | frontend/src/pages/SearchPage.js | frontend/src/API/userAPI.js<br/>backend/routes/usersRouter.js | backend/controllers/usersContrller.js        | backend/models/users.js       |



#### User Profile

| Functionality            | View                            | Route                                                        | Controller                            | Model                   |
| ------------------------ | ------------------------------- | ------------------------------------------------------------ | ------------------------------------- | ----------------------- |
| Edit user name           | frontend/src/pages/UserPages.js | frontend/src/API/userAPI.js<br/>backend/routes/usersRouter.js | backend/controllers/usersContrller.js | backend/models/users.js |
| Delete favorite location | frontend/src/pages/UserPages.js | frontend/src/API/userAPI.js<br/>backend/routes/usersRouter.js | backend/controllers/usersContrller.js | backend/models/users.js |
| View favorite locations  | frontend/src/pages/UserPages.js | frontend/src/API/userAPI.js<br/>backend/routes/usersRouter.js | backend/controllers/usersContrller.js | backend/models/users.js |



### Testing 

There are two types of testing for our project, unit testing and integration testing. For the unit testing, it mainly tests if the function works and we choose the logging out function. To test the logging out function, we set a mockrequest to mock up instead of the real one. After receiving the mock request sent to the function, a mock response will be sent back. If the logging out function works, it should return a status of 200. Therefore, the expectation of response status equals 200 should be given if log out successfully. For another, integration testing, it tests the remaining parts of Authentication functionality, logging in and signing up. To test the logging in, an testing account is provided. Correct testing account details are : 'email': '1@q.com', 'password': '1'. There are three possibilities at the logging in stage. The first one is an invalid email address that the email address does not exist in our database. If so, a response status of 401 will be sent back. The second situation is inputting the wrong password with the testing account that 'email': '1@q.com', 'password': 'wrong'. A response status of 401 will be expected. If the correct email and password are given. A status of response should be 200. Last but not the least, testing if the user creates a new account with an existing email address, a code of 409 will be returned.



Steps of running the test are as following:

1. To run the tests, you need to firstly change directory to the root directory. 

    E.g: `cd C:\Users\PC-user\Documents\GitHub\Team\Group_Assignment_HyperConnect`  

2. Then type `npm run dev`  in the cmd and press <kbd>Enter</kbd> to run the application before testing.

3. **Open a new terminal** (keep the old one running) and change directory to the backend. E.g: `cd C:\Users\PC-user\Documents\GitHub\Team\Group_Assignment_HyperConnect\backend`

4. Now you can start testing it by typing  `npm test` in the cmd and press <kbd>Enter</kbd>.

5. The result of testing should be like this.

    ![img](https://lh4.googleusercontent.com/rkUQP1AvU7qznc5LxKinGYH0UAd52l_lq26QN0W1hClWtjbKhxvHYOBc8CmQG3sRnnFhs_33ax2kyWgFcD2xmceFvJ9qkTV4RNnQASQOBxwx7RnTc5fFADdu9AX0VIszI3SUF-gj)

