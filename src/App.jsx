import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import SeatSelection from './pages/SeatSelection';
import BookingPage from './pages/BookingPage';
import Confirmation from './pages/Confirmation';
import MyBookings from './pages/MyBookings';
import './index.css';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [currency, setCurrency] = useState('USD'); // New state for currency

  // Clear state when navigating back to home
  const resetSelection = () => {
    setSelectedEvent(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedSeats([]);
    setBookingDetails(null);
  };

  return (
    <Router>
      <div className="app">
        <Navbar onLogoClick={resetSelection} currency={currency} setCurrency={setCurrency} />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home currency={currency} />} />
            <Route
              path="/event/:id"
              element={
                <EventDetails
                  setSelectedEvent={setSelectedEvent}
                  setSelectedDate={setSelectedDate}
                  setSelectedTime={setSelectedTime}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  currency={currency}
                />
              }
            />
            <Route
              path="/seat-selection"
              element={
                <SeatSelection
                  selectedEvent={selectedEvent}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  currency={currency}
                />
              }
            />
            <Route
              path="/booking"
              element={
                <BookingPage
                  selectedEvent={selectedEvent}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedSeats={selectedSeats}
                  setBookingDetails={setBookingDetails}
                  currency={currency}
                />
              }
            />
            <Route
              path="/confirmation"
              element={<Confirmation bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} currency={currency} />}
            />
            <Route path="/my-bookings" element={<MyBookings currency={currency} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
