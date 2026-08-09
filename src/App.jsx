import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ProjectGrid from './components/ProjectGrid';
import Contact from './components/Contact';
import './App.css';

export default function App() {
  return (
    <>
      {/* Background decorations */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <ProjectGrid />
        <Contact />
      </main>
    </>
  );
}
