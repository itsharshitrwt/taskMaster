export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  notificationTime?: string;
  createdAt: string;
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'completed'>;