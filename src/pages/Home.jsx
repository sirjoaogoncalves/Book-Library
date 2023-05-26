import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function Home() { 
	const [featuredBooks, setFeaturedBooks] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = () => {
		setIsLoading(true);
		setTimeout(() => {
			axios
				.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
				.then(response => {
					setFeaturedBooks(response.data.items);
					setIsLoading(false);
				})
				.catch(error => {
					console.error(error);
				});
		}, 3000);
	};

	const handleInputChange = event => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		axios
			.get('https://www.googleapis.com/books/v1/volumes?q=marvel&maxResults=20')
			.then(response => {
				setFeaturedBooks(response.data.items);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);



	const sliderSettings = {
		arrows: true,
		dots: true,
		infinite: true,
		speed: 1500,
		slidesToShow:4,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
		],
	};

	const hasFeaturedBooks = featuredBooks.length > 0;
	const filteredBooks = featuredBooks.filter(book => book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail);

	return (
		<div className='home'>
			<h1>Welcome to our Book Web Store!</h1>
			<div className='search-container'>
				<input type='text' placeholder='Search' value={searchTerm} onChange={handleInputChange} />
				<button onClick={handleSearch}>Search</button>
			</div>
			{isLoading ? (
				<div className='loading-container'>
					<div className='loader'></div>
				</div>
			) : (
				<>
					<p>{searchTerm ? 'Search Results:' : 'Our featured books:'}</p>
					{hasFeaturedBooks ? (
						<Slider {...sliderSettings} className='slider'>
							{filteredBooks.map(book => (
								<Link to={`/book/${book.id}`} className='book' key={book.id}>
									<div className='book-div-slider'>
										<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
										<h3>
											{book.volumeInfo.title.split(' ').slice(0, 4).join(' ')}
											{book.volumeInfo.title.split(' ').length > 4 ? '...' : ''}
										</h3>
										<p>
											By {book.volumeInfo.authors ? book.volumeInfo.authors.join(' ').split(' ').slice(0, 6).join(' ') : 'Unknown'}
											{book.volumeInfo.authors && book.volumeInfo.authors.length > 6 ? '...' : ''}
										</p>
									</div>
								</Link>
							))}
						</Slider>
					) : (
						<div className='books'>
							{filteredBooks.map(book => (
								<Link to={`/book/${book.id}`} className='book' key={book.id}>
									<div className='book-div-slider'>
										<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
										<h3>
											{book.volumeInfo.title.split(' ').slice(0, 4).join(' ')}
											{book.volumeInfo.title.split(' ').length > 4 ? '...' : ''}
										</h3>
										<p>
											By {book.volumeInfo.authors ? book.volumeInfo.authors.join(' ').split(' ').slice(0, 6).join(' ') : 'Unknown'}
											{book.volumeInfo.authors && book.volumeInfo.authors.length > 6 ? '...' : ''}
										</p>
									</div>
								</Link>
							))}
						</div>
					)}
				</>
			)}
		</div>
	);

}

export default Home;
