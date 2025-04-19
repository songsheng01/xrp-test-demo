import React from "react"

export default function TokenImage({ imageUrl, alt }) {
  return (
    <div className="flex h-full w-full items-center justify-center pt-3">
      <img
        src={imageUrl}
        alt={alt}
        className="max-h-full max-w-full object-contain object-center"
      />
    </div>
  )
}