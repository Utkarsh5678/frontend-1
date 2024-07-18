// src/TaskList.js
import React from 'react';

const TaskList = ({ tasks, onDelete, onEdit, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (tasks.length === 0) {
    return <div>No tasks found.</div>;
  }

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Employee ID: {task.employeeId}</p>
            <p>Status: {task.taskStatus}</p>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
