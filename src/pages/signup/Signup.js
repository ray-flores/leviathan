import { useState } from 'react'

// styles
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)

  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected)
    // if file is not selected
    if (!selected) {
      setThumbnailError('Please choose a file')
      return
    }
    // if file selected is not an image
    if (!selected.type.includes('image')) {
      setThumbnailError('Select an image file')
      return
    }
    // if selected image is too large
    if (selected.size > 5000000) {
      setThumbnailError('File size too large. File size must be less than 5MB')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated');

  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password, displayName, thumbnail)
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input
          required 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          required
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)} 
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input 
          required
          type="file"
          onChange={handleFileChange}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      <button className="btn">Sign up</button>
    </form>
  )
}