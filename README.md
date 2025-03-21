## Overview
I have developed a simple blog application where users can log in using Google authentication. Authenticated users can create, update, read, and delete their own posts. For testing, I have written unit test cases using Jest and implemented end-to-end testing with Cypress. Additionally, I have written a Dockerfile and a deployment script to deploy the service on AWS EKS. This project covers the complete application lifecycle, from development and testing to deployment.

## Features
- Users can log in only via Google authentication; the app redirects to the Google login screen on launch.
- After logging in, users are directed to the dashboard, where they can view all their posts.
- Users can create new posts.
- Users can edit their existing posts.
- Users can delete posts.
- Users won't be able to route to any url if logged out
- Users can log out anytime.

## Tools & Technologies

### Development
- React
- NestJs
- Material UI
- TypeOrm

### Database
- Postgres

### Testing
- Cypress
- Jest

# JKTech Application Frontend

## Installation and setup

Follow these steps to set up the project:

1. Clone the repository:
    ```sh
    git clone https://github.com/MuskanSinghal-3028/JKTech-Application-Fe.git
    ```

2. Navigate to the project directory:
    ```sh
    cd JKTech-Application-Fe
    ```

3. Checkout the `develop` branch:
    ```sh
    git checkout develop
    ```

4. Install the dependencies:
    ```sh
    npm i
    ```

5. Adjust your `.env` file according to your service.

6. Start the application:
    ```sh
    npm run start
    ```

7. This will open your application. (Login fresh in incognito for Google login)

## Testing

### Cypress (End to End Testing)

1. Copy `access_token` from your localhost.
2. Go to `cypress/e2e/posts.cy`.
3. Replace `validJwtToken` with your copied token.
4. Run Cypress:
    ```sh
    npx cypress open
    ```
