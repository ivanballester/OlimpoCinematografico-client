# True Films

## (https://truefilms.netlify.app/)

<img src="https://truefilms.netlify.app/assets/portada-Dm_TWCLL.png" alt="Nombre del logo" width="200"/>


## Description

This site is dedicated to movie reviews and critiques. I created it to provide a platform for film enthusiasts to explore detailed reviews and ratings. The design focuses on a clean and modern look, making it easy for users to navigate and find the information they need.

#### https://github.com/ivanballester/OlimpoCinematografico-client
#### https://github.com/ivanballester/OlimpoCinematografico-server

## Technologies and Libraries Used

- **HTML** - For structuring the content of the site.
- **CSS** - For styling and layout design.
- **JavaScript (JS)** - For adding interactivity and dynamic functionality.
- **React** - A JavaScript library for building user interfaces.
- **Axios** - For making HTTP requests to fetch data.
- **React Context** - For state management across the application.


## Backlog Functionalities

- **More Films**: Expand the database to include a larger collection of films.
- **Enhanced Film Information**: Provide more detailed information about each film, such as cast, crew, trailers, and behind-the-scenes content.
- **User-Generated Reviews**: Allow more users to sign up and create reviews, turning the platform into a social space for film critics.
- **Social Media Integration**: Enable features like following other reviewers, commenting on reviews, and sharing reviews on social media platforms.
- **Rating System**: Implement a more sophisticated rating system, allowing users to rate films on multiple criteria (e.g., acting, directing, screenplay).
- **Recommendation Engine**: Add a feature to recommend films based on user preferences and past reviews.
- **Advanced Search and Filters**: Improve the search functionality with advanced filters (e.g., genre, release date, rating).
- **User Profiles**: Create customizable user profiles where reviewers can showcase their favorite films, ratings, and review history.


# Client Structure

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **reviews** - As a user I want to be able to acces reviews and interact with users and criticians
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

## Client Routes


## React Router Routes (React App)
| Path                      | Page            | Components         | Permissions              | Behavior                                                      |
| ------------------------- | --------------- | ------------------ | ------------------------ | ------------------------------------------------------------- |
| `/`                       | Home            |                    | public                   | Home page                                                     |
| `/signup`                 | Signup          |                    | anon only `<IsAnon>`     | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | Login           |                    | anon only `<IsAnon>`     | Login form, link to signup, navigate to homepage after login  |
| `/profile`                | Profile         | EditProfile        | user only `<IsPrivate>`  | Navigate to homepage after logout, expire session             |
| `/about-me`               | AboutMe         |                    | public                   | Display information about the site or user                    |
| `/reviews`                | Reviews         | ReviewList         | public                   | Display a list of all reviews                                 |
| `/review/:id`             | ReviewDetails   | ReviewDetails      | public                   | Display details of a specific review based on ID              |
| `/create-review`          | CreateReview    | ReviewForm         | admin only `<IsPrivate>` | Form to create a new review, navigate to review list after creation |


## Other Components

- Navbar
- Footer

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()


- External API
  - TheMovieDataBase.movies
  - TheMovieDataBase.popular
  - TheMovieDataBase.upcoming
  - TheMovieDataBase.movies.data
  
## Context

- auth.context
  
## Links


### Project

[Repository Link Client](https://github.com/ivanballester/OlimpoCinematografico-client)

[Repository Link Server](https://github.com/ivanballester/OlimpoCinematografico-server)

[Deploy Link](https://truefilms.netlify.app/)


### Slides

[Slides Link](www.your-slides-url-here.com)
