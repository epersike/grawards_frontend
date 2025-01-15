# Angular Movie App

This is an Angular application that provides a dashboard and a movies list view. The application retrieves movie data from an external API and displays various statistics and information.

## Features

- **Dashboard View**: 
  - Displays a table of years with more than one winner.
  - Shows a table of the three studios with the most victories.
  - Lists producers with the biggest and smallest intervals between victories.
  - Allows users to select a year to view the winners of that year.

- **Movies List View**: 
  - Displays a paginated list of movies.
  - Includes filters for year and winner status.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/epersike/grawards_frontend.git
   cd grawards_frontend
   ```
2. Navigate to the project directory:
   ```
   cd grawards_frontend
   ```
3. Install the dependencies:
   ```
   yarn install
   ```

## Running the Application

To run the application in development mode, use the following command:
```
yarn start
```
Open your browser and navigate to `http://localhost:4200`.

## Running Tests

To run unit tests, use:
```
yarn test
```

## API Reference

The application interacts with the following API endpoint:
- **Movies API**: `https://challenge.outsera.tech/api/movies`

## License

This project is licensed under the MIT License.