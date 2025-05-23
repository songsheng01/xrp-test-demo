import React from "react"

export default function RedeemTokenHeader({ title, grade, tokenId }) {
  return (
    <div>
      {/* Main title */}
      <h1 className="mb-6 text-2xl font-bold text-gray-800">{title}</h1>

      {/* PSA grade subtitle */}
      <h2 className="mt-4 text-xl font-bold text-gray-800">
        PSA Grade: <span className="font-semibold">{grade}</span>
      </h2>

      {/* Token ID line */}
      <p className="mt-2 text-xl font-bold text-orange-500">
        Token ID: {tokenId}
      </p>
    </div>
  )
}