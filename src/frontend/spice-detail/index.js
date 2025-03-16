import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SpiceDetail = () => {

  const { id } = useParams()
  const [spice, setSpice] = useState(null)

  useEffect(async() => {
    const { data} = await axios.get(`/api/v1/spices/${id}`);
    setSpice(data)
  }, [])

  return (
    <div>
      <h2>Spice Detail Page</h2>
      {
        spice && <div>
          <div>Spice Name: {spice.name}</div>
          <div>Spice Color: {spice.color}</div>
          <div>Spice Cost: {spice.price}</div>
          <div>Spice Heat Level: {spice.heat}</div>
        </div>  
      }
    </div>
  )
}

export default SpiceDetail