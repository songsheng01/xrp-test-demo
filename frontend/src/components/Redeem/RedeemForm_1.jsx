import React, { useState, useContext } from "react"
import { WalletContext } from "../../context/WalletContext"

import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from "../../components/tailwind_utils/dropdown"

/* --- helpers --- */
const categories = ["Game", "Sports", "Pop / Fashion"]
const gradingSvcs = ["PSA", "BGS", "CGC", "Other"]
const sortRadio = ["List immediately", "Manual listing later"]

export default function ListingForm({ onSubmit }) {
  const { walletAddress } = useContext(WalletContext)
  const [form, setForm] = useState({
    cardsNumber: 1,
    isDuplicate: false,
    duplicateSymbol: "",
    cardName: "",
    category: categories[0],
    cardId: "",
    year: "",
    gradingSvc: gradingSvcs[0],
    grade: "",
    certId: "",
    listImmediately: true,
    shares: 1000,
    pricePer: "",
    imgFront: null,
    imgBack: null,
    docs: null,
    email: "",
    message: "",
    agree1: false,
    agree2: false
  })

  const handleChange = (key, v) =>
    setForm(prev => ({ ...prev, [key]: v }))

  const handleFile = (key, e) => handleChange(key, e.target.files[0])

  const handleSave = e => {
    e.preventDefault()
    if (!form.agree1 || !form.agree2) return alert("Please agree to the terms.")
    onSubmit(form)
  }

  return (
    <form
      onSubmit={handleSave}
      className="relative space-y-8 bg-white rounded-2xl px-8 pb-6 overflow-auto">

      <span
        className="absolute inset-y-0 right-0 w-3
             bg-gradient-to-b from-violet-400 via-sky-400 to-green-400"
      />

      {/* --- HEADER --- */}
      <h2 className="text-lg font-semibold text-neutral-800 mt-2">To submit a new listing, complete the following form as accurately as possible.</h2>

      {/* --- 1. GENERAL --- */}
      <div className="rounded-2xl border-2 border-violet-300 bg-neutral-50 p-6 space-y-6">
        <Section title={<span className="text-xl font-semibold">1. General Information</span>}>
          <Field label={<span className="text-neutral-800 text-lg">How many identical card copies are you listing?</span>}>
            <input
              type="number"
              min={1}
              value={form.cardsNumber}
              onChange={e => handleChange("cardsNumber", e.target.value)}
              className="w-1/5 my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300 focus:outline-none hover:ring-orange-300 focus:ring-orange-400"
            />
          </Field>

          <Field label={<span className="text-neutral-800 text-lg">Has the same card already been listed on X-Card?</span>}>
            <input
              type="checkbox"
              checked={form.isDuplicate}
              onChange={e => handleChange("isDuplicate", e.target.checked)}
              className="my-2 w-5 h-5 accent-orange-600"
            />
            {form.isDuplicate && (
              <input
                type="text"
                placeholder="Existing token symbol"
                value={form.duplicateSymbol}
                onChange={e => handleChange("duplicateSymbol", e.target.value)}
                className="w-1/5 my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300 focus:outline-none hover:ring-orange-300 focus:ring-orange-400"
              />
            )}
          </Field>
        </Section>
      </div>

      {/* --- 2. CARD INFO --- */}
      <div className="rounded-2xl border-2 border-indigo-300 bg-neutral-50 p-6 space-y-6">
        <Section title={<span className="text-xl font-semibold">2. Card Details</span>}>
          <Field label={<span className="text-neutral-800 text-md italic">Card details entered here are subject to verification and X‑Card may revise them to match the card’s true condition.</span>}></Field>
          <Field label={<span className="text-neutral-800 text-lg">Card Name</span>}>
            <input
              type="text"
              value={form.cardName}
              onChange={e => handleChange("cardName", e.target.value)}
              className="w-1/2 my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300 focus:outline-none hover:ring-orange-300 focus:ring-orange-400"
            />
          </Field>

          <Field label={<span className="text-neutral-800 text-lg">Card Category</span>}>
            <Dropdown>
              <DropdownButton
                className="w-1/5 my-2 px-4 py-1.5 rounded-md bg-white text-md !text-neutral-800 font-semibold ring-2 hover:ring-orange-300"
              >
                {form.category} ▾
              </DropdownButton>
              <DropdownMenu className="mt-2">
                {categories.map(c => (
                  <DropdownItem
                    key={c}
                    onClick={() => handleChange("category", c)}
                    className={`${c === form.category ? "font-semibold !text-orange-600" : ""} hover:bg-orange-100`}
                  >
                    {c}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Field>

          <Field label={<span className="text-neutral-800 text-lg">Card ID</span>}>
            <input
              type="text"
              value={form.cardId}
              onChange={e => handleChange("cardId", e.target.value)}
              className="w-1/2 my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300 focus:outline-none hover:ring-orange-300 focus:ring-orange-400"
            />
          </Field>

          <Field label={<span className="text-neutral-800 text-lg">Year Issued</span>}>
            <input
              type="number"
              min={1900}
              max={2025}
              value={form.year}
              onChange={e => handleChange("year", e.target.value)}
              className="w-1/5 my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300 focus:outline-none hover:ring-orange-300 focus:ring-orange-400"
            />
          </Field>
        </Section>
      </div>

      {/* --- 3. CERTIFICATION --- */}
      <div className="rounded-2xl border-2 border-blue-300 bg-neutral-50 p-6 space-y-6">
        <Section title={<span className="text-xl font-semibold">3. Authentication Information</span>}>
          <Field label={<span className="text-neutral-800 text-md italic">Pre‑certified cards must be shipped with their original certificate.</span>}></Field>

          <Field label={<span className="text-neutral-800 text-lg">Authentication and Grading Service</span>}>
            <Dropdown>
              <DropdownButton
                className="w-1/5 my-2 px-4 py-1.5 rounded-md bg-white text-md !text-neutral-800 font-semibold ring-2 hover:ring-orange-300"
              >
                {form.gradingSvc} ▾
              </DropdownButton>
              <DropdownMenu className="mt-2">
                {gradingSvcs.map(c => (
                  <DropdownItem
                    key={c}
                    onClick={() => handleChange("gradingSvc", c)}
                    className={`${c === form.gradingSvc ? "font-semibold !text-orange-600" : ""} hover:bg-orange-100`}
                  >
                    {c}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Field>

          <Field label={<span className="text-neutral-800 text-lg">Grade</span>}>
            <input
              type="number"
              min={1}
              max={10}
              value={form.grade}
              onChange={e => handleChange("grade", e.target.value)}
              className="w-1/5 my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300 focus:outline-none hover:ring-orange-300 focus:ring-orange-400"
            />
          </Field>

          <Field label={<span className="text-neutral-800 text-lg">Certification ID</span>}>
            <input
              type="text"
              value={form.certId}
              onChange={e => handleChange("certId", e.target.value)}
              className="w-1/5 my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300 focus:outline-none hover:ring-orange-300 focus:ring-orange-400"
            />
          </Field>
        </Section>
      </div>

      {/* --- 4. SUPPLY AND PRICING --- */}
      <div className="rounded-2xl border-2 border-sky-300 bg-neutral-50 p-6 space-y-6">
        <Section title={<span className="text-xl font-semibold">4. Supply and Pricing</span>}>
          <Field label={<span className="text-neutral-800 text-md italic">You may choose to list your tokens on our exchange once they are minted, or have them send to your wallet first and manually list later.</span>}></Field>

          <Field label={<span className="text-neutral-800 text-lg">Listing Options</span>}>
            <label className="ml-2 my-2 flex items-center text-lg">
              <input
                type="radio"
                checked={form.listImmediately}
                onChange={() => handleChange("listImmediately", true)}
                className="mr-3 w-5 h-5 accent-orange-600" />
              List immediately at ask price
            </label>
            <label className="ml-2 my-2 flex items-center text-lg">
              <input
                type="radio"
                checked={!form.listImmediately}
                onChange={() => handleChange("listImmediately", false)}
                className="mr-3 w-5 h-5 accent-orange-600"
              />
              Manual listing later
            </label>
          </Field>

          <Field label={<span className="text-neutral-800 text-lg">Tokens Minted Per Card Copy</span>}>
            <input
              type="number"
              value={1000}
              disabled
              className="w-1/5 my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300"
            />
          </Field>

          <Field label={<span className="text-neutral-800 text-lg">Ask Price Per Token (XRP)</span>}>
            <input
              type="number"
              min={0}
              step="0.01"
              value={form.pricePer}
              onChange={e => handleChange("pricePer", e.target.value)}
              className="w-1/5 my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300 focus:outline-none hover:ring-orange-300 focus:ring-orange-400"
            />
          </Field>
        </Section>
      </div>

      {/* --- 5. IMAGE AND DOCUMENTS --- */}
      <div className="rounded-2xl border-2 border-cyan-300 bg-neutral-50 p-6 space-y-6">
        <Section title={<span className="text-xl font-semibold">5. Images and Documents</span>}>
          <Field label={<span className="text-neutral-800 text-md italic">Upload high-res front and back photos of your cards and supporting documents as necessary.</span>}></Field>

          <Field label={<span className="text-neutral-800 text-lg">Front Photo</span>}>
            <input type="file" accept="image/*" onChange={e => handleFile("imgFront", e)} className="w-1/2 my-2 text-base" />
          </Field>
          <Field label={<span className="text-neutral-800 text-lg">Back Photo</span>}>
            <input type="file" accept="image/*" onChange={e => handleFile("imgBack", e)} className="w-1/2 my-2 text-base" />
          </Field>
          <Field label={<span className="text-neutral-800 text-lg">Additional Documents</span>}>
            <input type="file" onChange={e => handleFile("docs", e)} className="w-1/2 my-2 text-base" />
          </Field>
        </Section>
      </div>

      {/* --- 6. OWNER AND CONTACT --- */}
      <div className="rounded-2xl border-2 border-teal-300 bg-neutral-50 p-6 space-y-6">
        <Section title={<span className="text-xl font-semibold">6. Contact Information</span>}>
          <Field label={<span className="text-neutral-800 text-md italic">Please leave your email so that we can contact you upon need of further communication.</span>}></Field>

          <Field label={<span className="text-neutral-800 text-lg">Sender Wallet Address</span>}>
            <input
              type="text"
              value={walletAddress ?? ""}
              disabled
              className="w-1/2 my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300"
            />
          </Field>

          <Field label={<span className="text-neutral-800 text-lg">Sender Email Address</span>}>
            <input
              type="email"
              value={form.email}
              onChange={e => handleChange("email", e.target.value)}
              className="w-1/2 my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300 focus:outline-none hover:ring-orange-300 focus:ring-orange-400"
            />
          </Field>
        </Section>
      </div>

      {/* --- 7. ADDITIONAL INFORMATION --- */}
      <div className="rounded-2xl border-2 border-emerald-300 bg-neutral-50 p-6 space-y-6">
        <Section title={<span className="text-xl font-semibold">7. Additional Information</span>}>
          <Field label={<span className="text-neutral-800 text-lg">Provide any additional information and comments not covered by previous sections here.</span>}>
            <textarea
              rows={4}
              value={form.message}
              onChange={e => handleChange("message", e.target.value)}
              className="w-full my-2 px-4 py-2 text-base rounded-xl ring-2 ring-neutral-300 focus:outline-none hover:ring-orange-300 focus:ring-orange-400"
            />
          </Field>
        </Section>
      </div>

      {/* --- 8. AGREEMENT --- */}
      <div className="rounded-2xl border-2 border-green-300 bg-neutral-50 p-6 space-y-6">
        <Section title={<span className="text-xl font-semibold">8. Agreement</span>}>

          <label className="flex items-center my-3 text-neutral-800 text-lg">
            <input
              type="checkbox"
              checked={form.agree1}
              onChange={e => handleChange("agree1", e.target.checked)}
              className="mr-3 w-5 h-5 accent-orange-600"
            />
            Do not ship the card yet. After submitting, you will receive a unique request ID to be included with your shipment.
          </label>


          <label className="flex items-center text-neutral-800 text-lg">
            <input
              type="checkbox"
              checked={form.agree2}
              onChange={e => handleChange("agree2", e.target.checked)}
              className="mr-3 w-5 h-5 accent-orange-600"
            />
            I confirm the information above is correct and accept the platform terms.
          </label>
        </Section>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#ff7700] to-[#ff03ea] text-white text-lg font-semibold hover:brightness-110 transition duration-200"
        >
          Submit Listing Request
        </button>
      </div>
    </form>
  )
}

/* ------------- small helpers ---------------- */
const Section = ({ title, children }) => (
  <section>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <div className="space-y-4">{children}</div>
  </section>
)
const Field = ({ label, children }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">{label}</label>
    {children}
  </div>
)

/* Tailwind shortcut */
const input =
  "input px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"