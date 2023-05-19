import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BookDetails.css';

function BookDetails() {
	const [book, setBook] = useState(null);
	const { bookId } = useParams();
	const [clicked, setClicked] = useState(false); // add state for clicked

	useEffect(() => {
		axios
			.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
			.then(response => {
				setBook(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, [bookId]);

	if (!book) {
		return <div>Loading...</div>;
	}

	const reviewsLink = book.volumeInfo.infoLink + '&amp;dq=' + encodeURIComponent(book.volumeInfo.title);

	const price = book.saleInfo.listPrice && book.saleInfo.listPrice.amount ? book.saleInfo.listPrice.amount.toFixed(2) : 'Not for sale';

	const addToCart = () => {
		const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
		cart[book.id] = book;
		localStorage.setItem('cart', JSON.stringify(cart));
		setClicked(true);
	};

	return (
		<div className='book-details'>
			<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
			<div className='book-info'>
				<h1>{book.volumeInfo.title}</h1>
				<p className='author'>By {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
				<p className='published-date'>{book.volumeInfo.publishedDate}</p>
				<div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
				<p className='page-count'>{book.volumeInfo.pageCount} pages</p>
				<p className='language'>Language: {book.volumeInfo.language}</p>
				<p className='categories'>Categories: {book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'None'}</p>
				<p className='average-rating'>Average rating: {book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'Not rated'}</p>
				<p className='ratings-count'>Number of ratings: {book.volumeInfo.ratingsCount ? book.volumeInfo.ratingsCount : 'None'}</p>
				<p className='price'>Price: {price}</p>
				<div className='page-links'>
					<button onClick={addToCart} className={clicked ? 'button-clicked' : ''}>
						Add to Cart
					</button>
					<a href={reviewsLink} target='_blank' rel='noopener noreferrer'>
						View reviews
					</a>
				</div>
			</div>
		</div>
	);
}

export default BookDetails;
