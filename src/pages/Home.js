import React from 'react';
import MainBanner from '../components/MainBanner';  
import AdsSection from '../components/AdsSection';
import SubscriptionsSection from '../components/SubscriptionsSection';
import AdditionalServicesSection from '../components/AdditionalServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import SecondaryCTASection from '../components/SecondaryCTASection';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
  return (
    <div className="home">
      {/* Main Banner Section */}
      <MainBanner />
      {/* Ads Section */}
      <AdsSection />
      {/* Subscriptions Section */}
      <SubscriptionsSection />
      {/* Additional Services Section */}
      <AdditionalServicesSection />
      {/* WhyChooseUs Section */}
      <WhyChooseUs />
      {/* Testimonials Section */}
       <TestimonialsSection />
       {/* Secondary Calls to Action Section */}
      <SecondaryCTASection />
    </div>
  );
};

export default Home;
