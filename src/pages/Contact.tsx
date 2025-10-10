import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual email service)
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section
        className="relative py-16 lg:py-20 overflow-hidden min-h-[50vh] -mt-28"
        style={{
          background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
          paddingTop: '8rem'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Paint brush strokes effect */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-64 h-8 bg-white/10 rounded-full transform -rotate-12 blur-sm"></div>
            <div className="absolute top-20 right-20 w-48 h-6 bg-white/15 rounded-full transform rotate-45 blur-sm"></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-10 bg-white/8 rounded-full transform -rotate-6 blur-sm"></div>
          </div>
          {/* Artistic Background Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/8 rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white/10 rounded-full blur-lg"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 text-white font-playfair">
              Have a question, collaboration idea, or want to purchase a painting? I’d love to hear from you!
            </p>
            {/* Paint palette decoration */}
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-4 h-4 bg-primary-300 rounded-full"></div>
              <div className="w-4 h-4 bg-primary-400 rounded-full"></div>
              <div className="w-4 h-4 bg-accent-300 rounded-full"></div>
              <div className="w-4 h-4 bg-accent-400 rounded-full"></div>
              <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
              <div className="w-4 h-4 bg-accent-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 items-start gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300 border border-primary-100">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-playfair font-bold bg-clip-text text-transparent mb-4" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)', WebkitBackgroundClip: 'text' }}>
                  Let's Create Magic
                </h2>
              </div>
              <p className="text-primary-700 text-lg leading-relaxed mb-8 text-center font-lora">
                Ready to bring your vision to life with custom watercolor art? Let's create something magical together!
              </p>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Email */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=kseniamoroz92@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl hover:shadow-lg hover:-translate-y-1 hover:scale-105 transition-all duration-300 border-l-4 border-primary-400 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 text-lg font-playfair">Email Me</h3>
                    <p className="text-primary-600 hover:text-accent-600 transition-colors duration-300 font-medium font-playfair">
                      @kseniamoroz92
                    </p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/moroz_customart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300 border-l-4 border-primary-400 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 text-lg font-playfair">Follow My Insta Art</h3>
                    <p className="text-[#91a68a] hover:text-[#cf955f] transition-colors duration-300 font-medium font-playfair">
                      @moroz_customart
                    </p>
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/15KZbCAwcXw/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300 border-l-4 border-primary-400 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
                  >
                    {/* Facebook Icon SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h11.495v-9.294H9.691V11.01h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.716-1.795 1.763v2.308h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.406 24 22.676V1.325C24 .593 23.406 0 22.675 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg font-playfair">Visit my Facebook page</h3>
                    <p className="text-[#91a68a] hover:text-[#cf955f] transition-colors duration-300 font-medium font-playfair">
                      @moroz_customart
                    </p>
                  </div>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@moroz_customart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300 border-l-4 border-primary-400 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
                  >
                    {/* TikTok Icon SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M16.5 3.5c.7 0 1.4.1 2 .4a4.8 4.8 0 0 0 1.4.4V7a6.6 6.6 0 0 1-3.4-1v7.7a5.8 5.8 0 1 1-5.8-5.8c.2 0 .4 0 .6.1v3.2a2.5 2.5 0 1 0 2 2.4V3.5h3.2z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 text-lg font-playfair">See more on TikTok</h3>
                    <p className="text-[#91a68a] hover:text-[#cf955f] transition-colors duration-300 font-medium font-playfair">
                      @moroz_customart
                    </p>
                  </div>
                </a>

                {/* Youtube */}
                <a
                  href="https://www.youtube.com/@moroz_customart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300 border-l-4 border-primary-400 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
                  >
                    {/* YouTube Icon SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M23.498 6.186a2.974 2.974 0 0 0-2.094-2.103C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.404.583A2.974 2.974 0 0 0 .502 6.186 31.41 31.41 0 0 0 0 12a31.41 31.41 0 0 0 .502 5.814 2.974 2.974 0 0 0 2.094 2.103C4.495 20.5 12 20.5 12 20.5s7.505 0 9.404-.583a2.974 2.974 0 0 0 2.094-2.103A31.41 31.41 0 0 0 24 12a31.41 31.41 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                    </svg>


                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 text-lg font-playfair">Visit my YouTube channel</h3>
                    <p className="text-[#91a68a] hover:text-[#cf955f] transition-colors duration-300 font-medium font-playfair">
                      @moroz_customart
                    </p>
                  </div>
                </a>

                {/* Etsy */}
                <a
                  href="https://www.etsy.com/shop/morozcustomart/?etsrc=sdt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300 border-l-4 border-primary-400 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
                  >
                    {/* Etsy Icon SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M429.8 512H82.2C36.8 512 0 475.2 0 429.8V82.2C0 36.8 36.8 0 82.2 0h347.6C475.2 0 512 36.8 512 82.2v347.6c0 45.4-36.8 82.2-82.2 82.2zM188.7 116.2v23.9c15.4 1.3 24.4 4.2 30.3 10.6 6.5 7 9.7 17.8 9.7 34.8v142.9c0 17.1-3.2 27.9-9.7 34.8-5.8 6.4-14.9 9.3-30.3 10.6v23.9h151.6l11.6-69.3h-17.4c-4.8 17.1-8.4 27-13.9 33.5-6.5 7.7-17.1 11.9-31.6 11.9h-55.8v-95.2h38.7c13.9 0 20.6 4.8 24.2 16.1h15.8v-52.9h-15.8c-3.9 11.3-10.3 16.1-24.2 16.1h-38.7v-87.7h52.3c12.3 0 20.3 3.9 26.7 12.9 5.5 7.4 8.7 15.8 14.9 33.2h17.4l-9.7-63.5H188.7z" />
                    </svg>

                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 text-lg font-playfair">Reach out on Etsy</h3>
                    <p className="text-[#91a68a] hover:text-[#cf955f] transition-colors duration-300 font-medium font-playfair">
                      @morozcustomart
                    </p>
                  </div>
                </a>

              </div>
            </div>

            {/* Artist's Palette Info Card */}
            <div className="rounded-3xl shadow-2xl p-6 md:p-8 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative text-center">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  <h3 className="font-bold text-gray-800 text-lg font-playfair">
                    Response Time
                  </h3>
                </div>
                 <p className="text-indigo-100 text-base md:text-lg leading-relaxed font-playfair">
                   I typically respond to messages within 24-48 hours.
                   For urgent commissions or time-sensitive projects, please mention it in your message!
                 </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-purple-100 relative overflow-hidden self-start">
            {/* Decorative paint drops */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-purple-300 rounded-full opacity-60"></div>
            <div className="absolute top-8 right-8 w-2 h-2 bg-indigo-300 rounded-full opacity-40"></div>
            <div className="absolute bottom-6 left-6 w-4 h-4 bg-yellow-300 rounded-full opacity-50"></div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent font-playfair" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)', WebkitBackgroundClip: 'text' }}>
                Send Me a Message
              </h2>
              <p className="text-gray-600 mt-2 font-playfair">Let's start our creative journey together</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 font-playfair">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 bg-purple-50/50 font-playfair"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 font-playfair">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 bg-purple-50/50 font-playfair"
                    placeholder="john.doe@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2 font-playfair">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 bg-purple-50/50 font-playfair"
                  placeholder="Commission Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2 font-playfair">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 hover:border-purple-300 resize-none bg-purple-50/50"
                  placeholder="I'm interested in a custom watercolor painting of..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white font-bold py-4 px-8 rounded-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl relative overflow-hidden font-playfair" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                {isSubmitting ? (
                  <span className="flex items-center justify-center relative z-10">
                    Creating magic...
                  </span>
                ) : (
                  <span className="flex items-center justify-center relative z-10">
                    Send My Message
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="rounded-3xl md:rounded-full shadow-2xl p-8 md:p-12 text-white max-w-4xl mx-auto relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
            {/* Artistic background elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
                Ready to Commission Your Masterpiece?
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed font-playfair">
                Let's create something extraordinary together! From dreamy watercolor landscapes to heartfelt personalized gifts,
                every brushstroke is infused with passion, creativity, and attention to detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.instagram.com/moroz_customart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#91a68a] font-bold py-4 px-8 rounded-2xl hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-playfair"
                >
                  Follow My Art Journey
                </a>
                <a
                  href="mailto:contact@morozcustomart.com"
                  className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-2xl hover:bg-white hover:text-[#91a68a] transform hover:scale-105 transition-all duration-300 font-playfair"
                >
                  Start Our Conversation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;