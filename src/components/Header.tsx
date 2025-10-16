
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          <AiFillHome style={{ fontSize: '1.75em' }} aria-label="Home" />
        </Link>

        <div className="flex items-center space-x-4">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#posts" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Posts
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Projects
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
