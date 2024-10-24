import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import imgaage from '../assets/react.svg'
import Nav from 'react-bootstrap/Nav';
import '../styles/Naav.css';

const Naav = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); // Pass the search term to the parent component
    };

    // Handle form submission to prevent page reload
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm); // Trigger search with the current term
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
            <Container fluid>
                {/* Left section with logo */}
                <Navbar.Brand className="navbar-left">
                    <Image
                        src={imgaage}
                        roundedCircle
                        width={40}
                        height={40}
                        alt="Logo"
                        className="navbar-logo"
                    />
                    <span className="navbar-brand-text">Seclob</span>
                </Navbar.Brand>

                {/* Hamburger toggle button */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Centered Search bar and Right section with breadcrumb and profile */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="mx-auto navbar-center">
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search..."
                                className="me-2 search-input"
                                aria-label="Search"
                                value={searchTerm} // Controlled input
                                onChange={handleSearchChange} // Update state on input change
                            />
                            <Button variant="outline-light" className="search-button" type="submit">
                                <i className="bi bi-search"></i>
                            </Button>
                        </Form>
                    </div>

                    {/* Right section with breadcrumb and profile */}
                    <Nav className="ml-auto navbar-right">
                        <span className="breadcrumb-text">Dashboard &gt; Staff &gt; Employee</span>
                        <span className="profile-link">Profile</span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Naav;
