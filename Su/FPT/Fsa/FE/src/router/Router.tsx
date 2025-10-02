
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from '../source/page/Home/Header'
import Footer from '../source/page/Home/Footer'
import Home from '../source/page/Home/Home'


function Router() {
    const location = useLocation()
    const showChrome = !location.pathname.startsWith('/login')
    const isPatientRoute = location.pathname.startsWith('/patient')

    return (
        <div className="min-h-screen flex flex-col">
            {/* Patient Layout */}
            {isPatientRoute ? (
                <div className="h-screen bg-gray-50 flex overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <main className="flex-1 overflow-y-auto">
                            <Routes>
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
                        </Routes>
                    </main>
                    {showChrome && <Footer />}
                </div>
            )}
        </div>
    )
}

export default Router