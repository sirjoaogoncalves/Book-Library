import { Link } from 'react-router-dom';
import '../styles/BookList.css';

function BookList({ books }) {
	const hasMissingId = books.some(book => !book.id);
	if (hasMissingId) {
		return <div className='message'>No books available.</div>;
	}
	console.log(books);

	return (
		<ul className='book-list'>
			{books.map(
				book =>
					book.volumeInfo.imageLinks?.thumbnail && (
						<li key={book.id} className='book-handler'>
							<Link to={`/book/${book.id}`} className='book'>
								<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
								<h3>
									{book.volumeInfo.title.split(' ').slice(0, 10).join(' ')}
									{book.volumeInfo.title.split(' ').length > 10 ? '...' : ''}
								</h3>
								<p>
									By {book.volumeInfo.authors ? book.volumeInfo.authors.join(' ').split(' ').slice(0, 6).join(' ') : 'Unknown'}
									{book.volumeInfo.authors && book.volumeInfo.authors.length > 6 ? '...' : ''}
								</p>
							</Link>
						</li>
					),
			)}
		</ul>
	);
}

export default BookList;
