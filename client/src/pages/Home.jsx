import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import AnimatedBackground from '../components/common/AnimatedBackground';
import ScrollSnakePath from '../components/common/ScrollSnakePath';
import Hero from '../components/portfolio/Hero';
import About from '../components/portfolio/About';
import Skills from '../components/portfolio/Skills';
import Projects from '../components/portfolio/Projects';
import Contact from '../components/portfolio/Contact';
import Loader from '../components/common/Loader';
import API from '../api/axios';

const Home = () => {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let retryCount = 0;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;

    const fetchData = async () => {
      try {
        const [aboutRes, skillsRes, projectsRes, socialsRes] = await Promise.allSettled([
          API.get('/about'),
          API.get('/skills'),
          API.get('/projects'),
          API.get('/social'),
        ]);

        // Check if all calls failed (server not running yet)
        const allFailed = [aboutRes, skillsRes, projectsRes, socialsRes].every(
          (r) => r.status === 'rejected'
        );

        if (allFailed && retryCount < MAX_RETRIES) {
          retryCount++;
          console.warn(`Server not ready, retrying in ${RETRY_DELAY / 1000}s... (attempt ${retryCount}/${MAX_RETRIES})`);
          setTimeout(fetchData, RETRY_DELAY);
          return;
        }

        if (aboutRes.status === 'fulfilled' && aboutRes.value?.data?.data) setAbout(aboutRes.value.data.data);
        if (skillsRes.status === 'fulfilled' && skillsRes.value?.data?.data) setSkills(skillsRes.value.data.data);
        if (projectsRes.status === 'fulfilled' && projectsRes.value?.data?.data) setProjects(projectsRes.value.data.data);
        if (socialsRes.status === 'fulfilled' && socialsRes.value?.data?.data) setSocials(socialsRes.value.data.data);
      } catch (err) {
        console.warn('Backend API connection offline, displaying initial UI template:', err);
      } finally {
        // Only stop loading after all retries are done or data is fetched
        if (retryCount === 0 || retryCount >= MAX_RETRIES) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen relative bg-[#07070d] text-slate-100 overflow-x-hidden">
      <AnimatedBackground />
      <ScrollSnakePath />
      <Navbar />
      <main className="relative z-10">
        <Hero about={about} socials={socials} />
        <About about={about} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Contact />
      </main>
      <Footer aboutName={about?.name || 'Shivam Srivastava'} />
      <ScrollToTop />
    </div>
  );
};

export default Home;
