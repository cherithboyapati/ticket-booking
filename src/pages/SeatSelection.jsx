import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SeatGrid from '../components/SeatGrid';
import { ArrowLeft, CreditCard, Armchair } from 'lucide-react';
import { formatPrice } from '../utils/currency';

const SeatSelection = ({ selectedEvent, selectedDate, selectedTime, selectedSeats, setSelectedSeats, currency }) => {
    const navigate = useNavigate();

    if (!selectedEvent || !selectedDate || !selectedTime) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>No event or session selected.</h2>
                <Link to="/" style={{ color: 'var(--primary)', marginTop: '1rem', display: 'inline-block' }}>Back to Home</Link>
            </div>
        );
    }

    const toggleSeat = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const getSeatPrice = (seatId) => {
        const row = seatId.charAt(0);
        if (row === 'A' || row === 'B') return Math.round(selectedEvent.price * 1.5);
        if (row === 'E' || row === 'F') return Math.round(selectedEvent.price * 0.8);
        return selectedEvent.price;
    };

    const totalPrice = selectedSeats.reduce((acc, seatId) => acc + getSeatPrice(seatId), 0);

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
                <span>Back to Event</span>
            </button>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Choose Your Seats</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                    {selectedEvent.title}
                    <span style={{ margin: '0 0.75rem', opacity: 0.3 }}>|</span>
                    {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {selectedTime}
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 350px',
                gap: '4rem',
                alignItems: 'start'
            }}>
                {/* Seat Chart */}
                <div style={{
                    background: 'var(--surface)',
                    padding: '3rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {/* Legend */}
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'var(--surface-hover)', border: '1px solid #f59e0b' }}></div>
                            <span>Premium (+50%)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'var(--surface-hover)', border: '1px solid var(--border)' }}></div>
                            <span>Standard</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'var(--surface-hover)', border: '1px solid #94a3b8' }}></div>
                            <span>Economy (-20%)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'var(--primary)', border: '1px solid var(--primary)' }}></div>
                            <span>Selected</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', cursor: 'not-allowed' }}></div>
                            <span>Booked</span>
                        </div>
                    </div>

                    {/* Screen / Stage Indicator */}
                    <div style={{
                        width: '80%',
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                        borderRadius: '2px',
                        marginBottom: '4rem',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'var(--text-muted)',
                            fontSize: '0.75rem',
                            letterSpacing: '4px',
                            textTransform: 'uppercase'
                        }}>
                            SCREEN / STAGE
                        </div>
                    </div>

                    <SeatGrid
                        selectedSeats={selectedSeats}
                        onSeatClick={toggleSeat}
                    />
                </div>

                {/* Booking Summary Card */}
                <div className="glass" style={{
                    padding: '2rem',
                    borderRadius: 'var(--radius)',
                    height: 'fit-content',
                    position: 'sticky',
                    top: '100px'
                }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Booking Summary</h3>

                    {selectedSeats.length === 0 ? (
                        <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <div style={{ marginBottom: '1rem' }}><Armchair size={48} opacity={0.3} /></div>
                            <p>No seats selected yet</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {selectedSeats.map(id => (
                                    <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Seat {id} ({id.startsWith('A') || id.startsWith('B') ? 'Prem' : (id.startsWith('E') || id.startsWith('F') ? 'Econ' : 'Std')})</span>
                                        <span style={{ fontWeight: 600 }}>{formatPrice(getSeatPrice(id), currency)}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                                * Prices based on selected row tiers.
                            </div>
                            <div style={{
                                paddingTop: '1.5rem',
                                borderTop: '1px solid var(--border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline'
                            }}>
                                <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Total Amount:</span>
                                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{formatPrice(totalPrice, currency)}</span>
                            </div>

                            <button
                                onClick={() => navigate('/booking')}
                                style={{
                                    background: 'var(--primary)',
                                    color: 'white',
                                    padding: '1rem',
                                    width: '100%',
                                    borderRadius: 'var(--radius)',
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    marginTop: '1rem'
                                }}
                            >
                                Continue to Payment <CreditCard size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
