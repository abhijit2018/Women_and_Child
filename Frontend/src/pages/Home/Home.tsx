import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import Hero from '../../components/Hero/Hero';
import Footer from '../../components/Footer/Footer';

function Home() {
  return (
    <>
      <Header />
      <NavBar />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}

export default Home;
