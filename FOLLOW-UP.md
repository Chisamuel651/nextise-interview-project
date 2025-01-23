# FOLLOW-UP.md

## Implementation

### Q) What libraries did you add to the frontend? What are they used for?
- **[lucide-react]**: Used for lightweight and customizable icons in the UI.  
- **[shadcn]**: Integrated for component styling and pre-built UI components to accelerate development.  
- **[jsonwebtoken]**: Used for handling user authentication securely.  
- **[tailwindcss]**: Employed as the main CSS framework to style the application efficiently.  
- **[bcryptjs]**: Used for hashing and validating user passwords.  

### Q) What libraries did you add to the backend? What are they used for?
- **[drizzle-orm]**: Used for structured and type-safe database interactions.  
- **[drizzle-zod]**: Integrated to validate data schemas and ensure type safety.  
- **[pg]**: Used as the PostgreSQL client for database connectivity.  
- **[nodemailer]**: Used for sending email notifications.  
- **[zod]**: Implemented for runtime validation of data schemas.  
- **[hono]**: Lightweight web framework used to build the backend API.  

### Q) How does the application handle the assignment of trainers and the email notification feature?
- **[Database Design]**: A new table called `course-trainer` was created, using `courseId` and `trainerId` as foreign keys.  
- **[Mailer Setup]**: Installed `nodemailer` and configured it in a `mailer.ts` utility file. The transporter is set with the required `host`, `port`, and `secure` values. A message template was defined to include course details (e.g., name, date, and location) and the trainer's email.  
- **[Controller and Endpoint]**: A `course-trainer` controller was created to manage assignment logic. The API endpoint was also built to handle assignment requests.  
- **[Frontend Integration]**: The functionality was integrated into the `course.tsx` file. The UI includes a dropdown to select trainers for a course. When the "Assign Trainer" button is clicked, a toast displays success or failure. If successful, an email is sent via `nodemailer` to the selected trainer using Mailhog for testing.  

### Q) What command do you use to start the application locally?
- **[Development Mode]**: Initially, `npm run dev` was used for local testing.  
- **[Dockerized Mode]**: After containerization, `docker-compose up` is used to start the application. Once the command is executed, the app is available at `http://localhost:3000` and Mailhog at `http://localhost:8025`.  

## General

### Q) If you had more time, what improvements or new features would you add?
- **[UI Enhancements]**: Improve the visual design and add more dynamic elements, such as animations or real-time updates when trainers are assigned.  
- **[Validation Improvements]**: Implement more robust validation in the forms to ensure user input is always correct.  
- **[Additional Features]**: 
  - Allow users to filter courses by trainers or locations.
  - Add an analytics dashboard to show stats like the number of courses assigned, trainers available, etc.
  - Enable multiple trainers to be assigned to a single course.  

### Q) Which parts of the project are you most proud of? Why?
- **[Docker Integration]**: Successfully dockerizing the app and making all services work together, including Mailhog, was a rewarding experience as it was challenging but satisfying.  
- **[Email Notification System]**: Configuring `nodemailer` to send notifications after assigning a trainer was a significant achievement.  
- **[Well-Defined Endpoints and Controllers]**: All API endpoints and their respective controllers were implemented with clarity and efficiency.  

### Q) Which parts did you spend the most time on? What did you find most challenging?
- **[Time Spent]**: Most time was spent on implementing the trainer assignment feature, as it involved backend logic, database design, and frontend integration.  
- **[Challenges]**: 
  - Understanding the existing codebase and adapting to its structure, which differed from typical Next.js projects with an `app` folder.
  - Debugging the email notification feature to ensure it works seamlessly with Mailhog.

### Q) How did you find the test overall? Did you encounter any issues or difficulties completing it?
- **[Experience]**: The test was a great opportunity to work on a real-world scenario involving multiple technologies.  
- **[Challenges]**: 
  - Sending email notifications via `nodemailer` took significant debugging effort.  
  - Implementing the `course-trainer` controller and endpoint required extra time to understand and adapt to the project's existing structure.  
- **[Overall Difficulty]**: The test was moderately challenging but achievable, and it was a valuable learning experience.  

### Q) Do you have any suggestions on how we can improve the test?
- **[Suggestions]**: 
  - Provide clearer instructions on the expected folder structure and organization of files, especially for candidates not used to custom setups.  
  - Include sample test cases or data to test the application locally, which would save candidates time during setup.  
  - Provide a pre-configured `.env` file to avoid initial setup confusion. 