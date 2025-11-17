import React from 'react';
import useWorkoutData from '../hooks/useWorkoutData';
import ProgressChart from '../components/ProgressChart';
import { Link } from 'react-router-dom';

const ProgressPage: React.FC = () => {
    const { progressLogs, photoLogs, workouts, isWorkoutCompleted } = useWorkoutData();
    
    const completedWorkoutsCount = workouts.filter(w => isWorkoutCompleted(w.id)).length;
    const completionPercentage = Math.round((completedWorkoutsCount / workouts.length) * 100);

    return (
        <div className="container mx-auto p-4 md:p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Your Progress</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-brand-gray rounded-lg shadow-lg p-4 md:p-6">
                    <ProgressChart data={progressLogs} />
                </div>
                <div className="bg-brand-gray rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-brand-emerald mb-2">Program Completion</h3>
                    <div className="relative w-40 h-40">
                        <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90 18 18)">
                            <path className="text-gray-700" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                            <path 
                                className="text-brand-emerald"
                                strokeWidth="3"
                                strokeDasharray={`${completionPercentage}, 100`}
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                strokeLinecap="round"
                            ></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">{completionPercentage}%</span>
                        </div>
                    </div>
                     <p className="text-gray-300 mt-4">{completedWorkoutsCount} of {workouts.length} workouts complete</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Progress Photos</h2>
                {photoLogs.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photoLogs.slice().reverse().map(photo => (
                            <div key={photo.id} className="relative aspect-square group">
                                <img src={photo.photo_url} alt={`Progress on ${new Date(photo.date).toLocaleDateString()}`} className="rounded-lg object-cover w-full h-full" />
                                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full p-2 text-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    {new Date(photo.date).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-brand-gray rounded-lg p-8 text-center text-gray-400">
                        <p>You haven't logged any photos yet. Upload your first one from the dashboard!</p>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Full Program Schedule</h2>
                 <div className="space-y-4">
                    {[...Array(12)].map((_, weekIndex) => (
                        <div key={weekIndex} className="bg-brand-gray p-4 rounded-lg">
                            <h3 className="text-xl font-bold text-brand-emerald mb-2">Week {weekIndex + 1}</h3>
                             <ul className="divide-y divide-gray-700">
                                {workouts.filter(w => w.week_number === weekIndex + 1).sort((a,b) => a.day_number - b.day_number).map(workout => (
                                    <li key={workout.id} className="py-3 flex justify-between items-center flex-wrap">
                                       <div className="mb-2 sm:mb-0">
                                            <p className="font-semibold text-white">{workout.title}</p>
                                            <p className="text-sm text-gray-400 capitalize">Day {workout.day_number} &bull; {workout.type}</p>
                                       </div>
                                       <div className="flex items-center space-x-4">
                                            {isWorkoutCompleted(workout.id) && (
                                                 <svg className="w-6 h-6 text-brand-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            )}
                                           <Link to={`/workout/${workout.week_number}/${workout.day_number}`} className="bg-gray-700 text-white text-sm font-semibold py-2 px-3 rounded-md hover:bg-gray-600 transition">
                                               View
                                           </Link>
                                       </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressPage;
