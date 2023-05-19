import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


function SearchResults() {
	const [books, setBooks] = useState([]);
	const { searchTerm } = useParams();

	useEffect(() => {
		axios
			.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
			.then(response => {
				setBooks(response.data.items);
			})
			.catch(error => {
				console.error(error);
			});
	}, [searchTerm]);

	return (
		<div>
			<h1>Search results for "{searchTerm}"</h1>
			<div className='search-books'>
				{books.map(book => (
					<Link to={`/book/${book.id}`} className='book' key={book.id}>
						{book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />}
						<h3>{book.volumeInfo.title}</h3>
						<p>By {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
					</Link>
				))}
			</div>
		</div>
	);
}

export default SearchResults;
