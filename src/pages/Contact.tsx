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
              Let's Paint Together
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 text-white font-playfair">
              Ready to bring your vision to life with custom watercolor art? 
              Let's create something magical together!
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

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300 border border-primary-100">
              <div className="text-center mb-6">
              <h2 className="text-3xl font-playfair font-bold bg-clip-text text-transparent mb-4" style={{background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)', WebkitBackgroundClip: 'text'}}>
                Let's Create Magic
              </h2>
            </div>
              <p className="text-primary-700 text-lg leading-relaxed mb-8 text-center font-lora">
                Whether you're dreaming of a custom watercolor masterpiece, have questions about my artistic process, 
                or want to discuss bringing your vision to life, I'm here to paint your story!
              </p>
              
              {/* Contact Methods */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl hover:shadow-lg transition-all duration-300 border-l-4 border-primary-400">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)'}}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg font-playfair">Email Me</h3>
                    <a 
                      href="mailto:contact@morozcustomart.com" 
                      className="text-primary-600 hover:text-accent-600 transition-colors duration-300 font-medium font-playfair"
                    >
                      contact@morozcustomart.com
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300 border-l-4 border-primary-400">
                  <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg" style={{background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)'}}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg font-playfair">Follow My Art</h3>
                    <a 
                      href="https://www.instagram.com/moroz_customart/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#91a68a] hover:text-[#cf955f] transition-colors duration-300 font-medium font-playfair"
                    >
                      @moroz_customart
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl hover:shadow-lg transition-all duration-300 border-l-4 border-primary-400">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg" style={{background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)'}}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg font-playfair">Studio Location</h3>
                    <p className="text-gray-600 font-medium font-playfair">Phoenix, Arizona</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Artist's Palette Info Card */}
            <div className="rounded-full shadow-2xl p-8 text-white relative overflow-hidden" style={{background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)'}}>
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
                <p className="text-indigo-100 text-lg leading-relaxed font-playfair">
                  I typically respond to messages within 24-48 hours. 
                  For urgent commissions or time-sensitive projects, please mention it in your message!
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-100 relative overflow-hidden">
            {/* Decorative paint drops */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-purple-300 rounded-full opacity-60"></div>
            <div className="absolute top-8 right-8 w-2 h-2 bg-indigo-300 rounded-full opacity-40"></div>
            <div className="absolute bottom-6 left-6 w-4 h-4 bg-yellow-300 rounded-full opacity-50"></div>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent font-playfair" style={{background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)', WebkitBackgroundClip: 'text'}}>
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
                className="w-full text-white font-bold py-4 px-8 rounded-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl relative overflow-hidden font-playfair" style={{background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)'}}
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
          <div className="rounded-full shadow-2xl p-12 text-white max-w-4xl mx-auto relative overflow-hidden" style={{background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)'}}>
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