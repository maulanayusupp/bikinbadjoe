import { STORE_PRODUCTS, type StoreProduct } from '~/services/commerce.service'

export interface CartLine {
  id: string
  qty: number
}

const STORAGE_KEY = 'bb_cart'

/**
 * Dummy shopping cart. State is shared app-wide via useState and persisted to
 * localStorage on the client. This is a demo cart (no real checkout/payment);
 * see TODO.md for the real commerce backend.
 */
export function useCart() {
  const lines = useState<CartLine[]>('cart', () => [])
  const isOpen = useState<boolean>('cartOpen', () => false)

  // Hydrate from localStorage once on the client.
  if (import.meta.client && !lines.value.length) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) lines.value = JSON.parse(raw)
    } catch {
      /* ignore malformed storage */
    }
  }

  function persist() {
    if (import.meta.client) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines.value))
  }

  function product(id: string): StoreProduct | undefined {
    return STORE_PRODUCTS.find((p) => p.id === id)
  }

  function add(id: string, qty = 1) {
    const line = lines.value.find((l) => l.id === id)
    if (line) line.qty += qty
    else lines.value.push({ id, qty })
    persist()
    isOpen.value = true
  }

  function setQty(id: string, qty: number) {
    const line = lines.value.find((l) => l.id === id)
    if (!line) return
    line.qty = Math.max(1, qty)
    persist()
  }

  function remove(id: string) {
    lines.value = lines.value.filter((l) => l.id !== id)
    persist()
  }

  function clear() {
    lines.value = []
    persist()
  }

  const count = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))

  const detailed = computed(() =>
    lines.value
      .map((l) => ({ line: l, product: product(l.id) }))
      .filter((x): x is { line: CartLine; product: StoreProduct } => Boolean(x.product)),
  )

  const subtotal = computed(() =>
    detailed.value.reduce((sum, { line, product }) => sum + product.price * line.qty, 0),
  )

  return { lines, isOpen, add, setQty, remove, clear, count, detailed, subtotal, product }
}
