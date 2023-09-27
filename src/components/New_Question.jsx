import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const New_Question = ({ token, isLoggedIn }) => {
  const [error, setError] = useState(null);
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');

  const [form, setForm] = useState({
    title: '',
    body: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    try {
      const questionUrl = 'https://qb.fly.dev/questions';
      const response = await axios.post(questionUrl, form, {
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      setForm({
        title: '',
        body: '',
      });
      navigate(-1);
    } catch (error) {
      console.error('There was an error creating the New Question:', error);
      setError(error.message);
    }
  };

  return (
    <section>
      <div className='new-question-container'>
        <p className='new-question-text'>Create a New Question</p>
        <div className='guide-container'>
          <p className='guide-title'>Writing a good question</p>
          <p className='guide-subtitle'>You're ready to ask a question!</p>
          <p className='guide-subtitle'>Here's what you need to do</p>
          <p className='steps'>Steps:</p>
          <div className='steps-box'>
            <p className='steps-text'>
              • Summarize your question in a one-line title.
            </p>
            <p className='steps-text'>
              • Describe your question in more detail.
            </p>
            <p className='steps-text'>
              • Describe what you tried and what you expected to happen.
            </p>
            <p className='steps-text'>
              • Add 'tags' to help members of the community find your question.
            </p>
            <p className='steps-text'>
              •{' '}
              <strong>
                <i>Review</i>
              </strong>{' '}
              your question and post it to the site!
            </p>
          </div>
        </div>
        <div className='create-form-container'>
          <form onSubmit={handleSubmitClick} className='create-form'>
            <div className='title-input'>
              <label htmlFor='title' className='title-label'>
                Title:{' '}
              </label>
              <p className='label-subtitle'>
                Your title should summarize the question.
              </p>
              <p className='label-subtitle'>
                Be specific and imagine you're asking this question to another
                person.
              </p>
              <input
                className='title-input-box'
                placeholder="example: I'm having trouble with flexbox in the dog adoption project"
                type='text'
                name='title'
                id='title'
                required
                value={form.title}
                onChange={handleChange}
                onFocus={() => setError(null)}
              />
            </div>
            <div className='body-input'>
              <label htmlFor='body' className='body-label'>
                Body:{' '}
              </label>
              <p className='label-subtitle'>
                What are the details of your question?
              </p>
              <p className='label-subtitle'>
                Introduce your question and expand on what you put in the title.
              </p>
              <textarea
                className='body-input-box'
                placeholder="example: I've tried these approaches and I expected these results."
                type='text'
                name='body'
                id='body'
                required
                value={form.body}
                onChange={handleChange}
                onFocus={() => setError(null)}
              />
            </div>
            {error && <div className='error-message'>{error}</div>}
            <div className='submit-button-container'>
              <p className='submit-subtitle'>
                Review your question before you submit!
              </p>
              <input type='submit' value='Submit' className='submit-button' />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default New_Question;
