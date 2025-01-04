export const MenuItems = () => {
  return (
    <nav className="p-2">
      <ul className="flex flex-col md:flex-row md:justify-end md:items-center space-y-2  md:space-x-4 md:space-y-0">
        <li>
          <a href="/" className="text-sm font-medium hover:text-primary">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="text-sm font-medium hover:text-primary">
            About
          </a>
        </li>
        <li>
          <a href="/blog" className="text-sm font-medium hover:text-primary">
            Blog
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MenuItems;
