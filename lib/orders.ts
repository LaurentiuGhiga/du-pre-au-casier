export type SavedOrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type SavedOrder = {
  id: string;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    delivery: string;
    payment: string;
  };
  items: SavedOrderItem[];
  totalItems: number;
  totalPrice: number;
};

const ORDERS_STORAGE_KEY = "mock-orders";

export function getSavedOrders(): SavedOrder[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as SavedOrder[];
  } catch {
    return [];
  }
}

export function saveOrder(order: SavedOrder) {
  if (typeof window === "undefined") return;

  const existingOrders = getSavedOrders();
  const updatedOrders = [order, ...existingOrders];

  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
}