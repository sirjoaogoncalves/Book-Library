import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Testimonials.css';



const testimonial1 = require('../imgs/testimonial1.png');
const testimonial2 = require('../imgs/testimonial2.png');
const testimonial3 = require('../imgs/testimonial3.png');
const testimonial4 = require('../imgs/testimonial4.png');

const Testimonials = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: [
			{
				breakpoint: 780,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Slider {...settings} className='slider'>
			<div className='testimonial'>
				<img src={testimonial1} alt='Testimonial 1' />
				<h3>John Doe</h3>
				<p>"I absolutely love shopping at this web book store! The website is incredibly user-friendly, making it a breeze to browse through their extensive collection of books."</p>
			</div>
			<div className='testimonial'>
				<img src={testimonial2} alt='Testimonial 2' />
				<h3>Jane Smith</h3>
				<p>
					"As an avid reader, I have found my go-to online bookstore! This web book store not only offers a vast range of genres and authors but also provides detailed descriptions and reviews for
					each book, allowing me to make informed decisions."
				</p>
			</div>
			<div className='testimonial'>
				<img src={testimonial3} alt='Testimonial 3' />
				<h3>Bob Johnson</h3>
				<p>
					"I cannot say enough good things about this web book store! The collection of books is diverse and caters to various interests and age groups. The interface is clean, modern, and visually
					appealing, making it enjoyable to navigate and explore new titles."
				</p>
			</div>
			<div className='testimonial'>
				<img src={testimonial4} alt='Testimonial 4' />
				<h3>Emily T.</h3>
				<p>
					"This web book store has become my literary sanctuary! With its vast selection of both popular and niche books, I always find something that piques my interest. The seamless ordering
					process, secure payment options, and fast delivery have made my reading experience even more enjoyable."
				</p>
			</div>
		</Slider>
	);
};

export default Testimonials;

