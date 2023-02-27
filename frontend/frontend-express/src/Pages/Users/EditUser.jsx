import React from 'react'

export default function EditUser() {
  return (
    <div>
      <form>
      <div class="mb-3">
        <label class="form-label">Usuario</label>
        <input type="text" class="form-control" id="userAlias"></input>
      </div>
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input type="text" class="form-control" id="userName"></input>
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" id="userEmail"></input>
        <div id="emailHelp" class="form-text">No compartiremos tus datos con terceros.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Teléfono</label>
        <input type="text" class="form-control" id="phone"></input>
      </div>
      <div class="mb-3">
        <label class="form-label">Teléfono</label>
        <input type="text" class="form-control" id="phone"></input>
      </div>
      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="userPassword"></input>
      </div>
      <div class="mb-3">
        <label class="form-label">Oficina</label>
        <input type="text" class="form-control" id="userOffice"></input>
      </div>
      <div class="mb-3">
        <label class="form-label">Rol</label>
        <input type="text" class="form-control" id="userRol"></input>
      </div>
      <button type="submit" class="btn btn-primary">Editar Usuario</button>
    </form>
    </div>
  )
}
