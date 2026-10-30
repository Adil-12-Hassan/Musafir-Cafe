import { create } from 'zustand';

export interface CartItem {
  menuItemId: number;
  name: string;
  size: 'medium' | 'large';
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (menuItemId: number, size: string) => void;
  updateQuantity: (menuItemId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.menuItemId === item.menuItemId && i.size === item.size,
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.menuItemId === item.menuItemId && i.size === item.size
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),

  removeItem: (menuItemId, size) =>
    set((state) => ({
      items: state.items.filter((i) => !(i.menuItemId === menuItemId && i.size === size)),
    })),

  updateQuantity: (menuItemId, size, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => !(i.menuItemId === menuItemId && i.size === size))
          : state.items.map((i) =>
              i.menuItemId === menuItemId && i.size === size ? { ...i, quantity } : i,
            ),
    })),

  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
