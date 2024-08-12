import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import './FormTask.scss';

const FormTask = ({ task }) => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [statusId, setStatusId] = useState(1);
    const [priorityId, setPriorityId] = useState(1);
    const [groupId, setGroupId] = useState('');
    const [parentId, setParentId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/groups?account_id=${user.id}`)
                .then(response => {
                    setGroups(response.data);
                })
                .catch(error => console.error('Error fetching groups:', error));
        }

        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatusId(task.status_id);
            setPriorityId(task.priority_id);
            setGroupId(task.group_id || '');
            setParentId(task.parent_id || '');
            setStartDate(task.start_date);
            setEndDate(task.end_date);
            setStartTime(task.start_time);
            setEndTime(task.end_time);
        }
    }, [task, user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            status_id: statusId,
            priority_id: priorityId,
            group_id: groupId || null,
            parent_id: parentId || null,
            start_date: startDate,
            end_date: endDate,
            start_time: startTime,
            end_time: endTime
        };

        if (task) {
            axios.put(`http://localhost:5000/tasks/${task.id}`, taskData)
                .then(() => navigate('/app/tasks'))
                .catch(error => console.error('Error updating task:', error));
        } else {
            axios.post('http://localhost:5000/tasks', taskData)
                .then(() => navigate('/app/tasks'))
                .catch(error => console.error('Error creating task:', error));
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="form-task">
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="status">Status</Label>
                        <Input type="select" id="status" value={statusId} onChange={(e) => setStatusId(Number(e.target.value))}>
                            <option value={1}>Todo</option>
                            <option value={2}>In Progress</option>
                            <option value={3}>Done</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="priority">Priority</Label>
                        <Input type="select" id="priority" value={priorityId} onChange={(e) => setPriorityId(Number(e.target.value))}>
                            <option value={1}>High</option>
                            <option value={2}>Medium</option>
                            <option value={3}>Low</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="group">Group</Label>
                        <Input type="select" id="group" value={groupId} onChange={(e) => setGroupId(e.target.value)}>
                            <option value="">No Group</option>
                            {groups.map(group => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </FormGroup>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="parentTask">Parent Task</Label>
                        <Input type="text" id="parentTask" value={parentId} onChange={(e) => setParentId(e.target.value)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="startDate">Start Date</Label>
                        <Input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="endDate">End Date</Label>
                        <Input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label for="startTime">Start Time</Label>
                        <Input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label for="endTime">End Time</Label>
                        <Input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                    </FormGroup>
                </Col>
            </Row>
            <Button color="primary" type="submit">{task ? 'Update Task' : 'Create Task'}</Button>
        </Form>
    );
};

export default FormTask;
