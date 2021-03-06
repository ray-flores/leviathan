import { Link } from 'react-router-dom'
import Avatar from './Avatar'

import './TaskList.css'

export default function TaskList({ tasks }) {

  tasks.sort((a, b) => a.dueDate - b.dueDate)
  tasks.sort((a) => a.assignedUsersList.length !== 0 ? 1 : -1)

  return (
    <div className='task-list'>
      {tasks.length === 0 && <p>No tasks yet!</p>}
      {tasks.map(task => (
        <Link to={`/tasks/${task.id}`} key={task.id}>
          <h4>{task.name}</h4>
          <p className='created-by'>Created by {task.createdBy.displayName}</p>
          <p className='created-by'>Due by {task.dueDate.toDate().toDateString()}</p>
          {task.completedDate && 
          <p className='completed'>Completed {task.completedDate.toDate().toDateString()}
          </p>}
          <div className='assigned-to'>
            <ul>
              {task.assignedUsersList.map(user => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL}/>
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  )
}