 import Logo from "../logo/picture1.jpg"
 import Logo1 from "../logo/picture2.jpg"

const Body = () =>{

        return(
            <body className="bg-[#E9A5F1]">
                <div className = "text-3xl font-bold flex justify-center mt-20">
                <h1>"Happiness is Homemade"</h1>
                </div>
                <article className="bg-[#FED2E2] rounded-2xl border-3 shadow-2xl mt-10 py-20 mx-120">
                    <div className="flex justify-center">
                <img src={Logo} alt="" className = "scale-90 text-center" />
                <img src={Logo1} alt="" className = "scale-90 text-center" />
                    </div>
                </article>
            </body>
        )
}

export default Body;