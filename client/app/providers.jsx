"use client"

import { CartProvider } from './context/CartContext'
import CartDrawer from './Components/CartDrawer'

export function Providers({ children }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  )
}
