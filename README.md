# Movie-Universe-Angular-Project
This app was created for my project defence @ SoftUni for my Angular course.

The project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.2.

Angular web application for reading and creating movies, also like and comment on them.

## Built with:

### Frontend:

- Angular 15.0.2.
- Angular Material
- Angular animations
- NgRx / store
- NgRx / effects
- HTML
- CSS
- SCSS
- Font Awesome 5

### Backend & Database:

- MongoDB
- Mongoose
- Node.JS
- Express

## Permissions:

| **Permissions for movies**    | User | Guest | 
| :--------------------------    | :---: | :---: |
| View Home page                 | ✅   | ✅   |
| View About page                | ✅   | ✅   |
| See All Movies                 | ✅   | ❌   |
| See Movies Details Page        | ✅   | ❌   |
| Search for Movie               | ✅   | ❌   |
| Create new Movie               | ✅   | ❌   |
| Edit movie * owner             | ✅   | ❌   |
| Delete movie * owner           | ✅   | ❌   |
| See likes of a Movie           | ✅   | ❌   |
| Like a Movie                   | ✅   | ❌   |
| Dislike a Movie * if liked     | ✅   | ❌   |
| See all Comments               | ✅   | ❌   |
| See all Comments likes         | ✅   | ❌   |
| Create a Comment               | ✅   | ❌   |
| Like a Comment                 | ✅   | ❌   |
| Dislike a Comment * if liked   | ✅   | ❌   |
| Login                          | ❌   | ✅   |
| Register                       | ❌   | ✅   |
| Logout                         | ✅   | ❌   |
| Profile                        | ✅   | ❌   |
| Edit Profile                   | ✅   | ❌   |

## Movie Universe

Angular web application for posting movies, making comments and viewing new movies. You can give likes to movies and comments to other people. Don't miss the opportunity to have the most liked or commented movie. This is my exam project for the SoftUni Angular course.

## Start the app

To start the application install all dependecies for the client and the rest-api with `npm install`. 

Start the rest-api with `npm run start`.

Connect with MongoDb

Then start the client with `ng serve`. 

This will navigate to `http://localhost:4200/` in the browser.

## Application Pages

### Home Page (logged out user)

Invites the user to log in to their account or to register. Shows information about most liked movie and most commented movie.

![Home Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/home%20page.PNG)

### Home Page (logged in user)

Navigation have changed.

![Home Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/header%20changed.PNG)

### Register Page (logged out user)

Register a user inside the database with **username**, **email** and **password**. Password inside the database is **hashed** (with bcrypt) and both passwords must match!

After successful registration redirects to the **Home page**, with an already logged-in user.

![Registration Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/register.PNG)

### Login Page (logged out user)

Logging an already registered user with the correct **email** and **password**.

After successful login redirects to the **Home page**, with an already logged-in user.

![Login Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/login.PNG)

### Logout Page (logged in user)

The logout action is available to logged-in users. Upon success, clear any session information and redirect the user to the **Home page**.

### All movies (for user)

There is a search field for movies by their name.

List of all movies. Each movie shows information about the movie name, author and count of likes and comments. There is a [Detail] button which leads to details page of the chosen movie.

![Movies Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/movies%20page.PNG)

Each movie have design like below:

![Movies Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/movie%20details.PNG)


### Details Page 

Logged in users should be able to view details about the movie. Clicking the Details button in a movie card should display the Details page.

If the currently logged-in user is the author of the post, the **Edit** and **Delete** buttons should be displayed, otherwise they should not be available.

Also all logged-in users can create comments and make like and dislikes of them or just to like and dislike the movie

Information about the movie:

- Movie name
- Movie created date
- Movie description
- Movie actors
- Movie comments

<details>
![Details Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/movie%20details.PNG)
</details>

<details>
    <summary>Details Page (users who didn't like)</summary>
If the user is not owner of the movie can give a like, same with the comments.

<details>
    <summary>Details Page</summary>
Notify the user that already liked the movie or the comment.
Movie comments section

![Details Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/movies%20comment%20section.PNG)
</details>

![Details Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/my%20movie%20details.PNG)
</details>


### Create Movie Page (logged in user)

The Create page is available to logged-in users. It contains a form for adding new movie.

Upon success, redirect the user to the All Movies page.

![Create Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/add%20movie.PNG)

### Delete Movie (logged in user and creator of the current movie)

Every author should be able to click over the [**Delete**] button - deleting the current movie from the database and the user should be redirected to the All Movies page.

### Edit Movie (logged in user and creator of the current movie)

The Edit page is available to logged-in users and it allows authors to edit their movies. Clicking the [**Edit**] button of a particular movie on the **Details page** should display the **Edit page**, with all fields filled with the data for the movie. It contains a form with input fields for all relevant properties. The edit operation should be done after change on any field. Upon success, redirect the user to the Details page for the current movie.

![Edit Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/edit%20movie.PNG)

### Profile Page (logged in user)

Logged-in users can see their profile page which shows information about their movies, liked movies and comment movies. 

![Profile Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/profile%20page.PNG)

![Profile Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/my%20profile%20-%20my%20movies.PNG)


![Profile Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/my%20profile%20-%20liked%20movies.PNG)


Users can edit their profile information.

![Profile Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/edit%20profile%20page.PNG)

### 404 Page Not Found

If Guests (not logged in) trying to access а page that it should not be able to, you must redirect them to the Login page.

If Users (logged in) trying to access а page that it should not be able to, you must redirect them to the Home page.

Use the following view for invalid paths:

![Not Found Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/page%20not%20found.PNG)

## Validation and Error Handling

The application should notify the users about the result of their actions.

In case of error, you should display div with class "error-message".

The user sees the last error, which disappears after 5 seconds.

### Login / Register

- The **Username** is required and should be at least 5 characters long.
- The **email** is required and should be valid: "peter@gmail.com"
- The password is required and should be at least 5 characters long.
- The repeat password should be equal to the password.

![Register Validate Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/registration%20validation%20form.PNG)

### Movie

- The **Movie name** is required and should be at least 3 characters long.
- The **Movie director** is required and should be at least 3 characters long.
- The **Movie release date** is required and should be at least 3 characters long.
- The **Image link** is required and should be valid.
- The **Description** is required and should be at least 10 characters long.
- The **Actors** are required and should complete custom validation - "Write name of actor separated with comma and new line!" and "Actors must be at least two!"

![Add Movie Page View](https://github.com/PetyaNacheva/softUni-Angular-exam/blob/master/picture%20files/add%20movie%20validation.PNG)
