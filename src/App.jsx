import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './styles.scss'

const App = () => {
  const [oneRepMax, setOneRepMax] = useState(0)
  const [routine, setRoutine] = useState([
    [
      {
        id: 1,
        name: 'Bench Press (Barbell)',
        sets: [
          { id: 1, minReps: 8, maxReps: 12, weight: 135, rpe: 8 },
          { id: 2, minReps: 8, maxReps: 12, weight: 135, rpe: 8 },
          { id: 3, minReps: 8, maxReps: 12, weight: 135, rpe: 8 },
        ],
      },
      {
        id: 2,
        name: 'Shoulder Press (Dumbbell)',
        sets: [
          { id: 1, minReps: 8, maxReps: 12, weight: 95, rpe: 7 },
          { id: 2, minReps: 8, maxReps: 12, weight: 95, rpe: 8 },
          { id: 3, minReps: 8, maxReps: 12, weight: 95, rpe: 9 },
        ],
      },
      {
        id: 3,
        name: 'Tricep Pushdowns (Rope)',
        sets: [
          { id: 1, minReps: 8, maxReps: 12, weight: 95, rpe: 7 },
          { id: 2, minReps: 8, maxReps: 12, weight: 95, rpe: 8 },
          { id: 3, minReps: 8, maxReps: 12, weight: 95, rpe: 9 },
        ],
      },
      {
        id: 4,
        name: 'Lateral Raises (Dumbbell)',
        sets: [
          { id: 1, minReps: 10, maxReps: 15, weight: 10, rpe: 7 },
          { id: 2, minReps: 10, maxReps: 15, weight: 10, rpe: 8 },
          { id: 3, minReps: 10, maxReps: 15, weight: 10, rpe: 9 },
        ],
      },
    ],
    [
      {
        id: 1,
        name: 'Squat (Barbell)',
        sets: [
          { id: 1, minReps: 8, maxReps: 12, weight: 135, rpe: 8 },
          { id: 2, minReps: 8, maxReps: 12, weight: 135, rpe: 8 },
          { id: 3, minReps: 8, maxReps: 12, weight: 135, rpe: 8 },
        ],
      },
      {
        id: 2,
        name: 'Lunge (Dumbbell)',
        sets: [
          { id: 1, minReps: 8, maxReps: 12, weight: 95, rpe: 7 },
          { id: 2, minReps: 8, maxReps: 12, weight: 95, rpe: 8 },
          { id: 3, minReps: 8, maxReps: 12, weight: 95, rpe: 9 },
        ],
      },
      {
        id: 3,
        name: 'RDL (Barbell)',
        sets: [
          { id: 1, minReps: 8, maxReps: 12, weight: 95, rpe: 7 },
          { id: 2, minReps: 8, maxReps: 12, weight: 95, rpe: 8 },
          { id: 3, minReps: 8, maxReps: 12, weight: 95, rpe: 9 },
        ],
      },
      {
        id: 4,
        name: 'Leg Curl (Machine)',
        sets: [
          { id: 1, minReps: 10, maxReps: 15, weight: 10, rpe: 7 },
          { id: 2, minReps: 10, maxReps: 15, weight: 10, rpe: 8 },
          { id: 3, minReps: 10, maxReps: 15, weight: 10, rpe: 9 },
        ],
      },
    ],
  ])

  const weightRef = useRef(0)
  const repsRef = useRef(0)

  const oneRepMaxCalc = () => {
    setOneRepMax(
      Math.floor(weightRef.current.value * (0.0333 * repsRef.current.value + 1))
    )
  }

  const addSetToExercise = (exercise, set) => {
    return {
      ...exercise,
      sets: [...exercise.sets, set],
    }
  }

  const getUpdatedDay = (day, exerciseId, newSet) => {
    return day.map((exercise) => {
      return exercise.id === exerciseId
        ? addSetToExercise(exercise, newSet)
        : exercise
    })
  }

  const getUpdatedRoutine = (routine, updatedDay, dayId) => {
    return routine.map((day, index) => {
      return index === dayId ? updatedDay : day
    })
  }

  const handleAddSet = (day, dayId, exerciseId) => {
    //newSet will eventually be added as a param. a modal will pop up asking for details
    const newSet = {
      id: uuidv4(),
      minReps: 8,
      maxReps: 12,
      weight: 135,
      rpe: 8,
    }

    const updatedDay = getUpdatedDay(day, exerciseId, newSet)

    setRoutine((prevRoutine) =>
      getUpdatedRoutine(prevRoutine, updatedDay, dayId)
    )
  }

  return (
    <>
      <h1>Workout Tracker</h1>
      <div className='calculator'>
        <input
          type='number'
          name='weight'
          id='weight'
          min='1'
          max='999'
          placeholder='weight'
          ref={weightRef}
          onChange={oneRepMaxCalc}
        />
        <input
          type='number'
          name='reps'
          id='reps'
          min='1'
          max='30'
          placeholder='reps'
          ref={repsRef}
          onChange={oneRepMaxCalc}
        />
        <p>Estimated 1RM: {oneRepMax}</p>
      </div>
      <div className='routine-container'>
        {routine.map((day, dayIndex) => (
          <div key={dayIndex} className='day-container'>
            <h2>Day {dayIndex + 1}</h2>
            {day.map((exercise) => (
              <table key={exercise.id} className='exercise'>
                <colgroup>
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan={5}>{exercise.name}</th>
                  </tr>
                  <tr className='exercise-header'>
                    <th>Set</th>
                    <th>RPE</th>
                    <th>Target</th>
                    <th>Weight</th>
                    <th>Reps</th>
                  </tr>
                </thead>
                <tbody>
                  {exercise.sets.map((set, setIndex) => (
                    <tr className='exercise-set' key={set.id}>
                      <td>{setIndex + 1}</td>
                      <td>{set.rpe}</td>
                      <td>
                        {set.weight}x{set.minReps}-{set.maxReps}
                      </td>
                      <td>
                        <input type='number' name='weight' min='0' />
                      </td>
                      <td>
                        <input type='number' name='reps' min='0' />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5}>
                      <button
                        onClick={() => handleAddSet(day, dayIndex, exercise.id)}
                      >
                        add set
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
export default App
