import { Trash, Circle, CheckCircle} from '@phosphor-icons/react';
import { useState } from 'react';

import styles from './TaskItem.module.css';

interface TaskItemProps {
    content: string;
    isActive: boolean;
    onToggle: (isActive: boolean) => void;
    deleteTask: (content: string) => void;
  };

export function TaskItem({ content,  isActive, onToggle, deleteTask}: TaskItemProps) {
    const [localIsActive, setLocalIsActive] = useState(isActive);

    function handleToggle() {
      const updatedIsActive = !localIsActive;
      setLocalIsActive(updatedIsActive);
      onToggle(updatedIsActive);
    };

    function handleDeleteTask() {
      deleteTask(content)

    }

  return (
    <div className={styles.tasksContent}>
      <div className={styles.radioButton}>
        {localIsActive ? (
          <CheckCircle
            className={styles.checkCircle}
            onClick={handleToggle}
          />
        ) : (
          <Circle
            className={styles.circle}
            onClick={handleToggle}
          />
        )}
      </div>
      <p className={`${styles.taskText} ${localIsActive ? styles.lineThrough : ''}`}>
        {content}
      </p>
      <Trash 
        className={styles.trash} 
        onClick={handleDeleteTask}
        />
    </div>
  );
};

