import React, { useState } from 'react'

export default function AddProduct() {
  const [formProduct, setFormProduct] = useState({
    name: '',
    price: '',
    stock: '',
  })
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const handleSubmit = (e) => {
    console.log(formProduct)
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
  }

  // Handle image change and set state
  const handleImageChange = (event) => {
    // console.log(event)

    const file = event?.target?.files[0]
    if (file) {
      const imageURL = URL.createObjectURL(file)

      // Set file for submit to server
      setImage(event.target.files[0])
      // Set file for preview image when select
      setPreviewImage(imageURL)
    }
  }

  return (
    <>
      <div className="flex justify-center pt-8">
        <div className="container max-w-7xl p-2">
          {/* Title */}
          <h2 className="text-slate-900 text-4xl tracking-tight font-extrabold">Add Product</h2>
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
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setFormProduct({ ...formProduct, stock: event.target.value })}
                  />
                </div>
              </div>
              {/* Action */}
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add +
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
