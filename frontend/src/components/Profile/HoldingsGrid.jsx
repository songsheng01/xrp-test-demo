import React, { useState, useMemo } from "react"
import HoldingCard from "./HoldingCard"     // existing card component

/* dropdown primitives from ui kit */
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
} from "../../components/tailwind_utils/dropdown"              // dropdown.jsx

export default function HoldingsGrid({ holdings = [] }) {
  /* ── local UI state ─────────────────────────── */
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("price")
  const [category, setCat] = useState("All")

  /* categories – derive unique names from data */
  const categories = useMemo(() => {
    const c = new Set(holdings.map(h => h.category ?? "Uncategorised"))
    return ["All", ...Array.from(c)]
  }, [holdings])

  /* ── derive filtered / sorted list ──────────── */
  const shown = useMemo(() => {
    let out = holdings

    if (category !== "All") {
      out = out.filter(h => (h.category ?? "Uncategorised") === category)
    }

    out = out.filter(h =>
      h.name.toLowerCase().includes(query.toLowerCase())
    )

    switch (sort) {
      case "price":
        out = [...out].sort((a, b) => b.price - a.price)
        break
      case "volume":
        out = [...out].sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0))
        break
      case "change":
        out = [...out].sort((a, b) => b.change - a.change)
        break
      default:
        break
    }

    return out
  }, [holdings, category, query, sort])

  /* ── UI row with 4 elements ─────────────────── */
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">

        {/* 1. status text */}
        <span className="basis-[30%] shrink-0 ml-2 text-lg text-neutral-800">
          Showing&nbsp;
          <span className="font-semibold">{shown.length}</span>&nbsp;of&nbsp;
          <span className="font-semibold">{holdings.length}</span>&nbsp;
          holdings&nbsp;in:&nbsp;
          <span className="font-semibold">{category}</span>
        </span>

        {/* 2. search bar */}
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search…"
          className="flex-1 px-4 py-2 rounded-lg ring-2 focus:outline-none focus:ring-orange-400 hover:ring-orange-300"
        />

        {/* 3. filter dropdown */}
        <Dropdown>
          <DropdownButton
            className="px-4 py-1.5 rounded-md bg-white text-sm !text-neutral-800 font-semibold ring-2 hover:ring-orange-300"
          >
            Filter by: {category} ▾
          </DropdownButton>
          <DropdownMenu className="mt-2">
            {categories.map(c => (
              <DropdownItem
                key={c}
                onClick={() => setCat(c)}
                className={`${c === category ? "font-semibold !text-orange-600" : ""} hover:bg-orange-100`}
              >
                {c}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* 4. sort dropdown */}
        <Dropdown>
          <DropdownButton
            className="px-4 py-1.5 rounded-md bg-white text-sm !text-neutral-800 font-semibold ring-2 hover:ring-orange-300"
          >
            Sort by: {sort[0].toUpperCase() + sort.slice(1)} ▾
          </DropdownButton>
          <DropdownMenu className="mt-2">
            {[
              { key: "price", label: "Price" },
              { key: "volume", label: "Volume" },
              { key: "change", label: "Change" }
            ].map(o => (
              <DropdownItem
                key={o.key}
                onClick={() => setSort(o.key)}
                className={`${o.key === sort ? "font-semibold !text-orange-600" : ""} hover:bg-orange-100`}
              >
                {o.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* ── card grid ───────────────────────────── */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-5 gap-x-4 gap-y-6">
          {shown.map(card => (
            <HoldingCard key={card.name} token={card} />
          ))}
        </div>
      </div>
    </div>
  )
}
