import React, { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Send } from 'lucide-react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'Name required';
    // simple email check (no regex) to avoid backslash escapes in the canvas tool
    if (!form.email || form.email.indexOf('@') === -1 || form.email.indexOf('.') === -1) e.email = 'Valid email required';
    // simple phone check: ensure at least 7 digits and only numeric characters
    const digits = (form.phone || '').split('').filter(ch => ch >= '0' && ch <= '9').join('');
    if (!form.phone || digits.length < 7) e.phone = 'Valid phone required';
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSent(true);
      setTimeout(() => setSent(false), 3500);
      setForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <section id="contact" className="container mx-auto px-6 py-12 reveal">
      <div className="md:flex gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold">Contact Me</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            Have a question or want to book? Send a message and I'll respond within 24 hours.
          </p>

          <form className="mt-6 grid gap-3" onSubmit={submit}>
            <label className="flex flex-col">
              <span className="text-sm">Name</span>
              <input 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                className="mt-1 px-3 py-2 rounded border" 
              />
              {errors.name && <small className="text-red-500">{errors.name}</small>}
            </label>
            <label className="flex flex-col">
              <span className="text-sm">Email</span>
              <input 
                value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
                className="mt-1 px-3 py-2 rounded border" 
              />
              {errors.email && <small className="text-red-500">{errors.email}</small>}
            </label>
            <label className="flex flex-col">
              <span className="text-sm">Phone</span>
              <input 
                value={form.phone} 
                onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                className="mt-1 px-3 py-2 rounded border" 
              />
              {errors.phone && <small className="text-red-500">{errors.phone}</small>}
            </label>
            <label className="flex flex-col">
              <span className="text-sm">Message</span>
              <textarea 
                value={form.message} 
                onChange={(e) => setForm({ ...form, message: e.target.value })} 
                className="mt-1 px-3 py-2 rounded border" 
                rows={5} 
              />
            </label>
            <div className="flex items-center gap-3">
              <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg">
                <Send className="w-4 h-4" />
                Send Message
              </button>
              {sent && <span className="text-green-600 font-medium">✓ Message sent (demo)</span>}
            </div>
          </form>

          <div className="mt-6 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
            <p className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-purple-600" />
              <a href="tel:+919945616508" className="text-emerald-700 dark:text-emerald-300 hover:text-purple-600 transition-colors">+91 99456 16508</a>
            </p>
            <p className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-purple-600" />
              <a href="mailto:info@villageworldhomestay.com" className="text-emerald-700 dark:text-emerald-300 hover:text-purple-600 transition-colors">info@villageworldhomestay.com</a>
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="font-medium">Follow us:</span>
              <a href="https://instagram.com/villageworldhomestay" className="flex items-center gap-1 text-pink-600 hover:text-pink-700 transition-colors">
                <Instagram className="w-4 h-4" />
                <span className="text-sm">Instagram</span>
              </a>
              <span className="text-neutral-400">•</span>
              <a href="https://facebook.com/villageworldhomestay" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                <Facebook className="w-4 h-4" />
                <span className="text-sm">Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <aside className="md:w-1/2 mt-6 md:mt-0">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              loading="lazy" 
              alt="coorg landscape" 
              src="https://media1.thrillophilia.com/filestore/phhu0yr9wggj753ghycmh1u8yrig_shutterstock_1686501571.jpg?w=auto&h=600" 
              className="w-full h-80 object-cover" 
            />
          </div>

          <div className="mt-6 rounded-xl p-6 bg-white dark:bg-neutral-800 shadow">
            <h4 className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
              <MapPin className="w-5 h-5 text-purple-600" />
              Location
            </h4>
            <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">
              Village World Homestay, Near Madikeri, Coorg — exact directions will be provided after inquiry.
            </p>
            <div className="mt-3 w-full h-36 rounded overflow-hidden border">
              <iframe 
                title="Village World Homestay Map" 
                className="w-full h-full" 
                loading="lazy" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1145.7493833578624!2d75.77079816930546!3d12.40312528969508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5ab001125f06b%3A0x76d1e4aa5626afb9!2sVillage%20world%20homestay!5e0!3m2!1sen!2sus!4v1757859404535!5m2!1sen!2sus"
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
