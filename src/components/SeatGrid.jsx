import React from 'react';

const SeatGrid = ({ selectedSeats, onSeatClick }) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8];

    // Dummy booked seats
    const bookedSeats = ['A3', 'A4', 'C5', 'D1', 'D2', 'F7', 'F8'];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols.length + 1}, auto)`,
            gap: '0.75rem',
            userSelect: 'none'
        }}>
            {/* Empty corner */}
            <div></div>

            {/* Column Headers */}
            {cols.map(col => (
                <div key={col} style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    width: '40px'
                }}>
                    {col}
                </div>
            ))}

            {rows.map(row => (
                <React.Fragment key={row}>
                    {/* Row Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        paddingRight: '1rem'
                    }}>
                        {row}
                    </div>

                    {cols.map(col => {
                        const seatId = `${row}${col}`;
                        const isBooked = bookedSeats.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);

                        // Define section styles
                        let sectionColor = 'var(--border)';
                        let sectionName = 'Standard';
                        if (row === 'A' || row === 'B') {
                            sectionColor = '#f59e0b'; // Gold
                            sectionName = 'Premium';
                        } else if (row === 'E' || row === 'F') {
                            sectionColor = '#94a3b8'; // Silver/Gray
                            sectionName = 'Economy';
                        }

                        return (
                            <button
                                key={seatId}
                                disabled={isBooked}
                                onClick={() => onSeatClick(seatId)}
                                title={`${sectionName} Seat - ${seatId}`}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    transition: 'all 0.2s',
                                    background: isBooked ? 'rgba(255,255,255,0.05)' : (isSelected ? 'var(--primary)' : 'var(--surface-hover)'),
                                    color: isBooked ? 'transparent' : (isSelected ? 'white' : 'var(--text-muted)'),
                                    border: isSelected ? '1px solid var(--primary)' : `1px solid ${sectionColor}`,
                                    cursor: isBooked ? 'not-allowed' : 'pointer',
                                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                                    boxShadow: isSelected ? '0 0 15px rgba(99, 102, 241, 0.4)' : 'none',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isBooked && !isSelected) {
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                        e.currentTarget.style.color = 'var(--primary)';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isBooked && !isSelected) {
                                        e.currentTarget.style.borderColor = sectionColor;
                                        e.currentTarget.style.color = 'var(--text-muted)';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }
                                }}
                            >
                                {seatId}
                                {(row === 'A' || row === 'B') && !isSelected && !isBooked && (
                                    <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }}></div>
                                )}
                            </button>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
};

export default SeatGrid;
