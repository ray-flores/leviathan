import { useCollection } from '../hooks/useCollection'

import Avatar from './Avatar'

// styles
import './OnlineUsers.css'

export default function OnlineUsers() {
  const { error, documents } = useCollection('users')

  const handleClick = () => {
    console.log('Yay');
  }

  return (
    <div className='user-list'>
      <div className='user-content'>
        <h2>All Users</h2>
        {error && <div className='error'>{error}</div>}
        {documents && documents.map(user => (
          <div key={user.id} className='user-list-item' onClick={handleClick}>
            {user.online && <span className='online-user'></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
      </div>
    </div>
  )
}