document.getElementById('add-task-btn').onclick = function () {
    const taskInput = document.getElementById('task-input');
    const taskDescription = taskInput.value.trim();

    if (taskDescription) {
        addTask(taskDescription);
        taskInput.value = ''; // Clear the input
    }
};

function addTask(taskDescription) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');

    // Create a span for task description
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('task-description'); // Add the CSS class
    taskSpan.innerText = taskDescription;

    // Create a div for buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Create the edit button
    const editButton = document.createElement('button');
    editButton.classList.add('edit-task-btn');
    editButton.innerText = 'Edit';
    editButton.onclick = () => editTask(taskSpan, taskDescription); // Pass the span and description

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-task-btn');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => deleteTask(li); // Pass the li element to delete

    // Append the task description and buttons to their respective containers
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    li.appendChild(taskSpan); // Add the task description span to the li
    li.appendChild(buttonContainer); // Add the button container to the li

    // Append the list item to the task list
    taskList.appendChild(li);
}

// Function to edit the task
function editTask(taskSpan, oldDescription) {
    const editPopup = document.getElementById('edit-popup');
    const editInput = document.getElementById('edit-input');
    
    // Set the current value to the input field in the popup
    editInput.value = oldDescription;

    // Show the popup
    editPopup.style.display = 'flex';

    // Save button functionality
    document.getElementById('save-task-btn').onclick = function () {
        const newDescription = editInput.value.trim();
        if (newDescription) {
            taskSpan.innerText = newDescription; // Update the task description
            editPopup.style.display = 'none'; // Hide the popup
        }
    };
}

// Function to delete the task
function deleteTask(taskItem) {
    const taskList = document.getElementById('task-list');
    taskList.removeChild(taskItem); // Remove the task from the list
}

// Function to close the edit popup when clicking outside of it
window.onclick = function(event) {
    const editPopup = document.getElementById('edit-popup');
    if (event.target === editPopup) {
        editPopup.style.display = 'none'; // Hide the popup
    }
};
