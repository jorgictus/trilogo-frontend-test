export const tasks = '@tasks';

export const getTask = () => {
  try {
    const serializedTasks = localStorage.getItem(tasks);
    if (serializedTasks === null) {
      return [];
    }
    return JSON.parse(serializedTasks);
  } catch (err) {
    return [];
  }
};

export const addTask = (task) => {
  try {
    const serializedTasks = JSON.stringify(task);
    localStorage.setItem(tasks, serializedTasks);
  } catch (err) {
    // Ignore errors
  }
};
