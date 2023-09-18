<!-- markdown-int-disable MD024 -->
# Social Cards

**IMPORTANT**: Please read this document closely. Many crucial details are documented and resources are linked within it.

Before starting on your project, assemble a list of the tasks you think you need to do and discuss how you will tackle these together.

**Before any code can be written**, the front-end will need to make some basic [wireframes](https://www.orbitmedia.com/blog/7-reasons-to-wireframe/#:~:text=for%20your%20website.-,Wireframes%20are%20simple%20black%20and%20white%20layouts%20that%20outline%20the,focusing%20on%20a%20site's%20structure). 

## Description & Overview

Imagine a social network, like Twitter or Instagram. Imagine electronic greeting cards. Now imagine them together -- that's what you are building as a group in this project.

The social cards application lets users sign up, create greeting cards, and follow each other. A user can see cards shown from newest to oldest: they can see a collection of their own cards, a collection of cards by users they follow, and a collection of all cards.

Your application is really two applications -- a back-end API written with Django REST Framework and a front-end React application. These applications will communicate via requests from the front-end and responses from the back-end. The front-end application should be deployed on [Netlify](https://www.netlify.com/). The backend API is available at [https://social-cards.fly.dev](https://social-cards.fly.dev), and [documentation for the endpoints is here](https://social-cards.fly.dev/api/docs).

### Cards and Customizable Options

Once a user has an account on your site, they can create "cards." You may choose to call these something else -- creative interpretation is always welcome. Think of a card as a visual message with customizable text, styling and images. As a group, you should decide on the customizable options, but there should be at least three. Some examples of customizable options you can offer users are:

- the card color (from a predefined list)
- the border style ([here is an article on making cool borders with CSS](https://amethystwebsitedesign.com/decorative-borders-with-only-css-and-no-images/))
- the font (from a predefined list; choose a set of fonts to bring in from [Google Fonts](https://fonts.google.com/))
- the [text alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
- an image to include (Note: uploading images to an API will require significantly more work. An alternative is to use the [Unsplash API](https://unsplash.com/developers) on the front-end and store the image location (url) on the back-end.)
- an outer message and inner message. The inner message would be shown with some sort of transition on click, like the front and interior of a greeting card.

Discuss as a team how you will implement this and make a plan that makes sense to everyone.

## The Front End Application

The front-end team will build a React application that will send requests to the Social Cards API.

This application is social card-sharing platform, but you can theme it and design it however you like. This application should allow any user to see all cards, but only logged-in users can create cards and follow other users.

Users should be able to see three screens of cards:

- a screen of cards from users they follow
- a screen of their own cards
- and a screen of cards from all users

Does this mean three components? Not necessarily.

Each collection should show a reasonable number of cards, sorted with the newest first, and allow the user to click to see more.

If you would prefer to implement [an infinite scroll](https://www.smashingmagazine.com/2013/05/infinite-scrolling-lets-get-to-the-bottom-of-this/), go for it!

Your application should be polished. It should gracefully handle loading, error, and empty (e.g., no results for a search) states. Forms should include validation. It must be deployed.

### Minimum Requirements

- A user can see all the cards from all users (or all the public/published cards if you have a way to do this)
- A user can see all the cards they themselves have created
- A user can see all the cards from a user they follow
- A user can design and create a new card, with at least three customizable options. The UI should show a preview of the card as it is being created.
- A user can update (edit) a card they've created
- A user can delete a card they've created
- A user can follow another user
- A user can unfollow another user
- A user can see a list of users they follow
- The application implements client-side routing.
- The application is styled using a CSS library/framework.
- The application is deployed to Netlify and running in production without errors.

#### Routing

**Front-end routes are completely independent of back-end URLS.** You can design the routes that make sense for your front-end application. Some suggestions for routes include:

- Login and registration should each have a URL.
- The list of all cards should have its own route.
- The list of cards created by a specific user should have its own route, and should only be viewable by users who follow that user.
- The card editor should have its own route.
- User profiles, or the screen where users can see all their own published and unpublished cards should have their own route.
- If implementing pagination, you will likely use routes to implement this.

### Authenticating from the front-end

Your back-end dev(s) will show you how authentication works with Django REST Framework. What you will need to do is get an authentication token from the back-end (usually via POST to a URL like `/api/auth/token/login/`) and store that token in local storage for use on later requests.

### Design

As for how all of this should look, that is up to you! We are not providing wireframes, but your group should sit down and make decisions about what pages will be needed and what they will look like before you start writing code.

⚠️ Make sure your UI has sensible options for your user. For example: A user who is not the creator of a card should not see buttons or links to edit a card. If a user is logged in, they should no longer see options to log in, but they should see an option to log out. The flow through your application should make sense according to what a user would reasonably expect.

## 🌶️ Spicy Features

The minimum set of features is required, but you might consider adding other features. You should go for it if you have time! Some ideas:

- Allow users to mark cards as drafts (cards not yet shown that are still being created) and choose when to publish them. You would then only show cards that are not in draft status.
- Allow users to upload a profile photo
- A color picker instead of a menu of predefined colors for the card background
- Liking or favoriting cards
- Allow comments on cards only from followers
- Make following two-way (so that it's "friends" instead of followers) and implement friend requests
- Allow users to block followers

Be creative and make this project your own.

### CORS Gotcha on the front end

CORS stands for Cross-Origin Resource Sharing and is a way to configure a server's approach to the same-origin policy that governs requests in browsers. The same-origin policy is a security feature that prevents malicious code from one site from accessing data on another site. CORS is a way to relax this policy and allow requests from other origins. CORS is implemented on the back-end, but front-end developers need to be aware of it.

If CORS is not implemented on the server, or is configured incorrectly, front-end developers will not be able to make requests to the server from the browser. This will result in a CORS error in the browser console.

A gotcha for CORS on the front end is **a missing trailing slash in your request URL**. If CORS headers are set correctly on the backend but you are still getting a CORS error on the front end, and the error mentions a redirect, try adding a forward slash (`/`) to the end of the URL for the request that is failing.
