<!-- markdown-int-disable MD024 -->
# Questionbox

**IMPORTANT**: Please read this document closely. Many crucial details are documented and resources are linked within it.

Before starting on your project, assemble a list of the tasks you think you need to do and discuss how you will tackle these together.

**Before any code can be written**, you will need to make some basic [wireframes](https://www.orbitmedia.com/blog/7-reasons-to-wireframe/#:~:text=for%20your%20website.-,Wireframes%20are%20simple%20black%20and%20white%20layouts%20that%20outline%20the,focusing%20on%20a%20site's%20structure).

## Description & Overview

This application is a question and answer platform, similar to Stack Overflow. It does _not_ have to be themed to code-related questions, though. Theming and design is up to you.

Your application is really two applications -- a back-end API written with Django REST Framework and a front-end React application. These applications can communicate via requests from the front-end and responses from the back-end. The front-end application should be deployed on [Netlify](https://www.netlify.com/). The back-end application is deployed at [qb.fly.dev](https://qb.fly.dev/). [Documentation for all available endpoints is is available here](https://qb.fly.dev/docs/).

#### Minimum Requirements

- Allow an authenticated user to create a question (allowing for long-form text).
- Allow an authenticated user to create an answer to a question (one question can have many answers).
- Allow unauthenticated users to view all questions.
- Allow unauthenticated users to view a single question with all its answers.
- Sign up for a new account (register as a new user)
- Log in and out using token-based authentication.
- Allow a user to get a list of all the questions they have posted.
- Allow a user to get a list of all the answers they have posted.
- Allow the original author (ONLY the original author) of the question to mark an answer as accepted.
- Questions cannot be edited once they have been posted.
- A question can be deleted by its author, whether answered or unanswered.
- Users can search the text of questions by keyword.
- Deployed to Netlify and running in production without errors.

## The Front End Application

The front-end team will build a React application that will send requests to the QuestionBox API.

This application is a question and answer platform, similar to Stack Overflow in format, but you can theme it and design it however you like. This application should allow logged-in users to ask questions, give and receive answers, and mark an answer as accepted.

Users that are not logged in should still be able to view questions and answers, but cannot ask questions, give answers, or mark answers as accepted.

Your application should be polished. It should gracefully handle loading, error, and empty (e.g., no results for a search) states. Forms should include validation. It must be deployed.

### Minimum Requirements

- Users can create an account (i.e., register).
- Users can log in and log out.
- Unauthenticated users can see all questions.
- Unauthenticated users can see the answers for a single question.
- Authenticated users can ask (post) a question.
    - A question cannot be edited.
    - A user can delete their own question.
- Authenticated users can post an answer a question.
- Authenticated users can mark an answer to their own question as "accepted" (a question can have more than one accepted answer). The UI should show some indicator next to answers that have been accepted.
- Authenticated users have a profile page that lists all of their own questions and answers.
- Authenticated users can bookmark or save a question or answer they like.
- The application implements client-side routing.
- The application is styled using a CSS library/framework.
- The application is deployed to Netlify and runs in production without errors.

#### Routing

**Front-end routes are completely independent of back-end URLS.** You can design the routes that make sense for your front-end application. Some suggestions for routes include:

- Login and registration should each have a URL.
- The list of questions should have its own route.
- Consider having a route for one question where you display that question and all its answers.
- User profiles should have their own route.
- If implementing pagination, you will likely use routes to implement this.

### Authenticating from the front-end

Your back-end dev(s) will show you how authentication works with Django REST Framework. What you will need to do is get an authentication token from the back-end (usually via POST to a URL like `/api/auth/token/login/`) and store that token in local storage for use on later requests.

### 🌶️ Spicy Features

- Allow a user to "unstar" something they have previously starred.
- Allow the poster of a question to add tags to their question.
    - Allow users to filter questions by tag.
- Allow users to search questions using a search term.
- Add pagination to your lists of questions, so that you only show a certain number of questions at a time and users can page through them.
- Allow questions to be edited if they have not been answered.
- Allow users to show only the questions and/or answers they have starred.
- Allow users to upvote/downvote answers.
- Allow users to follow/unfollow each other.
- Allow users to upload a profile photo.

### CORS Gotcha on the front end

CORS stands for Cross-Origin Resource Sharing and is a way to configure a server's approach to the same-origin policy that governs requests in browsers. The same-origin policy is a security feature that prevents malicious code from one site from accessing data on another site. CORS is a way to relax this policy and allow requests from other origins.

If CORS is not implemented on the server, or is configured incorrectly, front-end developers will not be able to make requests to the server from the browser. This will result in a CORS error in the browser console.

A gotcha for CORS on the front end is **a missing trailing slash in your request URL**. If CORS headers are set correctly on the backend but you are still getting a CORS error on the front end, and the error mentions a redirect, try adding a forward slash (`/`) to the end of the URL for the request that is failing.
