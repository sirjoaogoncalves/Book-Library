import React from 'react';
import '../styles/About.css';
import Testimonials from './Testimonials';

function About() {
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
        <h2 className='testimonials'>Hear from our costumers</h2>
        <Testimonials />
			</div>
		</div>
	);
}

export default About;
