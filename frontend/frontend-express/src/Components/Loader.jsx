import React from 'react'

export default function Loader({size}) {
  return (
    <div className='loaderContainer'>
      <span class={`loader ${size == "sm" ? "sm" : size == "lg" ? "lg" : ""}`}></span>
    </div>
  )
}
