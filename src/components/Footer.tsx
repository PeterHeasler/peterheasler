
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12">
      <div className="container mx-auto px-4 py-2 text-center text-gray-600 dark:text-gray-300">
        <p>&copy; {new Date().getFullYear()} Peter Heasler. All rights reserved.</p>
      </div>
    </footer>
  );
}
