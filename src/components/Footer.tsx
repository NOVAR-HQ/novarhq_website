export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-6 text-center mt-10">
        <p>© {new Date().getFullYear()} Novar HQ. All rights reserved.</p>
        <a href="#" className="block mt-2 text-gray-400 hover:text-white">Back to top ↑</a>
      </footer>
    );
  }
  