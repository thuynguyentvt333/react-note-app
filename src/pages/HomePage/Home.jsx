import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../contexts/AuthContext';
import TaskUpcoming from './TaskUpcoming';
import './Home.scss';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks?account_id=${user.id}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    if (tasks.length > 0) {
      const upcoming = tasks.filter(task => {
        // bỏ các task đã xong
        if (task.status_id === 3) return false;

        const deadline = moment(`${task.end_date} ${task.end_time}`, 'YYYY-MM-DD HH:mm');
        // kiểm tra thời gian hết hạn
        return deadline.isAfter(moment()) && deadline.diff(moment(), 'hours') <= 300;
      });
      setUpcomingTasks(upcoming);
    }
  }, [tasks]);

  return (
    <div className="home-container">
      <div className="welcome-message">
        <p>Welcome</p>
      </div>
      {upcomingTasks.length > 0 && (
        <div className="deadline-reminders">
          <h2>Upcoming Deadlines</h2>
          <TaskUpcoming tasks={upcomingTasks} />
        </div>
      )}
    </div>
  );
};

export default Home;
