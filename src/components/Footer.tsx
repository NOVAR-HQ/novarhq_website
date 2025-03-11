export default function Footer() {
  return (
    <footer className="text-center py-4 w-full bg-[var(--navbar-bg)] text-white mt-auto">
      <p>© {new Date().getFullYear()} Novar HQ. All rights reserved.</p>
    </footer>
  );
}
