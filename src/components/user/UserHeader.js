import { Link } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/20/solid";

export default function UserHeader() {
  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">DB10</span>
            <img alt="" src="/logo.png" className="h-8 w-auto" />
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-2 text-sm font-semibold text-white">
                <UserCircleIcon className="h-6 w-6 text-white" />
                <span>User Profile</span>
              </PopoverButton>
              <PopoverPanel className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5">
                <div className="p-2">
                  <Link
                    to="/user/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/user/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              </PopoverPanel>
            </Popover>
        </div>
      </nav>
      
    </header>
  );
}
