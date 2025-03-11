export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold">Novar HQ</h1>
        <p className="text-2xl mt-4">Innovation meets creativity</p>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 text-center bg-gray-800">
        <h2 className="text-4xl font-semibold">About Novar</h2>
        <p className="mt-4 max-w-3xl mx-auto">
          Novar blends art and technology to create groundbreaking projects. We inspire young creators and innovate across industries.
        </p>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-semibold">Portfolio</h2>
        <p className="mt-4 max-w-3xl mx-auto">Explore our past, present, and future projects.</p>
        <a href="/portfolio" className="mt-6 inline-block bg-blue-500 px-6 py-3 text-lg rounded-lg">View More</a>
      </section>

      {/* Collaboration & Mentoring */}
      <section className="py-20 px-6 text-center bg-gray-800">
        <h2 className="text-4xl font-semibold">Collab & Mentoring</h2>
        <p className="mt-4 max-w-3xl mx-auto">Want to work with us or learn from our experience? Let’s create together!</p>
        <a href="/collab" className="mt-6 inline-block bg-green-500 px-6 py-3 text-lg rounded-lg">Get Involved</a>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-semibold">Join the Community</h2>
        <p className="mt-4 max-w-3xl mx-auto">Share your projects and connect with other creators.</p>
        <a href="/community" className="mt-6 inline-block bg-purple-500 px-6 py-3 text-lg rounded-lg">Join Now</a>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 text-center bg-gray-800">
        <h2 className="text-4xl font-semibold">Contact Us</h2>
        <p className="mt-4 max-w-3xl mx-auto">Have questions or ideas? Let’s talk!</p>
        <a href="mailto:contact@novarhq.com" className="mt-6 inline-block bg-yellow-500 px-6 py-3 text-lg rounded-lg">Email Us</a>
      </section>
    </div>
  );
}
