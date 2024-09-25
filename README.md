# Cybersecurity Chatbot

<div align="center">
  <h2>Payload Generator and Analysis</h2>
  <p>Fully functional chatbot intended to generate payloads and aid in the analysis of cybersecurity-related code</p>
  <p>Made by <a href="https://noahrizika.github.io/">Noah Rizika</a></p>
</div>

## Application Overview

This web application uses OpenAI's API to create a prompt-engineered GPT-4o mini chatbot that provides attack payloads and aids in the analysis of cybersecurity-related code.

Key Features:

- Interactive chat interface
- Chat freely with the OpenAI GPT-4o mini model
- Stores each chat interaction in a Supabase database
- View and engage in previous conversations or start a new chat
- Responsive design with Tailwind CSS

# Utilities

- Next.js 14 with App Router
- React 18
-Typescript
- Tailwind CSS 3
- Jest - Configured for unit testing
- Prettier Formatting
- Husky & Lint Staged
- Conventional Commit Lint

## Getting Started

### 1. Clone this repository using `create next-app`

```bash
pnpm create next-app -e https://github.com/noahrizika/chatbot ts-pnpm
```

### 2. Install dependencies

It is encouraged to use **pnpm** so the husky hooks can work properly.

```bash
pnpm install
```

### 3. Upload your API keys

Place your OpenAI API key and Supabase URL and anon keys in a new .env.local file.

Example .env.local file:
SUPABASE_URL='YOUR_URL_HERE'
SUPABASE_ANON_KEY='YOUR_ANON_KEY_HERE'
OPENAI_API_KEY='YOUR_KEY_HERE'

### 4. Build two tables in Supabase

Table 1:  
CREATE TABLE chats (  
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  
group_id UUID NOT NULL,  
user_input TEXT NOT NULL,  
response TEXT NOT NULL,  
timestamp TIMESTAMPTZ DEFAULT now()  
);

- Note: group_id has a foreign key relation to chats_group (Table 2)

Table 2:  
CREATE TABLE chat_groups (  
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  
name TEXT NOT NULL,  
timestamp TIMESTAMPTZ DEFAULT now()  
);

### 5. Run the development server

You can start the server using this command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the webpage. (You will need to configure your own OpenAI and Supabase keys.)

## Assumptions and Design Decisions

**Assumptions**

This web app is intended for individual use. Hence, there is no authentication or guardrails prohibiting a user from easily accessing another's chat history. Further, since there are no logged users, Supabase's row line security for both tables is turned off to enable chat storage.

**Organizational Design**

I used CamelCase for component folders / files and drinkingCamelCase for all other folders and files.

ChatBot components are organized by feature. Sub-components that are only used by one component (ie: Popup.tsx) are in its parent component's folder.

*Server-Side:*
Showing the conversation history to the user is rendered serverside. Initially, I tried to show the most recent conversation by updating the component using from 'next/router', but after a series of errors, pivotted to passing the groupID via url (instead of lifting state up) and rerendering the page on each interaction. In a later iteration, I'd instead implement revalidatePath to avoid needing a whole page refresh.
Instead of storing the current conversation on the client and on supabase, all conversations are only available via supabase, which simplifies the code.

*Client-Side:*
User interaction components (ie: Interaction and ChooseConversation's sub components) are client-side, since the entire component is solely responsive for user interactivity.

To ensure the Popup component can be reusable, the function for handling the onClick event for each of the Popup component's buttons is defined outside of the Popup component.

Supabase functions are organized by the database table with which they interact. Those that are called by the client are in the api folder. Supabase functions that are only used by the backend are in the lib folder. They are separate from the api folder to better distinguish between purely backend logic and API routes. This separation also enables for reusability, as future functions will be able to use the functions in the lib folder. Since this is a relatively small-scale project, functions were organized by the data table on which they operated and placed in the corresponding folder and file.

**Next Steps**

Should this become a complete application, there are many more features to incorporate. Namely, implementing user authentication and Supabase's row layer security for data privacy, a "delete chat group" button, enabling the chatbot respond within the conversations context, and a way for the user to download their conversation to a word doc or spreadsheet. Deleting chat groups could be handled by reusing the Popup component and writing a function to remove chats and the corresponding chatgroup from Supabase. Implementing context could simply be done by updating the API's messages property to contain all the interactions between the user and chatbot in the currect chatgroup.
