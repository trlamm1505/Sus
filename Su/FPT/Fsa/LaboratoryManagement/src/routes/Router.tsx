
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from '../source/page/Home/Header'
import Footer from '../source/page/Home/Footer'
import Home from '../source/page/Home/Home'
import Services from '../source/page/Home/Services'
import About from '../source/page/Home/About'
import Contact from '../source/page/Home/Contact'
import Login from '../source/page/Home/Login'
import Error from '../source/page/Home/Error'
// Patient routes
import PatientHeader from '../source/page/Patient/Header'
import PatientSidebar from '../source/page/Patient/Sidebar'
import PatientHome from '../source/page/Patient/Home'
import PatientProfile from '../source/page/Patient/Profile'

function Router() {
    const location = useLocation()
    const showChrome = !location.pathname.startsWith('/login')
    const isPatientRoute = location.pathname.startsWith('/patient')

    return (
        <div className="min-h-screen flex flex-col">
            {/* Patient Layout */}
            {isPatientRoute ? (
                <div className="h-screen bg-gray-50 flex overflow-hidden">
                    <PatientSidebar />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <PatientHeader />
                        <main className="flex-1 overflow-y-auto">
                            <Routes>
                                <Route path="/patient/dashboard" element={<PatientHome />} />
                                <Route path="/patient/profile" element={<PatientProfile />} />
                                <Route path="/patient/*" element={<PatientHome />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            ) : (
                /* Public Layout */
                <div className="min-h-screen flex flex-col">
                    {showChrome && <Header />}
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/error" element={<Error />} />
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </main>
                    {showChrome && <Footer />}
                </div>
            )}
        </div>
    )
}

export default Router