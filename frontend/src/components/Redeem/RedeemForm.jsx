import React, { useState } from "react"

/* helper style shortcut (same one ListingForm uses) */
const input =
  "px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"

export default function RedeemForm({
  tokenId,
  tokenSymbol,
  balance = 0,        // user share balance
  onSubmit
}) {
  /* ---------------- state ---------------- */
  const [qty, setQty] = useState(1)
  const [address, setAddress] = useState({
    name: "", street1: "", street2: "", city: "",
    state: "", zip: "", country: ""
  })
  const [email, setEmail] = useState("")
  const [agree, setAgree] = useState(false)

  /* --------------- derived --------------- */
  const redeemable = Math.floor(balance / 1000)
  const tokensBurned = qty * 1000
  const remaining = balance - tokensBurned
  const canSubmit = agree && qty >= 1 && qty <= redeemable

  /* -------------- handlers --------------- */
  const handleAddr = (k, v) => setAddress(p => ({ ...p, [k]: v }))
  const handleSubmit = e => {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit?.({ tokenId, qty, tokensBurned, address, email })
  }

  /* --------------- render ---------------- */
  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-2 bg-white rounded-2xl pl-4 pr-8 pb-6"
    >
      {/* colourful right border accent (same as listing form) */}
      <span className="absolute inset-y-0 right-0 w-3 rounded-lg bg-gradient-to-b from-violet-400 via-sky-400 to-green-400" />

      <h2 className="text-2xl font-bold text-neutral-800">
        Redeem Cards
      </h2>
      <p className="text-lg font-medium !my-6">
        You currently hold&nbsp;
        <span className="text-orange-500">{balance}</span>&nbsp;{tokenSymbol} tokens,&nbsp;
        redeemable for <span className="text-orange-500">{redeemable}</span> card{redeemable !== 1 && "s"}.
      </p>

      {/* 1 · Quantity */}
      <Section colour="violet" title="Quantity">
        <Field label="Select quantity to redeem">
          <input
            type="number"
            min={1}
            max={redeemable}
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
            className={`${input} w-24`}
          />
        </Field>

        <Row label="Tokens to burn">{tokensBurned}</Row>
        <Row label="Remaining balance">{remaining}</Row>
      </Section>

      {/* 2 · Shipping address */}
      <Section colour="indigo" title="Shipping Address">
        {/* two-column grid; span 2 = full-width */}
        <div className="grid grid-cols-2 gap-2">
          {["name", "street", "city", "state", "zip", "country"].map(key => (
            <input
              key={key}
              required
              placeholder={key[0].toUpperCase() + key.slice(1)}
              value={address[key]}
              onChange={e => handleAddr(key, e.target.value)}
              className={`${input} my-2 ${["name", "street"].includes(key) ? "col-span-2" : ""}`}
            />
          ))}
        </div>
      </Section>

      {/* 3 · Contact */}
      <Section colour="sky" title="Contact">
        <Field label="Email Address">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={`${input} w-3/4`}
          />
        </Field>
      </Section>

      {/* 4 · Agreement */}
      <Section colour="emerald" title="Agreement">
      <p className="text-md italic">
        Once you submit the redemption request,&nbsp;
        <span className="text-orange-500">{tokensBurned}&nbsp;{tokenSymbol} </span>tokens will be permanantly burned from your holdings.
      </p>
        <label className="flex items-center text-neutral-800 text-lg">
          <input
            type="checkbox"
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
            className="mr-3 w-5 h-5 accent-orange-600"
          />
          I understand and accept the terms.
        </label>
      </Section>

      {/* submit */}
      <div className="flex justify-center !mt-10">
        <button
          type="submit"
          disabled={!canSubmit}
          className={`
            px-8 py-3 rounded-xl text-lg font-semibold transition duration-200 bg-gradient-to-r from-[#ff7700] to-[#ff03ea] text-white hover:brightness-110
            ${!canSubmit && "cursor-not-allowed"}
          `}
        >
          Submit Redemption Request
        </button>
      </div>
    </form>
  )
}

/* ---------- helper sub-components ---------- */
const Section = ({ title, children, colour }) => {
  const border = {
    violet: "border-violet-300",
    indigo: "border-indigo-300",
    sky: "border-sky-300",
    emerald: "border-emerald-300"
  }[colour]
  return (
    <div className={`rounded-2xl border-2 ${border} bg-neutral-50 px-6 py-5 space-y-4 !my-6`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {children}
    </div>
  )
}


const Field = ({ label, children }) => (
  <div className="flex items-center justify-between gap-4">   {/* row layout */}
    <label className="text-lg text-neutral-800">{label}</label>
    {children}                                               {/* right-aligned input */}
  </div>
)

const Row = ({ label, children }) => (
  <div className="flex justify-between text-md">
    <span className="text-neutral-800">{label}</span>
    <span className="font-medium text-orange-500">{children}</span>
  </div>
)
