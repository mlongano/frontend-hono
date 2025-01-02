import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Short It!</span>
            </a>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-sm font-medium hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-sm font-medium hover:text-primary"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-sm font-medium hover:text-primary"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
