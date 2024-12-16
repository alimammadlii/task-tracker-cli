# Task Tracker
A task management CLI tool to track tasks with statuses and descriptions. User can add new tasks, update and delete them.

## Installation
```
# Clone the repository
git clone https://github.com/alimammadlii/task-tracker-cli.git

## Navigate to the project directory
cd task-tracker-cli

## Install dependencies
npm install
```

## Usage
```
# Add new task
node index.js add "Task description"

# List all tasks
node index.js list

# List tasks with specified status( todo, in-progress, done)
node index.js list todo
node index.js list in-progress
node index.js list done

# Delete a task with task id 
node index.js delete 1
```




