import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'

export default function EditClient() {

  const {id} = useParams();

  return (
    <div>
      {id}
    </div>
  )
}
