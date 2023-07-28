import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import SearchResults from "../src/pages/SearchResults";
import BookDetails from "../src/components/BookDetails";
import About from "../src/pages/About";
import Categories from "../src/pages/Categories";
import Cart from "../src/components/Cart";
import BestSellers from "../src/pages/BestSellers";
import Testimonials from "./pages/Testimonials";
import Navbar from "../src/components/Navbar";
import Footer from "./components/Footer";
import ParticleBackground from "./components/particleBackground";

function App() {
  return (
    <Router basename="Book-Library">
      <ParticleBackground />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search/:searchTerm" element={<SearchResults />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/bestsellers" element={<BestSellers />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
