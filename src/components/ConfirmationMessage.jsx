import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

const ConfirmationMessage = ({ bookingID }) => {
    return (
        <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
            <div style={{
                width: '80px',
                height: '80px',
                background: 'var(--success)',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto 2rem',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
                animation: 'pulse 2s infinite'
            }}>
                <Check size={48} color="white" />
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Booking Confirmed!</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto' }}>
                Thank you for your purchase. Your seats have been secured and your confirmation is ready.
            </p>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}} />
        </div>
    );
};

export default ConfirmationMessage;
