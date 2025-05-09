import React from 'react';
import { Toaster } from 'react-hot-toast';
import BookingPage from './pages/BookingPage';

const App: React.FC = () => {
  return (
    <div className="container">
      <BookingPage />
    </div>
  );
}

export default App;