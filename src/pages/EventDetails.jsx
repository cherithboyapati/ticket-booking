import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import eventsData from '../data/events.json';
import { ArrowLeft, Calendar, MapPin, Clock, Info, CheckCircle } from 'lucide-react';
import { formatPrice } from '../utils/currency';

const EventDetails = ({ setSelectedEvent, setSelectedDate, setSelectedTime, selectedDate, selectedTime, currency }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const foundEvent = eventsData.find(e => e.id === parseInt(id));
            setEvent(foundEvent);
            setSelectedEvent(foundEvent);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [id, setSelectedEvent]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(null); // Reset time when date changes
    };

    if (loading) {
        return (
            <div className="loading-container">
                <span className="loader"></span>
            </div>
        );
    }

    if (!event) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Event Not Found</h2>
                <Link to="/" style={{ color: 'var(--primary)', marginTop: '1rem', display: 'inline-block' }}>Back to Home</Link>
            </div>
        );
    }

    const availableTimes = event.schedule?.find(s => s.date === selectedDate)?.times || [];

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
                <span>Back</span>
            </button>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                alignItems: 'start'
            }}>
                <div style={{
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    border: '1px solid var(--border)'
                }}>
                    <img
                        src={event.image}
                        alt={event.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <div style={{
                            display: 'inline-block',
                            background: 'rgba(99, 102, 241, 0.1)',
                            color: 'var(--primary)',
                            padding: '0.4rem 1rem',
                            borderRadius: '2rem',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            marginBottom: '1rem',
                            border: '1px solid var(--primary)'
                        }}>
                            {event.category}
                        </div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem' }}>{event.title}</h1>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={18} /> SELECT DATE
                            </h3>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {event.schedule?.map(s => (
                                    <button
                                        key={s.date}
                                        onClick={() => handleDateSelect(s.date)}
                                        style={{
                                            padding: '0.75rem 1.25rem',
                                            borderRadius: '0.75rem',
                                            background: selectedDate === s.date ? 'var(--primary)' : 'var(--surface)',
                                            color: selectedDate === s.date ? 'white' : 'var(--text)',
                                            border: '1px solid',
                                            borderColor: selectedDate === s.date ? 'var(--primary)' : 'var(--border)',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedDate && (
                            <div className="animate" style={{ marginBottom: '2.5rem' }}>
                                <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={18} /> SELECT SHOWTIME
                                </h3>
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    {availableTimes.map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            style={{
                                                padding: '0.75rem 1.25rem',
                                                borderRadius: '0.75rem',
                                                background: selectedTime === time ? 'var(--secondary)' : 'var(--surface)',
                                                color: selectedTime === time ? 'white' : 'var(--text)',
                                                border: '1px solid',
                                                borderColor: selectedTime === time ? 'var(--secondary)' : 'var(--border)',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius)',
                            marginBottom: '2rem'
                        }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Info size={18} />
                                About this event
                            </h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{event.description}</p>
                            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                                <MapPin size={18} /> {event.location}
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'rgba(255,255,255,0.03)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)',
                            marginTop: '1rem'
                        }}>
                            <div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ticket Starting At</div>
                                <div style={{ fontSize: '2rem', fontWeight: 700 }}>{formatPrice(event.price, currency)}</div>
                            </div>
                            <button
                                onClick={() => navigate('/seat-selection')}
                                disabled={!selectedDate || !selectedTime}
                                style={{
                                    background: (!selectedDate || !selectedTime) ? 'var(--border)' : 'var(--primary)',
                                    color: 'white',
                                    padding: '1rem 2rem',
                                    borderRadius: 'var(--radius)',
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    boxShadow: (!selectedDate || !selectedTime) ? 'none' : '0 8px 20px rgba(99, 102, 241, 0.4)',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: (!selectedDate || !selectedTime) ? 'not-allowed' : 'pointer',
                                    opacity: (!selectedDate || !selectedTime) ? 0.5 : 1
                                }}
                            >
                                Select Seats <CheckCircle size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
