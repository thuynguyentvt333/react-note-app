import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormTask from './FormTask';

const EditTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/tasks/${id}`)
            .then(response => setTask(response.data))
            .catch(error => console.error('Error fetching task:', error));
    }, [id]);

    return (
        <div>
            <h4>Edit Task</h4>
            {task ? <FormTask task={task} /> : <p>Loading...</p>}
        </div>
    );
};

export default EditTask;
