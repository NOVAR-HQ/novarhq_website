export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-6 text-center mt-10">
        <p>© {new Date().getFullYear()} Novar HQ. All rights reserved.</p>
        <p>Email: <a href="mailto:yousef@novarhq.com" className="text-blue-400">yousef@novarhq.com</a></p>
        <a href="#" className="block mt-2 text-gray-400 hover:text-white">Back to top ↑</a>
      </footer>
    );
  }
  