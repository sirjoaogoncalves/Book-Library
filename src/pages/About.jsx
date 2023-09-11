import React, { useState } from 'react';
import '../styles/About.css';
import Testimonials from './Testimonials';

function About() {
	
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	
	const handleSubmit = e => {
		e.preventDefault();

	
		if (isValidEmailFormat(email)) {
			
			alert('Form submitted successfully!');
			setIsFormSubmitted(true);
		} else {
			
			setIsValidEmail(false);
		}
	};

	
	const isValidEmailFormat = email => {
	
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	return (
		<div className='page-container'>
			<h1 className='page-title'>Magnificent Readers</h1>
			<div className='page-content'>
				<p>
					We are a community of book lovers who are passionate about reading and sharing our favorite books with others. Our library offers a wide selection of books in various genres and categories,
					including fiction, non-fiction, biography, and more.
				</p>
				<p>
					We believe that reading is a powerful tool that can educate, inspire, and entertain. Whether you're looking for a new book to read, or want to connect with other book lovers, our library has
					something for everyone.
				</p>
				<h2 className='testimonials'>Hear from our customers</h2>
				<Testimonials />

			
				<form onSubmit={handleSubmit}>
					<h2 className='form-title'>Tell us more how can we improve</h2>
					<div className='form-group'>
						<label htmlFor='name' className='label'>
							Name:
						</label>
						<input type='text' id='name' value={name} onChange={e => setName(e.target.value)} className='input' />
					</div>
					<div className='form-group'>
						<label htmlFor='email' className='label'>
							Email:
						</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={e => {
								setEmail(e.target.value);
								setIsValidEmail(true); 
							}}
							className={`input ${isValidEmail ? '' : 'invalid'}`}
						/>
						{!isValidEmail && <p className='error-message'>Please enter a valid email address.</p>}
					</div>
					<div className='form-group'>
						<label htmlFor='message' className='label'>
							Message:
						</label>
						<textarea id='message' value={message} onChange={e => setMessage(e.target.value)} className='textarea' />
					</div>
					<button type='submit' className='submit-button'>
						Submit
					</button>
				</form>

				{isFormSubmitted && <p className='success-message'>Form submitted successfully!</p>}
			</div>
		</div>
	);
}

export default About;
