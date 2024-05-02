# MERN Chat App with Socket.io

Welcome to our MERN Chat App repository! This project aims to create a full-stack web application using the MERN stack (MongoDB, Express.js, React.js, Node.js) along with Chakra UI for the frontend and Socket.io for real-time communication.

## Features

- Real-time chat functionality powered by Socket.io
- User authentication and authorization
- Responsive UI design with Chakra UI
- MongoDB Atlas integration for database storage
- Scalable and maintainable codebase following best practices

## Technologies Used

- MongoDB Atlas: A fully managed cloud database service
- Express.js: Node.js web application framework
- React.js: A JavaScript library for building user interfaces
- Node.js: A JavaScript runtime environment
- Chakra UI: A simple, modular and accessible component library for React
- Socket.io: A library that enables real-time, bidirectional and event-based communication between web clients and servers

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/harshsharma20503/ChatApp.git
   ```
2. Navigate to the project directory:

   ```bash
   cd ChatApp
   ```
3. Set Up enviornment Variables
   1. Create a `.env` file in the backend folder of the project.
   2. Add the following environment variables to the `.env` file:

   ```bash
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN = *
   JWT_SECRET = 

   CLOUDINARY_CLOUD_NAME = 
   CLOUDINARY_API_KEY = 
   CLOUDINARY_API_SECRET = 

   EMAIL_ID = 
   APP_PASSWORD = 
   ```
   Replace with your own mongoDB atlas string for database, cloudinary keys for uploading images, and email and app password for verification mail using nodemailer.
   
5. Run the Backend Server from inside backend folder
   
   ```bash
   npm run dev
   ```
6. Run the frontend server from inside the frontend folder
   
   ``` bash
   npm install
   npm run dev
   ```
   
## Contributing

We welcome contributions from the community! If you find any issues or have suggestions for improvements, please feel free to open an issue or create a pull request.

## Acknowledgements

- Socket.io Documentation: [https://socket.io/docs/](https://socket.io/docs/)
- Chakra UI Documentation: [https://chakra-ui.com/docs/getting-started](https://chakra-ui.com/docs/getting-started)
- MongoDB Atlas Documentation: [https://docs.atlas.mongodb.com/](https://docs.atlas.mongodb.com/)
- React.js Documentation: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
- Express.js Documentation: [https://expressjs.com/en/starter/installing.html](https://expressjs.com/en/starter/installing.html)
