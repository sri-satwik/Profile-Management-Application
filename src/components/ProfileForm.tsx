import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProfileContext } from '../context/ProfileContext';
import styles from './ProfileForm.module.css';

const ProfileForm: React.FC = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        age: profile.age || ''
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.name.length < 3) return 'Name must be at least 3 characters.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Invalid email format.';
    if (formData.age && isNaN(Number(formData.age))) return 'Age must be a number.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    try {
      if (profile) {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/profile/${profile.id}`, formData);
        setProfile(response.data); 
        localStorage.setItem('profile', JSON.stringify(response.data));
      } else {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/profile`, formData);
        setProfile(response.data);
        localStorage.setItem('profile', JSON.stringify(response.data));
      }
      navigate('/profile');
    } catch (apiError) {
      setError('Failed to submit profile data.');
    }
  };

  return (
    <div className={styles["container"]}>
      <form onSubmit={handleSubmit} className={styles['profile-form']}>
        <h2 className={styles.heading}>{profile ? 'Edit Your Profile' : 'Enter Your Details'}</h2>
        <div className={styles['profile-form__input']}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className={styles['profile-form__input']}>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className={styles['profile-form__input']}>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
          />
        </div>
        {error && <p className={styles['profile-form__error']}>{error}</p>}
        <button type="submit" className={styles['profile-form__submit']}>
          {profile ? 'Update Profile' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
