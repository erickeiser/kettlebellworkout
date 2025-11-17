import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useWorkoutData from '../hooks/useWorkoutData';

const WorkoutPage: React.FC = () => {
    const { week, day } = useParams<{ week: string, day: string }>();
    const navigate = useNavigate();
    const { getWorkout, markWorkoutComplete, isWorkoutCompleted } = useWorkoutData();

    const weekNum = parseInt(week || '1');
    const dayNum = parseInt(day || '1');

    const workout = getWorkout(weekNum, dayNum);
    const completed = workout ? isWorkoutCompleted(workout.id) : false;

    if (!workout) {
        return <div className="text-center p-10 text-xl">Workout not found!</div>;
    }
    
    const handleComplete = () => {
        markWorkoutComplete(workout.id);
        navigate('/dashboard');
    }

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-3xl">
            <button onClick={() => navigate(-1)} className="text-brand-emerald hover:underline mb-4">&larr; Back to Dashboard</button>
            <div className="bg-brand-gray rounded-lg shadow-lg p-6">
                <p className="text-brand-emerald font-semibold">Week {workout.week_number}, Day {workout.day_number}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">{workout.title}</h1>
                <p className="text-gray-400 mt-1 capitalize">{workout.type} Day</p>
                <p className="text-gray-300 mt-4">{workout.description}</p>
                
                {workout.video_url && (
                    <a 
                        href={workout.video_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-4 inline-block bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600"
                    >
                        Watch Demo Video
                    </a>
                )}

                <div className="mt-8 space-y-6">
                    {workout.exercises.map((ex, index) => (
                        <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                            <h3 className="text-xl font-bold text-white">{ex.exercise}</h3>
                            <p className="text-brand-emerald font-semibold text-lg">{ex.sets}</p>
                            <p className="text-gray-400 mt-1 text-sm">{ex.notes}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    {completed ? (
                         <div className="text-center p-4 bg-green-900 border border-brand-emerald rounded-lg text-white font-bold">
                            Workout Completed! Great job.
                         </div>
                    ) : (
                        <button 
                            onClick={handleComplete}
                            className="w-full bg-brand-emerald text-white font-bold py-4 px-4 rounded-lg hover:bg-emerald-700 transition duration-300 text-lg"
                        >
                            Mark as Complete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkoutPage;
