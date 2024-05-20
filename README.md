# Task Management API

## Description

This is a task management system API built with NestJS and MongoDB. It includes user authentication, CRUD operations for managing tasks

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/omejeemmanuel1/task-manager.git
    cd task-manager
    ```

2. Install dependencies:

    ```bash
    yarn add
    ```

3. Set up environment variables:
    Create a `.env` file with the following content:

    ```env
    MONGODB_URI=
    JWT_SECRET=
    ```

4. Run the application:

    ```bash
    yarn run start
    ```

## API Endpoints

- **Auth**
  - `POST /auth/register` - Sign up a new user
  - `POST /auth/login` - Sign in and receive a JWT

- **Tasks**
  - `GET /tasks/get-tasks` - Get all tasks (Protected)
  - `GET tasks/single-task/:id` - Get a task by ID (Protected)
  - `POST tasks/create-task` - Create a new task (Protected)
  - `PATCH tasks/update-task/:id` - Update a task (Protected)
  - `DELETE tasks/delete-task/:id` - Delete a task (Protected)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
