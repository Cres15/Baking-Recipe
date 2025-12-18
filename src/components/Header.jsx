import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // On mobile, touch scrolls can be sensitive, so we use a 5px buffer
      const scrollingUp = prevScrollPos > currentScrollPos;
      const atTop = currentScrollPos < 10;

      setVisible(scrollingUp || atTop);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header 
      className={`bg-[#BB8ED0] shadow-lg py-3 md:py-4 sticky top-0 z-[100] transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 md:px-6">
        
        {/* Logo scaled down for mobile */}
        <h1 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic">
          Baking<span className="text-white/60">Recipe</span>
        </h1>

        {/* Navigation Buttons - Smaller padding/font on mobile */}
        <ul className="flex items-center gap-1 sm:gap-4">
          <li>
            <Link 
              to="/" 
              className={`px-3 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest transition-all shadow-md ${
                isActive("/") 
                ? "bg-white text-[#BB8ED0] scale-105" 
                : "text-white hover:bg-white/10"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/process" 
              className={`px-3 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest transition-all shadow-md ${
                isActive("/process") 
                ? "bg-white text-[#BB8ED0] scale-105" 
                : "text-white hover:bg-white/10"
              }`}
            >
              Process
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;