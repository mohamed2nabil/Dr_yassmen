'use client';

import { useState, useEffect } from 'react';
import { Mail, Instagram, Phone, QrCode, Loader2 } from 'lucide-react';
import { createMessage } from '@/app/actions/messageActions';
import { getProfile } from '@/app/actions/profileActions';
import { toast } from 'sonner';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Contact info
  const [contactEmail, setContactEmail] = useState('hello@yassminalllam.com');
  const [whatsapp, setWhatsapp] = useState('+20 100 000 0000');
  const [instagram, setInstagram] = useState('@dr.yassmin_allam');

  useEffect(() => {
    async function loadContactInfo() {
      try {
        const profile = await getProfile();
        if (profile) {
          setContactEmail(profile.contactEmail);
          if (profile.instagramUrl) {
            setInstagram(profile.instagramUrl);
          }
        }
      } catch (error) {
        console.error('Failed to load contact profile:', error);
      }
    }
    loadContactInfo();
  }, []);

  const handleCheckboxChange = (interest: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests((prev) => [...prev, interest]);
    } else {
      setSelectedInterests((prev) => prev.filter((i) => i !== interest));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill in Name, Email and Message.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createMessage({
        name,
        email,
        phone,
        interests: selectedInterests.join(', '),
        message,
      });

      toast.success('Message sent successfully!');
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSelectedInterests([]);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-20"
      style={{ background: 'var(--foreground)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left */}
          <div className="lg:col-span-5">
            <div
              className="flex items-center gap-3 mb-6"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(249,246,241,0.4)',
              }}
            >
              <span
                className="h-px w-6"
                style={{ background: 'var(--accent)' }}
              />
              Get in Touch
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                color: '#F9F6F1',
                letterSpacing: '-0.02em',
              }}
            >
              Begin a
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                conversation
              </em>
            </h2>
            <p
              className="mt-6"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.85,
                color: 'rgba(249,246,241,0.6)',
              }}
            >
              Whether you're interested in commissioning a painting, designing
              your space, enrolling in a course, or beginning a therapeutic
              journey — I'd love to hear from you.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: contactEmail,
                },
                { icon: Phone, label: 'WhatsApp', value: whatsapp },
                {
                  icon: Instagram,
                  label: 'Instagram',
                  value: instagram,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center"
                    style={{
                      background: 'rgba(249,246,241,0.08)',
                      borderRadius: '2px',
                    }}
                  >
                    <Icon size={15} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: 'rgba(249,246,241,0.35)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'rgba(249,246,241,0.8)',
                      }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center — booking form */}
          <div className="lg:col-span-4">
            <form
              onSubmit={handleSubmit}
              className="p-8"
              style={{
                background: 'rgba(249,246,241,0.04)',
                border: '1px solid rgba(249,246,241,0.1)',
                borderRadius: '2px',
              }}
            >
              <div
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  color: '#F9F6F1',
                }}
              >
                Send a Message
              </div>
              <div className="flex flex-col gap-4">
                <input
                  placeholder="Your Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(249,246,241,0.06)',
                    border: '1px solid rgba(249,246,241,0.12)',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: '#F9F6F1',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(249,246,241,0.12)')}
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(249,246,241,0.06)',
                    border: '1px solid rgba(249,246,241,0.12)',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: '#F9F6F1',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(249,246,241,0.12)')}
                />
                <input
                  placeholder="Phone Number (Optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(249,246,241,0.06)',
                    border: '1px solid rgba(249,246,241,0.12)',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: '#F9F6F1',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(249,246,241,0.12)')}
                />
                <textarea
                  placeholder="Tell me about your project or inquiry... *"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                  className="w-full px-4 py-3 outline-none transition-all duration-200 resize-none"
                  style={{
                    background: 'rgba(249,246,241,0.06)',
                    border: '1px solid rgba(249,246,241,0.12)',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: '#F9F6F1',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(249,246,241,0.12)')}
                />
                {/* Discipline selector */}
                <div
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'rgba(249,246,241,0.4)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  I'm interested in:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Visual Art', color: 'var(--chapter-art)' },
                    {
                      label: 'Interior Design',
                      color: 'var(--chapter-interior)',
                    },
                    {
                      label: 'Art Education',
                      color: 'var(--chapter-education)',
                    },
                    { label: 'Art Therapy', color: 'var(--chapter-therapy)' },
                  ].map((d) => (
                    <label
                      key={d.label}
                      className="flex items-center gap-2 cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.78rem',
                        color: 'rgba(249,246,241,0.65)',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedInterests.includes(d.label)}
                        onChange={(e) => handleCheckboxChange(d.label, e.target.checked)}
                        className="accent-[var(--accent)]"
                      />
                      {d.label}
                    </label>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 mt-2 transition-all duration-200 hover:opacity-80 flex items-center justify-center"
                  style={{
                    background: 'var(--accent)',
                    color: '#F9F6F1',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right — QR code */}
          <div className="lg:col-span-3">
            <div
              className="p-8 flex flex-col items-center text-center"
              style={{
                background: 'rgba(249,246,241,0.04)',
                border: '1px solid rgba(249,246,241,0.1)',
                borderRadius: '2px',
              }}
            >
              <div
                className="w-36 h-36 flex items-center justify-center mb-4"
                style={{
                  background: 'rgba(249,246,241,0.08)',
                  borderRadius: '2px',
                  border: '1px solid rgba(249,246,241,0.15)',
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <QrCode size={48} style={{ color: 'var(--accent)' }} />
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.58rem',
                      color: 'rgba(249,246,241,0.3)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Scan to Book
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  color: '#F9F6F1',
                }}
              >
                Quick Booking
              </div>
              <p
                className="mt-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  lineHeight: 1.7,
                  color: 'rgba(249,246,241,0.5)',
                }}
              >
                Scan this code with your phone to visit the booking platform
                directly.
              </p>
              <div
                className="mt-4 px-4 py-1.5"
                style={{
                  background: 'rgba(249,246,241,0.08)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--accent)',
                  letterSpacing: '0.08em',
                  borderRadius: '1px',
                }}
              >
                dr.yassminalllam.com/book
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-1">
              {[
                'var(--chapter-art)',
                'var(--chapter-interior)',
                'var(--chapter-education)',
                'var(--chapter-therapy)',
              ].map((c, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full"
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(249,246,241,0.08)' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              color: 'rgba(249,246,241,0.35)',
              fontStyle: 'italic',
            }}
          >
            © 2026 Dr. Yassmin Allam · جميع الحقوق محفوظة
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'rgba(249,246,241,0.25)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Visual Art · Interior Design · Art Education · Art Therapy
          </div>
        </div>
      </div>
    </section>
  );
}
