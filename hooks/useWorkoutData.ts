import { useState, useEffect, useCallback } from 'react';
import type { Workout, ProgressLog, PhotoLog, CompletedWorkout } from '../types';
import { program } from '../data/seed';
import { useAuth } from '../context/AuthContext';

const useWorkoutData = () => {
  const { user } = useAuth();
  const [workouts] = useState<Workout[]>(program);
  const [progressLogs, setProgressLogs] = useState<ProgressLog[]>([]);
  const [photoLogs, setPhotoLogs] = useState<PhotoLog[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>([]);

  useEffect(() => {
    if (user) {
      try {
        const savedProgress = localStorage.getItem(`kettlecut_progress_${user.id}`);
        const savedPhotos = localStorage.getItem(`kettlecut_photos_${user.id}`);
        const savedCompleted = localStorage.getItem(`kettlecut_completed_${user.id}`);
        if (savedProgress) setProgressLogs(JSON.parse(savedProgress));
        if (savedPhotos) setPhotoLogs(JSON.parse(savedPhotos));
        if (savedCompleted) setCompletedWorkouts(JSON.parse(savedCompleted));
      } catch (error) {
          console.error("Failed to parse data from localStorage", error);
      }
    }
  }, [user]);

  const saveData = useCallback((key: string, data: any) => {
    if (user) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [user]);

  const addProgressLog = (weight: number) => {
    if (!user) return;
    const newLog: ProgressLog = {
      id: new Date().toISOString(),
      user_id: user.id,
      date: new Date().toISOString(),
      weight,
    };
    const updatedLogs = [...progressLogs, newLog];
    setProgressLogs(updatedLogs);
    saveData(`kettlecut_progress_${user.id}`, updatedLogs);
  };

  const addPhotoLog = (photo_url: string) => {
    if (!user) return;
    const newLog: PhotoLog = {
      id: new Date().toISOString(),
      user_id: user.id,
      date: new Date().toISOString(),
      photo_url,
    };
    const updatedLogs = [...photoLogs, newLog];
    setPhotoLogs(updatedLogs);
    saveData(`kettlecut_photos_${user.id}`, updatedLogs);
  };
  
  const markWorkoutComplete = (workoutId: string) => {
      if(!user) return;
      if (isWorkoutCompleted(workoutId)) return; // Avoid duplicates
      const newCompletion: CompletedWorkout = {
          userId: user.id,
          workoutId,
          date: new Date().toISOString()
      };
      const updatedCompletions = [...completedWorkouts, newCompletion];
      setCompletedWorkouts(updatedCompletions);
      saveData(`kettlecut_completed_${user.id}`, updatedCompletions);
  }

  const isWorkoutCompleted = (workoutId: string) => {
      return completedWorkouts.some(cw => cw.workoutId === workoutId);
  }

  const getWorkout = (week: number, day: number) => {
    return workouts.find(w => w.week_number === week && w.day_number === day) || null;
  };
  
  const getTodaysWorkout = () => {
    // This is a simulation. A real app would use the user's start date.
    // We'll just find the first uncompleted workout.
    for (const workout of workouts) {
        if (!isWorkoutCompleted(workout.id)) {
            return workout;
        }
    }
    // If all are completed, show the last workout or a completion message.
    return workouts[workouts.length - 1]; 
  };

  const getTorcherOfTheWeek = (week: number) => {
      return workouts.find(w => w.week_number === week && w.type === 'torcher') || null;
  }

  return {
    workouts,
    progressLogs,
    photoLogs,
    completedWorkouts,
    addProgressLog,
    addPhotoLog,
    markWorkoutComplete,
    isWorkoutCompleted,
    getWorkout,
    getTodaysWorkout,
    getTorcherOfTheWeek
  };
};

export default useWorkoutData;
