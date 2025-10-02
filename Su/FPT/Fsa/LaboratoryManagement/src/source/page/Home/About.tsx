import React, { useState, useEffect } from 'react';

function TeamMember({ name, role, image, description }: {
    name: string;
    role: string;
    image: string;
    description: string;
}) {
    return (
        <div className="text-center">
            <img
                src={image}
                alt={name}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
            />
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sky-600 font-semibold mb-2">{role}</p>
            <p className="text-sm text-neutral-600">{description}</p>
        </div>
    )
}

function About() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-sky-300 to-violet-400 text-white py-20">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        About Our Laboratory
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Leading the way in blood chemistry and laboratory testing with cutting-edge technology and expert professionals
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="max-w-[1200px] mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-neutral-600 mb-6">
                            To provide accurate, reliable, and timely laboratory testing services that support healthcare providers
                            in delivering the best possible patient care. We are committed to maintaining the highest standards
                            of quality and precision in every test we perform.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center text-sm font-bold">✓</span>
                                <p className="text-sm text-neutral-700">Accurate test results with 99.9% reliability</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center text-sm font-bold">✓</span>
                                <p className="text-sm text-neutral-700">Fast turnaround times for critical tests</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center text-sm font-bold">✓</span>
                                <p className="text-sm text-neutral-700">Advanced technology and equipment</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                        <p className="text-neutral-600 mb-6">
                            To be the leading laboratory testing facility in the region, recognized for our innovation,
                            accuracy, and commitment to advancing medical science through cutting-edge blood chemistry
                            and diagnostic testing.
                        </p>
                        <div className="bg-gradient-to-r from-sky-300 to-violet-400 text-white p-6 rounded-2xl">
                            <h3 className="font-bold text-lg mb-2">Quality Promise</h3>
                            <p className="text-sm opacity-90">
                                Every test is performed with the utmost care and precision, ensuring that healthcare providers
                                receive the most accurate information to guide patient treatment decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="bg-white py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                        <p className="text-neutral-600 max-w-2xl mx-auto">
                            Founded with a vision to revolutionize laboratory testing through innovation and excellence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-2xl mx-auto mb-4">2015</div>
                            <h3 className="font-semibold mb-2">Foundation</h3>
                            <p className="text-sm text-neutral-600">Started as a small laboratory with a focus on blood chemistry testing</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-2xl mx-auto mb-4">2018</div>
                            <h3 className="font-semibold mb-2">Expansion</h3>
                            <p className="text-sm text-neutral-600">Expanded services to include comprehensive diagnostic testing</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-2xl mx-auto mb-4">2023</div>
                            <h3 className="font-semibold mb-2">Innovation</h3>
                            <p className="text-sm text-neutral-600">Launched advanced molecular diagnostics and genetic testing</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="max-w-[1200px] mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Meet Our Expert Team</h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Our highly qualified professionals bring years of experience in laboratory medicine and diagnostic testing
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <TeamMember
                        name="Dr. Sarah Johnson"
                        role="Chief Laboratory Director"
                        image="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400"
                        description="15+ years experience in clinical chemistry and laboratory management"
                    />
                    <TeamMember
                        name="Dr. Michael Chen"
                        role="Hematology Specialist"
                        image="https://images.pexels.com/photos/8460094/pexels-photo-8460094.jpeg?auto=compress&cs=tinysrgb&w=400"
                        description="Expert in blood cell analysis and coagulation studies"
                    />
                    <TeamMember
                        name="Dr. Emily Rodriguez"
                        role="Molecular Diagnostics Lead"
                        image="https://images.pexels.com/photos/5726808/pexels-photo-5726808.jpeg?auto=compress&cs=tinysrgb&w=400"
                        description="Specialist in genetic testing and molecular pathology"
                    />
                </div>
            </section>

            {/* Certifications */}
            <section className="bg-gradient-to-r from-sky-300 to-violet-400 text-white py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Accreditations & Certifications</h2>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto">
                            We maintain the highest standards through rigorous accreditation and continuous quality improvement
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 text-white grid place-items-center font-bold text-xl mx-auto mb-4">🏆</div>
                            <h3 className="font-semibold mb-2">CAP Certified</h3>
                            <p className="text-sm opacity-90">College of American Pathologists</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 text-white grid place-items-center font-bold text-xl mx-auto mb-4">🔬</div>
                            <h3 className="font-semibold mb-2">CLIA Licensed</h3>
                            <p className="text-sm opacity-90">Clinical Laboratory Improvement</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 text-white grid place-items-center font-bold text-xl mx-auto mb-4">⭐</div>
                            <h3 className="font-semibold mb-2">ISO 15189</h3>
                            <p className="text-sm opacity-90">Medical Laboratory Quality</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 text-white grid place-items-center font-bold text-xl mx-auto mb-4">🛡️</div>
                            <h3 className="font-semibold mb-2">HIPAA Compliant</h3>
                            <p className="text-sm opacity-90">Patient Privacy Protection</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="max-w-[1200px] mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Numbers that reflect our commitment to excellence and service
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text mb-2">50,000+</div>
                        <p className="text-neutral-600">Tests Performed Monthly</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text mb-2">99.9%</div>
                        <p className="text-neutral-600">Accuracy Rate</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text mb-2">24/7</div>
                        <p className="text-neutral-600">Emergency Testing</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text mb-2">15+</div>
                        <p className="text-neutral-600">Years of Experience</p>
                    </div>
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

export default About
