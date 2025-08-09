// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim input value
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task."); // Prompt user to enter a task
            return; // Stop if empty
        }

        // Create a new li element and set its textContent to taskText
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Assign an onclick event to the remove button to remove the li from taskList
        removeBtn.onclick = function () {
            // Remove the li element from the taskList
            taskList.removeChild(li);
        };

        // Append the remove button to the li element, then append the li to taskList
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = "";
    }

    // Attach event listener to addButton that calls addTask when clicked
    addButton.addEventListener('click', addTask);

    // Attach event listener to taskInput for 'keypress' so Enter adds a task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
