import React, { useState } from 'react';
import { Todo }  from './components/Todo';
import { Form }  from './components/Form';
import { FilterButton }  from './components/FilterButton';
import { nanoid } from 'nanoid';

export function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = {id: "todo-" + nanoid(), name: name, completed: false};
    setTasks([...tasks, newTask]);
  }

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id)
    setTasks(remainingTasks);
  }

  const taskList = tasks.map(task => 
    <Todo
      name={task.name}
      id={task.id}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />);
  
 

  const taskNouns = taskList.length !== 1 ? 'tasks' : 'task';
  const headingTask = `${taskList.length} + ${taskNouns} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>MERN Tasks</h1>
        <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
      </div>
      <h2 id="list-heading">
        {headingTask}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;