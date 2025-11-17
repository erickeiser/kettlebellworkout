
import React from 'react';
import type { Workout } from '../types';
import { useNavigate } from 'react-router-dom';

interface WorkoutCardProps {
  workout: Workout;
  title: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, title }) => {
  const navigate = useNavigate();

  const handleStartWorkout = () => {
    navigate(`/workout/${workout.week_number}/${workout.day_number}`);
  };

  return (
    <div className="bg-brand-gray rounded-lg shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-brand-emerald mb-2">{title}</h3>
        <h2 className="text-2xl font-bold text-white">{workout.title}</h2>
        <p className="text-gray-400 mt-1 capitalize">{workout.type} Day</p>
        <p className="text-gray-300 mt-4 text-sm">{workout.description}</p>
      </div>
      <button 
        onClick={handleStartWorkout}
        className="mt-6 w-full bg-brand-emerald text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition duration-300"
      >
        Start Workout
      </button>
    </div>
  );
};

export default WorkoutCard;
