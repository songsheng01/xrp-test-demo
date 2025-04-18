import React from "react"

export default function TokenImage({ imageUrl, alt }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-auto object-contain"
      />
    </div>
  )
}