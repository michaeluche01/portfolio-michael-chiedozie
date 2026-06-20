import Header         from './components/Header/Header';
import Hero           from './components/Hero/Hero';
import About          from './components/About/About';
import Skills         from './components/Skills/Skills';
import Work           from './components/Work/Work';
import Contact        from './components/Contact/Contact';
import Footer         from './components/Footer/Footer';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import ScrollToTop    from './components/ScrollToTop/ScrollToTop';
import CommandPalette from './components/CommandPalette/CommandPalette';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <CommandPalette />
    </>
  );
}
