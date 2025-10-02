import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyTodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask('');
        }
    };

    const toggleTaskCompletion = (index) => {
        setTasks(tasks.map((t, i) =>
            i === index ? { ...t, completed: !t.completed } : t
        ));
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };
    
    React.useEffect(() => {
        const savedTasks = localStorage.getItem('myTodoListTasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('myTodoListTasks', JSON.stringify(tasks));
    }, [tasks]);



    return (
        <div className="my-todo-list-layout">
            <div className="todo-list-container">
                <Link to="/">
                    <button>Back to Main Page</button>
                </Link>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTask}>Add Task</button>
                <ul>
                    {tasks.map((t, index) => (
                        <li key={index} style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
                            {t.text}
                            <button onClick={() => toggleTaskCompletion(index)}>
                                {t.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button onClick={() => removeTask(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            <img src="/adult_sparky_image.png" alt="Image of Sparky, ASU Mascot" style={{ width: '200px', borderRadius: '12px' }} />
        </div>
    );
};

export default MyTodoList;
