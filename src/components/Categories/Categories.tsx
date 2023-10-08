import React, {useState} from 'react';
import ModalOption from "../ModalOption/ModalOption";
import './Categories.scss';
// @ts-ignore
import cross from '../../assets/cross.svg'
// @ts-ignore
import check from '../../assets/check.svg'
//@ts-ignore
import editIcon from '../../assets/edit.svg'

interface Task {
    id: number;
    title: string;
    subtasks: Task[];
    level: number;
    addSubTask: boolean;
    isEditing: boolean;
}
interface modalProps {
    isOpen: boolean;
    id: number | null
}

function getColorByLevel(level: number) {
    switch (level) {
        case 0:
            return '#ffa975';
        case 1:
            return '#17c5ff';
        case 2:
            return '#cfcfcf';
        case 3:
            return '#40d640';
        default:
            return '#ffa975';
    }
}

function Categories() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [oldTaskValue, setOldTaskValue] = useState<string>('');

    const [isInputVisible, setInputVisible] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<modalProps>({isOpen: false, id: 0});


    const addTask = (level: number) => {
        if (newTask.trim() !== '') {
            const id = new Date().getTime() % 100;
            const newTaskItem: Task = {
                id: id,
                title: newTask,
                subtasks: [],
                level,
                addSubTask: false,
                isEditing: false
            };
            setTasks([...tasks, newTaskItem]);
            setNewTask('');
            setInputVisible(false);
        }
    };


    const addSubtaskRecursive = (taskToUpdate: Task, subtaskTitle: string, taskList: Task[]): Task[] => {
        if (subtaskTitle.trim() === '') {
            return taskList;
        }

        const id = new Date().getTime() % 100;
        const newSubtask: Task = {
            id: id,
            title: subtaskTitle,
            subtasks: [],
            level: taskToUpdate.level + 1,
            addSubTask: false,
            isEditing: false,
        };

        const updatedTasks = taskList.map((task) => {
            if (task.id === taskToUpdate.id) {
                taskToUpdate.subtasks.push(newSubtask);
                taskToUpdate.addSubTask = false;
                return taskToUpdate;
            } else if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks = addSubtaskRecursive(taskToUpdate, subtaskTitle, task.subtasks);
            }
            return task;
        });

        setNewTask('');
        return updatedTasks;
    };
    const addSubtask = (taskToUpdate: Task, subtaskTitle: string) => {
        const updatedTasks = addSubtaskRecursive(taskToUpdate, subtaskTitle, tasks);
        setTasks(updatedTasks);
    };


    const cancelEditingRecursive = (taskId: number, taskList: Task[]): Task[] => {
        return taskList.map((task) => {
            if (task.id === taskId) {
                return { ...task, title: oldTaskValue, isEditing: false };
            } else if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks = cancelEditingRecursive(taskId, task.subtasks);
            }
            return task;
        });
    };
    const cancelEditing = (taskId: number) => {
        const updatedTasks = cancelEditingRecursive(taskId, tasks);
        setTasks(updatedTasks);
        setOldTaskValue('');
        setNewTask('');
    };


    const handleCancelAddSubtaskRecursive = (taskId: number, taskList: Task[]): Task[] => {
        return taskList.map((task) => {
            if (task.id === taskId) {
                task.addSubTask = false;
            }

            if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks = handleCancelAddSubtaskRecursive(taskId, task.subtasks);
            }

            return task;
        });
    };
    const handleCancelAddSubtask = (taskId: number) => {
        const updatedTasks = handleCancelAddSubtaskRecursive(taskId, tasks);
        setTasks(updatedTasks);

        setNewTask('');
    };


    const toggleEditingRecursive = (taskId: number, taskList: Task[]): Task[] => {
        return taskList.map((task) => {
            if (task.id === taskId) {
                return { ...task, isEditing: !task.isEditing };
            } else if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks = toggleEditingRecursive(taskId, task.subtasks);
            }
            return task;
        });
    };
    const toggleEditing = (taskId: number) => {
        const updatedTasks = toggleEditingRecursive(taskId, tasks);
        setTasks(updatedTasks);
    };


    const handleAddSubTaskClickRecursive = (taskId: number, taskList: Task[]): Task[] => {
        return taskList.map((task) => {
            if (task.id === taskId) {
                task.addSubTask = true;
            }

            if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks = handleAddSubTaskClickRecursive(taskId, task.subtasks);
            }
            return task;
        });
    };
    const handleAddSubTaskClick = (taskToUpdate: number) => {
        const updatedTasks = handleAddSubTaskClickRecursive(taskToUpdate, tasks);
        setTasks(updatedTasks);
        setModalOpen({isOpen: false, id: null})
    };


    const handleEditRecursive = (oldTask: string, id: number, taskList: Task[]) => {
        setOldTaskValue(oldTask);
        return taskList.map(task => {
            if (task.id === id) {
                return {...task, isEditing: true};
            } else if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks = handleEditRecursive(oldTask, id, task.subtasks);
            }
            return task;
        });
    };
    const handleEdit = (oldTask: string, id: number) => {
        const updatedTasks = handleEditRecursive(oldTask, id, tasks);
        setTasks(updatedTasks);
    };


    const handleTitleChangeRecursive = (taskId: number, newTitle: string, taskList: Task[]): Task[] => {
        return taskList.map(task => {
            if (task.id === taskId) {
                return { ...task, title: newTitle };
            } else if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks = handleTitleChangeRecursive(taskId, newTitle, task.subtasks);
            }
            return task;
        });
    };
    const handleTitleInputChange = (taskId: number, newTitle: string) => {
        const updatedTasks = handleTitleChangeRecursive(taskId, newTitle, tasks);
        setTasks(updatedTasks);
    };


    const handleDeleteTaskRecursive = (taskId: number, taskList: Task[]): Task[] => {
        return taskList.reduce((acc, task) => {
            if (task.id === taskId) {
                return acc;
            }

            if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks = handleDeleteTaskRecursive(taskId, task.subtasks);
            }

            acc.push(task);
            return acc;
        }, [] as Task[]);
    };
    const handleDeleteTask = (taskId: number) => {
        const updatedTasks = handleDeleteTaskRecursive(taskId, tasks);
        setTasks(updatedTasks);
    };

    const renderTasks = (taskList: Task[]) => {
        return (
            <ul className='categories__content'>
                {taskList.map((task) => (
                    <li key={task.id}>
                        {task.isEditing ? (
                            <div>
                                <input
                                    className='categories__inputs'
                                    type="text"
                                    value={task.title}
                                    onChange={(e) => handleTitleInputChange(task.id, e.target.value)}
                                />
                                <button className='categories__cancel' onClick={() => cancelEditing(task.id)}><img
                                    src={cross} alt="cross"/></button>
                                <button className='categories__add' onClick={() => toggleEditing(task.id)}><img src={check} alt="check"/></button>
                            </div>
                        ) : (
                            <div className='categories__block'>
                                <div className='categories__task' style={{backgroundColor: getColorByLevel(task.level)}}>{task.title}</div>
                                <button  className='categories__add' onClick={() =>  setModalOpen({isOpen: true, id: task.id})}>+</button>
                                <button className='categories__edit' onClick={() => handleEdit(task.title, task.id)}><img
                                    src={editIcon} alt="edit"/></button>
                                {isModalOpen.isOpen && task.id === isModalOpen.id && (
                                    <ModalOption id={task.id} handleAddSubTaskClick={handleAddSubTaskClick} setModalOpen={setModalOpen}/>
                                )}
                                <button className='categories__delete' onClick={() => handleDeleteTask(task.id)}><img
                                    src={cross} alt="cross"/></button>
                            </div>
                        )}
                        {task.addSubTask && (
                            <div>
                                <input
                                    className='categories__inputs'
                                    type="text"
                                    placeholder="Category name"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                />
                                <button className='categories__cancel' onClick={() => handleCancelAddSubtask(task.id)}><img
                                    src={cross} alt="cross"/></button>
                                <button className='categories__add' onClick={() => addSubtask(task, newTask)}><img
                                    src={check} alt="check"/></button>
                            </div>
                        )}

                        {renderTasks(task.subtasks)}
                    </li>
                ))}
            </ul>
        );
    };

    const handleCancel = () => {
        setInputVisible(false);
        setNewTask('');
    };

    return (
        <div className='categories'>
            <div className='categories__top'>
                <p className='categories__top-title'>Categories</p>
                <button className='categories__add' onClick={() => setInputVisible(true)}>+</button>
            </div>
            {isInputVisible && (
                <div className='categories__inputs-block'>
                    <input
                        className='categories__inputs'
                        type="text"
                        placeholder="Category name"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button className='categories__cancel' onClick={handleCancel}><img src={cross} alt="cross"/></button>
                    <button className='categories__add' onClick={() => addTask(0)}><img src={check} alt="check"/></button>
                </div>
            )}
            <div className="task-list">{renderTasks(tasks)}</div>
        </div>
    );
}

export default Categories;

