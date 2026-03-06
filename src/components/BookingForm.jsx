import React, { useState } from 'react';
import { User, Mail, Phone, ArrowRight } from 'lucide-react';

const BookingForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[0-9+() -]*$/.test(formData.phone)) {
            newErrors.phone = 'Phone number is invalid';
        } else if (formData.phone.replace(/[^0-9]/g, '').length !== 10) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(formData);
        } else {
            setErrors(validationErrors);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const inputStyle = (fieldName) => ({
        width: '100%',
        padding: '1.25rem 1.25rem 1.25rem 3.5rem',
        background: 'var(--surface)',
        border: `1px solid ${errors[fieldName] ? 'var(--error)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        color: 'var(--text)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
    });

    const iconStyle = {
        position: 'absolute',
        left: '1.25rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--text-muted)'
    };

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
        }}>
            <div style={{ position: 'relative' }}>
                <User size={20} style={iconStyle} />
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle('name')}
                />
                {errors.name && <div style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '0.4rem', marginLeft: '0.5rem' }}>{errors.name}</div>}
            </div>

            <div style={{ position: 'relative' }}>
                <Mail size={20} style={iconStyle} />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle('email')}
                />
                {errors.email && <div style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '0.4rem', marginLeft: '0.5rem' }}>{errors.email}</div>}
            </div>

            <div style={{ position: 'relative' }}>
                <Phone size={20} style={iconStyle} />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle('phone')}
                />
                {errors.phone && <div style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '0.4rem', marginLeft: '0.5rem' }}>{errors.phone}</div>}
            </div>

            <button
                type="submit"
                style={{
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius)',
                    fontWeight: 600,
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 15px 30px rgba(99, 102, 241, 0.3)',
                    marginTop: '1rem'
                }}
                onMouseEnter={(e) => e.target.style.background = 'var(--primary-hover)'}
                onMouseLeave={(e) => e.target.style.background = 'var(--primary)'}
            >
                Complete Purchase <ArrowRight size={22} />
            </button>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                justifyContent: 'center'
            }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div>
                <span>Secure checkout with SSL encryption</span>
            </div>
        </form>
    );
};

export default BookingForm;
