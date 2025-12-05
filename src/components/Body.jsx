import Logo from "../logo/picture1.jpg"
import Logo1 from "../logo/picture2.jpg"

const Body = () => {
    return (
        <div className="bg-[#E9A5F1] min-h-[80vh] md:min-h-screen">
            <div className="text-3xl font-bold flex justify-center mt-15">
                <h1>"Happiness is Homemade"</h1>
            </div>

            <article className="bg-[#FED2E2] rounded-2xl border-3 shadow-2xl mt-10 py-6 mx-4 md:mx-20 lg:mx-40">
                <div className="flex justify-center">
                    <img src={Logo} alt="" className="w-32 md:w-60" />
                    <img src={Logo1} alt="" className="w-32 md:w-60" />
                </div>
            </article>
        </div>
    )
}

export default Body;
