# Profile Management Application
Overview
  
`This project is a Profile Management Application built using React. It allows users to create, view, edit, and delete profiles. The application communicates with a backend JSON server to handle profile data.`

# Features

Create Profile: Users can fill out a form to create a new profile.
View Profile: Displays existing profile details.
Edit Profile: Users can edit their profile details, pre-filling the form with existing data.
Delete Profile: Users can delete their profile, which removes it from the database and local storage.
Error Handling: Displays appropriate error messages for various scenarios.
Technologies Used
Frontend: React, Axios
Backend: JSON Server (mock REST API)
Styling: CSS Modules

# Installation
Clone the repository:
git clone <repository-url>
cd <project-directory>

# Install dependencies:
npm install

# Start the JSON server: Make sure you have json-server installed globally. If not, install it using:

npm install -g json-server

# Create a db.json file for your mock database:

{
  "profile": []
}

# Start the JSON server:

json-server --watch db.json --port 3001

# Start the React application:

npm start

`The application will be available at http://localhost:3000.`

### API Endpoints
GET /profile: Retrieve the profile data.
POST /profile: Create a new profile.
PUT /profile/: Update an existing profile by ID.
DELETE /profile/: Delete a profile by ID.