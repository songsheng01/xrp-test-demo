import React from "react"

export default function ListingTable({ listings = [], onClaim }) {
  return (
    <div className="overflow-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="relative min-w-full text-sm">
        <span
          className="absolute inset-y-0 right-0 w-3
             bg-gradient-to-b from-purple-400 via-sky-400 to-green-400"
        />
        <thead className="sticky top-0 bg-white">
          <tr className="text-left">
            <Th>Request ID</Th>
            <Th>Card Description</Th>
            <Th>Category</Th>
            <Th>Number Cards</Th>
            <Th>Number Tokens</Th>
            <Th>Status</Th>
            <Th>Symbol</Th>
            <Th>Claim Tokens</Th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {listings.map(req => (
            <tr key={req.id} className="border-t">
              <Td>{req.id}</Td>
              <Td>{req.card}</Td>
              <Td>{req.type}</Td>
              <Td>{req.number_cards}</Td>
              <Td>{req.number_tokens}</Td>
              <Td>
                <span
                  className={`px-3 py-1.5 rounded-md font-medium ${req.status === "Approved"
                      ? "bg-green-200 text-green-700"
                      : req.status === "Listed"
                        ? "bg-teal-200 text-teal-700"
                        : req.status === "Rejected"
                          ? "bg-rose-200 text-rose-700"
                          : "bg-amber-200 text-amber-700"
                    }`}
                >
                  {req.status}
                </span>
              </Td>
              <Td>{req.symbol ?? "-"}</Td>
              <Td>
                {req.status === "Approved" && (
                  <button
                    onClick={() => onClaim(req.id)}
                    className="px-3 py-1.5 rounded-md border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-100 transition duration-100"
                  >
                    Claim
                  </button>
                )}
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
