import React, { useState, useEffect } from 'react';
import './App.css';

const navbar = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  {
    name: 'Our Products',
    id: 'product',
    child: [
      { name: 'Product 1', id: 'p1' },
      { name: 'Product 2', id: 'p2' },
      { name: 'Product 3', id: 'p3' },
      { name: 'Product 4', id: 'p4' },
    ],
  },
  { name: 'Contact Us', id: 'contact' },
];

function App() {
  <div className="App">
  <nav className="navbar">
    <ul className="nav-list">
      {navbar.map((item) => (
        <li key={item.id} className="nav-item">
          <a href={`#${item.id}`} className="nav-link">
            {item.name}
          </a>
          {/* Render child menu items if they exist */}
          {item.child && (
            <ul className="sub-menu">
              {item.child.map((childItem) => (
                <li key={childItem.id} className="sub-item">
                  <a href={`#${childItem.id}`} className="sub-link">
                    {childItem.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </nav>
</div>
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    // Fetch products from API
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));

    // Fetch product categories from API
    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form validation here
    // You can add validation logic for name, email, and message fields
    console.log('Form Data:', formData);
  };

  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            {navbar.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.name}</a>
                {item.child && (
                  <ul>
                    {item.child.map((subItem) => (
                      <li key={subItem.id}>
                        <a href={`#${subItem.id}`}>{subItem.name}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <section className="banner">
        <h1>Fresh 2022 look</h1>
      </section>
      <section className="product-list">
        {/* Display products here */}
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <div>
                <h3>{product.title}</h3>
                <p>{product.price}</p>
                <button>Add to Cart</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleFormChange}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default App;
