import React from 'react';

const AdditionalServicesSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Our Additional Services</h2>

        {/* Service Descriptions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Scouting Organization */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h3 className="text-xl font-semibold mb-4">Scouting Organization</h3>
            <p className="text-gray-700 mb-4">We help clubs and agents find the best talents by organizing scouting events and trials.</p>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/1CB_xGYibQU?si=TlSBnhsCHVK5yDEb" 
                title="Scouting Organization Video"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Tournament Organization */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h3 className="text-xl font-semibold mb-4">Tournament Organization</h3>
            <p className="text-gray-700 mb-4">We assist in organizing football tournaments, from planning to execution, for all levels.</p>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/co3pn3eL5-Y?si=Dz05U_bHfSncfQV_" 
                title="Tournament Organization Video"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Custom Service */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h3 className="text-xl font-semibold mb-4">Custom Services</h3>
            <p className="text-gray-700 mb-4">We provide tailored services based on specific needs. Let us know how we can help you!</p>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/t_v9-LtDbaw?si=Z_2aDbZp4uUNhpWE" 
                title="Tournament Organization Video"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Scouting Organization */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h3 className="text-xl font-semibold mb-4">Scouting Organization</h3>
            <p className="text-gray-700 mb-4">We help clubs and agents find the best talents by organizing scouting events and trials.</p>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/KWKBch5hC5E?si=OYZD3fMrn5DCsggp" 
                title="Scouting Organization Video"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Tournament Organization */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h3 className="text-xl font-semibold mb-4">Tournament Organization</h3>
            <p className="text-gray-700 mb-4">We assist in organizing football tournaments, from planning to execution, for all levels.</p>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/co3pn3eL5-Y?si=Dz05U_bHfSncfQV_" 
                title="Tournament Organization Video"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Custom Service */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h3 className="text-xl font-semibold mb-4">Custom Services</h3>
            <p className="text-gray-700 mb-4">We provide tailored services based on specific needs. Let us know how we can help you!</p>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe 
                src="https://www.youtube.com/embed/Rm2YVbN7Zsw?si=cMB2nPc2LUF5XsoP" 
                title="Tournament Organization Video"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8">
          <a href="/services" className="text-lg font-semibold text-blue-600 hover:underline">
            Learn More About Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServicesSection;
