

import React, { useState, useEffect } from 'react';

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="px-3 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white shadow-sm border">
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text">{value}</div>
            <div className="text-xs sm:text-xs text-neutral-500 mt-1 leading-tight">{label}</div>
        </div>
    )
}

function ServiceCard({ title, img }: { title: string; img: string }) {
    return (
        <div className="rounded-2xl bg-white shadow-sm border p-5">
            <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold">✓</span>
                <div className="font-semibold">{title}</div>
            </div>
            <img src={img} alt={title} loading="lazy" className="mt-4 w-full h-44 object-cover rounded-xl bg-neutral-100" />
            <p className="mt-3 text-sm text-neutral-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    )
}

function Home() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-gradient-to-b from-sky-50 to-white">
            {/* Hero */}
            <section className="max-w-[1200px] mx-auto px-6 pt-10 pb-8 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        <span className="text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text">Comprehensive</span> Laboratory
                        Management System
                    </h1>
                    <p className="mt-4 text-neutral-600 text-sm max-w-xl">
                        Manage users, roles, test results, reagents, instruments, and system health in one unified platform
                    </p>
                    <div className="mt-6">
                        <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white px-6 py-2 text-sm font-semibold shadow-sm hover:from-sky-400 hover:to-violet-500">
                            Learn More
                        </button>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-3 rounded-full border bg-white px-4 py-2 text-xs text-neutral-600">
                        <div className="flex -space-x-2">
                            <img className="w-6 h-6 rounded-full border" src="https://i.pravatar.cc/24?img=1" />
                            <img className="w-6 h-6 rounded-full border" src="https://i.pravatar.cc/24?img=2" />
                            <img className="w-6 h-6 rounded-full border" src="https://i.pravatar.cc/24?img=3" />
                        </div>
                        <span className="font-semibold text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text">100K +</span>
                        <span>Test Results Stored</span>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="https://mdfinstruments.vn/uploaded/Goc-tu-van/bac-si-xet-nghiem-hoc-nganh-gi-1.jpg"
                        alt="Bác sĩ đang xét nghiệm trong phòng lab"
                        loading="lazy"
                        className="rounded-2xl w-full h-80 object-cover bg-neutral-100"
                    />
                    <div className="absolute -top-4 sm:-top-8 left-3 right-3 sm:left-auto sm:right-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 bg-white rounded-3xl shadow-lg border p-3 sm:p-5">
                        <StatCard value="1000+" label="Tests processed per day" />
                        <StatCard value="99.9%" label="System uptime & reliability" />
                        <StatCard value="500+" label="Managed lab instruments" />
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="max-w-[1200px] mx-auto px-6 py-8">
                <h2 className="text-center text-3xl font-bold">Comprehensive Medical Services</h2>
                <div className="mt-6 grid md:grid-cols-3 gap-5">
                    <ServiceCard
                        title="General Check-Ups"
                        img="https://images.pexels.com/photos/5863372/pexels-photo-5863372.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    />
                    <ServiceCard
                        title="Specialized Services"
                        img="https://images.pexels.com/photos/8376235/pexels-photo-8376235.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    />
                    <ServiceCard
                        title="Laboratory Services"
                        img="https://images.pexels.com/photos/3735703/pexels-photo-3735703.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    />
                </div>
            </section>

            {/* Why choose us + video */}
            <section className="max-w-[1200px] mx-auto px-6 py-8 grid md:grid-cols-2 gap-8 items-center">
                <img
                    src="https://images.pexels.com/photos/5726808/pexels-photo-5726808.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Doctor with patients"
                    loading="lazy"
                    className="rounded-2xl w-full h-80 object-cover bg-neutral-100"
                />
                <div>
                    <div className="text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text font-semibold">ABOUT US</div>
                    <h3 className="text-3xl font-extrabold leading-snug">Professional Doctor With Years Of Experience</h3>
                    <p className="mt-3 text-neutral-600 text-sm">Lorem ipsum dolor sit amet consectetur. Nec metus nibh eget ipsum nisl in venenatis.</p>
                    <div className="mt-5 flex items-center gap-4">
                        <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white px-6 py-2 text-sm font-semibold shadow-sm hover:from-sky-400 hover:to-violet-500">Learn more</button>
                        <button className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-gradient-to-r hover:from-sky-300 hover:to-violet-400 hover:text-white transition-all">
                            <span className="grid place-items-center w-5 h-5 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white">▶</span>
                            Watch video
                        </button>
                    </div>
                </div>
            </section>

            {/* Our Expert Team */}
            <section className="max-w-[1200px] mx-auto px-6 py-10">
                <h3 className="text-center text-3xl font-bold">Our Expert Team</h3>
                <div className="mt-6 grid md:grid-cols-4 gap-6">
                    <img
                        src="https://tse1.mm.bing.net/th/id/OIP.zyOMCzoT02Q5SvT6BWSzvQHaGM?rs=1&pid=ImgDetMain&o=7&rm=3"
                        alt="Doctor portrait"
                        loading="lazy"
                        className="rounded-2xl w-full h-72 object-cover"
                    />
                    <div className="relative overflow-hidden rounded-2xl">
                        <img
                            src="https://png.pngtree.com/thumb_back/fw800/background/20230227/pngtree-female-scientist-researcher-conducting-an-experiment-in-a-labora-female-scientist-image_1720513.jpg"
                            alt="Senior doctor"
                            loading="lazy"
                            className="w-full h-72 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-700/80 to-transparent" />
                        <div className="absolute left-0 right-0 bottom-3 px-4">
                            <div className="rounded-full bg-white/90 text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-sm font-semibold px-4 py-2 w-fit shadow">
                                Jordan Thompson
                                <span className="ml-2 text-xs font-normal text-neutral-600">Senior Doctor</span>
                            </div>
                            <button className="mt-2 inline-flex items-center gap-1 text-xs rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white px-3 py-1 shadow hover:from-sky-400 hover:to-violet-500">
                                Doctor profile
                                <span className="inline-block -rotate-45">↗</span>
                            </button>
                        </div>
                    </div>
                    <img
                        src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt="Doctor portrait"
                        loading="lazy"
                        className="rounded-2xl w-full h-72 object-cover"
                    />
                    <img
                        src="https://images.pexels.com/photos/8460094/pexels-photo-8460094.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt="Doctor portrait"
                        loading="lazy"
                        className="rounded-2xl w-full h-72 object-cover"
                    />
                </div>
            </section>

            {/* Testimonials simplified */}
            <section className="max-w-[1200px] mx-auto px-6 py-10">
                <div className="text-center">
                    <div className="text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text font-semibold">TESTIMONIAL</div>
                    <h3 className="text-3xl font-bold mt-1">Customer Feedback</h3>
                </div>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl bg-white border p-5 shadow-sm">
                        <p className="text-neutral-700 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className="mt-4 flex items-center gap-3">
                            <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/40?img=5" />
                            <div>
                                <div className="font-semibold text-sm">Wade Warren</div>
                                <div className="text-[11px] text-neutral-500">GRAPHIC DESIGNER</div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-white border p-5 shadow-sm">
                        <p className="text-neutral-700 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className="mt-4 flex items-center gap-3">
                            <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/40?img=6" />
                            <div>
                                <div className="font-semibold text-sm">Wade Warren</div>
                                <div className="text-[11px] text-neutral-500">GRAPHIC DESIGNER</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact + News simplified */}
            <section className="max-w-[1200px] mx-auto px-6 pb-16">
                <div className="rounded-3xl bg-gradient-to-r from-sky-300 to-violet-400 text-white p-6 grid md:grid-cols-2 gap-6 items-center">
                    <img
                        src="https://images.pexels.com/photos/8460343/pexels-photo-8460343.jpeg?auto=compress&cs=tinysrgb&w=1000"
                        alt="Doctor portrait"
                        loading="lazy"
                        className="rounded-2xl w-full h-64 object-cover hidden md:block bg-neutral-100"
                    />
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="rounded-lg bg-white/15 border border-white/30 text-white placeholder-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/60"
                            placeholder="Your Name"
                        />
                        <input
                            className="rounded-lg bg-white/15 border border-white/30 text-white placeholder-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/60"
                            placeholder="Your Email"
                        />
                        <input
                            className="rounded-lg bg-white/15 border border-white/30 text-white placeholder-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/60"
                            placeholder="Phone Number"
                        />
                        <select
                            className="rounded-lg bg-white/15 border border-white/30 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/60"
                            defaultValue=""
                        >
                            <option value="" disabled className="text-neutral-800">Select Services</option>
                            <option className="text-neutral-800">General Check-Ups</option>
                            <option className="text-neutral-800">Laboratory</option>
                            <option className="text-neutral-800">Consultation</option>
                        </select>
                        <textarea
                            className="rounded-lg bg-white/15 border border-white/30 text-white placeholder-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/60 md:col-span-2"
                            placeholder="Messages"
                            rows={4}
                        />
                        <div className="md:col-span-2">
                            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white px-6 py-2 text-sm font-semibold shadow-sm hover:from-sky-400 hover:to-violet-500">Send Message</button>
                        </div>
                    </form>
                </div>

                <div className="mt-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">News & Article</h3>
                        <button className="rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white px-4 py-1.5 text-sm hover:from-sky-400 hover:to-violet-500">View all</button>
                    </div>
                    <div className="mt-5 grid md:grid-cols-3 gap-5">
                        {[
                            'https://png.pngtree.com/thumb_back/fw800/background/20230306/pngtree-lab-assistant-testing-blood-samples-in-hospital-photo-image_1820884.jpg',
                            'https://vinalab.org.vn/Upload/kien-thuc-huu-ich/cong-dung-phong-thi-nghiem.jpg',
                            'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop',
                        ].map((src, idx) => (
                            <article key={idx} className="rounded-2xl overflow-hidden bg-white border shadow-sm">
                                <img src={src} alt="Laboratory article" loading="lazy" className="w-full h-40 object-cover bg-neutral-100" />
                                <div className="p-4">
                                    <h4 className="font-semibold">Lorem ipsum dolor sit amet, consectetur adipis cing elit ligula non</h4>
                                    <button className="mt-3 text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-sm font-semibold hover:from-sky-400 hover:to-violet-500">Learn more</button>
                                </div>
                            </article>
                        ))}
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

export default Home

