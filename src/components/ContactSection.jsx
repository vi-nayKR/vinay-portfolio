import { useState } from 'react';
import { motion } from 'motion/react';
import { contactData } from '../data/contact.js';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('vinayravindranatha@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div id="contact" className="grid-bg w-full flex-1 flex flex-col justify-start items-center px-3 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 min-h-0 overflow-hidden relative select-none">
      <div className="max-w-5xl mx-auto w-full flex flex-col justify-start min-h-0">
        {/* Section Header */}
        <div className="text-center mb-3 sm:mb-4 shrink-0 px-1">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-0.5"
            style={{ color: 'var(--accent)' }}
          >
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-4 items-stretch">
          {/* Left Column: Direct Links & Activity */}
          <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2 sm:gap-2.5 justify-between">
            {contactData.links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : '_self'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.08 + i * 0.04 }}
                whileHover={{ x: 3 }}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl glass-card card-hover group block hover:border-[var(--accent)]"
              >
                <div
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                    color: 'var(--accent)',
                    border: '1px solid color-mix(in srgb, var(--accent) 24%, transparent)'
                  }}
                  dangerouslySetInnerHTML={{ __html: link.icon }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>
                    {link.label}
                  </p>
                  <p className="text-xs sm:text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {link.value}
                  </p>
                </div>
                <svg
                  className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 hidden sm:block"
                  style={{ color: 'var(--text-muted)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            ))}

            {/* Quick Email Copy Card */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="col-span-2 lg:col-span-1 p-2 sm:p-2.5 rounded-xl glass-card flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>
                  Quick Copy
                </p>
                <p className="text-xs font-mono truncate select-all" style={{ color: 'var(--text-primary)' }}>
                  vinayravindranatha@gmail.com
                </p>
              </div>
              <button
                onClick={copyEmail}
                className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{
                  background: copiedEmail ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 12%, transparent)',
                  color: copiedEmail ? '#ffffff' : 'var(--accent)',
                  border: '1px solid color-mix(in srgb, var(--accent) 24%, transparent)'
                }}
              >
                {copiedEmail ? 'Copied ✓' : 'Copy'}
              </button>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="p-3 sm:p-5 md:p-6 rounded-2xl glass-card"
          >
            <h3 className="font-display font-semibold text-base sm:text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm mb-2.5 sm:mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Fill in your details below and I'll get back to you promptly.
            </p>

            <form onSubmit={submit} className="space-y-2.5 sm:space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider mb-1 font-medium" style={{ color: 'var(--text-muted)' }}>
                    Your Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm outline-none transition-all duration-200 focus:ring-1"
                    style={{
                      background: 'color-mix(in srgb, var(--bg-primary) 60%, transparent)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; }}
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider mb-1 font-medium" style={{ color: 'var(--text-muted)' }}>
                    Your Email
                  </label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    type="email"
                    required
                    placeholder="alex@example.com"
                    className="w-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm outline-none transition-all duration-200 focus:ring-1"
                    style={{
                      background: 'color-mix(in srgb, var(--bg-primary) 60%, transparent)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider mb-1 font-medium" style={{ color: 'var(--text-muted)' }}>
                  Project or Opportunity Details
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={2}
                  required
                  placeholder="Tell me about the role, project, or collaboration..."
                  className="w-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm outline-none transition-all duration-200 resize-none leading-relaxed"
                  style={{
                    background: 'color-mix(in srgb, var(--bg-primary) 60%, transparent)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; }}
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-2 sm:py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75 hover:scale-[1.01]"
                style={{ background: 'var(--accent-fill, var(--accent))', color: '#fff' }}
              >
                {submitted ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent Successfully!
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    Send Message
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
