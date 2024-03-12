# Design Engineer Async Exercise

## Deployed Site

[Deployed Site](https://design-engineer-code-assignment.netlify.app/)

## Features

- Responsive
- Search
- Filtering
- Showing location

## Couple of notes

- Did not focus on NextJS - first time ever using! Sure there are ways to do things the "NextJS" way. Fun to be able to use it.
- Would use `styled-components` in future. Used a mix of utility classes, inline-styles, and css modules for speed

## Screenshots

### Responsive UI

<img width="1888" alt="Screenshot 2024-03-12 at 11 25 58 AM" src="https://github.com/shalanah/design-engineer-exercise/assets/14183660/1d241c78-ef78-4645-b93f-e85590764fa4">

### Filtering

<img width="1136" alt="Screenshot 2024-03-12 at 11 36 31 AM" src="https://github.com/shalanah/design-engineer-exercise/assets/14183660/21e947e4-810e-4cd5-8f0d-3c795de32816">

### Searching

If filtering is on - will show outside search results

<img width="1137" alt="Screenshot 2024-03-12 at 11 35 54 AM" src="https://github.com/shalanah/design-engineer-exercise/assets/14183660/8ea03489-a420-4699-a89a-613977a32911">


# Prompt

Hey! 👋 This is the codebase for the design engineer technical exercise. It's a blank NextJS project with a few assets ready to use for the assignment.

<aside>
⛳ **Objective:** We would like you to implement a new page for the website highlighting our team, allowing visitors to view information about teammates, filter by department, search, and more.

</aside>

## Getting started

To get started, run the following commands:

```shell
npm install
npm run dev

## 🍎 Assignment

You need to create a landing page that would showcase information about the team in a compelling way, transparent salaries, team structure, and information about people.

- Display the list of teammates with their avatar, name, role, team, location, salary, and other information.
- When a visitor hovers over the teammate, the element should animate in a delightful way
- Visitors should be able to search by name and filter by department
- The page should be responsive and should be optimized for both mobile and desktop
- The design is up to you, use the design of the existing site as an inspiration, but do not feel limited by it. We encourage you to be creative while staying true to the core values and brand.
- You are welcome to add additional features if you feel they would aid the experience.

## ⚙️ **Technical requirements**

- Please use Next.js and TypeScript, as that is our stack. Other than that, you are fully flexible in how you can approach the task
- Be minimalistic with additional dependencies; you can judge what’s needed and what’s not.
- Use git to commit your code as you would normally work on a project. This is helpful for us to understand your workflow and thinking process
- Data about the team is provided in `team.json` file. Avatar images are provided in the `public/avatars` folder.
- Implement a simulation of a real API so that there is a lag when data loads

## ☂️ How to complete the exercise

Use git to commit your code as you would normally work on a project. Please organize, design, test, and document your code as if the feature is going into production.

Once you are done, we ask you to present your work asynchronously. You can write documentation explaining your approach and solution or record a video — it’s up to you to present your work best! You can share the code as a zip file (please exclude the node_modules folder).

After it’s done, we will do an internal code review for your code and share feedback with you over email. If we like what we see, we will invite you to the technical interview with the team to discuss your solution further along with other technical topics.

## 🔍 What we are looking for

When assessing the results, these are the main areas we will be looking at. It does not need to be perfect, we will be assessing your solution holistically.

- The page is complete and works according to requirements. It is stable, and edge cases are handled in a sensible, thought-out manner
- The code is well-organized, easy to understand, and readable. It follows best practices in the industry. Your work process is visible through the commit history.
- Web Accessibility and SEO are important for us, as well as handling responsive layout
- While in reality at you'll would work together with a designer, we want to see your approach to design here from scratch. The design you implemented is cohesive and contains delightful and thought-out details.
