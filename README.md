# Full-Bike - Capstone Concept by Leidy Martinez

## Problem Statement

Bicycle owners often struggle to find a convenient and reliable way to schedule maintenance and repairs. This can result in:
- Long wait times.
- Miscommunication with mechanics.
- A lack of transparency regarding service availability.

**Full-Bike** addresses these issues by providing a web-based platform that simplifies scheduling and enhances communication between customers and mechanics.

## MVP Feature Set

### 1. Account Creation and Login
- Customers can create accounts or log in to access their personal dashboard.
- Authentication ensures secure access to customer and mechanic features.

### 2. Service Selection
- Customers can choose between three service packages: **Gold**, **Silver**, or **Bronze**.
- Each package includes a description and estimated duration.

### 3. Scheduling
- Customers can select a date and time for service using a live calendar.
- The system dynamically updates available slots based on service duration and mechanic availability.

### 4. Issue Description/Mechanic Communication
- Customers can describe their bike issues in a text field while scheduling.
- Mechanics can contact customers directly through an in-app messaging system for clarifications or approvals.

### 5. Mechanic Dashboard
- Mechanics have access to a calendar view of all scheduled services.
- They can update availability and block out times for personal use or emergencies.

## Potential Additional Features

### 1. Interactive Bike Diagram
- Users can interact with a bike image to specify the location of the issue.

### 2. Payment Integration
- Customers can pay for services directly through the app.

### 3. Service History
- Customers can view past services and associated costs.

## Draft Technology Choices

- **Frontend**: React.js for a dynamic user interface.
- **Backend**: Node.js with Express for server-side logic.
- **Database**: PostgreSQL for storing user accounts, service details, and scheduling information.
- **Calendar Integration**: FullCalendar.js for scheduling and availability display.
- **Messaging**: Firebase Realtime Database or Pusher for real-time communication.
- **Authentication**: Auth0 or Passport.js for secure login.
- **Deployment**: Heroku or Vercel for hosting the application.


