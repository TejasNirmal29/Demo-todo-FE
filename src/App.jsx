import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import "./styles.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";



function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
  const API_URL = import.meta.env.VITE_API_URL;


    fetch(`${API_URL}/hello`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="api-message">
      <h3>Backend API Response:</h3>
      <p>{message || "Loading..."}</p>
    </div>
  );
}

function About() {
  return (
    <main className="container about-page">
      <h2>About Our School</h2>
      <p>
        Our school is dedicated to providing high-quality education from primary
        to secondary levels. With experienced teachers, engaging programs, and a
        strong community, we help students succeed in both academics and life.
      </p>
      <p>
        We believe in learning beyond classrooms — through activities, teamwork,
        and personal growth. Parents, teachers, and students work hand-in-hand
        to create a supportive environment where every child thrives.
      </p>
    </main>
  );
}

function Contact() {
  return (
    <main className="container about-page">
      <h2>Contact Us</h2>
      <p>Email: info@school.com</p>
      <p>Phone: +1 (555) 123-4567</p>
      <p>Address: 123 Learning Street, Education City</p>
    </main>
  );
}

function App() {
  const year = new Date().getFullYear();

  return (
    <Router>
      <header className="site-header">
        <div className="container">
          <h1>Welcome to School</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <footer className="site-footer">
        <div className="container">
          <p>© {year} School. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
