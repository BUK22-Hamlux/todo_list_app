import { Moon, Search, LogOut, MoreVertical } from 'lucide-react';
import TodoLogo from '../../assets/todoLogo.png';

function Header() {
    
  return (
    <header className=" fixed z-10 w-full h-16 p-4 bg-slate-100 flex items-center justify-between">
        <div className="flex items-center text-xl sm:text-2xl font-bold text-slate-800">
            <img src={TodoLogo} alt="Todo Logo" className="w-5 h-5 sm:w-8 sm:h-8 mr-2" />
            <h1 className="tracking-tight">Todo List</h1>
        </div>
        
        <div className=' items-center bg-gray-200 p-2 rounded-lg hidden sm:flex'>
            <Search className='text-gray-500' />
            <input 
                type="search" 
                placeholder="Search tasks..." 
                className="ml-2 p-1 h-8 text-sm rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
        </div>

        <div className='hidden sm:flex items-center gap-4'>           
            <button className='bg-gray-200 p-2 rounded-lg'>
                <Moon className=' text-gray-500' />      

            </button>
            <button aria-label='Logout' className='bg-red-500 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors'>
                    <LogOut className=' ' />
                    Logout
            </button>
        </div>

        <button className='sm:hidden'>
            <MoreVertical className='font-bold text-black' />
        </button>
    </header>
  );
}

export default Header;