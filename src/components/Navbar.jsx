import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useState, useEffect } from 'react';

function Navbar() {
	const [cartItemCount, setCartItemCount] = useState(0);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
		setCartItemCount(Object.keys(cartItems).length);
	}, []);

	useEffect(() => {
		const handleStorage = () => {
			const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
			const itemCount = Object.keys(cartItems).length;
			setCartItemCount(itemCount);
		};
		window.addEventListener('storage', handleStorage);
		return () => {
			window.removeEventListener('storage', handleStorage);
		};
	}, []);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<nav className='navbar'>
			<div className='navbar-toggle' onClick={toggleMenu}>
				<span className='sr-only'>#</span>
			</div>
			<ul className={`navbar-links ${showMenu ? 'active' : ''}`}>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About Us</Link>
				</li>
				<li>
					<Link to='/testimonials'>Testimonials</Link>
				</li>
				<li>
					<Link to='/categories'>Categories</Link>
				</li>
				<li>
					<Link to='/bestsellers'>Best Sellers</Link>
				</li>
				<li>
					<Link to='/cart'>
						Cart
						{cartItemCount > 0 && <div className='cart-item-count'>{cartItemCount}</div>}
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;