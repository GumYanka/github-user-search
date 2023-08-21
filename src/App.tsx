import React, { useState } from 'react';
import { useGitHubContext } from './context/GitHubContext';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const { user, fetchUser, error } = useGitHubContext();

  const handleSearch = async () => {
    await fetchUser(username);

    if (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <div className="search-container">
        <input
          type="text"
          className='search-input'
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className='search-button' onClick={handleSearch}>Search</button>
      </div>
      {user ? (
        <div className="user-container">
          <img src={user.avatar_url} alt={`${user.login} Avatar`} className="avatar" />
          <h2>{user.login}</h2>
          <p>{user.bio}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            Visit GitHub Profile
          </a>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;