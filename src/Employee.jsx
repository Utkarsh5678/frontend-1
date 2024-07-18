import React, { useState, useEffect } from 'react';
import EmployeeService from './EmployeeService';

const EmployeePage = () => {
  const [tasks, setTasks] = useState([]);
  const [completedMessage, setCompletedMessage] = useState('');
  const employeeService = new EmployeeService();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await employeeService.getEmployeeTasksById();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await employeeService.updateTaskStatus(taskId, newStatus);
      fetchTasks(); // Refresh tasks after update
      setCompletedMessage(`Task ${taskId} has been marked as completed.`);
      // Clear the message after a few seconds
      setTimeout(() => {
        setCompletedMessage('');
      }, 3000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div>
      <h1>Employee Page</h1>
      <h2>Your Tasks</h2>
      {completedMessage && <p>{completedMessage}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleUpdateTaskStatus(task.id, 'COMPLETED')}>
              Mark as Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeePage;
