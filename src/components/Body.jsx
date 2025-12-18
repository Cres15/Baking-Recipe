import Logo from "../logo/picture1.jpg";
import Logo1 from "../logo/picture2.jpg";

const Body = () => {
  return (
    <div className="bg-[#E0A8A8] min-h-screen flex flex-col">
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-6">
        <div className="max-w-4xl w-full text-center">
          
          {/* Responsive Header */}
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-tight">
              Happiness is <br className="block sm:hidden" /> 
              <span className="text-white/90">Homemade</span>
            </h1>
          
          </header>

          {/* Responsive Image Container */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <div className="relative group">
              <img 
                src={Logo} 
                alt="Baking 1" 
                className="w-48 sm:w-56 md:w-64 aspect-[4/5] object-cover rounded-[2rem] shadow-2xl border-4 border-white/30 transform transition-transform group-hover:scale-105" 
              />
            </div>
            
            <div className="relative group">
              <img 
                src={Logo1} 
                alt="Baking 2" 
                className="w-48 sm:w-56 md:w-64 aspect-[4/5] object-cover rounded-[2rem] shadow-2xl border-4 border-white/30 transform transition-transform group-hover:scale-105" 
              />
            </div>
          </div>

          {/* Minimalist Decoration */}
          <div className="mt-12 flex justify-center items-center gap-3">
            <div className="h-1 w-8 bg-white/20 rounded-full"></div>
            <div className="h-2 w-2 bg-white rounded-full"></div>
            <div className="h-1 w-8 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* --- Responsive Footer --- */}
      <footer className="w-full bg-black/10 py-8 px-6 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          
          {/* Social / Links Placeholder */}
          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Codizal, Cresmarie A.</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">BSIT-3B</a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Baking Recipe • Handcrafted with love
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Body;