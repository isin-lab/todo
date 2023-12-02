import React, { useState } from 'react';
import './style.css';
import img1 from './icons/edit.png';
import img2 from './icons/delete.png';

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const handleAddWorkout = () => {
    if (date && distance) {
      const newWorkout = { date, distance: parseFloat(distance) };
      setWorkouts([...workouts, newWorkout].sort((a, b) => new Date(b.date) - new Date(a.date)));
      setDate('');
      setDistance('');
    }
  };

  const handleEditWorkout = (index) => {
    setEditingIndex(index);
    setDate(workouts[index].date);
    setDistance(workouts[index].distance.toString());
  };

  const handleSaveEdit = () => {
    if (date && distance) {
      const updatedWorkouts = [...workouts];
      updatedWorkouts[editingIndex] = { date, distance: parseFloat(distance) };
      setWorkouts(updatedWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setEditingIndex(null);
      setDate('');
      setDistance('');
    }
  };

  const handleDeleteWorkout = (index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);
    setWorkouts(updatedWorkouts);
  };

  return (
    <div className='wrp'>
      <div className='container'>
        <div className='start'>
        <input type="date" value={date} onChange={handleDateChange} />
        <input type="number" placeholder="Пройденное расстояние" value={distance} onChange={handleDistanceChange} />
        </div>
        <div className='end'>
        <button onClick={handleAddWorkout}>Добавить</button>
        </div>
      </div>
      {editingIndex !== null && (
        <div className='container'>
          <div className='start'>
          <input className='bg' type="date" value={date} onChange={handleDateChange} />
          <input className='bg' type="number" placeholder="пройденное расстояние" value={distance} onChange={handleDistanceChange} />
          </div>
          <div className='end'>
          <button className='bg' onClick={handleSaveEdit}>Сохранить</button>
          </div>
        </div>
      )}
      <ul>
        {workouts.map((workout, index) => (
          <li key={index} className='container' >
            <div className='start'>
            <input type="date" value={workout.date} readOnly />
            <input type="number" value={workout.distance} readOnly />
            </div>
            <div className='end'>
            <img src={img1} alt='edit' onClick={() => handleEditWorkout(index)}/>
            <img src={img2} alt='edit' onClick={() => handleDeleteWorkout(index)}/>
            </div>
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default App;



