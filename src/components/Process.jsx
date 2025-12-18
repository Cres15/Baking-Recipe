import { useState, useEffect } from "react";

// --- Custom Hook for LocalStorage ---
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

// --- Subcomponent: Bold Input Form ---
const RecipeForm = ({ formData, setFormData, onSubmit, submitText }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image: reader.result });
    reader.readAsDataURL(file);
  };

  const inputStyle = "w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 font-bold outline-none transition-all focus:border-[#BB8ED0] focus:ring-4 focus:ring-[#BB8ED0]/10 focus:bg-white text-sm";

  return (
    <div className="space-y-4">
      <input className={inputStyle} placeholder="Recipe Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <div className="grid grid-cols-3 gap-2">
        {['prep', 'cook', 'total'].map((f) => (
          <input key={f} className={`${inputStyle} p-2 text-center text-xs`} placeholder={f} value={formData[f]} onChange={(e) => setFormData({ ...formData, [f]: e.target.value })} />
        ))}
      </div>
      <textarea className={`${inputStyle} h-24 resize-none`} placeholder="Ingredients (one per line)" value={formData.ingredients} onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })} />
      <textarea className={`${inputStyle} h-24 resize-none`} placeholder="Directions (one per line)" value={formData.directions} onChange={(e) => setFormData({ ...formData, directions: e.target.value })} />
      <div className="bg-[#FAF5FF] p-4 rounded-2xl border-2 border-dashed border-[#BB8ED0]/30 relative text-center">
        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
        <p className="text-xs font-black text-[#BB8ED0] uppercase tracking-widest">{formData.image ? "✓ Loaded" : "+ Upload"}</p>
      </div>
      <button onClick={onSubmit} className="w-full bg-[#BB8ED0] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all text-sm">
        {submitText}
      </button>
    </div>
  );
};

function Process() {
  const [activeCategory, setActiveCategory] = useState("basic");
  const [basicRecipes, saveBasic] = useLocalStorage("basicRecipes", [{ id: "b1", name: "Classic Cookie", prep: "", cook: "", total: "", ingredients: ["", ""], directions: ["", ""], image: null }]);
  const [cakeRecipes, saveCake] = useLocalStorage("cakeRecipes", [{ id: "c1", name: "chocolate cupcake", prep: "", cook: "", total: "", ingredients: ["", ""], directions: ["", ""], image: null }]);
  
  const [selectedRecipe, setSelectedRecipe] = useState(activeCategory === "basic" ? basicRecipes[0] : cakeRecipes[0]);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [formData, setFormData] = useState({ name: "", prep: "", cook: "", total: "", ingredients: "", directions: "", image: null });

  const getCurrentList = () => (activeCategory === "basic" ? basicRecipes : cakeRecipes);
  const saveCurrentList = (list) => (activeCategory === "basic" ? saveBasic(list) : saveCake(list));

  const startEditing = () => {
    setFormData({
      name: selectedRecipe.name,
      prep: selectedRecipe.prep,
      cook: selectedRecipe.cook,
      total: selectedRecipe.total,
      ingredients: selectedRecipe.ingredients.join("\n"),
      directions: selectedRecipe.directions.join("\n"),
      image: selectedRecipe.image
    });
    setEditing(true);
  };

  const handleSaveEdit = () => {
    const updated = { ...selectedRecipe, ...formData, 
      ingredients: formData.ingredients.split("\n").filter(i => i.trim() !== ""),
      directions: formData.directions.split("\n").filter(d => d.trim() !== "")
    };
    const newList = getCurrentList().map(r => r.id === selectedRecipe.id ? updated : r);
    saveCurrentList(newList);
    setSelectedRecipe(updated);
    setEditing(false);
    setFormData({ name: "", prep: "", cook: "", total: "", ingredients: "", directions: "", image: null });
  };

  return (
    <div className="bg-[#E0A8A8] min-h-screen flex flex-col">
      {/* Main Content Area */}
      <div className="flex-grow pt-4 pb-20 px-4 md:px-12 md:pt-12">
        <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-8 md:gap-12">
          
          {/* SIDEBAR */}
          <aside className="w-full xl:w-[400px] space-y-6 md:space-y-10">
            <div className="flex p-2 bg-black/10 rounded-3xl shadow-inner">
              {['basic', 'cake'].map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setSelectedRecipe(cat === 'basic' ? basicRecipes[0] : cakeRecipes[0]); setEditing(false); }}
                  className={`flex-1 py-3 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all ${activeCategory === cat ? "bg-white text-gray-800 shadow-xl" : "text-white/60"}`}>
                  {cat === 'basic' ? "Basic" : "Cakes"}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl border-t-8 border-[#BB8ED0]">
              <h3 className="text-xl md:text-3xl font-black text-gray-800 mb-4 md:mb-6 italic uppercase">Library</h3>
              <input placeholder="Search..." className="w-full p-4 md:p-5 bg-gray-50 rounded-2xl mb-6 text-sm border-2 border-transparent focus:border-[#BB8ED0] outline-none font-bold" value={search} onChange={(e) => setSearch(e.target.value)} />
              
              <ul className="space-y-2 mb-6 max-h-[200px] md:max-h-none overflow-y-auto">
                {getCurrentList().filter(r => r.name.toLowerCase().includes(search.toLowerCase())).map((r) => (
                  <li key={r.id} onClick={() => { setSelectedRecipe(r); setEditing(false); }}
                    className={`p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer border-2 font-black uppercase text-[10px] md:text-xs tracking-widest transition-all ${selectedRecipe?.id === r.id ? "bg-[#BB8ED0] border-[#BB8ED0] text-white shadow-lg" : "bg-white border-gray-100 text-gray-500"}`}>
                    {r.name}
                  </li>
                ))}
              </ul>

              {!editing && (
                <div className="pt-6 border-t-4 border-gray-50">
                  <h3 className="text-lg md:text-2xl font-black mb-4 italic text-[#BB8ED0]">Add New</h3>
                  <RecipeForm formData={formData} setFormData={setFormData} onSubmit={() => {
                    if (!formData.name.trim()) return;
                    const newR = { id: crypto.randomUUID(), ...formData, 
                      ingredients: formData.ingredients.split("\n").filter(i => i.trim() !== ""),
                      directions: formData.directions.split("\n").filter(d => d.trim() !== "")
                    };
                    const updated = [...getCurrentList(), newR];
                    saveCurrentList(updated);
                    setSelectedRecipe(newR);
                    setFormData({ name: "", prep: "", cook: "", total: "", ingredients: "", directions: "", image: null });
                  }} submitText="Add" />
                </div>
              )}
            </div>
          </aside>

          {/* DETAILS SECTION */}
          {selectedRecipe && (
            <div className="flex-1 w-full space-y-4 md:space-y-6">
              <div className="flex justify-end gap-2 md:gap-3 sticky top-20 z-40 md:static">
                {!editing ? (
                  <>
                    <button onClick={startEditing} className="flex-1 md:flex-none bg-white text-gray-800 px-6 py-2 md:py-3 rounded-full font-black shadow-lg uppercase text-[10px] md:text-xs">Edit</button>
                    <button onClick={() => setDeleteModal({ open: true, id: selectedRecipe.id })} className="flex-1 md:flex-none bg-red-500 text-white px-6 py-2 md:py-3 rounded-full font-black shadow-lg uppercase text-[10px] md:text-xs">Delete</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleSaveEdit} className="flex-1 md:flex-none bg-green-500 text-white px-6 py-2 md:py-3 rounded-full font-black shadow-lg uppercase text-[10px] md:text-xs">Save</button>
                    <button onClick={() => setEditing(false)} className="flex-1 md:flex-none bg-white text-gray-400 px-6 py-2 md:py-3 rounded-full font-black shadow-lg uppercase text-[10px] md:text-xs">Cancel</button>
                  </>
                )}
              </div>

              <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl">
                {editing ? (
                  <div className="space-y-6">
                     <h2 className="text-2xl font-black text-[#BB8ED0] italic">Editing</h2>
                     <RecipeForm formData={formData} setFormData={setFormData} onSubmit={handleSaveEdit} submitText="Update" />
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-6 border-l-[8px] md:border-l-[12px] border-[#BB8ED0] pl-4 md:pl-8 uppercase leading-tight">{selectedRecipe.name}</h2>
                    <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
                      {['prep', 'cook', 'total'].map(t => (
                        <div key={t} className="bg-gray-50 p-2 md:px-8 md:py-4 rounded-xl md:rounded-[2rem] border-2 border-gray-100 text-center">
                          <span className="block text-[8px] md:text-[10px] uppercase text-gray-400 font-black">{t}</span>
                          <span className="text-xs md:text-xl font-black text-gray-800">{selectedRecipe[t]}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-16">
                      <div className="space-y-8">
                        {selectedRecipe.image && <img src={selectedRecipe.image} className="w-full h-48 md:h-96 object-cover rounded-[2rem] shadow-xl border-4 md:border-8 border-white" alt="" />}
                        <section>
                          <h3 className="text-xl md:text-2xl font-black mb-4 italic uppercase text-gray-800">Ingredients</h3>
                          <ul className="space-y-3">
                            {selectedRecipe.ingredients.map((ing, i) => (
                              <li key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border-2 border-gray-100 font-bold text-gray-700 text-sm">
                                <input type="checkbox" className="w-5 h-5 accent-[#BB8ED0]" /> {ing}
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>
                      <section>
                        <h3 className="text-xl md:text-2xl font-black mb-4 italic uppercase text-gray-800">Directions</h3>
                        <ol className="space-y-6">
                          {selectedRecipe.directions.map((step, i) => (
                            <li key={i} className="relative pl-12 font-medium text-gray-600 text-sm md:text-lg">
                              <span className="absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 bg-[#BB8ED0] text-white rounded-xl flex items-center justify-center font-black text-xs md:text-base">{i + 1}</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </section>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-black/10 py-8 px-6 backdrop-blur-sm mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Codizal, Cresmarie A.</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">BSIT-3B</a>
          </div>
          <div className="text-center">
            <p className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Baking Recipe • Handcrafted with love
            </p>
          </div>
        </div>
      </footer>

      {/* Delete Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-[100]">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl border-4 border-red-500">
            <h2 className="text-xl font-black mb-2 text-gray-800 uppercase italic">Delete?</h2>
            <div className="flex flex-col gap-3 mt-6">
              <button onClick={() => {
                const updated = getCurrentList().filter(r => r.id !== deleteModal.id);
                saveCurrentList(updated);
                setSelectedRecipe(updated[0] || null);
                setDeleteModal({ open: false });
              }} className="w-full py-4 rounded-xl bg-red-500 font-black text-white shadow-xl uppercase tracking-widest text-xs">Yes, Delete</button>
              <button onClick={() => setDeleteModal({open: false})} className="w-full py-4 rounded-xl bg-gray-100 font-black text-gray-400 uppercase tracking-widest text-xs">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Process;