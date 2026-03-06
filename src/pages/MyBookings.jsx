import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Ticket, Calendar, MapPin, ChevronRight, Inbox, Clock, DollarSign } from 'lucide-react';
import { formatPrice } from '../utils/currency';

const MyBookings = ({ currency }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Load bookings from localStorage
        const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        // Sort by recent first
        setBookings(storedBookings.reverse());

        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="animate">
                <header style={{ marginBottom: '3rem', opacity: 0.5 }}>
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-text" style={{ width: '150px' }}></div>
                </header>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="skeleton" style={{ height: '130px', width: '100%' }}></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="animate" style={{ paddingBottom: '4rem' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>My Bookings</h1>
                <p style={{ color: 'var(--text-muted)' }}>You have {bookings.length} active tickets</p>
            </header>

            {bookings.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '5rem 2rem',
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius)',
                    border: '1px dashed var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <Inbox size={64} opacity={0.2} />
                    <div>
                        <h3>No tickets found</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>You haven't booked any experiences yet.</p>
                    </div>
                    <Link to="/" style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius)',
                        fontWeight: 600
                    }}>
                        Explore Events
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {bookings.map((booking, index) => (
                        <div
                            key={booking.bookingID}
                            className="glass"
                            style={{
                                padding: '1.5rem',
                                borderRadius: 'var(--radius)',
                                display: 'grid',
                                gridTemplateColumns: 'auto 1fr auto',
                                gap: '2rem',
                                alignItems: 'center',
                                transition: 'transform 0.2s, background 0.2s',
                                cursor: 'pointer',
                                border: '1px solid var(--border)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(8px)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.borderColor = 'var(--primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)';
                                e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        >
                            {/* Event Image / Thumbnail */}
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                border: '1px solid var(--border)'
                            }}>
                                <img
                                    src={booking.event.image}
                                    alt={booking.event.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Booking Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <h3 style={{ fontSize: '1.25rem' }}>{booking.event.title}</h3>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        padding: '0.2rem 0.6rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        borderRadius: '2rem',
                                        fontWeight: 700,
                                        letterSpacing: '1px'
                                    }}>
                                        #{booking.bookingID}
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        <Calendar size={16} />
                                        <span>{booking.event.date} at {booking.event.time}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        <MapPin size={16} />
                                        <span>{booking.event.location.split(',')[0]}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        <Ticket size={16} />
                                        <span style={{ fontWeight: 600, color: 'var(--text)' }}>Seats: {booking.seats.join(', ')}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontSize: '0.9rem' }}>
                                        <div style={{ width: '16px', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                                            {(booking.currency || currency) === 'INR' ? '₹' : '$'}
                                        </div>
                                        <span style={{ fontWeight: 700 }}>{formatPrice(booking.total, booking.currency || currency)} Paid</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action */}
                            <button
                                onClick={() => {
                                    // We need a shared state or some way to "view" this booking on the Confirmation page.
                                    // For simplicity, we'll store "currentViewBooking" and then navigate.
                                    localStorage.setItem('temp_view_booking', JSON.stringify(booking));
                                    navigate('/confirmation?view=true');
                                }}
                                style={{
                                    background: 'var(--surface)',
                                    color: 'var(--text)',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid var(--border)',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--primary)';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'var(--surface)';
                                    e.currentTarget.style.color = 'var(--text)';
                                }}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Persistence Note */}
            <div style={{
                marginTop: '4rem',
                padding: '1.5rem',
                background: 'rgba(99, 102, 241, 0.05)',
                borderRadius: 'var(--radius)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <Clock size={24} color="var(--primary)" />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Your bookings are stored locally in this browser. To view them on other devices, please sign in to your TicketHub account.
                </p>
            </div>
        </div>
    );
};

export default MyBookings;
