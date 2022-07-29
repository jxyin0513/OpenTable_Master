# TableOpen README
Welcome to the README for TableOpen!
Live Link https://opentableproject.herokuapp.com
TableOpen is a straight clone of OpenTable, users can make reservations, set favorites, create restaurants, and leave reviews.
## Index
- Features
- Components
- Schema
- Frontend Routes
- API Routes
- Redux Store Tree
- Screenshots
- How to build & run TableOpen
- Technologies
- Planned Features
- Technical Implementation Details

## Features
### Sign Up
Users can login and create accounts and any restaurants, reservations, favorites, or reviews they make will remember who it was that made them.
### Navigation Bar
A navigation component is always visible anywhere on the application for quick and easy browsing to any view.
### Demo User
A convenient Demo User button is available to those who want to skip the registration process and login with a pre-made account with a few sample restaurants tied to it.
### Restaurants
Users may browse all restaurants on the site on the main page, and click their respective cards to view specific details about that restaurant.
### Reviews
Users are able to leave a review for a restaurant by assigning it a score of 1-5 and leaving a comment about their experience (Users may only leave 1 review)
### Favorites
Users are able to set restaurants as their favorites, and view them on their user profile.
### Reservations
Users are able to make reservations at restaurants within the restaurants business hours and declare their party size
### Search Restaurants
On the main page, users may search for a restaurant by it's name or the type of cuisine they provide

## Components
- ReservationForm - Create new reservation
- Reservations - Show All reservations
- RestaurantDetails - Show a restaurants details
- RestaurantEdit - Edit form for restaurant
- RestaurantForm - Show create form for restaurant
- Restaurants - Show all restaurants
- SearchRestaurants - Search restaurants by keyword
- UserFavorites - Show all of a specified users favorites
- ReviewEdit - Update a user review
- ReviewForm - Create a review
- Reviews - Show all reviews
- User - User profle
- Footer
- NavBar
## Database Schema
![database schema](https://user-images.githubusercontent.com/97128550/180044616-a554ac75-1e6e-4517-b37f-49eb4d391d6b.png)
## API Routes
### All routes begin with /api/
### __/auth__
- GET / - Authenticate user
- POST /login - log user in
- POST /logout - log user out
- POST /sign_up - create new user instance and log them in
### __/restaurants__
- GET /newRestaurant - Get new restaurant form
- POST /newRestaurant - Submit new restaurant form
- GET /:restaurantId - Get details for a specific restaurant
- DELETE /:restaurantId/delete - Delete a specified restaurant
- PUT /:restaurantId/edit - Update a restaurants details
- GET /favorites - Get user's who have this restaurant as their favorite
- POST /favorites - Set this restaurant as a user's favorite
- GET /favorites/:userId/:restuarantId - Get user favorite restaurant by restaurant Id
- DELETE /:userId/:restaurantId - Delete a restaurant from a user's favorites
- POST /search - Submit a keyword and return all matches from restaurants.
### __/reservations__
- GET /:userId - Get all reservations for specified user
- POST /new/reservation - Create a new reservation
- DELETE /:id/delete - Delete a reservation
### /reviews
- GET /all - Get all reviews
- POST /new - Post a new review
- PUT /:reviewId/edit - update a review
- DELETE /:reviewId/delete - delete a review
### /users
- GET /:userId - get logged in user's details
## Redux Store Tree

```
store = {
    session:{user},
    restaurants:{
              restaurantId:{
                           restaurantData
                           },
              optionalOrderedList: []
             },
    reviews:{
             restaurantId:{
                      reviewData
                      }
             optionalOrderedList: []
              },
    favorites: {
              restaurantId:{
                           restaurantData
                           },
              optionalOrderedList: []
             }
```
## Installation
1. Clone TableOpen
2. ```cd``` into the ```/app``` folder.
3. run ```pipenv install ``` and enter your ```pipenv shell```
4. run ```flask run``` to start the backend flask server on default: `port 3000`
5. In a seperate terminal, ```cd``` into the ```/react-app``` folder
6. run ```npm install ```
7. run ```npm build``` to start the frontend react server on default port: `5000` in production mode
8. If it does not automatically open a browser window, navigate to ```localhost:5000``` to access the app.
  ## Technologies Used
  ![](https://img.shields.io/badge/-HTML-5555ff?style=flat-square&logo=html5&logoColor=FFFFFF) ![](https://img.shields.io/badge/-CSS-5555ff?style=flat-square&logo=css3&logoColor=FFFFFF) ![](https://img.shields.io/badge/-JS-5555ff?style=flat-square&logo=javascript&logoColor=FFFFFF)  ![](https://img.shields.io/badge/-Python-5555ff?style=flat-square&logo=python&logoColor=ffffff)  ![](https://img.shields.io/badge/-React-5555ff?style=flat-square&logo=react&logoColor=FFFFFF) ![](https://img.shields.io/badge/-VScode-5555ff?style=flat-square&logo=visual-studio-code&logoColor=FFFFFF)
![](https://img.shields.io/badge/-Flask-5555ff?style=flat-square&logo=flask&logoColor=ffffff)  ![](https://img.shields.io/badge/-Redux-5555ff?style=flat-square&logo=redux&logoColor=ffffff)  ![](https://img.shields.io/badge/-Postgres-5555ff?style=flat-square&logo=sequelize&logoColor=ffffff)  ![](https://img.shields.io/badge/-GitHub-5555ff?style=flat-square&logo=github&logoColor=ffffff)
## Technical Details
Table Open was built using Flask as it's backend, and React / Redux for it's front end. Python is our group's second langauge and learning it's intricacies while developing a project such as this assisted us in gaining experience working in it's environment.

A good portion of development time was spent making the user experience as smooth as possible by accounting for as many realistic edge cases as we could. We wanted to make sure that our site was as close to production ready as possible.
## Planned Features
 - [ ] Users can upload their images to AWS instead of just providing a URL
 - [ ] Users can provide a .pdf of their restaurants menu to be viewed by potential clients
 - [ ] Users can see how many other people have favorited a restaurant
 - [ ] Restaurant average scores will appear on the main / route
## Screenshots
### Restaurants
![Restaurants](https://upload.wikimedia.org/wikipedia/commons/1/19/Under_construction_graphic.gif)
### Restaurant Details
![RestaurantDetails](https://upload.wikimedia.org/wikipedia/commons/1/19/Under_construction_graphic.gif)
### User Profile
![UserProfile](https://upload.wikimedia.org/wikipedia/commons/1/19/Under_construction_graphic.gif)
