import TaskList from '../../components/TaskList'
import { useCollection } from '../../hooks/useCollection'
import './Dashboard.css'
import TaskFilter from './TaskFilter'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'


export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection('tasks')
  const [currentFilter, setCurrentFilter] = useState('active')

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const tasks = documents ? documents.filter((document) => {
    switch(currentFilter) {
      case 'active':
        if (document.completedDate) {
          return false
        }
        return true
      case 'assigned':
        if (document.completedDate) {
          return false
        }
        let assignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if(user.uid === u.id) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'completed':
        let hasBeenCompleted = false
        if (document.completedDate !== null) {
          hasBeenCompleted = true
        }
        return hasBeenCompleted
      case 'development':
      case 'design':
        if (document.completedDate) {
          return false
        }
        //console.log(document.category, currentFilter)
        return document.category === currentFilter
      default:
        return true
    }
  }) : null

  return (
    <div className='dash'>
      <div className='dash-content'>
        {error && <p className='error'>{error}</p>}
        {documents && (
          <TaskFilter currentFilter={currentFilter} changeFilter={changeFilter} />
        )}
        {tasks && <TaskList tasks={tasks} />}
        
      </div>
    </div>
  )
}

