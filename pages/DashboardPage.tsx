import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useWorkoutData from '../hooks/useWorkoutData';
import WorkoutCard from '../components/WorkoutCard';
import ProgressChart from '../components/ProgressChart';
import Modal from '../components/Modal';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const { 
        getTodaysWorkout, 
        getTorcherOfTheWeek, 
        progressLogs, 
        addProgressLog,
        addPhotoLog,
        completedWorkouts,
        workouts,
        programStartDate
    } = useWorkoutData();
    
    const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [weight, setWeight] = useState<string>('');
    const [photo, setPhoto] = useState<string | null>(null);

    const todaysWorkout = getTodaysWorkout();
    // Assuming today's workout determines the current week
    const currentWeek = todaysWorkout?.week_number || 1;
    const torcher = getTorcherOfTheWeek(currentWeek);

    const handleLogWeight = () => {
        if (weight) {
            addProgressLog(parseFloat(weight));
            setWeight('');
            setIsWeightModalOpen(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleLogPhoto = () => {
        if (photo) {
            addPhotoLog(photo);
            setPhoto(null);
            setIsPhotoModalOpen(false);
        }
    };
    
    const completionPercentage = Math.round((completedWorkouts.length / workouts.length) * 100);

    const getWelcomeMessage = () => {
        if (!programStartDate) {
            return "Ready to start your transformation?";
        }
        const formattedDate = new Date(programStartDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        return `Program started on ${formattedDate}. Keep up the great work!`;
    };

    return (
        <div className="container mx-auto p-4 md:p-6">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.email.split('@')[0]}</h1>
            <p className="text-gray-400 mb-8">{getWelcomeMessage()}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    {todaysWorkout && <WorkoutCard workout={todaysWorkout} title="Today's Workout" />}
                    <ProgressChart data={progressLogs} />
                </div>
                
                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-brand-gray rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-brand-emerald mb-4">Log Your Progress</h3>
                        <div className="space-y-3">
                             <button onClick={() => setIsWeightModalOpen(true)} className="w-full bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition duration-300">Log Weight</button>
                             <button onClick={() => setIsPhotoModalOpen(true)} className="w-full bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition duration-300">Log Photo</button>
                        </div>
                    </div>
                     <div className="bg-brand-gray rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-brand-emerald mb-2">Program Completion</h3>
                        <div className="w-full bg-gray-700 rounded-full h-4">
                            <div className="bg-brand-emerald h-4 rounded-full" style={{width: `${completionPercentage}%`}}></div>
                        </div>
                        <p className="text-white text-right mt-2 font-bold">{completionPercentage}%</p>
                    </div>
                    {torcher && <WorkoutCard workout={torcher} title={`Week ${currentWeek} Torcher`} />}
                </div>
            </div>

            <Modal isOpen={isWeightModalOpen} onClose={() => setIsWeightModalOpen(false)} title="Log Your Weight">
                <div className="space-y-4">
                    <input 
                        type="number" 
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter weight in lbs"
                        className="w-full px-3 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                    />
                    <button onClick={handleLogWeight} className="w-full bg-brand-emerald text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition duration-300">
                        Save Weight
                    </button>
                </div>
            </Modal>
             <Modal isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} title="Log Progress Photo">
                <div className="space-y-4">
                    <input 
                        type="file" 
                        accept="image/*"
                        capture="user"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-emerald file:text-white hover:file:bg-emerald-700"
                    />
                     {photo && <img src={photo} alt="Preview" className="mt-4 rounded-lg max-h-60 mx-auto"/>}
                    <button onClick={handleLogPhoto} disabled={!photo} className="w-full bg-brand-emerald text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
                        Save Photo
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default DashboardPage;