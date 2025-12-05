import picture4 from "../logo/picture4.jpg";
import picture3 from "../logo/picture3.jpg";

import { useState } from "react";

function Process() {
  const [selected, setSelected] = useState("basic");

  return (
    <div className="bg-[#E9A5F1] min-h-screen pt-28 md:pt-40 px-6 md:px-10">

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center"></h1>
        
      {/* BUTTONS */}
      <div className="flex justify-center gap-4 mb-10 -mt-10">
        <button
          onClick={() => setSelected("basic")}
          className={`px-5 py-2 rounded-xl border shadow-md ${
            selected === "basic" ? "bg-white font-bold" : "bg-[#f5d2f8]"
          }`}
        >
          Basic Baked
        </button>

        <button
          onClick={() => setSelected("cake")}
          className={`px-5 py-2 rounded-xl border shadow-md ${
            selected === "cake" ? "bg-white font-bold" : "bg-[#f5d2f8]"
          }`}
        >
          Cake
        </button>
      </div>

      {/* BORDER */}
      <div className="max-w-4xl mx-20 border py-10 border-black rounded-md h-12 mb-3 bg-white shadow-sm flex items-center justify-around text-sm font-semibold">
      <div className = "mb-2">
      
        {selected === "basic" ? (
          <>
          
            <p>Prep Time: 10 mins</p>
            <p>Cook Time: 10 mins</p>
            <p>Total Time: 20 mins</p>

          </>
         ): (
          <>
            <p>Prep Time: 15 mins</p>
            <p>Cook Time: 15 mins</p>
            <p>Total Time: 30 mins</p>
          </>
        )}
        </div>
      </div>

    

      {/* MAIN BORDER */}
      <div className="max-w-4xl mx-auto border-2 border-black rounded-xl h-auto p-4 flex items-center justify-center bg-white shadow-md">
        {selected === "basic" ? (
          <div className="flex justify-center">
           <img src={picture4} alt="process" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-xl h-auto rounded-xl mt-9" />
          </div>  
        ) : (
           <div className="flex justify-center">
          <img src={picture3} alt="process" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-xl h-auto rounded-xl" />
          </div> 
        )}
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-4xl mx-auto bg-white border rounded-xl p-5 shadow-xl mt-3">
        
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">

          {/* INGREDIENTS */}
          <div className="md:w-1/2 md:border-r md:pr-6">
            <h2 className="text-xl font-bold mb-2">Ingredients</h2>

            {selected === "basic" ? (
              <ul className="list-disc ml-5">
                <li>2 1/2 cups all-purpose flour</li>
                <li>1 cup softened butter</li>
                <li>1/2 cup white sugar</li>
                <li>1 cup brown sugar</li>
                <li>2 pieces raw eggs</li>
                <li>1 teaspoons vanilla extract</li>
                <li>1 teaspoon baking soda</li>
                <li>1 teaspoon salt</li>
                <li>2 cups semisweet chocolate chips</li>
                <li>3/4 cup chopped walnuts</li>
              </ul>
            ) : (
              <ul className="list-disc ml-5">
                <li>1 ¾ cups all-purpose flour</li>
                <li>½ cup unsweetened cocoa powder</li>
                <li>2 teaspoons baking powder</li>
                <li>¼ teaspoon baking soda</li>
                <li>⅛ teaspoon salt</li>
                <li>1 ½ cups white sugar</li>
                <li>6 tablespoons butter, softened</li>
                <li>2 large eggs</li>
                <li>¾ teaspoon vanilla extract</li>
                <li>1 cup milk</li>
              </ul>
            )}
          </div>

          {/* DIRECTIONS */}
          <div className="md:w-1/2 md:pl-6">
            <h2 className="text-xl font-bold mb-2">Directions</h2>

            {selected === "basic" ? (
              <div className="leading-relaxed text-justify">
               <li>Preheat oven to 350 degrees Fahrenheit.</li>
               <li>In a mixing bowl, combine all-purpose flour, salt, and baking soda. Mix well and set aside.</li>
               <li>On a separate mixing bowl, put in butter and beat. Gradually add both sugars while beating.</li>
               <li>Add-in the vanilla extract and eggs (one piece at a time) while beating.</li>
               <li>Gradually add the flour, salt, and baking soda mixture and beat until all the ingredients are well mixed.</li>
               <li>Put-in the chocolate chips and chopped nuts. Fold until the chips and nuts are well incorporated.</li>
               <li>Arrange parchment paper in a baking sheet. Scoop and drop the mixture on the parchment paper. Note: try to press the mixture a little bit to make the cookie flat. This will also give you room if you want to place extra chocolate chips on top of the cookie.</li>
               <li>Place inside the oven and bake for 7 to 10 minutes.</li>
               <li>Remove from the oven and place in cooling racks.</li>
               <li>Serve.</li>
               </div>
            ) : (
              <div className="leading-relaxed text-justify">
                <li>Preheat the oven to 350 degrees F (175 degrees C). Line a muffin pan with paper or foil liners.</li>
                <li>Spoon flour into a measuring cup and level off with a knife. Sift flour, cocoa, baking powder, baking soda, and salt into a large bowl.</li>
                <li>Beat sugar and butter together in a separate large bowl with an electric mixer until light and fluffy.</li>
                <li>Add eggs, one at a time, beating well after each addition. Stir in the vanilla. Add flour mixture in two batches, alternating with milk; mix only until no streaks of flour remain.</li>
                <li>Spoon batter into the prepared muffin cups, filling each 1/2 full.</li>
                <li>Bake in the preheated oven until a toothpick inserted into the centers comes out clean, 15 to 17 minutes. Remove from the oven and let cool in the pan for a few minutes before transferring to a wire rack to cool completely before serving or frosting.</li>
              </div>
            )}
          </div>


        </div>

      </div>



      </div>

  
      


  
  );
}

export default Process;
