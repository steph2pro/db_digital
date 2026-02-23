
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { WebProjects } from './pages/WebProjects';
import { MobileProjects } from './pages/MobileProjects';
import { BackendProjects } from './pages/BackendProjects';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { ProjectDetail } from './pages/ProjectDetail';
import { NotFound } from './pages/404';
import './i18n';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FullstackProjects } from './pages/FullstackProjets';
import { Trainings } from './pages/Trainings';
import { TrainingDetail } from './pages/TrainingDetail';
import WhatsAppFAB from './components/layout/WhatsAppFAB';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-tertiary dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Projects Routes */}
                <Route path="/projects">
                  <Route index element={<WebProjects />} />
                  <Route path="web" element={<WebProjects />} />
                  <Route path="mobile" element={<MobileProjects />} />
                  <Route path="backend" element={<BackendProjects />} />
                  <Route path="fullstack" element={<FullstackProjects />} />
                  <Route path=":projectId" element={<ProjectDetail />} />
                </Route>
                
                {/* Blog Routes */}
                <Route path="/blog">
                  <Route index element={<Blog />} />
                  <Route path=":postId" element={<BlogPost />} />
                </Route>
                {/* Training Routes */}
                <Route path="/trainings">
                  <Route index element={<Trainings />} />
                  <Route path=":trainingId" element={<TrainingDetail />} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

      <WhatsAppFAB />
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Footer } from "./components/Footer";
// import { Header } from "./components/Header";
// import { Home } from "./pages/Home";
// import { About } from "./pages/About";
// import { Skills } from "./pages/Skills";
// import { Work } from "./pages/Work";
// import { Contact } from "./pages/Contact";

// export const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/skills" element={<Skills />} />
//         <Route path="/work" element={<Work />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };
