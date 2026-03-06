import { Link, Navigate, useLocation } from 'react-router-dom';
import ConfirmationMessage from '../components/ConfirmationMessage';
import { Home, Calendar, MapPin, Ticket, Download, Mail, Smartphone, ArrowLeft, Tag } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useEffect } from 'react';
import { formatPrice } from '../utils/currency';
import confetti from 'canvas-confetti';

const Confirmation = ({ bookingDetails, setBookingDetails, currency }) => {
    const location = useLocation();
    const isViewMode = new URLSearchParams(location.search).get('view') === 'true';

    useEffect(() => {
        if (isViewMode && !bookingDetails) {
            const tempBooking = localStorage.getItem('temp_view_booking');
            if (tempBooking) {
                setBookingDetails(JSON.parse(tempBooking));
            }
        }

        // Trigger Confetti for fresh bookings
        if (!isViewMode && bookingDetails) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            return () => clearInterval(interval);
        }

        return () => {
            if (isViewMode) {
                localStorage.removeItem('temp_view_booking');
            }
        };
    }, [isViewMode, bookingDetails, setBookingDetails]);

    if (!bookingDetails && !isViewMode) {
        return <Navigate to="/" />;
    }

    if (!bookingDetails) return null; // Wait for useEffect to load if in view mode

    return (
        <div className="animate" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
            {isViewMode && (
                <Link to="/my-bookings" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', textDecoration: 'none' }}>
                    <ArrowLeft size={18} /> Back to History
                </Link>
            )}
            <ConfirmationMessage bookingID={bookingDetails.bookingID} />

            <div style={{
                marginTop: '3rem',
                background: 'var(--surface)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem' }}>E-Ticket Overview</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>A copy of your ticket has been sent to {bookingDetails.user.email}</p>
                    </div>
                    <div style={{
                        background: 'var(--background)',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--border)',
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: 'var(--primary)'
                    }}>
                        #{bookingDetails.bookingID}
                    </div>
                </div>

                <div style={{
                    padding: '2.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2.5rem',
                    alignItems: 'center'
                }}>
                    {/* Main Info */}
                    <div style={{ flex: '2' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Event Name</div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>{bookingDetails.event.title}</div>
                        <div style={{ display: 'inline-block', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.8rem', borderRadius: '1rem', border: '1px solid var(--primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                            {bookingDetails.event.category}
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Calendar size={18} color="var(--primary)" />
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>DATE & TIME</div>
                                    <div style={{ fontWeight: 600 }}>{bookingDetails.event.date} at {bookingDetails.event.time}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <MapPin size={18} color="var(--primary)" />
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>LOCATION</div>
                                    <div style={{ fontWeight: 600 }}>{bookingDetails.event.location}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Ticket size={18} color="var(--secondary)" />
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>SEATS</div>
                                    <div style={{ fontWeight: 600 }}>{bookingDetails.seats.join(', ')}</div>
                                </div>
                            </div>
                            {bookingDetails.discount > 0 && (
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <Tag size={18} color="var(--success)" />
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>YOU SAVED</div>
                                        <div style={{ fontWeight: 600, color: 'var(--success)' }}>-{formatPrice(bookingDetails.discount, bookingDetails.currency || currency)}</div>
                                    </div>
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '18px', display: 'flex', justifyContent: 'center', color: 'var(--success)', fontWeight: 'bold' }}>
                                    {(bookingDetails.currency || currency) === 'INR' ? '₹' : '$'}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL PAID</div>
                                    <div style={{ fontWeight: 600, color: 'var(--success)', fontSize: '1.2rem' }}>{formatPrice(bookingDetails.total, bookingDetails.currency || currency)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                        transform: 'rotate(1deg)',
                        maxWidth: '220px',
                        margin: '0 auto'
                    }}>
                        <div style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Smartphone size={16} /> MOBILE ENTRY
                        </div>
                        <div style={{ padding: '0.5rem', background: '#fff' }}>
                            <QRCodeCanvas
                                value={bookingDetails.bookingID}
                                size={140}
                                level={"H"}
                                includeMargin={true}
                            />
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 600, borderTop: '1px dashed #e2e8f0', width: '100%', paddingTop: '0.75rem', textAlign: 'center' }}>
                            SCAN AT VENUE
                        </div>
                    </div>
                </div>

                <div style={{
                    padding: '2rem',
                    background: 'rgba(255,255,255,0.02)',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}>
                    <button style={{
                        flex: 1,
                        minWidth: '200px',
                        padding: '1rem',
                        background: 'var(--surface-hover)',
                        color: 'var(--text)',
                        borderRadius: 'var(--radius)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        border: '1px solid var(--border)'
                    }}>
                        <Download size={20} /> Download PDF
                    </button>
                    <Link to="/" style={{
                        flex: 1,
                        minWidth: '200px',
                        padding: '1rem',
                        background: 'var(--primary)',
                        color: 'white',
                        borderRadius: 'var(--radius)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem'
                    }}>
                        <Home size={20} /> Back to Events
                    </Link>
                </div>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Questions? Contact support at <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>support@tickethub.com</span>
            </div>
        </div>
    );
};

export default Confirmation;
