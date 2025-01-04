import { ThemeSwitcher } from "./ThemeSwitcher";
import MainMenu from "./MainMenu";
import MobileMenu from "./MobileMenu";

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
          <MainMenu />
          <MobileMenu />
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
