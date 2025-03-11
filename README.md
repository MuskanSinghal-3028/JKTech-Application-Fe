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
