# Tweet-AI Backend Service

## Overview

The `tweet-ai` backend service is designed to manage Autobots, their posts, and comments. It creates 500 new Autobots every hour, each with 10 new posts and 10 comments per post. This service uses data from [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) and provides a RESTful API for developers to interact with the data.

## Features

- **Automatic Autobots Creation:** Creates 500 new Autobots every hour with associated posts and comments.
- **Rate Limiting:** Limits API requests to 5 per minute per developer.
- **Pagination:** Provides pagination for API responses with a limit of 10 results per page.
- **API Documentation:** Fully documented using Swagger.

## Installation

### Prerequisites

- Node.js
- npm

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Avwerosuoghene/tweet-ai-backend.git
    cd tweet-ai-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure your environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret

    PORT_DEV=your_preferred_port
    DB_NAME_DEV=your_db_name
    DB_USER_DEV=your_db_user
    DB_PASSWORD_DEV=your_db_pass
    DB_HOST_DEV=your_db_host
    DB_DIALECT_DEV=your_db_dialect
    ```

4. **Run the application:**

    ```bash
    npm run dev 
    ```
    This runs the application in your development environment

### Database Initialization

Ensure your database is set up and running. The schema will be created automatically when the application starts.

### Background Process

The application automatically creates 500 new Autobots every hour using the `node-cron` library to schedule the task.

## API Endpoints

### GET /autobots

Fetch a list of Autobots.

### GET /autobots/count

Fetch total number of Autobots.

### GET /autobots/:id/posts

Fetch all post for a given Autobot.

### GET /posts/:postId/comments

Fetch all comment for a given Post.


### Rate Limiting

Developers are limited to 5 requests per minute. Exceeding this limit will result in a 429 Too Many Requests response.

### API Documentation

For detailed API documentation, visit the Swagger UI at http://localhost:your_running_port/api-docs.

