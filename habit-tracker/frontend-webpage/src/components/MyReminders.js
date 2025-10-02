import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyReminders = () => {
    const [reminders, setReminders] = useState([]);
    const [reminder, setReminder] = useState('');

    const addReminder = () => {
        if (reminder.trim()) {
            setReminders([...reminders, { text: reminder, completed: false }]);
            setReminder('');
        }
    };

    const toggleReminderCompletion = (index) => {
        setReminders(reminders.map((r, i) =>
            i === index ? { ...r, completed: !r.completed } : r
        ));
    };

    const removeReminder = (index) => {
        setReminders(reminders.filter((_, i) => i !== index));
    };

    React.useEffect(() => {
            const savedReminders = localStorage.getItem('myReminders');
            if (savedReminders) {
                setReminders(JSON.parse(savedReminders));
            }
        }, []);

    React.useEffect(() => {
            localStorage.setItem('myReminders', JSON.stringify(reminders));
        }, [reminders]);

        return (
                <div className="my-reminders-layout">
                    <div className="reminders-container">
                        <Link to="/">
                            <button>Back to Main Page</button>
                        </Link>
                        <input
                            type="text"
                            value={reminder}
                            onChange={(e) => setReminder(e.target.value)}
                            placeholder="Add a new reminder"
                        />
                        <button onClick={addReminder}>Add Reminder</button>
                        <ul>
                            {reminders.map((r, index) => (
                                <li key={index} style={{ textDecoration: r.completed ? 'line-through' : 'none' }}>
                                    {r.text}
                                    <button onClick={() => toggleReminderCompletion(index)}>
                                        {r.completed ? 'Undo' : 'Complete'}
                                    </button>
                                    <button onClick={() => removeReminder(index)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <img src="/adult_sparky_image.png" alt="Image of Sparky, ASU Mascot" style={{ width: '200px', borderRadius: '12px' }} />
                </div>
            );
        };




export default MyReminders;
    

