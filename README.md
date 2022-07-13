# Full stack invoices app with React, Next.js, Tailwind CSS, and Firebase

This app is a challenge on [Frontendmentor.io](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl). The goal is to implement a fully functional app where a user has full CRUD control over a list of invoices.

Instead of using `localStorage`, I decided to go a step further to add Firebase Authentication, Firestore, and Functions to the project. A user has the ability to access their invoice data with any device.

**View the live app hosted with Vercel:** [https://nextjs-invoice-app.vercel.app/](https://nextjs-invoice-app.vercel.app/)

## How it's made

**Tech used:** React with Next.js, Tailwind CSS, and Firebase

### React with Next.js

I've been using the React library for small projects for a while, and recently became interested in the Next.js framework after a friend mentioned I should look into it. I really like the potential of SSG, and this whole project was statically generated (and **blazing** fast) before I decided to add authentication. It's definitely still a very fast app that is now mostly using client side rendering.

Invoice data is kept updated in real-time with the `react-firebase-hooks` package, and global app state is managed with the React Context API.

Seeing how fast Next.js can be made this a very fun learning experience, and I'll definitely continue to use it in my future projects.

### Tailwind CSS

This is the first project where I've used Tailwind for nearly all styling, and I really like it. Some of the class names can get insanely long, but this is a solo project so I had no issues with readability. There are a few things that can help with class names and readability, like the [cntl](https://www.npmjs.com/package/cntl) package, and VSCode extensions like [Headwind](https://github.com/heybourn/headwind) and [Inline Fold](https://github.com/moalamri/vscode-inline-fold). Overall, I'll continue to use Tailwind for my own projects.

### Firebase

This wasn't my first Firebase project, but so far it's been the most in-depth. I'm using both the client side SDK for reading invoices and user management, and the admin SDK in the API/server environment that handles invoice creation, updates, and deletes.

- Authentication

  - Users can create an account with email & password, or use the Google or Github auth provider.
  - Other than the welcome, sign in, and sign up pages, all content requires an authenticated user.
  - Users only have access to their own set of invoices.
  - On the user profile page, user's have the ability to delete their account.
  - The API routes are also protected and won't complete requests without a verified user token.

- Firestore

  - All user invoices are saved as a sub-collection under a user's document.
  - Data is kept synchronized in real-time.
  - Firestore access rules add an additonal layer of data protection. Invoices can only be read and manipulated and user accounts deleted if the request user ID is valid and matches the ID of the document being accessed.

- Functions
  - On new user creation, a cloud function is triggered to populate the new user's invoice list with mock data.

## Optimizations

One thing I've learned is to always look for opportunities for improvement (within reason). I'm currently researching how to make authenticated content and static generation work. I've found that I can provide a statically generated loading state or skeleton when a page first loads, then hydrate the client with authenticated data. A user will at least see a loading state instead of a blank screen. It's not really necessary for this app, but it's a refactor that I'd like to implement because it seems like a great approach and the knowledge gained will be valuable.

One thing I thought of trying to improve is the mobile Google Lighthouse score. The app feels very fast, but the mobile score says otherwise. The main change between the scores was moving from static site generation and no authentication, to client side rendering with authentication. Lighthouse artifically throttles both the network connection and CPU power when testing in mobile mode, so I'm not spending a lot of time trying to squeeze out a few points. Here is a comparison SSG/no auth to CSR/with auth (desktop scores were surprisingly not affected at all):

Before auth:
<>

After auth:
<>

## Lessons Learned:

There are SO MANY WAYS to do the same thing (and also some very common, very reusable patterns). Organization is pretty important. Personally, I've come a long way from previous projects where everything was stuffed into a single `/src` folder.

There's always some new framework, new package, new hook to use. It can get a little overwhelming, and I know I spent a lot of time trying out a bunch of different things in this project (custom hooks, auth, SSG/SSR/CSR/ISR, tiny components, medium sized components, Next.js folder structure navigation, etc.). Overall, I'm happy with my end result.

## Shoutouts

I really like content put out by [@leerob](https://github.com/leerob) and [Fireship](https://www.youtube.com/c/Fireship). Lee has put out of ton of Next.js content which made it easy for me to get started, and I got a massive headstart with Firebase with content from Jeff at Fireship. There was of course a ton more content on StackOverflow and the general internet, but I can't really list it all.
