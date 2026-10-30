import { useEffect, useState } from 'react';
import api from '../../api/axios';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  priceM: number;
  priceL: number;
  ingredients: string[];
  available: boolean;
}

const EMPTY: Omit<MenuItem, 'id'> = {
  name: '', description: '', category: 'coffee',
  priceM: 0, priceL: 0, ingredients: [], available: true,
};

export default function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<MenuItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [ingredientInput, setIngredientInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const load = async () => {
    try {
      const { data } = await api.get('/menu');
      setItems(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ ...EMPTY });
    setIngredientInput('');
  };

  const openEdit = (item: MenuItem) => {
    setEditing({ ...item });
    setIngredientInput('');
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await api.patch(`/menu/${editing.id}`, editing);
      } else {
        await api.post('/menu', editing);
      }
      await load();
      setEditing(null);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/menu/${id}`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {}
    setDeleteConfirm(null);
  };

  const addIngredient = () => {
    const val = ingredientInput.trim();
    if (!val || !editing) return;
    setEditing({ ...editing, ingredients: [...(editing.ingredients || []), val] });
    setIngredientInput('');
  };

  const removeIngredient = (ing: string) => {
    if (!editing) return;
    setEditing({ ...editing, ingredients: (editing.ingredients || []).filter((i) => i !== ing) });
  };

  return (
    <div className="p-4 text-white sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold">Menu Manager</h1>
          <p className="text-white/40 text-sm mt-1">Manage your drinks</p>
        </div>
        <button
          onClick={openNew}
          className="bg-white text-brand-dark px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          + Add Drink
        </button>
      </div>

      {loading ? (
        <div className="text-white/30 text-sm text-center py-20">Loading...</div>
      ) : (
        <div className="border border-white/8 divide-y divide-white/5">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-1.5 h-8 rounded-full ${item.available ? 'bg-green-400' : 'bg-white/15'}`} />
                <div className="min-w-0">
                  <p className="font-medium text-white text-sm">{item.name}</p>
                  <p className="text-xs text-white/40 capitalize mt-0.5">{item.category} · Rs {item.priceM} / {item.priceL}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => api.patch(`/menu/${item.id}`, { available: !item.available }).then(load)}
                  className={`text-xs px-3 py-1.5 border uppercase tracking-widest transition-colors ${
                    item.available
                      ? 'border-green-400/30 text-green-400 hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/30'
                      : 'border-white/15 text-white/30 hover:bg-green-400/10 hover:text-green-400 hover:border-green-400/30'
                  }`}
                >
                  {item.available ? 'Available' : 'Hidden'}
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="text-xs px-3 py-1.5 border border-white/10 text-white/40 hover:text-white hover:border-white/30 uppercase tracking-widest transition-colors"
                >
                  Edit
                </button>
                {deleteConfirm === item.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 uppercase tracking-widest"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="text-xs px-3 py-1.5 border border-white/10 text-white/30 uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    className="text-xs px-3 py-1.5 border border-white/10 text-white/20 hover:text-red-400 hover:border-red-400/30 uppercase tracking-widest transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
            style={{ background: '#1a1814', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white">
                {editing.id ? 'Edit Drink' : 'Add New Drink'}
              </h2>
              <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white text-xl">×</button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">Name</label>
                <input
                  value={editing.name || ''}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">Description</label>
                <textarea
                  value={editing.description || ''}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">Category</label>
                  <select
                    value={editing.category || 'coffee'}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none"
                  >
                    <option value="coffee">Coffee</option>
                    <option value="specialty">Specialty</option>
                    <option value="cold">Cold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">Price (M)</label>
                  <input
                    type="number"
                    value={editing.priceM || ''}
                    onChange={(e) => setEditing({ ...editing, priceM: +e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">Price (L)</label>
                  <input
                    type="number"
                    value={editing.priceL || ''}
                    onChange={(e) => setEditing({ ...editing, priceL: +e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">Ingredients</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(editing.ingredients || []).map((ing) => (
                    <span key={ing} className="flex items-center gap-1 text-xs bg-white/8 border border-white/10 px-2 py-1 text-white/70">
                      {ing}
                      <button onClick={() => removeIngredient(ing)} className="text-white/30 hover:text-red-400 ml-1">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
                    placeholder="Add ingredient…"
                    className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-white text-sm focus:outline-none placeholder:text-white/20"
                  />
                  <button
                    onClick={addIngredient}
                    className="px-4 py-2 border border-white/10 text-white/40 hover:text-white text-sm transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditing({ ...editing, available: !editing.available })}
                  className={`flex items-center gap-2 text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                    editing.available
                      ? 'border-green-400/30 text-green-400 bg-green-400/5'
                      : 'border-white/10 text-white/30'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${editing.available ? 'bg-green-400' : 'bg-white/20'}`} />
                  {editing.available ? 'Available' : 'Hidden'}
                </button>
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-white/5">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 border border-white/10 py-2.5 text-sm text-white/40 hover:text-white uppercase tracking-widest transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editing.name}
                className="flex-1 bg-white text-brand-dark py-2.5 text-sm font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                {saving ? 'Saving...' : editing.id ? 'Save Changes' : 'Create Drink'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
