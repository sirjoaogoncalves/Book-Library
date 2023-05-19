import { useState, useEffect } from 'react';
import '../styles/Cart.css';

function getCartItems() {
	const cartData = localStorage.getItem('cart');
	return cartData ? JSON.parse(cartData) : {};
}

function Cart() {
	const [cart, setCart] = useState(getCartItems());
	const [buyNowClicked, setBuyNowClicked] = useState(false);

	const updateCart = () => {
		const updatedCart = getCartItems();
		setCart(updatedCart);
	};

	useEffect(() => {
		updateCart();
	}, []);

	const removeFromCart = bookId => {
		const updatedCart = { ...cart };
		delete updatedCart[bookId];
		localStorage.setItem('cart', JSON.stringify(updatedCart));
		updateCart();
	};

	const clearCart = () => {
		localStorage.removeItem('cart');
		updateCart();
	};

	const cartItems = Object.values(cart);

	const handleBuyNowClick = () => {
		setBuyNowClicked(true);
	};

	return (
		<div className='cart'>
			<h1>Cart</h1>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<table>
						<thead>
							<tr>
								<th></th>
								<th>Title</th>
								<th>Author</th>
								<th>Price</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map(book => (
								<tr key={book.id}>
									<td>
										<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
									</td>
									<td>
										{book.volumeInfo.title.split(' ').slice(0, 10).join(' ')}
										{book.volumeInfo.title.split(' ').length > 10 ? '...' : ''}
									</td>
									<td>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</td>
									<td>{book.saleInfo.listPrice ? book.saleInfo.listPrice.amount.toFixed(2) : 'Not for sale'}</td>
									<td>
										<button onClick={() => removeFromCart(book.id)}>Remove</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<p className='total'>Total: ${cartItems.reduce((total, book) => total + (book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 0), 0).toFixed(2)}</p>
					<div className='buttons'>
						<button className='clear' onClick={clearCart}>
							Clear Cart
						</button>
						<button className='buy' onClick={handleBuyNowClick}>
							Buy Now
						</button>
					</div>
					{buyNowClicked && <p className='message'>This action cannot be performed right now. Please try again later.</p>}
				</>
			)}
		</div>
	);
}

export default Cart;
