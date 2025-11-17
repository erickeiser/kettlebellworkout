import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-brand-dark text-white min-h-screen">
      {/* Header */}
      <header className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-bold text-2xl">
            Kettle<span className="text-brand-emerald">Cut</span>
          </h1>
          <button onClick={() => navigate('/auth')} className="bg-brand-emerald px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">
            Log In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto text-center px-4 py-20 md:py-32">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Drop 30+ lbs With One Kettlebell in 12 Weeks
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          KettleCut is a high-intensity kettlebell program designed to shred fat, build lean muscle, and transform your body. No complex equipment, just you, a kettlebell, and 12 weeks of dedication.
        </p>
        <button onClick={() => navigate('/auth')} className="bg-brand-emerald text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-emerald-700 transition duration-300">
          Start Your Transformation
        </button>
      </main>

      {/* Features Section */}
      <section className="bg-brand-gray py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div className="feature">
            <h3 className="text-2xl font-bold text-brand-emerald mb-2">12-Week Program</h3>
            <p className="text-gray-400">A pre-loaded, structured plan with 5 workouts a week. No guesswork, just results.</p>
          </div>
          <div className="feature">
            <h3 className="text-2xl font-bold text-brand-emerald mb-2">Progress Tracking</h3>
            <p className="text-gray-400">Log your weight and photos weekly to see your transformation unfold.</p>
          </div>
          <div className="feature">
            <h3 className="text-2xl font-bold text-brand-emerald mb-2">"Torcher" Days</h3>
            <p className="text-gray-400">High-intensity conditioning sessions designed to maximize calorie burn and boost your metabolism.</p>
          </div>
        </div>
      </section>

       {/* Footer */}
       <footer className="text-center p-6 text-gray-500">
            <p>&copy; {new Date().getFullYear()} KettleCut. All Rights Reserved.</p>
       </footer>
    </div>
  );
};

export default LandingPage;
