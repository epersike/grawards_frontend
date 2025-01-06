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

## Project Structure

```
angular-movie-app
├── e2e
│   ├── src
│   │   └── app.e2e-spec.ts
│   └── protractor.conf.js
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── dashboard
│   │   │   │   ├── dashboard.component.html
│   │   │   │   ├── dashboard.component.scss
│   │   │   │   ├── dashboard.component.spec.ts
│   │   │   │   └── dashboard.component.ts
│   │   │   ├── movies-list
│   │   │   │   ├── movies-list.component.html
│   │   │   │   ├── movies-list.component.scss
│   │   │   │   ├── movies-list.component.spec.ts
│   │   │   │   └── movies-list.component.ts
│   │   ├── services
│   │   │   └── movie.service.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   └── app.component.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.scss
│   └── test.ts
├── angular.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/angular-movie-app.git
   ```
2. Navigate to the project directory:
   ```
   cd angular-movie-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

To run the application in development mode, use the following command:
```
ng serve
```
Open your browser and navigate to `http://localhost:4200`.

## Running Tests

To run unit tests, use:
```
ng test
```

For end-to-end tests, use:
```
ng e2e
```

## API Reference

The application interacts with the following API endpoint:
- **Movies API**: `https://challenge.outsera.tech/api/movies`

## License

This project is licensed under the MIT License.