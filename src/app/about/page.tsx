export default function AboutPage() {
    return (
      <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-6">About Novar</h1>
          <p style={{ textAlign: "justify" }} className="text-lg text-gray-300">
            Novar is a platform where technology and creativity collide. 
            Our mission is to inspire and empower creators by bridging 
            the gap between innovation and artistic expression.
          </p>
          <p style={{ textAlign: "justify" }} className="text-lg text-gray-300 mt-4">
            Founded by passionate creators, Novar fosters a space for 
            collaboration, learning, and groundbreaking projects that 
            push the boundaries of what's possible.
          </p>
        </div>
  
        {/* Bilde av teamet eller konseptet */}
        <div className="flex justify-center mt-10">
          <img src="/novar-team.jpg" alt="Novar Team" className="rounded-lg shadow-lg w-full max-w-3xl" />
        </div>
  
        {/* Verdier-seksjon */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
            <div className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[var(--novar-yellow)]">Innovation</h3>
              <p className="mt-2">We push creative and technological boundaries.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[var(--novar-yellow)]">Collaboration</h3>
              <p className="mt-2">Great things happen when minds work together.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[var(--novar-yellow)]">Education</h3>
              <p className="mt-2">Sharing knowledge fuels the next generation of creators.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  