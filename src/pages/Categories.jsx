import { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../pages/BookList';
import '../styles/Categories.css';

function Categories() {
  // Initialize state variables
  const [books, setBooks] = useState([]); // Holds the fetched books
  const [selectedCategory, setSelectedCategory] = useState(''); // Tracks the selected category
  const [selectedAuthor, setSelectedAuthor] = useState(''); // Tracks the selected author
  const [showCategories, setShowCategories] = useState(false); // Controls the visibility of category dropdown
  const [showAuthors, setShowAuthors] = useState(false); // Controls the visibility of author dropdown
  const [searchClicked, setSearchClicked] = useState(false); // Tracks if the search button is clicked
  
  // Event handler for category selection change
  const handleCategoryChange = event => {
    const category = event.target.value;
    setSelectedCategory(category); // Update the selected category state
  };
  
  // Event handler for author selection change
  const handleAuthorChange = event => {
    const author = event.target.value;
    setSelectedAuthor(author); // Update the selected author state
  };



  const handleSearch = () => {
    setSearchClicked(true); // Sets the searchClicked state to true

    // Constructs the query based on the selected category or author
    const categoryQuery = `${selectedCategory} subject:${selectedCategory}`;
    const authorQuery = `inauthor:${selectedAuthor}`;
    const query = selectedAuthor ? `${authorQuery} ${categoryQuery}` : categoryQuery;
    const encodedQuery = encodeURIComponent(query);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}`)
      .then(response => {
        const books =
          response.data.items?.map(book => {
            return {
              ...book,
              id: book.id || Math.random().toString(36).substring(7),
            };
          }) ?? [];
        setBooks(books); // Updates the books state with the fecthed books
      })
      .catch(error => {
        console.error(error);
      });
  };

  const categories = [
    'Arts',
    'Biography',
    'Business',
    'Comics & Graphic Novels',
    'Computers',
    'Cooking',
    'Crafts & Hobbies',
    'Education',
    'Entertainment',
    'Health & Fitness',
    'History',
    'Home & Garden',
    'Horror',
    'Humor',
    'Literary Collections',
    'Medical',
    'Mystery',
    'Parenting',
    'Philosophy',
    'Poetry',
    'Political Science',
    'Psychology',
    'Reference',
    'Religion',
    'Romance',
    'Science',
    'Science Fiction',
    'Self-Help',
    'Social Science',
    'Sports & Recreation',
    'Technology & Engineering',
    'Thriller',
    'Travel',
  ];

  const authors = [
    'Agatha Christie',
    'Charles Dickens',
    'Edgar Allan Poe',
    'Ernest Hemingway',
    'Fyodor Dostoevsky',
    'Harper Lee',
    'J.K. Rowling',
    'Jane Austen',
    'Leo Tolstoy',
    'Mark Twain',
    'Stephen King',
    'William Shakespeare'
  ];

  useEffect(() => {
		handleSearch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  const toggleShowCategories = () => {
    setShowCategories(showCategories => !showCategories);
    setShowAuthors(false);
  };

  const toggleShowAuthors = () => {
    setShowAuthors(showAuthors => !showAuthors);
    setShowCategories(false);
  };


return (
	<div className='container'>
	    {/* Heading */}
		<h1>Search by Category or Author</h1>
		<div className='categories-buttons'>
		    {/* Button to toggle display of categories */}
			<button onClick={toggleShowCategories}>Categories</button>
			  {/* Button to toggle display of authors */}
			<button onClick={toggleShowAuthors}>Authors</button>
		</div>
		  {/* Render categories dropdown if showCategories is true */}
		{showCategories && (
			<div className='categories'>
			    {/* Categories dropdown */}
				<select value={selectedCategory} onChange={handleCategoryChange}>
				    {/* Render category options */}
					{categories.map(category => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>
		)}
		  {/* Render authors dropdown if showAuthors is true */}
		{showAuthors && (
			<div className='authors'>
			    {/* Authors dropdown */}
				<select value={selectedAuthor} onChange={handleAuthorChange}>
				    {/* Render author options */}
					{authors.map(author => (
						<option key={author} value={author}>
							{author}
						</option>
					))}
				</select>
			</div>
		)}
		   {/* Search button */}
		<button onClick={handleSearch}>Search</button>
		   {/* Render BookList component if there are books */}
		{books.length > 0 && <BookList books={books} />}
		  {/* Display message if no books found and search button clicked */}
		{books.length === 0 && searchClicked && <div className='message'>No books found. Please try another category or author.</div>}
	</div>
);


}

export default Categories;
