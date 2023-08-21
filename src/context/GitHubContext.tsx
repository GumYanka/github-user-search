import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface User {
  avatar_url: string;
  login: string;
  bio: string;
  html_url: string;
}

interface GitHubContextValue {
  user: User | null;
  error: string | null;
  fetchUser: (username: string) => Promise<void>;
}

const GitHubContext = createContext<GitHubContextValue | undefined>(undefined);

export const useGitHubContext = () => {
  const context = useContext(GitHubContext);
  if (!context) {
    throw new Error('useGitHubContext must be used within a GitHubProvider');
  }
  return context;
};

export const GitHubProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (username: string) => {
    setError(null);
  
    if (!username) {
      setError('Please enter a GitHub username.');
      return;
    }
  
    try {
      const response = await axios.get<User>(`https://api.github.com/users/${username}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      setError('User not found. Please enter a valid GitHub username.');
    }
  };

  const contextValue: GitHubContextValue = {
    user,
    error,
    fetchUser,
  };

  return <GitHubContext.Provider value={contextValue}>{children}</GitHubContext.Provider>;
};