import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { ArrowLeft, Ticket, Tag, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../utils/currency';

const BookingPage = ({ selectedEvent, selectedDate, selectedTime, selectedSeats, setBookingDetails, currency }) => {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0); // decimal
    const [promoError, setPromoError] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);

    const PROMO_CODES = {
        'WELCOME20': 0.20,
        'SAVE10': 0.10,
        'HUB25': 0.25
    };

    if (!selectedEvent || !selectedDate || !selectedTime || selectedSeats.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Invalid Booking Request</h2>
                <Link to="/" style={{ color: 'var(--primary)', marginTop: '1rem', display: 'inline-block' }}>Back to Home</Link>
            </div>
        );
    }

    const getSeatPrice = (seatId) => {
        const row = seatId.charAt(0);
        if (row === 'A' || row === 'B') return Math.round(selectedEvent.price * 1.5);
        if (row === 'E' || row === 'F') return Math.round(selectedEvent.price * 0.8);
        return selectedEvent.price;
    };

    const handleApplyPromo = () => {
        const code = promoCode.toUpperCase().trim();
        if (PROMO_CODES[code]) {
            setDiscount(PROMO_CODES[code]);
            setPromoError('');
            setPromoApplied(true);
        } else {
            setPromoError('Invalid promo code');
            setDiscount(0);
            setPromoApplied(false);
        }
    };

    const handleBooking = (formData) => {
        const subtotal = selectedSeats.reduce((acc, seatId) => acc + getSeatPrice(seatId), 0);
        const discountAmount = subtotal * discount;
        const totalAmount = subtotal - discountAmount;

        const booking = {
            event: { ...selectedEvent, date: selectedDate, time: selectedTime },
            seats: selectedSeats,
            user: formData,
            subtotal: subtotal,
            discount: discountAmount,
            total: totalAmount,
            currency: currency,
            bookingID: 'THB-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            date: new Date().toLocaleDateString()
        };

        // Store in LocalStorage
        const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        localStorage.setItem('bookings', JSON.stringify([...existingBookings, booking]));

        setBookingDetails(booking);
        navigate('/confirmation');
    };

    return (
        <div className="animate" style={{ paddingBottom: '4rem' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    color: 'var(--text-muted)',
                    marginBottom: '2rem',
                    fontSize: '1rem',
                    padding: '0.5rem 0'
                }}
            >
                <ArrowLeft size={20} />
                <span>Back to Seat Selection</span>
            </button>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem'
            }}>
                {/* Booking Form and Ticket Details */}
                <div style={{ maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Finalize Booking</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Please enter your details to complete the ticket purchase.</p>

                    <div className="glass" style={{
                        padding: '1.5rem',
                        borderRadius: 'var(--radius)',
                        marginBottom: '2rem',
                        border: '1px solid var(--border)',
                        background: 'rgba(255,255,255,0.02)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)', fontWeight: 600 }}>
                            <Tag size={18} /> PROMO CODE
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Enter code (e.g. WELCOME20)"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--background)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text)',
                                    outline: 'none'
                                }}
                            />
                            <button
                                onClick={handleApplyPromo}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Apply
                            </button>
                        </div>
                        {promoError && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>{promoError}</div>}
                        {promoApplied && (
                            <div style={{ color: 'var(--success)', fontSize: '0.85rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <CheckCircle2 size={16} /> Promo applied: {(discount * 100).toFixed(0)}% OFF!
                            </div>
                        )}
                    </div>

                    <BookingForm onSubmit={handleBooking} />
                </div>

                {/* Ticket Visualization */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '400px',
                        background: 'white',
                        borderRadius: 'var(--radius)',
                        color: '#0f172a',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        transform: 'rotate(2deg)'
                    }}>
                        <div style={{
                            background: 'var(--primary)',
                            padding: '2rem',
                            color: 'white',
                            position: 'relative',
                            textAlign: 'center'
                        }}>
                            <Ticket size={48} style={{ opacity: 0.2, position: 'absolute', top: '10px', right: '10px' }} />
                            <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem', fontWeight: 700, opacity: 0.8 }}>ADMIT ONE</div>
                            <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{selectedEvent.title}</h2>
                        </div>
                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                top: '-15px',
                                left: '-15px',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: 'var(--background)'
                            }}></div>
                            <div style={{
                                position: 'absolute',
                                top: '-15px',
                                right: '-15px',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: 'var(--background)'
                            }}></div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>DATE & TIME</div>
                                    <div style={{ fontWeight: 600 }}>{selectedDate} @ {selectedTime}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>SEATS</div>
                                    <div style={{ fontWeight: 600 }}>{selectedSeats.join(', ')}</div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>LOCATION</div>
                                    <div style={{ fontWeight: 600 }}>{selectedEvent.location.split(',')[0]}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>{discount > 0 ? 'SUBTOTAL' : 'TOTAL PRICE'}</div>
                                    <div style={{ fontWeight: 800, fontSize: '1.25rem', color: discount > 0 ? '#94a3b8' : 'var(--primary)', textDecoration: discount > 0 ? 'line-through' : 'none' }}>
                                        {formatPrice(selectedSeats.reduce((acc, seat) => acc + getSeatPrice(seat), 0), currency)}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>{discount > 0 ? 'FINAL TOTAL' : ''}</div>
                                    <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)' }}>
                                        {discount > 0 ? formatPrice(selectedSeats.reduce((acc, seat) => acc + getSeatPrice(seat), 0) * (1 - discount), currency) : ''}
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                marginTop: '1.5rem',
                                paddingTop: '1.5rem',
                                borderTop: '2px dashed #e2e8f0',
                                display: 'flex',
                                justifyContent: 'center',
                                opacity: 0.5
                            }}>
                                <div style={{ letterSpacing: '4px', fontSize: '0.7rem' }}>|||||| |||| ||||||| ||| |||||||</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
