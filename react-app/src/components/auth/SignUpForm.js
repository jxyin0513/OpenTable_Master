import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signup-form.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  var emailPattern = new RegExp('/^[a-zA-Z0-9.! #$%&\'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/')

  const onSignUp = async (e) => {
    e.preventDefault();
    const errors = [];
    if (username.length > 40 || username.length < 5) errors.push('Username must be between 5 and 40 characters');
    if (email !== emailPattern) errors.push('You must use a valid email address');
    if (password !== repeatPassword) errors.push('Password fields must match');
    if (!errors.length) {
      await dispatch(signUp(username, email, password));
    } else {
      setSubmitted(true);
      setErrors(errors);
      return;
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
      {submitted && errors.length && (
        <div className='signup-errors'>
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
      )}
      <form onSubmit={onSignUp}>
        <div>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='repeat_password'
            placeholder='Confirm Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
        <p>Already Have an Account? <Link to='/login'>Log In!</Link></p>
      </form>
    </div>
  );
};

export default SignUpForm;
