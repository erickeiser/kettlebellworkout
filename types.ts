
export interface User {
  id: string;
  email: string;
}

export type WorkoutType = "strength" | "hypertrophy" | "torcher" | "mobility" | "fullbody";

export interface Exercise {
  exercise: string;
  sets: string;
  notes: string;
}

export interface Workout {
  id: string;
  week_number: number;
  day_number: number;
  type: WorkoutType;
  title: string;
  description: string;
  exercises: Exercise[];
  video_url: string; // Placeholder for YouTube links
}

export interface ProgressLog {
  id: string;
  user_id: string;
  date: string; // ISO string format
  weight: number;
}

export interface PhotoLog {
  id: string;
  user_id: string;
  date: string; // ISO string format
  photo_url: string; // Base64 or blob URL
}

export interface CompletedWorkout {
    userId: string;
    workoutId: string;
    date: string; // ISO string format
}
