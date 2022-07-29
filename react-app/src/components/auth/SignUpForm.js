import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signup-form.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let arr = [];
    if (password !== repeatPassword) {
      arr.push('password: Passwords must match')
    }
    setErrors(arr)
  }, [password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form'>
      <h2>Leave reviews, make reservations and more!</h2>
      <h3>Sign Up</h3>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div className='signup-error' key={ind}>{error}</div>
          ))}
        </div>
        <div className='signup-field'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className='signup-field'>
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className='signup-field'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className='signup-field'>
          <input
            type='password'
            name='repeat_password'
            placeholder='Confirm Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className='signup-button' type='submit'>Sign Up</button>
        <p className='login-link'>Already have an account? <Link to='/login'>Log in!</Link></p>
      </form>
    </div>
  );
};

export default SignUpForm;
