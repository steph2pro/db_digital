import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { TechnologiesPage } from './pages/TechnologiesPage';
import { NotFound } from './pages/404';
import './i18n';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import SupportPage from './pages/SupportPage';
import { MethodologyPage } from './pages/MethodologyPage';
import WhatsAppFAB from './components/layout/WhatsAppFAB';
import { ServicesPage } from './pages/ServicesPage';
import { QualityPage } from './pages/QualityPage';
import { AboutPage } from './pages/AboutPage';
import { PartnersPage } from './pages/PartnersPage';
import { CareersPage } from './pages/CareersPage';
import QuotePage from './pages/QuotePage';
import LocationPage from './pages/LocationPage';

function App() {
  const offices = [
    { city: 'Yaoundé - Nkoabang', phone: '640 46 51 82' },
    { city: 'Douala - Cité des Palmiers', phone: '657 12 87 12' },
    { city: 'Bafoussam - Kamkop', phone: '640 10 19 74' },
  ];
  
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-tertiary dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/partners" element={<PartnersPage />} />

                <Route path="/technologies" element={<TechnologiesPage />} />
                <Route path="/methodology" element={<MethodologyPage />} />
                <Route path="/quality" element={<QualityPage />} />
                
                {/* Routes Contact */}
                <Route path="/contact" element={<QuotePage />} />
                <Route path="/contact/quote" element={<QuotePage />} />
                <Route path="/contact/support" element={<SupportPage />} />
                <Route path="/contact/location" element={<LocationPage />} />
                
                {/* Blog Routes */}
                {/* <Route path="/blog">
                  <Route index element={<Blog />} />
                  <Route path=":postId" element={<BlogPost />} />
                </Route> */}
                
                {/* Services Routes */}
                <Route path="/services">
                  <Route index element={<ServicesPage />} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <WhatsAppFAB offices={offices} />
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;