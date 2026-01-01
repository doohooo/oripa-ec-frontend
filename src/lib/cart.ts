export type CartItem = { id: string; qty: number }

const KEY = "oripa_cart_v1"

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]")
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

export function addToCart(id: string, qty = 1) {
  const items = loadCart()
  const found = items.find(x => x.id === id)
  if (found) found.qty += qty
  else items.push({ id, qty })
  saveCart(items)
}

export function removeFromCart(id: string) {
  saveCart(loadCart().filter(x => x.id !== id))
}

export function updateQty(id: string, qty: number) {
  const items = loadCart().map(x => x.id === id ? { ...x, qty: Math.max(1, Math.min(99, qty)) } : x)
  saveCart(items)
}

export function clearCart() {
  localStorage.removeItem(KEY)
}
