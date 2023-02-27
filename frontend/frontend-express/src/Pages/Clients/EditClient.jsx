import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'

export default function EditClient() {

  const {id} = useParams();

  return (
    <div>
      <div>
      <form>
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input type="text" class="form-control" id="clientName"></input>
        <div id="clientHelp" class="form-text">Primer nombre, segundo nombre, primer apellido, segundo apellido.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">NIT</label>
        <input type="text" class="form-control" id="nit"></input>
      </div>
      <div class="mb-3">
        <label class="form-label">Dirección</label>
        <input type="text" class="form-control" id="address"></input>
      </div>
      <div class="mb-3">
        <label class="form-label">Teléfono</label>
        <input type="text" class="form-control" id="phone"></input>
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="text" class="form-control" id="email"></input>
      </div>
      <button type="submit" class="btn btn-primary">Editar Cliente</button>
    </form>
    </div>
    </div>
  )
}
