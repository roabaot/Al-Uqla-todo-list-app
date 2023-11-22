import React, { useState, useEffect } from 'react';
import bbblurry from "./assets/bbblurry.svg";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [activeEdit, setActiveEdit] = useState(null)
  const [taskText, setTaskText] = useState('');
  const [editText, setEditText] = useState('')

  const handleTaskTextChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskText('');
    }
  };

  const handleEditTask = () => {
    const editedTask = tasks.find(t => t.id == activeEdit)
    editedTask.text = editText
    const updatedTasks = tasks.filter((task) => task.id !== activeEdit);
    setTasks([...updatedTasks, editedTask]);
    setActiveEdit(null)
    setEditText('')
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    const trues = [];
    const falses = [];
    updatedTasks.forEach((task) => {
      if (task.completed) {
        trues.push(task)
      } else {
        falses.push(task)
      }
    });
    const tasksFiltered = trues.sort((a, b) => a.id - b.id).concat(falses.sort((a, b) => a.id - b.id));
    console.log('====================================');
    console.log(tasksFiltered);
    console.log('====================================');

    // const sortedTasks = tasksFiltered.sort((a, b) => a.id - b.id);
    setTasks(tasksFiltered);
  };

  return (
    <div className="h-screen bg-[url('../src/assets/bbblurry.svg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="h-full container mx-auto flex items-center justify-center">
        <div className='bg-white border border-gray-700 rounded-xl p-4 mx-6 3xl:w-[30vw] 2xl:w-[35vw] xl:w-[40vw] lg:w-[50vw] w-full'>
          <h1 className="text-2xl font-bold mb-4">Todo List</h1>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              className="border border-gray-400 rounded-xl px-4 py-2 w-full"
              value={taskText}
              onChange={handleTaskTextChange}
              placeholder="Enter a task"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2"
              onClick={handleAddTask}
            >
              Add
            </button>
          </div>

          {tasks.length > 0 ? (
            <div className='flex'>
              <ul className="list-disc pl-6">
                {tasks.map((task) => (
                  <>
                    {
                      activeEdit == task.id ?
                        <li
                          key={activeEdit}
                          className={`mb-2 ${task.completed ? 'line-through text-gray-500' : ''
                            }`}
                        >
                          <div className="flex gap-3 mb-1">
                            <input
                              type="text"
                              className="border border-gray-400 rounded-xl px-4 py-2 w-full"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              placeholder="Edit a task"
                            />
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2"
                              onClick={handleEditTask}
                            >
                              Edit
                            </button>
                          </div>
                          <button className=' text-gray-700 hover:text-gray-800 bg-transparent' onClick={() => {
                            setActiveEdit(null)
                            setEditText('')
                          }}>cancel</button>
                        </li> :
                        <li
                          key={task.id}
                          className={`mb-2 ${task.completed ? 'line-through text-gray-500' : ''
                            }`}
                        >
                          <span
                            className="cursor-pointer"
                            onClick={() => handleToggleTask(task.id)}
                          >
                            {task.text}
                          </span>
                          <button
                            className="ml-2 text-teal-500 hover:text-teal-600"
                            onClick={() => {
                              setActiveEdit(task.id)
                              setEditText(task.text)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="ml-2 text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </li>
                    }
                  </>
                ))}
              </ul>
            </div>
          ) : (
            <p>No tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;