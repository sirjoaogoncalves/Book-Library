import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/BestSellers.css';

const BestSellers = () => {
	const [bestSellersBooks, setBestSellersBooks] = useState([]);

	useEffect(() => {
		const fetchBestSellersBooks = async () => {
			const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=10');
			const data = await response.json();
			setBestSellersBooks(data.items);
		};
		fetchBestSellersBooks();
	}, []);

	return (
		<div>
			<h1>Best Sellers</h1>
			<div className='books-container'>
				{bestSellersBooks.map(book => (
					<Link to={`/book/${book.id}`} className='book' key={book.id}>
						<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
						<h3>{book.volumeInfo.title}</h3>
						<p>By {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default BestSellers;
