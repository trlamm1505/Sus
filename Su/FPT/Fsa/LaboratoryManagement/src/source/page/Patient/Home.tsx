import { useState } from 'react';

function Home() {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data for patient information
    const patientInfo = {
        name: "Johnathan Doe",
        gender: "Male",
        age: 32,
        dob: "July 15, 1985",
        patientId: "PT-20230456",
        email: "mamckinder@gmail.com",
        phone: "+880 172524123123",
        avatar: "https://images.pexels.com/photos/8460094/pexels-photo-8460094.jpeg?auto=compress&cs=tinysrgb&w=400"
    };

    // Mock data for vitals
    const vitals = {
        bloodGlucose: "120 mg/dt",
        weight: "55 Kg",
        heartRate: "70 bpm",
        oxygenSaturation: "71%",
        temperature: "98.1 F",
        bloodPressure: "120/80 mm hg"
    };

    // Mock data for medications
    const medications = [
        {
            name: "Ursofalk 300",
            dosage: "2 Pills",
            time: "02:00 PM",
            type: "Routine Medicine",
            note: "No observations or notes"
        },
        {
            name: "Indever 20",
            dosage: "1 Pill",
            time: "02:20 PM",
            type: "Emergency",
            note: "Patient observed to be having seizures. Indever given to reduce blood pressure"
        }
    ];

    // Mock data for test reports
    const testReports = [
        {
            testName: "UV Invasive Ultrasound",
            time: "02:00 PM",
            diagnosis: "Nerve Disorder: A small nerve in the left-mid section of the neck has shown swollen properties. A brain scan is suggested"
        }
    ];

    return (
        <div className="flex-1 p-6 bg-gradient-to-br from-sky-100 to-violet-100">
            {/* Patient Information Card */}
            <div className="bg-white rounded-lg shadow-lg border border-sky-200 p-6 mb-6">
                <div className="flex items-start gap-6">
                    <img
                        src={patientInfo.avatar}
                        alt={patientInfo.name}
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{patientInfo.name}</h2>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <p><span className="font-semibold">Gender:</span> {patientInfo.gender} • Age {patientInfo.age}</p>
                                <p><span className="font-semibold">DOB:</span> {patientInfo.dob}</p>
                            </div>
                            <div>
                                <p><span className="font-semibold">Patient ID:</span> {patientInfo.patientId}</p>
                                <p><span className="font-semibold">Email:</span> {patientInfo.email}</p>
                                <p><span className="font-semibold">Phone:</span> {patientInfo.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-lg border border-sky-200 mb-6">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'patient-record', label: 'Patient Record' },
                            { id: 'medical-record', label: 'Medical Record' },
                            { id: 'medication', label: 'Medication' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div>
                            {/* Date/Time Selector */}
                            <div className="flex items-center gap-4 mb-6">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Today</button>
                                <button className="p-2 text-gray-600 hover:text-gray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                                    </svg>
                                </button>
                                <span className="text-sm font-medium text-gray-700">Fri, 21 Jul 2024</span>
                                <button className="p-2 text-gray-600 hover:text-gray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                                    </svg>
                                </button>
                                <span className="text-sm text-gray-600">02:00 PM - 11:20 PM</span>
                            </div>

                            {/* Overview Cards */}
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Vitals Card */}
                                <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-lg p-6 shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Vitals</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Blood Glucose</span>
                                            <span className="text-sm font-medium">{vitals.bloodGlucose}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Weight</span>
                                            <span className="text-sm font-medium">{vitals.weight}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Heart Rate</span>
                                            <span className="text-sm font-medium">{vitals.heartRate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Oxygen Saturation</span>
                                            <span className="text-sm font-medium">{vitals.oxygenSaturation}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Temperature</span>
                                            <span className="text-sm font-medium">{vitals.temperature}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Blood Pressure</span>
                                            <span className="text-sm font-medium">{vitals.bloodPressure}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Medications Card */}
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600">
                                                <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm11 12H5v-6h14v6z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Medications</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {medications.map((med, index) => (
                                            <div key={index} className="border-l-4 border-blue-200 pl-4">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-medium text-gray-900">{med.name}</span>
                                                    <span className="text-sm text-gray-500">{med.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-1">{med.dosage}</p>
                                                <p className="text-xs text-gray-500 mb-1">{med.type}</p>
                                                <p className="text-xs text-gray-400">{med.note}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Test Reports Card */}
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
                                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Test Reports</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {testReports.map((report, index) => (
                                            <div key={index} className="border-l-4 border-green-200 pl-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-medium text-gray-900">{report.testName}</span>
                                                    <span className="text-sm text-gray-500">{report.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-600">{report.diagnosis}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'patient-record' && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Patient Record content will be displayed here</p>
                        </div>
                    )}

                    {activeTab === 'medical-record' && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Medical Record content will be displayed here</p>
                        </div>
                    )}

                    {activeTab === 'medication' && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Medication content will be displayed here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
