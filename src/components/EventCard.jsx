import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { formatPrice } from '../utils/currency';

const EventCard = ({ event, currency }) => {
    return (
        <Link to={`/event/${event.id}`} className="animate" style={{
            display: 'block',
            background: 'var(--surface)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            transition: 'all 0.3s ease',
            height: '100%',
            position: 'relative'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                    src={event.image}
                    alt={event.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '0.4rem 1rem',
                    borderRadius: '2rem',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}>
                    {formatPrice(event.price, currency)}
                </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
                <div style={{
                    color: 'var(--primary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '0.5rem'
                }}>
                    {event.category}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>{event.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={16} />
                        <span>
                            {event.schedule?.[0]?.date}
                            {event.schedule?.length > 1 && <span style={{ marginLeft: '4px', color: 'var(--primary)', fontWeight: 600 }}>(+{event.schedule.length - 1} more)</span>}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={16} />
                        <span>{event.location.split(',')[1] || event.location}</span>
                    </div>
                </div>
                <div style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ color: 'var(--success)', fontWeight: 500, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div>
                        {event.seatsAvailable} seats left
                    </div>
                    <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Book now <Ticket size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
