import Landing from '@/src/app/(nondashboard)/landing/page';
import NonDashboardNavbar from '@/src/components/NonDashboardNavbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar/>
      <main className='nondashboard-layout__main'>
        <Landing/>
      </main>
      <Footer/>
    </div>
  );
}
