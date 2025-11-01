import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Calendar,
  ShoppingBag,
  Send,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "@/libs/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/libs/components/ui/popover";
import { cn } from "@/libs/utils/utils";

interface HeaderProps {
  onLogout?: () => void;
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ onLogout, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: "My Calendar",
      path: "/my-calendar",
      icon: Calendar,
    },
    {
      name: "Marketplace",
      path: "/marketplace",
      icon: ShoppingBag,
    },
    {
      name: "Requests",
      path: "/requests",
      icon: Send,
    },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur ">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl">
              <ArrowRightLeft className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              SlotSwapper
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActivePath(item.path)
                    ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Link to="/notifications">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100"
              >
                <Bell className="w-5 h-5" />
                {/* Notification badge */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
            </Link>

            {/* Profile Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="end">
                <div className="space-y-1">
                  {/* User Info */}
                  <div className="px-3 py-2 border-b">
                    <p className="text-sm font-medium">
                      {user?.name || "User"}
                    </p>
                    {user?.email && (
                      <p className="text-xs text-gray-500">{user.email}</p>
                    )}
                  </div>

                  {/* Profile Link */}
                  <Link to="/profile">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-gray-700 hover:bg-gray-100"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Button>
                  </Link>

                  {/* Logout */}
                  <Button
                    variant="ghost"
                    onClick={onLogout}
                    className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-999 md:hidden h-full">
          <nav className="container mx-auto px-4 py-6 bg-white shadow-sm">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleMobileLinkClick}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    isActivePath(item.path)
                      ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile User Section */}
            <div className="mt-8 pt-6 border-t space-y-2">
              <Link to="/profile" onClick={handleMobileLinkClick}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100 h-12"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  handleMobileLinkClick();
                  onLogout?.();
                }}
                className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 h-12"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
