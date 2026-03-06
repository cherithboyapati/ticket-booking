import React, { useState, useEffect } from 'react';
import eventsData from '../data/events.json';
import EventCard from '../components/EventCard';
import { Search, Filter } from 'lucide-react';

const Home = ({ currency }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        // Simulate API delay
        const timer = setTimeout(() => {
            setEvents(eventsData);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const categories = ['All', 'Music', 'Movie', 'Travel', 'Comedy'];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || event.category === category;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="animate">
                <header style={{ marginBottom: '3rem', textAlign: 'center', opacity: 0.5 }}>
                    <div className="skeleton skeleton-title" style={{ margin: '0 auto 1rem' }}></div>
                    <div className="skeleton skeleton-text" style={{ maxWidth: '600px', margin: '0 auto' }}></div>
                </header>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="skeleton skeleton-card"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="animate">
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Your Next Experience Starts Here
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Discover the best events, movies, and travel destinations. Book your tickets in seconds.
                </p>
            </header>

            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                <div style={{
                    position: 'relative',
                    flex: '1',
                    maxWidth: '500px'
                }}>
                    <Search size={20} style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)'
                    }} />
                    <input
                        type="text"
                        placeholder="Search events, cities, or movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3rem',
                            borderRadius: 'var(--radius)',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'var(--text)',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: category === cat ? 'var(--primary)' : 'var(--surface)',
                                color: category === cat ? 'white' : 'var(--text)',
                                border: '1px solid ' + (category === cat ? 'var(--primary)' : 'var(--border)'),
                                fontSize: '0.9rem',
                                fontWeight: 500
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem',
                paddingBottom: '4rem'
            }}>
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} currency={currency} />
                    ))
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <h3>No events found matching your search.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
