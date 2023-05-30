import React from 'react'
import { useParams } from 'react-router-dom'

export default function EditProduct() {
  // Get data from router
  const { id } = useParams()
  return <div>Edit {id}</div>
}
