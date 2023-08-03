import { TaskItem } from "./TaskItem.tsx"
import { ChangeEvent, useState } from 'react';
import {Clipboard, PlusCircle} from '@phosphor-icons/react';

import { v4 as uuidv4 } from 'uuid';

import styles from "./Tasks.module.css"


export function Tasks() {
    const [activeCount, setActiveCount] = useState(0);

    const handleTaskToggle = (isActive: boolean) => {
      setActiveCount(prevCount => isActive ? prevCount + 1 : prevCount - 1);
    };
    
    const [tasks, newTask] = useState<string[]>([])

    const [newTaskText, setNewTaskText] = useState('')

    const [taskId, setTaskId] = useState(uuidv4())

    function taskTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setNewTaskText(event.target.value)
    }

    function handleNewTask(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()

        setTaskId(uuidv4())
        newTask([...tasks, newTaskText])
        setNewTaskText('')
        console.log(taskId)
    }

    function deleteTask(taskToDelete: string) {
        const noDeletedTasks = tasks.filter(tasks => {
            return tasks != taskToDelete
        })
        newTask(noDeletedTasks)      
    }

    return (
        <div className={styles.taskContainer}>
            <div className={styles.InputBox}>
                <form onSubmit={handleNewTask}>
                    <textarea 
                        onChange={taskTextChange}
                        placeholder="Adicione uma nova tarefa">
                    </textarea>
                    <button type="submit">Criar <PlusCircle className={styles.PlusCircle}/></button>
                </form>
            </div>
            <header className={styles.taskHeader}>
                <div className={styles.createdTasks}>
                    <p>Trefas criadas <span>{tasks.length}</span> </p>
                </div>
                <div className={styles.completedTasks}>
                    <p>Concluidas
                        <span>{activeCount} de {tasks.length}</span>
                    </p>
                </div>
            </header>

            {tasks.length == 0? 
            
                <div className={styles.noTasks}>
                    <Clipboard className={styles.clipboard}/>
                    <p>
                        <strong>
                            Você ainda não tem tarefas cadastradas
                        </strong>
                        <br />
                            Crie tarefas e organize seus itens a fazer
                    </p>
                </div>
                
                : 

                <div className={styles.tasksBox}>
                    {tasks.map(tasks => {
                        return <TaskItem isActive={false} onToggle={handleTaskToggle} key={tasks} content={tasks} deleteTask={deleteTask} />
                    })}
                </div>}

        </div>
    )
}