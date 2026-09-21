import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CartContext from './cartContext.js'

function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/orders/cart', { withCredentials: true })
        if (response.data.cart && response.data.cart.items) {
          setItems(response.data.cart.items.map(item => ({
            ...item,
            emoji: '🍽️' // Placeholder emoji
          })))
        }
      } catch (error) {
        console.error('Error fetching cart:', error)
      }
    }
    fetchCart()
  }, [])

  async function addToCart(item) {
    // Optimistic update
    setItems((currentItems) => {
      const existingItem = currentItems.find((currentItem) => currentItem.name === item.name)
      if (existingItem) {
        return currentItems.map((currentItem) => currentItem.name === item.name
          ? { ...currentItem, quantity: currentItem.quantity + 1 }
          : currentItem)
      }
      return [...currentItems, { ...item, quantity: 1 }]
    })

    try {
      await axios.post('/api/orders/cart/add', { foodId: item.foodId }, { withCredentials: true })
    } catch (error) {
      console.error('Error adding to backend cart:', error)
      if (error.response?.status === 401) {
        navigate('/register')
      }
      // Ideally rollback state here
    }
  }

  async function updateItem(name, amount) {
    const itemToUpdate = items.find(i => i.name === name);
    if (!itemToUpdate) return;

    // Optimistic update
    setItems((currentItems) => currentItems
      .map((item) => item.name === name ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0))

    try {
      if (amount > 0) {
        await axios.post('/api/orders/cart/add', { foodId: itemToUpdate.foodId }, { withCredentials: true })
      } else {
        await axios.post('/api/orders/cart/remove', { foodId: itemToUpdate.foodId }, { withCredentials: true })
      }
    } catch (error) {
      console.error('Error updating backend cart:', error)
      if (error.response?.status === 401) {
        navigate('/register')
      }
    }
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const total = items.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? Number.parseFloat(item.price.replace('रु ', '').replace(/,/g, '')) : item.price;
    return sum + price * item.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, updateItem, itemCount, total }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider }