# Spark - Personal Budget Tracker

A modern, intuitive web application for tracking personal expenses and managing monthly budgets. Built with Ruby on Rails and React, Spark helps you stay on top of your finances with a clean, user-friendly interface.

![Spark Budget Tracker](screenshot.png)

## About

Spark was developed as a final project for the Altcademy Fullstack Development Program. The project requirements called for a full-stack application that demonstrates comprehensive web development skills. I chose to build an expense tracker for two main reasons: it's a practical tool that I could use in my daily life, and its scope was well-suited for the development timeline.

For the backend, I selected Ruby on Rails, a framework we extensively covered during the program. Rails' convention-over-configuration philosophy and robust ecosystem made it an excellent choice for building a data-driven application like Spark. The framework's built-in features for database management, authentication, and API handling significantly accelerated development while maintaining code quality.

On the frontend, I implemented React with Inertia.js, a modern stack that I was eager to explore. Inertia.js provided an elegant solution for building a single-page application while leveraging Rails' backend capabilities. This combination allowed me to create a smooth, responsive user interface while maintaining the development efficiency of Rails.

While Spark currently implements all core features of an expense tracker, there's significant potential for future enhancements. Planned improvements include advanced analytics, budget forecasting, receipt scanning, and integration with financial institutions.

## Development Approach

Spark was built with a focus on user experience and maintainability. The application follows a modern single-page application (SPA) architecture using Inertia.js, which combines the best of both Rails and React. This approach allows for a seamless user experience while maintaining the robust backend capabilities of Rails.

The frontend is built with React components, organized in a modular structure that promotes reusability and maintainability. The styling is implemented using custom CSS with a focus on responsive design principles, ensuring the application works flawlessly across all devices. The backend leverages Rails' powerful features for data management, authentication, and API handling, while PostgreSQL provides reliable and efficient data storage.

## Features

- **Expense Tracking**: Log and categorize your daily expenses
- **Budget Management**: Set and monitor monthly spending limits
- **Smart Categorization**: Automatically organize expenses with tags
- **Date Filtering**: View expenses by different time periods
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **User Authentication**: Secure login and registration system

## Tech Stack

- **Backend**: Ruby on Rails
- **Frontend**: React with Inertia.js
- **Database**: PostgreSQL
- **Styling**: Custom CSS with modern design principles
- **Authentication**: Devise

## Prerequisites

- Ruby 3.x
- Rails 7.x
- Node.js 16.x or higher
- PostgreSQL
- Yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/spark-budget-tracker.git
cd spark-budget-tracker
```

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

   - Copy `.env.example` to `.env`
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
   - Secure authentication system ensures your data is protected

2. **Setting Your Budget**

   - Navigate to the Budget page
   - Set your monthly spending limit
   - Track your progress throughout the month

3. **Adding Expenses**

   - Click "Add New" to log an expense
   - Enter the amount, date, and place
   - Add categories (tags) for better organization
   - Save to track your spending

4. **Viewing Expenses**
   - See all your expenses organized by category
   - Use date filters to view specific time periods
   - Monitor your spending against your budget
   - Edit or delete expenses as needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Ruby on Rails](https://rubyonrails.org/)
- Frontend powered by [React](https://reactjs.org/) and [Inertia.js](https://inertiajs.com/)
- Styling inspired by modern web design principles

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/spark-budget-tracker](https://github.com/yourusername/spark-budget-tracker)
