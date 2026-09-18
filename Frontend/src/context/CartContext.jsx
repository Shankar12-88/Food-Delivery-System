import { useState } from 'react'
import CartContext from './cartContext.js'

function CartProvider({ children }) {
  const [items, setItems] = useState([])

  function addToCart(item) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((currentItem) => currentItem.name === item.name)

      if (existingItem) {
        return currentItems.map((currentItem) => currentItem.name === item.name
          ? { ...currentItem, quantity: currentItem.quantity + 1 }
          : currentItem)
      }

      return [...currentItems, { ...item, quantity: 1 }]
    })
  }

  function updateItem(name, amount) {
    setItems((currentItems) => currentItems
      .map((item) => item.name === name ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0))
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const total = items.reduce((sum, item) => {
    const price = Number.parseFloat(String(item.price).replace('रु ', '').replace(/,/g, ''))
    return sum + price * item.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, updateItem, itemCount, total }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider }