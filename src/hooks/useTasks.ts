import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { showNotification } from '../utils/notifications';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      
      parsedTasks.forEach((task: Task) => {
        if (task.notificationTime && !task.completed) {
          scheduleNotification(task);
        }
      });
    }
  }, []);

  const scheduleNotification = (task: Task) => {
    if (!task.notificationTime || task.completed) return;

    const notificationTime = new Date(task.notificationTime).getTime();
    const now = new Date().getTime();
    const delay = notificationTime - now;

    if (delay > 0) {
      setTimeout(() => {
        if (!task.completed) {
          showNotification(
            "Task Reminder",
            `Time to work on: ${task.title}${task.description ? `\n${task.description}` : ''}`
          );
        }
      }, delay);
    }
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    if (taskData.notificationTime) {
      scheduleNotification(newTask);
    }
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return { tasks, addTask, toggleTask, deleteTask };
}