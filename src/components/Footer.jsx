import React from 'react';
import '../styles/Footer.css';

function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer>
			<div className='container'>
				<p>&copy; Magnificent Readers, {currentYear}. All rights reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
