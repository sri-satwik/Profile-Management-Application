import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProfileContext } from '../context/ProfileContext';
import styles from './ProfileDisplay.module.css';
import { useNavigate } from 'react-router-dom';

const ProfileDisplay: React.FC = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      axios.get(`${process.env.REACT_APP_API_URL}/profile`)
        .then(response => setProfile(response.data))
        .catch(() => setError('Profile not found or server error.'));
    }
  }, [setProfile]);

  const handleEdit = () => {
    navigate('/profile-form');
  };

  const handleDelete = useCallback(async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/profile/${profile?.id}`);
      if (response.status === 200) {
        setProfile(null);
        localStorage.removeItem('profile');
        navigate('/profile-form');
      } else {
        setError('Failed to delete profile.');
      }
    } catch (error) {
      setError('Error occurred while deleting profile.');
    }
  }, [profile, navigate, setProfile]);

  if (error) return <p className={styles['profile-display__no-profile']}>{error}</p>;
  if (!profile) return <p className={styles['profile-display__no-profile']}>No profile found. Please create one.</p>;

  return (
    <div className={styles['container']}>
      <div className={styles['profile-display']}>
        <h1 className={styles['profile-display__header']}>Profile Details</h1>
        <p className={styles['profile-display__info']}>Name: {profile.name}</p>
        <p className={styles['profile-display__info']}>Email: {profile.email}</p>
        <p className={styles['profile-display__info']}>Age: {profile.age || 'N/A'}</p>
        <button className={styles['edit-button']} onClick={handleEdit}>Edit Profile</button>
        <button className={styles['delete-button']} onClick={handleDelete}>Delete Profile</button>
      </div>
    </div>
  );
};

export default ProfileDisplay;
