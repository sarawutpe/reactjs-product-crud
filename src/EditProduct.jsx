import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditProduct() {
  const { id } = useParams()
  const [formProduct, setFormProduct] = useState({
    name: '',
    price: '',
    stock: '',
  })
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      // console.log(formProduct)
      // Prevent tab reload.
      e.preventDefault()

      // New form data for submit
      const formData = new FormData()
      formData.append('name', formProduct.name)
      formData.append('price', formProduct.price)
      formData.append('stock', formProduct.stock)

      // Check image before append image
      if (image) {
        formData.append('image', image)
      }

      // Called api
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, formData)
      // If result is ok
      if (result.data.result === 'ok') {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Handle image change and set state
  const handleImageChange = (event) => {
    // console.log(event)

    const file = event?.target?.files[0]
    if (file) {
      // Set file for submit to server
      setImage(file)

      // Set file for preview image when select
      const imageURL = URL.createObjectURL(file)
      setPreviewImage(imageURL)
    }
  }

  // Restore data by id
  const fetchProductById = useCallback(async () => {
    if (!id) return

    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
    if (result.data) {
      // Restore name, price, stock
      setFormProduct({
        name: result.data?.name,
        price: result.data?.price,
        stock: result.data?.stock,
      })

      // Restore image
      const image = result.data?.image
      if (image) {
        setPreviewImage(`${import.meta.env.VITE_API_URL}/uploaded/images/${image}`)
      }
    }
  }, [id])

  useEffect(() => {
    fetchProductById()
  }, [fetchProductById])

  return (
    <>
      <div className="flex justify-center pt-8">
        <div className="container max-w-7xl p-2">
          {/* Title */}
          <h2 className="text-slate-900 text-4xl tracking-tight font-extrabold">Edit Product {id}</h2>
          {/* Content */}
          <div className="my-4">
            <form onSubmit={handleSubmit}>
              {/* Image */}
              <div className="mb-2">
                <div className="mb-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  {previewImage && <img src={previewImage} className="h-[100px] object-contain" />}
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
              {/* Debug: */}
              {/* {JSON.stringify(formProduct)} */}
              {/* Name */}
              <div className="mb-2">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formProduct.name}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setFormProduct({ ...formProduct, name: event.target.value })}
                  />
                </div>
              </div>
              {/* Price */}
              <div className="mb-2">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formProduct.price}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setFormProduct({ ...formProduct, price: event.target.value })}
                  />
                </div>
              </div>
              {/* Stock */}
              <div className="mb-2">
                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={formProduct.stock}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setFormProduct({ ...formProduct, stock: event.target.value })}
                  />
                </div>
              </div>
              {/* Action */}
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit +
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
