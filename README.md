# Inside Scoop

This project is a privacy-focused family and friends review app that provides a read-only REST API for managing Users, Stores, and Reviews. The data is sourced from a JSON file.

## Project Structure

```
hono-server-app
├── src
│   ├── app.ts          # Entry point of the application
│   ├── routes          # Contains route definitions for the API
│   │   ├── users.ts    # User-related API endpoints
│   │   ├── stores.ts   # Store-related API endpoints
│   │   └── reviews.ts   # Review-related API endpoints
│   ├── data
│   │   └── db.json     # JSON data source for Users, Stores, and Reviews
│   └── types
│       └── index.ts    # TypeScript interfaces for data structures
├── package.json         # npm configuration file
├── tsconfig.json        # TypeScript configuration file
└── README.md            # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd hono-server-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

## API Usage

### Users

- **GET /users**: Retrieve a list of users.

### Stores

- **GET /stores**: Retrieve a list of stores.

### Reviews

- **GET /reviews**: Retrieve a list of reviews.

## License

This project is licensed under the MIT License.


## Tasks
[] Add database interactions.
   - Drizzle on D1
[] Add token based auth.
   - Use Better Auth library
[] Add request validations.