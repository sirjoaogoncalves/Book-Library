import { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../pages/BookList';
import '../styles/Categories.css';

function Categories() {
  // Initialize state variables
  const [books, setBooks] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [selectedAuthor, setSelectedAuthor] = useState(''); 
  const [showCategories, setShowCategories] = useState(false); 
  const [showAuthors, setShowAuthors] = useState(false); 
  const [searchClicked, setSearchClicked] = useState(false); 

  const handleCategoryChange = event => {
    const category = event.target.value;
    setSelectedCategory(category); 
  };
  
  
  const handleAuthorChange = event => {
    const author = event.target.value;
    setSelectedAuthor(author); 
  };



const handleSearch = async () => {
  setSearchClicked(true);

  const categoryQuery = `${selectedCategory} subject:${selectedCategory}`;
  const authorQuery = `inauthor:${selectedAuthor}`;
  const query = selectedAuthor ? `${authorQuery} ${categoryQuery}` : categoryQuery;
  const encodedQuery = encodeURIComponent(query);

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}`);
    const books =
      response.data.items?.map(book => {
        return {
          ...book,
          id: book.id || Math.random().toString(36).substring(7),
        };
      }) ?? [];
    setBooks(books);
  } catch (error) {
    console.error(error);
  }
};
 
const fetchBooksByRating = () => {
    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10')
      .then(response => {
        const books =
          response.data.items?.map(book => {
            return {
              ...book,
              id: book.id || Math.random().toString(36).substring(7),
            };
          }) ?? [];
        setBooks(books);
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
    fetchBooksByRating(); 
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
	   
		<h1>Search by Category or Author</h1>
		<div className='categories-buttons'>
		   
			<button onClick={toggleShowCategories}>Categories</button>
			
			<button onClick={toggleShowAuthors}>Authors</button>
		</div>
		
		{showCategories && (
			<div className='categories'>
			   
				<select value={selectedCategory} onChange={handleCategoryChange}>
				    
					{categories.map(category => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>
		)}
		
		{showAuthors && (
			<div className='authors'>
			  
				<select value={selectedAuthor} onChange={handleAuthorChange}>
				  
					{authors.map(author => (
						<option key={author} value={author}>
							{author}
						</option>
					))}
				</select>
			</div>
		)}
		   
		<button onClick={handleSearch}>Search</button>
		   
		{books.length > 0 && <BookList books={books} />}
		 
		{books.length === 0 && searchClicked && <div className='message'>No books found. Please try another category or author.</div>}
	</div>
);


}

export default Categories;
