import React from "react"

const demoOrders = [
  { token: "BULBASAUR", side: "Buy",  amount: 25, value: 46.25, status: "Filled" },
  { token: "BULBASAUR", side: "Sell", amount: 10, value: 18.20, status: "Open" }
]

export default function OrderHistory({ className = "" }) {
  return (
    <div
      className={`flex-1 overflow-y-auto bg-gray-50 rounded-xl p-4 ${className}`}
    >
      <h3 className="text-lg font-bold mb-2">Order History</h3>
      <table className="w-full text-md">
        <thead>
          <tr className="text-left border-b">
            <Th>Token</Th>
            <Th>Type</Th>
            <Th>Amount</Th>
            <Th>Value XRP</Th>
            <Th>Status</Th>
          </tr>
        </thead>

        <tbody>
          {demoOrders.map((o, i) => (
            <tr key={i} className="border-b last:border-none">
              <Td>{o.token}</Td>
              <Td className={o.side === "Buy" ? "text-[#00a300]" : "text-red-500"}>
                {o.side}
              </Td>
              <Td>{o.amount}</Td>
              <Td>{o.value.toFixed(2)}</Td>
              <Td>
                <span
                  className={`px-2 py-0.5 rounded-md text-md
                    ${o.status === "Filled"
                      ? "bg-orange-100 text-[#ff7700]"
                      : "bg-pink-100 text-pink-500"}`}
                >
                  {o.status}
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* internal helpers */
const Th = ({ children }) => <th className="py-1 pr-4 font-semibold">{children}</th>
const Td = ({ children, className = "" }) => (
  <td className={`py-2 pr-4 align-top ${className}`}>{children}</td>
)
