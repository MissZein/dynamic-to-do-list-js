// Wait until the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // Add Task button
    const taskInput = document.getElementById('task-input');   // Task input field
    const taskList = document.getElementById('task-list');     // Task list container (ul)

    // Array to hold tasks in memory (mirrors localStorage)
    let tasks = [];

    /**
     * Save the current tasks array to localStorage
     */
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * addTask - Adds a task to the DOM and optionally saves it to localStorage.
     * @param {string} taskText - The text of the task to add. If undefined, the value is taken from the input field.
     * @param {boolean} save - Whether to push the task into the tasks array and persist to localStorage (default true).
     */
    function addTask(taskText, save = true) {
        // If no taskText was passed, read from input and trim
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        }

        // Validate non-empty task
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item and set text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // When remove button clicked:
        // 1. Find li's index in the taskList
        // 2. Remove corresponding item from tasks array
        // 3. Save updated tasks to localStorage
        // 4. Remove li from DOM
        removeBtn.onclick = function () {
            const lis = Array.from(taskList.children);         // All current <li> elements
            const index = lis.indexOf(li);                     // Index of this li
            if (index > -1) {
                tasks.splice(index, 1);                        // Remove the matching task from array
                saveTasksToLocalStorage();                     // Persist changes
            }
            taskList.removeChild(li);                          // Remove from DOM
        };

        // Append remove button to li, then append li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field (only when adding from input)
        taskInput.value = "";

        // If required, add the task to the tasks array and save
        if (save) {
            tasks.push(taskText);
            saveTasksToLocalStorage();
        }
    }

    /**
     * loadTasks - Loads tasks from localStorage and populates the DOM.
     * Uses addTask(taskText, false) to avoid saving again while building the list.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks; // Initialize in-memory tasks array from storage
        storedTasks.forEach(taskText => addTask(taskText, false)); // Build DOM without re-saving
    }

    // Attach event listener to Add Task button (use wrapper to avoid event object being passed into addTask)
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Allow pressing Enter in the input field to add a task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load existing tasks from localStorage when page loads
    loadTasks();
});
