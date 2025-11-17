import type { Workout } from '../types';

// Helper to generate workouts to ensure variety and progression
const createWorkout = (
  week: number,
  day: number,
  type: Workout['type'],
  title: string,
  description: string,
  exercises: Workout['exercises']
): Workout => ({
  id: `w${week}d${day}`,
  week_number: week,
  day_number: day,
  type,
  title,
  description,
  exercises,
  video_url: 'https://www.youtube.com/results?search_query=kettlebell+workout', // Generic placeholder
});

// Generate the full 12-week program
const generateProgram = (): Workout[] => {
  const allWorkouts: Workout[] = [];
  const torcherTypes = [
    '20-Min EMOM',
    '12-Min AMRAP',
    '30-20-10 Ladder',
    '15-Min Death Circuit',
  ];

  for (let week = 1; week <= 12; week++) {
    // Progression logic: Increase reps/sets/intensity over time
    const isEarlyPhase = week <= 4;
    const isMidPhase = week > 4 && week <= 8;
    const isLatePhase = week > 8;

    let lowerSets = isEarlyPhase ? '3 x 10-12' : isMidPhase ? '4 x 10' : '4 x 8-10';
    let upperSets = isEarlyPhase ? '3 x 12-15' : isMidPhase ? '4 x 12' : '4 x 10-12';
    let fullBodySets = isEarlyPhase ? '3 x 8-10' : isMidPhase ? '4 x 8' : '5 x 5';
    let conditioningRounds = isEarlyPhase ? 3 : isMidPhase ? 4 : 5;

    // Day 1: Strength Lower Body
    allWorkouts.push(
      createWorkout(week, 1, 'strength', 'Lower Body Strength', 'Focus on powerful leg drive and a strong posterior chain. Keep your core tight throughout.', [
        { exercise: 'Kettlebell Goblet Squat', sets: lowerSets, notes: 'Keep chest tall, descend slowly.' },
        { exercise: 'Kettlebell Romanian Deadlift', sets: lowerSets, notes: 'Hinge at the hips, slight bend in knees.' },
        { exercise: 'Alternating Reverse Lunges', sets: lowerSets + ' (per leg)', notes: 'Control the movement, don\'t let your knee hit the floor.' },
        { exercise: 'Kettlebell Swings (Heavy)', sets: `4 x 15`, notes: 'Explosive hip hinge, not a squat.' },
      ])
    );

    // Day 2: Hypertrophy Upper Body
    allWorkouts.push(
      createWorkout(week, 2, 'hypertrophy', 'Upper Body Hypertrophy', 'Focus on time under tension and feeling the muscle work. Control both the concentric and eccentric phases.', [
        { exercise: 'Gorilla Rows', sets: upperSets, notes: 'Alternate arms, pull elbow towards the ceiling.' },
        { exercise: 'Kettlebell Floor Press', sets: upperSets, notes: 'Tuck your elbows slightly, press explosively.' },
        { exercise: 'Kettlebell Upright Row', sets: upperSets, notes: 'Lead with the elbows, don\'t shrug.' },
        { exercise: 'Push-ups', sets: '4 x Max Reps', notes: 'Full range of motion, chest to floor.' },
      ])
    );
    
    // Day 3: TORCHER Day
    const torcherType = torcherTypes[(week - 1) % torcherTypes.length];
    let torcherExercises: Workout['exercises'] = [];
    if (torcherType === '20-Min EMOM') {
      torcherExercises = [
        { exercise: 'Minute 1: Kettlebell Swings', sets: isLatePhase ? 'x 20' : 'x 15', notes: 'Every Minute On the Minute for 20 minutes.' },
        { exercise: 'Minute 2: Burpees', sets: isLatePhase ? 'x 12' : 'x 10', notes: 'Chest to deck, full extension at the top.' },
      ];
    } else if (torcherType === '12-Min AMRAP') {
        torcherExercises = [
            { exercise: 'Kettlebell Snatches', sets: '10 (5 per side)', notes: 'As Many Rounds As Possible in 12 minutes.' },
            { exercise: 'Goblet Lunges', sets: '10 (5 per side)', notes: 'Keep the kettlebell tight to your chest.' },
            { exercise: 'Push-ups', sets: '10', notes: 'Maintain a straight line from head to heels.' },
        ];
    } else if (torcherType === '30-20-10 Ladder') {
        torcherExercises = [
            { exercise: 'Kettlebell Swings', sets: '30 reps, then 20, then 10', notes: 'Complete all reps for all exercises before moving to the next round. For time.' },
            { exercise: 'Kettlebell Thrusters', sets: '30 reps, then 20, then 10', notes: 'Full squat into an overhead press.' },
            { exercise: 'Bent Over Rows', sets: '30 reps, then 20, then 10', notes: 'Keep your back flat.' },
        ];
    } else if (torcherType === '15-Min Death Circuit') {
        torcherExercises = [
            { exercise: 'Circuit: 40s work / 20s rest for 15 minutes', sets: `${conditioningRounds} rounds`, notes: 'Rotate through these 3 movements.' },
            { exercise: '1. Kettlebell Cleans (alternating)', sets: '40s', notes: '' },
            { exercise: '2. Mountain Climbers', sets: '40s', notes: '' },
            { exercise: '3. Jumping Lunges', sets: '40s', notes: '' },
        ];
    }
    allWorkouts.push(
      createWorkout(week, 3, 'torcher', `Torcher: ${torcherType}`, 'This is a high-intensity metabolic conditioning session. Push the pace and focus on your breathing.', torcherExercises)
    );

    // Day 4: Strength Full Body
    allWorkouts.push(
      createWorkout(week, 4, 'fullbody', 'Full Body Strength', 'Focus on complex movements that engage multiple muscle groups. These are big, powerful lifts.', [
        { exercise: 'Turkish Get-Up', sets: '5 x 1 (per side)', notes: 'Slow and controlled. Watch a video if you are unsure.' },
        { exercise: 'Kettlebell Clean and Press', sets: fullBodySets + ' (per side)', notes: 'Clean the bell, then press overhead. Reset each rep.' },
        { exercise: 'Offset Kettlebell Squat', sets: fullBodySets + ' (per side)', notes: 'Hold the KB in the rack position on one side.' },
        { exercise: 'Single Arm Farmer\'s Walk', sets: '3 x 50 feet (per side)', notes: 'Stand tall, don\'t lean. Use a heavy kettlebell.' },
      ])
    );
    
    // Day 5: Conditioning + Core
    allWorkouts.push(
        createWorkout(week, 5, 'mobility', 'Conditioning & Core', 'A lighter day to build work capacity and strengthen your core. Focus on quality of movement.', [
            { exercise: 'Kettlebell Halos', sets: `3 x 10 (each direction)`, notes: 'Circle the KB around your head. Keep your core tight.' },
            { exercise: 'Kettlebell Windmills', sets: '3 x 8 (per side)', notes: 'Hinge at the hip, keep your eyes on the bell.'},
            { exercise: 'Finisher Circuit', sets: `${conditioningRounds} rounds, 30s rest between rounds`, notes: 'Complete all exercises back-to-back.'},
            { exercise: '1. Kettlebell Swings', sets: '20 reps', notes: ''},
            { exercise: '2. Plank Drags', sets: '10 reps (per side)', notes: ''},
            { exercise: '3. Russian Twists', sets: '30 reps', notes: ''},
        ])
    );
  }
  return allWorkouts;
};

export const program: Workout[] = generateProgram();
