# WanderLust - A Full-Stack  Hotel Listing Web Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Rating Hotels](#rating-hotels)
  - [Adding Local Hotels](#adding-local-hotels)
  - [Viewing Hotel Locations](#viewing-hotel-locations)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

WanderLust is a full-stack web application developed using Node.js, Express.js, EJS, and MongoDB. It is designed to help travelers discover and rate local hotels, as well as add new hotels with their respective locations. This application offers users a seamless way to contribute to the travel community by sharing their hotel experiences and discovering new places to stay during their adventures.

## Features

- User Registration and Authentication
- User Login
- Hotel Rating and Review
- Adding Local Hotels with Location Details
- Interactive Map to Display Hotel Locations

## Prerequisites

Before you get started with WanderLust, make sure you have the following prerequisites installed on your system:

- Node.js
- npm (Node Package Manager)
- MongoDB (You can use a local or cloud-based MongoDB instance)
- Git (optional)

## Getting Started

### Installation

1. Clone the WanderLust repository to your local machine (if you haven't already):
   ```bash
   git clone https://github.com/Himanshu8825/Wander-Lust.git
   ```

2. Navigate to the project directory:
   ```bash
   cd WanderLust
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the project root directory and add the following configuration settings:

   ```env
   PORT=3000         # Port to run the server
   MONGODB_URI= mongodb+srv://admin:wanderLust@cluster0.rjxok2x.mongodb.net/
   SESSION_SECRET=jwSNyJXvP7q7N1j9qjGYxin9I0I
   ```

2. Replace `your_mongodb_connection_string` with your MongoDB connection string.

3. Generate a strong session secret key for `SESSION_SECRET`.

### Running the Application

To start the WanderLust application, run the following command:

```bash
npm start
```

The application will be accessible at `http://localhost:3000` by default. You can modify the `PORT` in your `.env` file if needed.

## Usage

### User Registration

- Visit the application in your web browser.
- Click on the "Sign Up" option to create a new user account.
- Provide your details and submit the registration form.

### User Login

- After registration, click on "Log In."
- Enter your credentials and click "Log In" to access your account.

### Rating Hotels

- Once logged in, you can browse listed hotels.
- Click on a hotel to view details.
- Rate and review the hotel to share your experience.

### Adding Local Hotels

- To add a local hotel, click on "Add Hotel" in the navigation menu.
- Provide the hotel's information, including name, description, and location details.

### Viewing Hotel Locations

- Click on "Hotels Map" to view a map displaying the locations of all listed hotels.
- Click on a map marker to view hotel details.

## Technologies Used

WanderLust was built using the following technologies:

- Node.js
- Express.js
- EJS (Embedded JavaScript)
- MongoDB
- Mapbox for Map Integration

## Contributing

We welcome contributions from the open-source community to enhance WanderLust. Feel free to create issues, submit pull requests, or offer suggestions to help us improve the application.

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.