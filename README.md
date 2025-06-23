# Spara - Expense Tracker App made in Rails + Inertia JS + React

## About

Developed as a final project for the Altcademy Fullstack Development Program. The project requirements was a full-stack application and I chose to build an expense tracker because it's a practical tool that I could use in my daily life, and its scope was well-suited for the timeline.


## Tech Stack

- **Backend**: Ruby on Rails
- **Frontend**: React with Inertia.js
- **Database**: PostgreSQL

For the backend, I selected Ruby on Rails, a framework we worked with during the program. I think the Rails philosophy and robust ecosystem made a good choice for this type of application. On the frontend, I wanted to work with React and choose to do it with Inertia.js, which I had read about but never worked with before.

## Features

- **Expense Tracking**: Log and categorize your daily expenses, including an image of your receipt. 
- **Budget Management**: Set a monthly spending goal, log your expenses, and see how much you have saved, or not saved, during the month.
- **Categorization**: Organize expenses with tags/categories. 
- **Date Filtering**: View expenses by different time periods. 
  
The application currently implements all core features of an expense tracker but there's a lof of potential for improvements. Planned improvements include advanced analytics, budget forecasting, automatic receipt scanning. 

## Installation

1. Clone the repository.


2. Install Ruby dependencies:

```bash
bundle install
```

3. Install JavaScript dependencies:

```bash
yarn install
```

4. Set up the database:

```bash
rails db:create
rails db:migrate
```

5. Configure environment variables:

   - Update the database credentials and other environment variables as needed

6. Install and configure PostgreSQL:

   - Install PostgreSQL on your system
   - Create a new database user (if needed)
   - Update the database configuration in `config/database.yml`

7. Start the development server:

```bash
./bin/dev
```

The application will be available at `http://localhost:3000`

## Usage

1. **Registration/Login**

   - Create a new account or log in to your existing account

2. **Setting Your Budget**

   - Navigate to the Budget page
   - Set your monthly spending limit
   - Track your progress throughout the month

3. **Adding Expenses**

   - Click "Add New" to log an expense
   - Enter the amount, date, and place
   - Add categories (tags) for better organization
   - Add an image of your receipt
   - Save to track your spending

4. **Viewing Expenses**
   - See all your expenses organized by category
   - Use date filters to view specific time periods
   - Monitor your spending against your budget
   - Edit or delete expenses as needed

## Links

Project Link: https://budgetapp-zn76.onrender.com/

![firstpage](https://github.com/user-attachments/assets/4c545fc4-d218-4164-a413-7937f85c36a0)
<br/>
![addnew_mobile](https://github.com/user-attachments/assets/ab5d0972-5a15-4109-8f5c-d404b2c72137)
<br/>
![allexpenses_mobile](https://github.com/user-attachments/assets/01a5c6a4-43a8-40ca-bb25-2c4210c214ce)



