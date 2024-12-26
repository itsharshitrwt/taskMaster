
import { Task } from '../types/task';
import { CheckCircle, Circle, Trash2, Bell, Calendar } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white p-4 rounded-lg shadow-md transition-all ${
            task.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-start gap-4">
            <button
              onClick={() => onToggle(task.id)}
              className="mt-1 text-emerald-500 hover:text-emerald-600 transition-colors"
            >
              {task.completed ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
            <div className="flex-1">
              <h3
                className={`text-lg font-medium ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 mt-1">{task.description}</p>
              )}
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
                {task.notificationTime && (
                  <div className="flex items-center gap-1">
                    <Bell className="w-4 h-4" />
                    {new Date(task.notificationTime).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No tasks yet. Add one above!
        </div>
      )}
    </div>
  );
}