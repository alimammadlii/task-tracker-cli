import fs, { read } from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filepath = path.join(__dirname, "tasks.json");
const args = process.argv.slice(2);

// Reads Tasks From JSON file 
const readTasks = () => {
    try {
      return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    } catch (error) {
      console.error("Error reading tasks file:", error);
      return [];
    }
}; 

if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify([]));
};

//Adds new task
const addTask = () => {
    const tasks = readTasks();
    const task = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1  : 1,
        description: args.slice(1).join(' '),
        status: 'To Do'
    }
    tasks.push(task);
    
    fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2));
    console.log('Task added');
};

//Updates task status 'In Progress'
const markInProgress = (taskId) => {
    const tasks = readTasks();
    const task = tasks.find(task => task.id === taskId)
    if (task) {
        task.status = 'In progress'
        console.log('Task status updated successfully.');
    }
    else {
        console.log(`Task with id ${taskId} not found.`);
    }
    fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2));
};

//Marks a task as done
const markDone = (taskId) => {
    const tasks = readTasks();
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.status = 'Done' 
        console.log('Task status updated successfully.');
    }
    else {
        console.log(`Task with id ${taskId} not found.`);
    }
    fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2));
};

//Deletes specified task
const deleteTask = (taskId) => {
    const tasks = readTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);

    if (tasks.length === updatedTasks.length) {
        console.log(`Task with ID ${taskId} not found.`);

    } 
    else {
        console.log(`Task with ID ${taskId} has been deleted.`);
    }
    
    fs.writeFileSync(filepath, JSON.stringify(updatedTasks, null, 2));
};

if (args[0] === 'add' && args[1]) {
    addTask();
} 
else if (args[0] === 'list') {
    const tasks = readTasks();
    if (!args[1]) {
        console.table(tasks);
    }
    else{
        if (args[1] === 'done') {
            const done = tasks.filter(task => task.status === 'Done');
            console.table(done);
        }
        else if (args[1] === 'in-progress') {
            const inProgress = tasks.filter(task => task.status === 'In progress')
            console.table(inProgress);
        }
        else if (args[1] === 'todo') {
            const todo = tasks.filter(task => task.status === 'To Do')
            console.table(todo);
        }
    }
}
else if (args[0] === "update" && args[1] && args[2]) {
    const tasks = readTasks();
    const task = tasks.find((task) => task.id = args[1]);

    task.description = args[2]
    console.table(tasks);
    fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2));
}
else if (args[0] === 'mark-in-progress' && args[1]) {
    const taskId = parseInt(args[1], 10);
    markInProgress(taskId);
    //This section marks a task as in-progress.
}
else if (args[0] === 'mark-done' && args[1]) {
    const taskId = parseInt(args[1], 10);
    markDone(taskId);
    //This section marks a taks as done.
}
else if (args[0] === 'delete' && args[1]) {
    const taskId = parseInt(args[1], 10);
    deleteTask(taskId);
}
else {
    console.log("You used undefined keyword. Please use one of these: add, delete,update, mark-in-progress, mark-done");
}