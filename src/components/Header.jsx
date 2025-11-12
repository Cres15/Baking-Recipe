import Logo from "../logo/Baking Recipe.png"
const Header = ({name}) =>{

    return(
          <>
          <header className="drop-shadow-md shadow-emerald-800">
            <img src={Logo} alt="" className = "w-16" />
             <article className='flex justify-between items-center'>
              <div className='flex items-center'>
                     <h1 className=" text-4xl font-bold text-emerald-600">Baking Recipe</h1>
    </div>
    <div>
        <h3 className='text-emerald-400 font-semibold text-3xl'>Hello {name}</h3>
    </div>
    </article>
     </header>
    
        </>
    
    );
      
}

export default Header;