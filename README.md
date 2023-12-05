# Full stack invoices app with React, Next.js, Tailwind CSS, and Firebase

This project is a full-stack web app that provides users with full CRUD control over a list of invoices, built with small business owners with simple needs in mind. It leverages Firebase Authentication, Firestore, and Functions to enable users to access their invoice data across multiple devices.

**View the live app hosted with Vercel:** [https://invoices.ivanolmo.com/](https://invoices.ivanolmo.com/)

## Getting Started

- An account with Firebase is required: [https://firebase.google.com](https://firebase.google.com)
- Clone the repository

```
git clone https://github.com/ivanolmo/nextjs-invoice-app.git
```

- Change to the project directory

```
cd nextjs-invoice-app
```

- Install dependencies:

```
npm install
```

- Create an env file and populate with your environment variables from Firebase using the following as a template (or use the env.example file in the repo):

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_URL=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

- Run the app

```
npm run dev
```

## Tech Stack

- **React with Next.js:** This application utilizes the power of Next.js for server-side rendering, providing a fast and efficient user experience. The `react-firebase-hooks` package is used to keep invoice data updated in real-time, and global app state is managed with the React Context API.

- **Tailwind CSS:** Tailwind CSS is used for styling, providing a flexible and efficient approach to design.

- **Firebase:** Firebase's client-side SDK is used for reading invoices and user management, while the admin SDK handles invoice creation, updates, and deletes.

  - **Authentication:** Users can create an account with an email & password, or use the Google or Github auth provider. All content, except for the welcome, sign in, and sign up pages, requires an authenticated user. Users only have access to their own set of invoices. On the user profile page, users have the ability to delete their account. The API routes are also protected and won't complete requests without a verified user token.

  - **Firestore:** All user invoices are saved as a sub-collection under a user's document. Data is kept synchronized in real-time. Firestore access rules add an additional layer of data protection. Invoices can only be read and manipulated and user accounts deleted if the request user ID is valid and matches the ID for the collection of documents being accessed.

  - **Functions:** On new user creation, a cloud function is triggered to populate the new user's invoice list with mock data for demonstration purposes. On user deletion, another function is triggered that deletes all user data (user document and any associated invoices).

## Optimizations

The application is designed with performance in mind. It primarily uses static generation with client-side data fetching. This approach ensures users see a loading state instead of a blank screen, enhancing the user experience.

## Lessons Learned

This project has been a valuable exercise in exploring different ways to achieve the same functionality, and the importance of organization in a codebase. Leveraging packages like `react-firebase-hooks` for real-time data updates has streamlined the development process.

The tech landscape is always evolving, with new frameworks, packages, and hooks being introduced regularly. Building this app was a fun opportunity to experiment with various tools and tech.

## Acknowledgements

Special thanks to [@leerob](https://github.com/leerob) and [Fireship](https://www.youtube.com/c/Fireship) for their informative content on Next.js and Firebase, respectively. Their content is top-notch 😁
