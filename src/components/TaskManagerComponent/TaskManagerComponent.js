import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions as taskManagerActions } from '../../store/taskManagerReducer';
import { FaCheck } from 'react-icons/fa';
import getRandomFact from '../../helpers/getRandomFact';
import styles from './TaskManagerComponent.module.css';
import { mockTitle, mockTasks } from '../../helpers/mock';

export default function TaskManagerContainer() {
  const dispatch = useDispatch();
  const { initialized, completed, title, tasks } = useSelector(state => state.taskManager);
  const [randomFact, setRandomFact] = useState('');

  const resetData = () => {
    dispatch(taskManagerActions.setTitle(mockTitle));
    dispatch(taskManagerActions.setTasks(mockTasks));
    dispatch(taskManagerActions.setCompleted(false));
    dispatch(taskManagerActions.setInitialized(true));
    setRandomFact('');
  }

  const handleSubtaskClick = (taskId, subtaskId) => {
    dispatch(taskManagerActions.completeSubtask({ taskId, subtaskId }));
  }

  useEffect(() => {
    if (completed) {
      const fetchRandomFact = async() => {
        const randomData = await getRandomFact();
        setRandomFact(randomData);
      }
      fetchRandomFact();
    }
  }, [completed]);

  useEffect(() => {
    if (!initialized) {
      resetData();
    }
  // eslint-disable-next-line
  }, [initialized]);

  return (
    <div className={styles.taskManagerContainer}>
      <h3>{title}</h3>
      {tasks.map((task, index) => <div key={task.id}>
        <h4 style={{display: 'flex', alignItems: 'center'}}>{index + 1} {task.title} {task.completed && <FaCheck size={24}/>}</h4>
        {
          task.subtasks.map(subtask => <div key={subtask.id}>
            <label htmlFor={`subtask${subtask.id}`}>
              <input disabled={index > 0 && !tasks[index - 1]?.completed} type='checkbox' id={`subtask${subtask.id}`}
                checked={subtask.completed} onChange={() => handleSubtaskClick(task.id, subtask.id)}
              />
              {subtask.text}
            </label>
          </div>)
        }
      </div>)}
      <button type='button' onClick={resetData}>RESET DATA</button>
      <p>{randomFact}</p>
    </div>
  );
}
