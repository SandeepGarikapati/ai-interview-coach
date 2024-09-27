## ![Ipsum](https://img.logoipsum.com/311.svg).

IPSUM is a web application helps users simulate mock interviews for their desired job roles. Users provide key details such as job title, technology stack, and years of experience. Using generative AI, the app fetches relevant interview questions tailored to the specified role and expertise level. After completing the mock interview, users receive feedback with a performance rating, helping them identify areas for improvement. The platform is designed to enhance job readiness through personalized, real-time interview simulations. Ideal for professionals preparing for tech interviews across various domains.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![PostgressSql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Drizzleorm](https://img.shields.io/badge/drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) 

## Table of contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Personalized Interview Questions**: Tailors interview questions based on user input, including job title, tech stack, and years of experience, ensuring relevance to their desired role.
- **Generative AI-Driven Questions**: Utilizes generative AI to create unique and up-to-date interview questions for a wide range of technical roles and industries.
- **Real-Time Feedback**: Provides detailed feedback and ratings after each mock interview, helping users assess their performance and identify areas for improvement.
- **Role-Specific Simulations**: Supports multiple job roles, allowing users to practice interviews for various positions across different technologies and experience levels.
- **Progress Tracking**: Tracks user performance over time, offering insights into their improvement across mock interviews, and helps users prepare more effectively.

## Getting Started

### Prerequisties
Before you begin please make sure to install this prerequisities
-Node.js (v18 or higher)
-npm or yarn
-neon Database account
-Drizzle orm
-Vs code or similar IDE'S

### Installation
1. Clone the repository
   ```
   git clone https://github.com/SandeepGarikapati/ai-interview-coach.git

   ```
2. Install the Dependencies
   ```
   npm install
   # or
   yarn install

   ```

### Running the Application
1. Setup the .env.local file with required api keys

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= clerk api key for authentication
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_DRIZZLE_DB_URL= prefered postgress DB url from local environment or providers like neon.

NEXT_PUBLIC_KEY_GEMINI= Gemini API Key

NEXT_PUBLIC_INFORMATION = "Enable webcams and microphones to start the interview, It has 5 question Which You can answer at last you will get a report on your answers.NOTE: We never record your video."

NEXT_PUBLIC_INFO2 = "Click on record option to start recording your video, for Interview. At last we will provide you a report on your answers."
```

2. First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Fill the required details like tech stack, Experience etc and click on start Interview.
   
![Image stating how to enter the tech details](howtoenterdetails.png)

2. Check the Tech details and Enable the Webcam and Microphone to start the Interview.

![Image stating how to enable webcam and microphone](enablemicrophoneandwebcam.png)

3. Answer the Five Questions displayed to get the feedback.

![image stating how to answer the interview](Interview_page.png)

4. Checkout the feedback displayed by the ai which indicated detailed analysis of the answer during the Interview.

![image stating the feedback of the interview](feedback_page.png)

## Deployment

To deploy the application on Vercel:

1. Push your project to a GitHub repository.
2. Go to the Vercel dashboard and import your repository.
3. Set up your environment variables in the Vercel project settings.
4. Deploy the project. Vercel will automatically build and deploy your application.


## Technologies Used

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shad cn UI](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Speech to text cnvertor](https://www.npmjs.com/package/react-hook-stt-fork)
- [Drizzle orm](https://www.npmjs.com/package/drizzle-orm)
- [Vercel](https://vercel.com/)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using Ipsum! We hope it helps in your Interview Preparation. If you have any questions or feedback, feel free to open an issue or contact us.
