import React, { useState, useEffect } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });

    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will contact you soon.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-sky-300 to-violet-400 text-white py-20">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Contact Our Laboratory
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Get in touch with our team for laboratory testing services, appointments, or general inquiries
                    </p>
                </div>
            </section>

            {/* Contact Information */}
            <section className="max-w-[1200px] mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center">
                                    📍
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Laboratory Address</h3>
                                    <p className="text-neutral-600">
                                        1234 Medical Center Drive<br />
                                        Suite 200, Laboratory Building<br />
                                        Healthcare District, CA 90210
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center">
                                    📞
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Phone Numbers</h3>
                                    <p className="text-neutral-600">
                                        Main: (555) 123-4567<br />
                                        Emergency: (555) 123-HELP<br />
                                        Fax: (555) 123-4568
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center">
                                    ✉️
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Email Addresses</h3>
                                    <p className="text-neutral-600">
                                        General: info@labtest.com<br />
                                        Results: results@labtest.com<br />
                                        Emergency: emergency@labtest.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center">
                                    🕒
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Operating Hours</h3>
                                    <p className="text-neutral-600">
                                        Monday - Friday: 6:00 AM - 8:00 PM<br />
                                        Saturday: 7:00 AM - 4:00 PM<br />
                                        Sunday: 8:00 AM - 2:00 PM<br />
                                        <span className="text-sky-600 font-semibold">Emergency: 24/7</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Service Needed</label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                                        required
                                    >
                                        <option value="">Select a service</option>
                                        <option value="blood-chemistry">Blood Chemistry Analysis</option>
                                        <option value="hematology">Hematology Testing</option>
                                        <option value="immunology">Immunology & Serology</option>
                                        <option value="microbiology">Microbiology Testing</option>
                                        <option value="toxicology">Toxicology Screening</option>
                                        <option value="specialized">Specialized Testing</option>
                                        <option value="consultation">Laboratory Consultation</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                                    placeholder="Please describe your testing needs or questions..."
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-sky-300 to-violet-400 text-white px-8 py-3 rounded-lg font-semibold hover:from-sky-400 hover:to-violet-500 transition-all"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="bg-white py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Testing Services</h2>
                        <p className="text-neutral-600 max-w-2xl mx-auto">
                            Comprehensive laboratory testing services for accurate medical diagnosis
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-violet-50 border border-sky-200">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-2xl mx-auto mb-4">🧪</div>
                            <h3 className="font-semibold text-lg mb-2">Blood Chemistry</h3>
                            <p className="text-sm text-neutral-600">Complete metabolic panels, glucose, cholesterol, and liver function tests</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-violet-50 border border-sky-200">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-2xl mx-auto mb-4">🔬</div>
                            <h3 className="font-semibold text-lg mb-2">Hematology</h3>
                            <p className="text-sm text-neutral-600">Complete blood counts, coagulation studies, and blood typing</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-violet-50 border border-sky-200">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-2xl mx-auto mb-4">🦠</div>
                            <h3 className="font-semibold text-lg mb-2">Microbiology</h3>
                            <p className="text-sm text-neutral-600">Pathogen identification, culture sensitivity, and infectious disease testing</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="bg-gradient-to-r from-sky-300 to-violet-400 text-white py-16">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Emergency Laboratory Services</h2>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        For urgent medical testing needs, our emergency laboratory is available 24/7
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:555-123-HELP"
                            className="bg-white text-sky-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                        >
                            📞 Call Emergency Lab: (555) 123-HELP
                        </a>
                        <a
                            href="mailto:emergency@labtest.com"
                            className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-sky-600 transition-colors"
                        >
                            ✉️ Email Emergency Team
                        </a>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="max-w-[1200px] mx-auto px-6 py-16">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Find Our Laboratory</h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Located in the heart of the medical district with easy access and parking
                    </p>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.123456789!2d-118.123456!3d34.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMedical%20Center%20Drive!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Laboratory Location Map"
                    ></iframe>
                </div>
            </section>

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white shadow-lg hover:from-sky-400 hover:to-violet-500 transition-all duration-300 z-50 flex items-center justify-center"
                    aria-label="Back to top"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M12 2l8 8h-5v10h-6V10H4l8-8z" />
                    </svg>
                </button>
            )}
        </div>
    )
}

export default Contact
