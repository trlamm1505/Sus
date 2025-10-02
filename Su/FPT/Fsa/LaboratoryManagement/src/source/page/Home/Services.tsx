import React, { useState, useEffect } from 'react';

function ServiceCard({ title, description, icon, features }: {
    title: string;
    description: string;
    icon: string;
    features: string[]
}) {
    return (
        <div className="rounded-2xl bg-white shadow-sm border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-xl">
                    {icon}
                </span>
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <p className="text-neutral-600 text-sm mb-4">{description}</p>
            <ul className="space-y-2">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-neutral-700">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-300 to-violet-400"></span>
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function Services() {
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
                        Laboratory Testing Services
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Comprehensive blood and chemical analysis services for accurate medical diagnosis and health monitoring
                    </p>
                </div>
            </section>

            {/* Main Services */}
            <section className="max-w-[1200px] mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Our Testing Services</h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        We provide comprehensive laboratory testing services with state-of-the-art equipment and experienced technicians
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ServiceCard
                        title="Blood Chemistry Analysis"
                        description="Complete blood count, glucose levels, cholesterol, and comprehensive metabolic panel testing"
                        icon="🧪"
                        features={[
                            "Complete Blood Count (CBC)",
                            "Blood Glucose & HbA1c",
                            "Lipid Profile",
                            "Liver Function Tests",
                            "Kidney Function Tests"
                        ]}
                    />
                    <ServiceCard
                        title="Hematology Testing"
                        description="Advanced blood cell analysis and coagulation studies for accurate diagnosis"
                        icon="🔬"
                        features={[
                            "Red Blood Cell Analysis",
                            "White Blood Cell Count",
                            "Platelet Function Tests",
                            "Coagulation Studies",
                            "Blood Typing & Crossmatch"
                        ]}
                    />
                    <ServiceCard
                        title="Immunology & Serology"
                        description="Comprehensive immune system testing and infectious disease screening"
                        icon="🦠"
                        features={[
                            "Autoimmune Disease Testing",
                            "Allergy Screening",
                            "Infectious Disease Panels",
                            "Hormone Level Testing",
                            "Tumor Marker Analysis"
                        ]}
                    />
                    <ServiceCard
                        title="Microbiology Testing"
                        description="Pathogen identification and antibiotic susceptibility testing"
                        icon="🔍"
                        features={[
                            "Bacterial Culture & Sensitivity",
                            "Fungal Identification",
                            "Viral Load Testing",
                            "Parasite Detection",
                            "Antibiotic Resistance Testing"
                        ]}
                    />
                    <ServiceCard
                        title="Toxicology Screening"
                        description="Comprehensive drug and toxin analysis for medical and legal purposes"
                        icon="⚗️"
                        features={[
                            "Drug Abuse Screening",
                            "Heavy Metal Testing",
                            "Pesticide Residue Analysis",
                            "Alcohol Level Testing",
                            "Forensic Toxicology"
                        ]}
                    />
                    <ServiceCard
                        title="Specialized Testing"
                        description="Advanced molecular diagnostics and genetic testing services"
                        icon="🧬"
                        features={[
                            "PCR Testing",
                            "Genetic Screening",
                            "Cancer Biomarkers",
                            "Prenatal Testing",
                            "Pharmacogenomics"
                        ]}
                    />
                </div>
            </section>

            {/* Process Section */}
            <section className="bg-white py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Testing Process</h2>
                        <p className="text-neutral-600 max-w-2xl mx-auto">
                            From sample collection to result delivery, we ensure accuracy and reliability at every step
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-xl mx-auto mb-4">1</div>
                            <h3 className="font-semibold mb-2">Sample Collection</h3>
                            <p className="text-sm text-neutral-600">Professional blood draw and sample preparation</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-xl mx-auto mb-4">2</div>
                            <h3 className="font-semibold mb-2">Laboratory Analysis</h3>
                            <p className="text-sm text-neutral-600">Advanced testing with automated equipment</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-xl mx-auto mb-4">3</div>
                            <h3 className="font-semibold mb-2">Quality Control</h3>
                            <p className="text-sm text-neutral-600">Rigorous validation and quality assurance</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-xl mx-auto mb-4">4</div>
                            <h3 className="font-semibold mb-2">Result Delivery</h3>
                            <p className="text-sm text-neutral-600">Secure digital delivery of test results</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Equipment Section */}
            <section className="max-w-[1200px] mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Advanced Laboratory Equipment</h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        State-of-the-art instruments ensuring the highest accuracy and reliability
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 rounded-2xl bg-white shadow-sm border">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-2xl mx-auto mb-4">🔬</div>
                        <h3 className="font-semibold mb-2">Automated Analyzers</h3>
                        <p className="text-sm text-neutral-600">High-throughput chemistry and hematology analyzers</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-white shadow-sm border">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-2xl mx-auto mb-4">🧬</div>
                        <h3 className="font-semibold mb-2">Molecular Diagnostics</h3>
                        <p className="text-sm text-neutral-600">PCR machines and genetic testing equipment</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-white shadow-sm border">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sky-300 to-violet-400 text-white grid place-items-center font-bold text-2xl mx-auto mb-4">🔍</div>
                        <h3 className="font-semibold mb-2">Microscopy Systems</h3>
                        <p className="text-sm text-neutral-600">Digital microscopy and imaging systems</p>
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

export default Services
