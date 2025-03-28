# BetterAuth Demo Project

This project is a **Next.js** application that demonstrates the integration of **BetterAuth** for user authentication. It allows users to sign up, log in, and manage their sessions securely.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- Session management
- Password hashing and security
- Responsive design with Tailwind CSS
- Debugging and logging for API requests

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **BetterAuth**: A library for handling authentication.
- **PostgreSQL**: A relational database for storing user data.
- **Prisma**: An ORM for database interactions.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **TypeScript**: A superset of JavaScript that adds static types.

## Setup Instructions

1. **Clone the repository**:   ```bash
   git clone https://github.com/HamzaC117/betterauth-demo.git
   cd betterauth-demo   ```

2. **Install dependencies**:   ```bash
   npm install   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:   ```
   DATABASE_URL=your_database_url
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=your_secret_key
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000   ```

4. **Run database migrations**:
   Ensure you have Prisma set up and run the migrations:   ```bash
   npx prisma migrate dev   ```

5. **Start the development server**:   ```bash
   npm run dev   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

- **Sign Up**: Users can create an account by providing their name, email, and password.
- **Log In**: Users can log in using their email and password.
- **Dashboard**: After logging in, users will be redirected to their dashboard where they can see their information.

## Deployment

To deploy this application, you can use platforms like Vercel or Heroku. Make sure to set the environment variables in your deployment settings.

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.