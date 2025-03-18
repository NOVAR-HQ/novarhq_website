{/* MODAL */}
{selectedPost && (
  <div 
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100] px-4 py-10"
    onClick={() => setSelectedPost(null)} // Closes modal when clicking outside
  >
    <div 
      className="bg-[#03405f] text-white p-6 rounded-lg w-full max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto relative shadow-lg"
      onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
    >
      <button
        className="absolute top-3 right-3 text-2xl font-bold text-gray-300 hover:text-white"
        onClick={() => setSelectedPost(null)}
      >
        ✖
      </button>
      <Image
        src={selectedPost.imageUrl ? selectedPost.imageUrl : "/placeholder.png"}
        alt={selectedPost.title}
        width={600}
        height={400}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-3xl font-bold mb-2 text-[var(--novar-yellow)]">{selectedPost.title}</h2>
      <p className="text-lg mb-4">{selectedPost.description}</p>
      {selectedPost.link && (
        <a
          href={selectedPost.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline font-semibold"
        >
          View More
        </a>
      )}
    </div>
  </div>
)}
