import React from "react"
import { FaEyeLowVision } from "react-icons/fa6"

export default function RedeemTable({ listings = [] }) {
  return (
    <div className="overflow-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="relative min-w-full text-sm">
        <span
          className="absolute inset-y-0 right-0 w-3
             bg-gradient-to-b from-violet-400 via-sky-400 to-green-400"
        />
        <thead className="sticky top-0 bg-white">
          <tr className="text-left">
            <Th>Request ID</Th>
            <Th>Token Symbol</Th>
            <Th>Card Description</Th>
            <Th>Cards Redeemed</Th>
            <Th>Tokens Burned</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {listings.map(req => (
            <tr key={req.id} className="border-t">
              <Td>{req.id}</Td>
              <Td>{req.symbol}</Td>
              <Td>{req.card}</Td>
              <Td>{req.number_cards}</Td>
              <Td>{req.number_tokens_burned}</Td>
              <Td>
                <span
                  className={`px-3 py-1.5 rounded-md font-medium ${req.status === "Started"
                    ? "bg-cyan-200 text-cyan-700"
                    : req.status === "Processing Items"
                      ? "bg-purple-200 text-purple-700"
                      : req.status === "Shipped"
                        ? "bg-orange-200 text-orange-700"
                        : req.status === "Delivered"
                          ? "bg-emerald-200 text-emerald-700"
                          : ""
                    }`}
                >
                  {req.status}
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Th = ({ children }) => (
  <th className="px-5 py-4 text-lg font-semibold">{children}</th>
)
const Td = ({ children }) => <td className="px-5 py-4 text-md">{children}</td>
