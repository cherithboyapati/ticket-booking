import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, User } from 'lucide-react';

const Navbar = ({ onLogoClick, currency, setCurrency }) => {
    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '1rem 0',
            marginBottom: '2rem'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" onClick={onLogoClick} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'var(--primary)'
                }}>
                    <Ticket size={28} />
                    <span>TicketHub</span>
                </Link>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{
                        display: 'flex',
                        background: 'var(--surface)',
                        padding: '0.25rem',
                        borderRadius: '2rem',
                        border: '1px solid var(--border)',
                        marginRight: '1rem'
                    }}>
                        <button
                            onClick={() => setCurrency('USD')}
                            style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '1.5rem',
                                border: 'none',
                                background: currency === 'USD' ? 'var(--primary)' : 'transparent',
                                color: currency === 'USD' ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                transition: 'all 0.2s'
                            }}
                        >
                            USD
                        </button>
                        <button
                            onClick={() => setCurrency('INR')}
                            style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '1.5rem',
                                border: 'none',
                                background: currency === 'INR' ? 'var(--primary)' : 'transparent',
                                color: currency === 'INR' ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                transition: 'all 0.2s'
                            }}
                        >
                            INR
                        </button>
                    </div>
                    <Link to="/" style={{ fontWeight: 500 }} onClick={onLogoClick}>Explore</Link>
                    <Link to="/my-bookings" style={{
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: 'var(--text)'
                    }}>
                        My Bookings
                    </Link>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--surface)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid var(--border)'
                    }}>
                        <User size={20} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
