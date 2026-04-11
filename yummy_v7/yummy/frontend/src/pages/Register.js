import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const ROLES = [
  { value: 'customer', emoji: '🛍️', title: 'Customer',          desc: 'Order food from restaurants',  color: '#06D6A0' },
  { value: 'delivery', emoji: '🛵', title: 'Delivery Person',   desc: 'Deliver orders & earn',         color: '#00B4D8' },
  { value: 'owner',    emoji: '🏪', title: 'Restaurant Owner',  desc: 'Manage orders & delivery team', color: '#845EC2' },
];

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { toast.error('Please enter your full name'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const user = await register({ name, email, phone, address, password, role });
      toast.success(`🎉 Account created! Welcome, ${user.name}!`);
      if (user.role === 'owner') navigate('/owner');
      else if (user.role === 'delivery') navigate('/delivery');
      else navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = ROLES.find(r => r.value === role);

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🎉</div>
          <h1 className="auth-title" style={{ textAlign: 'center' }}>Create Account</h1>
          <p className="auth-sub">Join Yummy — choose your role below</p>
        </div>

        {/* ROLE SELECTOR */}
        <div className="form-group">
          <label className="form-label">I want to join as...</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.7rem' }}>
            {ROLES.map(r => (
              <button
                type="button" key={r.value}
                onClick={() => setRole(r.value)}
                style={{
                  padding: '0.9rem 0.4rem',
                  border: `2px solid ${role === r.value ? r.color : '#e0e0e0'}`,
                  borderRadius: '12px', cursor: 'pointer', textAlign: 'center',
                  background: role === r.value ? `${r.color}18` : 'white',
                  fontFamily: 'Nunito, sans-serif', transition: 'all 0.2s',
                  boxShadow: role === r.value ? `0 4px 12px ${r.color}44` : 'none'
                }}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>{r.emoji}</div>
                <div style={{ fontWeight: 800, color: role === r.value ? r.color : 'var(--text)', fontSize: '0.8rem' }}>
                  {r.title}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-light)', marginTop: '0.15rem' }}>{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Role-specific info banner */}
        {role === 'owner' && (
          <div style={{
            background: 'linear-gradient(135deg, #f3e5f5, #ede7f6)',
            border: '2px solid #845EC2', borderRadius: '10px',
            padding: '0.8rem 1rem', marginBottom: '1rem',
            display: 'flex', gap: '0.6rem', alignItems: 'flex-start'
          }}>
            <span style={{ fontSize: '1.2rem' }}>🏪</span>
            <div style={{ fontSize: '0.82rem', color: '#4a148c' }}>
              <strong>Creating an Owner account</strong> — you'll have access to the full owner dashboard,
              manage all orders, and assign delivery riders.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off" spellCheck="false">
          <div className="form-group">
            <label className="form-label">👤 Full Name</label>
            <input
              key="input-name"
              id="register-name"
              name="new_user_fullname"
              autoComplete="off"
              data-form-type="other"
              type="text" className="form-input"
              placeholder={role === 'owner' ? 'e.g. Owner1 / Raj Patel' : 'e.g. Priya Singh'}
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">📧 Email Address</label>
            <input
              key="input-email"
              id="register-email"
              name="new_user_emailaddr"
              autoComplete="off"
              type="email" className="form-input"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">📱 Phone Number</label>
            <input
              key="input-phone"
              id="register-phone"
              name="new_user_phonenumb"
              autoComplete="off"
              type="tel" className="form-input"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          {role === 'customer' && (
            <div className="form-group">
              <label className="form-label">📍 Delivery Address</label>
              <input
                key="input-address"
                id="register-address"
                name="new_user_delivaddr"
                autoComplete="off"
                type="text" className="form-input"
                placeholder="e.g. Flat 3A, Kondapur, Hyderabad"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">🔑 Password</label>
            <div style={{ position: 'relative' }}>
              <input
                key="input-password"
                id="register-password"
                name="new_user_secpass"
                autoComplete="new-password"
                type={showPass ? 'text' : 'password'}
                className="form-input"
                placeholder="Min 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required minLength={6}
                style={{ paddingRight: '3rem' }}
              />
              <button
                type="button" onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: '0.8rem', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem'
                }}
              >{showPass ? '🙈' : '👁️'}</button>
            </div>
            {password.length > 0 && password.length < 6 && (
              <div style={{ color: '#e65100', fontSize: '0.78rem', marginTop: '0.3rem', fontWeight: 600 }}>
                ⚠️ Too short ({password.length}/6 chars)
              </div>
            )}
            {password.length >= 6 && (
              <div style={{ color: 'var(--accent)', fontSize: '0.78rem', marginTop: '0.3rem', fontWeight: 600 }}>
                ✅ Password looks good!
              </div>
            )}
          </div>

          <button
            type="submit" className="submit-btn" disabled={loading}
            style={{ background: `linear-gradient(135deg, ${selectedRole?.color || 'var(--primary)'}, #FF6B9D)` }}
          >
            {loading
              ? '⏳ Creating account...'
              : `${selectedRole?.emoji} Create ${selectedRole?.title} Account`}
          </button>
        </form>

        <div className="auth-link" style={{ marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Login here →</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
