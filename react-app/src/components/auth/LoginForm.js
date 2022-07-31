import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Link } from 'react-router-dom';
import './login-form.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const greetings = [
    'Welcome back!',
    'So good to see you!',
    'Hey there!',
    'We missed you!',
    'Hi!',
    'Glad you\'re here!',
    'Bonjour!',
    'Hola!',
    'Sup',
    'Ready to eat?',
    'Ready to book?',
    'Hope you brought friends!',
    'Hope you brought an appetite!',
    'Yo!',
    'Snack time!',
    'Tables await...',
    '😋🍕',
    'What are ya hungry for?'
  ]
  const [greeting, setGreeting] = useState(greetings[Math.floor(Math.random() * greetings.length)])
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form'>
      <h2 className='greeting'>{greeting}</h2>
      <h3>Log In</h3>
      <form onSubmit={onLogin}>
        <div className='login-error'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-field'>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='login-field'>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className='login-button' type='submit'>Login</button>
        <p className='signup-link'>Don't have an account? <Link to='/sign-up'>Sign up!</Link></p>
      </form>
    </div>
  );
};

export default LoginForm;
