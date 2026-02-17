import { ListFilter, Search, LogOut, Moon, Sun } from "lucide-react";

function Header({ onOpenFilter, searchQuery, setSearchQuery, onLogout, isDarkMode, toggleTheme }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between z-40 gap-4">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block whitespace-nowrap">
        My Tasks
      </h1>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 text-white bg-gray-100 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
        />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <button 
          onClick={onOpenFilter} 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400"
          title="Sort and Filter"
        >
          <ListFilter size={22} />
        </button>

        <button 
          onClick={onLogout}
          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full text-red-500"
          title="Logout"
        >
          <LogOut size={22} />
        </button>
      </div>
    </header>
  );
}

export default Header;