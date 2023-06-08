import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useState, useEffect } from 'react';
import { FcHome, FcAbout, FcSearch, FcList } from "react-icons/fc";
import { FaShoppingCart , FaStar} from "react-icons/fa";

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
				<span className='sr-only'><FcList style={{fontSize:'2rem'}} /></span>
			</div>
			<ul className={`navbar-links ${showMenu ? 'active' : ''}`}>
				<li>
					<Link to='/'><FcHome style={{fontSize:'2rem'}} /></Link>
				</li>
				<li>
					<Link to='/about'><FcAbout style={{fontSize:'2rem'}} /></Link>
				</li>	
				<li>
					<Link to='/categories'><FcSearch style={{fontSize:'2rem'}} /></Link>
				</li>
				<li>
					<Link to='/bestsellers'><FaStar style={{fontSize:'2rem' , color: 'gold'}} /></Link>
				</li>
				<li>
					<Link to='/cart'>
						<FaShoppingCart style={{fontSize:'2rem'}}  />
						{cartItemCount > 0 && <div className='cart-item-count'>{cartItemCount}</div>}
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
