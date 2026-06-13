import Header  from './components/Header/Header';
import Hero    from './components/Hero/Hero';
import About   from './components/About/About';
import Skills  from './components/Skills/Skills';
import Work    from './components/Work/Work';
import Contact from './components/contact/Contact';
import Footer  from './components/Footer/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
