import { useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import { CheckSquare } from 'lucide-react';
import { requestNotificationPermission } from './utils/notifications';

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckSquare className="w-8 h-8 text-emerald-500" />
            <h1 className="text-3xl font-bold text-gray-900">Task Master</h1>
          </div>
          <p className="text-gray-600">Stay organized and boost your productivity</p>
        </header>

        <main className="space-y-8">
          <TaskForm onSubmit={addTask} />
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </main>
      </div>
    </div>
  );
}