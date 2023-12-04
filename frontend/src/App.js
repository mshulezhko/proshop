import React from 'react'
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

// rafce

const App = () => {
  return (
    <div>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Hello</h1>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App
