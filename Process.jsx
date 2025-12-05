import { useState } from "react";

// ------------------------
// Custom Hook for LocalStorage
// ------------------------
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  const save = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};

// ------------------------
// Subcomponents
// ------------------------
const RecipeList = ({ recipes, selectedRecipe, setSelectedRecipe, search }) => {
  const filtered = recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.ingredients.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ul className="flex flex-col gap-2">
      {filtered.map((r) => (
        <li
          key={r.id}
          onClick={() => setSelectedRecipe(r)}
          className={`p-2 rounded-lg cursor-pointer border ${
            selectedRecipe?.id === r.id ? "bg-[#f5d2f8] font-bold" : "bg-white"
          }`}
        >
          {r.name}
        </li>
      ))}
      {filtered.length === 0 && <li className="text-gray-500">No recipes found.</li>}
    </ul>
  );
};

const RecipeForm = ({ formData, setFormData, onSubmit, submitText }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-3">
      <input
        className="border p-2 w-full rounded mb-2"
        placeholder="Recipe Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <div className="grid grid-cols-3 gap-1 mb-2">
        <input
          placeholder="Prep"
          className="border p-2 rounded"
          value={formData.prep}
          onChange={(e) => setFormData({ ...formData, prep: e.target.value })}
        />
        <input
          placeholder="Cook"
          className="border p-2 rounded"
          value={formData.cook}
          onChange={(e) => setFormData({ ...formData, cook: e.target.value })}
        />
        <input
          placeholder="Total"
          className="border p-2 rounded"
          value={formData.total}
          onChange={(e) => setFormData({ ...formData, total: e.target.value })}
        />
      </div>
      <textarea
        className="border w-full p-2 rounded mb-2 h-20"
        placeholder="Ingredients (one per line)"
        value={formData.ingredients}
        onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
      />
      <textarea
        className="border w-full p-2 rounded mb-2 h-20"
        placeholder="Directions (one per line)"
        value={formData.directions}
        onChange={(e) => setFormData({ ...formData, directions: e.target.value })}
      />
      <input
        className="border p-2 w-full rounded mb-2"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
      />
      <input type="file" accept="image/*" className="mb-3 w-full" onChange={handleImageChange} />
      <button
        onClick={onSubmit}
        className="w-full bg-[#E9A5F1] p-2 rounded-lg font-bold border"
      >
        {submitText}
      </button>
    </div>
  );
};

// ------------------------
// Recipe Details
// ------------------------
const RecipeDetails = ({
  recipe,
  editing,
  setEditing,
  formData,
  setFormData,
  saveEdit,
  triggerDelete
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState(
    recipe.ingredients.map(() => false)
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image: reader.result });
    reader.readAsDataURL(file);
  };

  const toggleIngredient = (index) => {
    const newChecked = [...checkedIngredients];
    newChecked[index] = !newChecked[index];
    setCheckedIngredients(newChecked);
  };

  return (
    <div className="flex-1 w-full">
      {/* Buttons */}
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        {!editing ? (
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-300 px-4 py-2 rounded-lg border font-semibold"
            >
              Edit
            </button>
            <button
              onClick={triggerDelete}
              className="bg-red-400 px-4 py-2 rounded-lg border font-semibold"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={saveEdit}
              className="bg-green-300 px-4 py-2 rounded-lg border font-semibold"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 px-4 py-2 rounded-lg border font-semibold"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Times */}
      {!editing ? (
        <div className="w-full max-w-4xl mx-auto border py-4 border-black rounded-md mb-3 bg-white shadow-sm flex flex-col sm:flex-row items-center justify-around text-sm font-semibold gap-2">
          <p>Prep: {recipe.prep}</p>
          <p>Cook: {recipe.cook}</p>
          <p>Total: {recipe.total}</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto bg-white border rounded-md p-4 mb-3 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            className="border p-2 rounded"
            value={formData.prep}
            onChange={(e) => setFormData({ ...formData, prep: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            value={formData.cook}
            onChange={(e) => setFormData({ ...formData, cook: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            value={formData.total}
            onChange={(e) => setFormData({ ...formData, total: e.target.value })}
          />
        </div>
      )}

      {/* Image */}
      {recipe.image && (
        <div className="w-full max-w-4xl mx-auto border-2 border-black rounded-xl h-auto p-4 bg-white shadow-md flex justify-center mb-3">
          {!editing ? (
            <img src={recipe.image} className="max-w-full h-auto rounded-xl" />
          ) : (
            <div className="text-center w-full">
              <img src={formData.image} className="max-w-full h-auto rounded-xl mb-2" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
            </div>
          )}
        </div>
      )}

      {/* Ingredients / Directions */}
      <div className="w-full max-w-4xl mx-auto bg-white border rounded-xl p-5 shadow-xl mt-3 flex flex-col gap-6 sm:flex-row sm:gap-10">
        {/* Ingredients */}
        <div className="sm:w-1/2 sm:border-r sm:pr-6">
          <h2 className="text-xl font-bold mb-2">Ingredients</h2>
          {!editing ? (
            <ul className="list-disc ml-5">
              {recipe.ingredients.map((i, idx) => (
                <li key={idx}>
                  <input
                    type="checkbox"
                    checked={checkedIngredients[idx]}
                    onChange={() => toggleIngredient(idx)}
                    className="mr-2"
                  />
                  {i}
                </li>
              ))}
            </ul>
          ) : (
            <textarea
              className="border p-2 w-full h-48 rounded"
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            />
          )}
        </div>

        {/* Directions */}
        <div className="sm:w-1/2 sm:pl-6">
          <h2 className="text-xl font-bold mb-2">Directions</h2>
          {!editing ? (
            <ol className="list-decimal ml-5">
              {recipe.directions.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ol>
          ) : (
            <textarea
              className="border p-2 w-full h-48 rounded"
              value={formData.directions}
              onChange={(e) => setFormData({ ...formData, directions: e.target.value })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ------------------------
// Main Component
// ------------------------
function Process() {
  const defaultBasic = [
    {
      id: "basic1",
      name: "Basic Baked",
      prep: "10 mins",
      cook: "10 mins",
      total: "20 mins",
      ingredients: ["2 1/2 cups flour", "1 cup butter", "1 cup sugar"],
      directions: ["Mix ingredients", "Bake at 350°F for 10 minutes"],
      image: null,
      tags: "dessert,quick"
    }
  ];

  const defaultCake = [
    {
      id: "cake1",
      name: "Cake",
      prep: "15 mins",
      cook: "15 mins",
      total: "30 mins",
      ingredients: ["1 ¾ cups flour", "½ cup cocoa powder", "2 tsp baking powder"],
      directions: ["Mix ingredients", "Bake at 350°F for 15 minutes"],
      image: null,
      tags: "dessert,chocolate"
    }
  ];

  const [activeCategory, setActiveCategory] = useState("basic");
  const [basicRecipes, saveBasic] = useLocalStorage("basicRecipes", defaultBasic);
  const [cakeRecipes, saveCake] = useLocalStorage("cakeRecipes", defaultCake);

  const [selectedRecipe, setSelectedRecipe] = useState(
    activeCategory === "basic" ? basicRecipes[0] : cakeRecipes[0]
  );

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    prep: "",
    cook: "",
    total: "",
    ingredients: "",
    directions: "",
    image: null,
    tags: ""
  });

  const [search, setSearch] = useState("");

  // modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  const getCurrentList = () => (activeCategory === "basic" ? basicRecipes : cakeRecipes);
  const saveCurrentList = (list) => (activeCategory === "basic" ? saveBasic(list) : saveCake(list));

  const resetForm = () =>
    setFormData({ name: "", prep: "", cook: "", total: "", ingredients: "", directions: "", image: null, tags: "" });

  const addRecipe = () => {
    if (!formData.name.trim()) return alert("Name required.");
    const recipe = {
      id: crypto.randomUUID(),
      name: formData.name,
      prep: formData.prep || "—",
      cook: formData.cook || "—",
      total: formData.total || "—",
      ingredients: formData.ingredients.split("\n"),
      directions: formData.directions.split("\n"),
      image: formData.image,
      tags: formData.tags
    };
    const updatedList = [...getCurrentList(), recipe];
    saveCurrentList(updatedList);
    setSelectedRecipe(recipe);
    resetForm();
  };

  const triggerDelete = (id) => {
    setDeleteModal({ open: true, id });
  };

  const confirmDelete = () => {
    const updatedList = getCurrentList().filter((r) => r.id !== deleteModal.id);
    saveCurrentList(updatedList);
    setSelectedRecipe(updatedList[0] || null);
    setDeleteModal({ open: false, id: null });
  };

  const cancelDelete = () => {
    setDeleteModal({ open: false, id: null });
  };

  const saveEdit = () => {
    const updatedRecipe = {
      ...selectedRecipe,
      name: formData.name,
      prep: formData.prep,
      cook: formData.cook,
      total: formData.total,
      ingredients: formData.ingredients.split("\n"),
      directions: formData.directions.split("\n"),
      image: formData.image,
      tags: formData.tags
    };
    const updatedList = getCurrentList().map((r) => (r.id === selectedRecipe.id ? updatedRecipe : r));
    saveCurrentList(updatedList);
    setSelectedRecipe(updatedRecipe);
    setEditing(false);
  };

  return (
    <div className="bg-[#E9A5F1] min-h-screen pt-24 pb-10 px-4 sm:px-6 md:px-10 flex flex-col md:flex-row gap-6">
      {/* CATEGORY BUTTONS */}
      <div className="flex gap-2 justify-center mb-4 md:mb-0">
        <button
          onClick={() => {
            setActiveCategory("basic");
            setSelectedRecipe(basicRecipes[0]);
            setEditing(false);
          }}
          className={`px-4 py-2 rounded-xl shadow ${
            activeCategory === "basic" ? "bg-white font-bold" : "bg-[#f5d2f8]"
          }`}
        >
          Basic Baked
        </button>

        <button
          onClick={() => {
            setActiveCategory("cake");
            setSelectedRecipe(cakeRecipes[0]);
            setEditing(false);
          }}
          className={`px-4 py-2 rounded-xl shadow ${
            activeCategory === "cake" ? "bg-white font-bold" : "bg-[#f5d2f8]"
          }`}
        >
          Cake
        </button>
      </div>

      {/* LEFT LIST */}
      <div className="w-full md:w-64 bg-white border shadow-lg rounded-xl p-4 h-auto md:h-[80vh] overflow-y-auto">
        <h2 className="font-bold text-xl mb-3">
          {activeCategory === "basic" ? "Basic Recipes" : "Cake Recipes"}
        </h2>

        <input
          className="border p-2 w-full rounded mb-3"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <RecipeList
          recipes={getCurrentList()}
          selectedRecipe={selectedRecipe}
          setSelectedRecipe={(r) => {
            setSelectedRecipe(r);
            setEditing(false);
          }}
          search={search}
        />

        <hr className="my-4" />

        <h3 className="font-bold mb-2">Add Recipe</h3>
        <RecipeForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={addRecipe}
          submitText="Add Recipe"
        />
      </div>

      {/* RIGHT SECTION — RECIPE DISPLAY */}
      {selectedRecipe && (
        <div className="flex-1 w-full">
          <RecipeDetails
            recipe={selectedRecipe}
            editing={editing}
            setEditing={setEditing}
            formData={formData}
            setFormData={setFormData}
            saveEdit={saveEdit}
            triggerDelete={() => triggerDelete(selectedRecipe.id)}
          />
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 flex flex-col gap-4 text-center">
            <h2 className="font-bold text-lg">Delete Recipe?</h2>
            <p>Are you sure you want to delete this recipe? This action cannot be undone.</p>
            <div className="flex gap-4 justify-center">
              <button
                className="bg-red-400 px-4 py-2 rounded-lg font-semibold"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg font-semibold"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Process;
