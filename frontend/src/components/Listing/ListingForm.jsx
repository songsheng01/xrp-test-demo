import React, { useState, useContext } from "react"
import { WalletContext } from "../../context/WalletContext"

import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from "../../components/tailwind_utils/dropdown"
import { CheckboxGroup, CheckboxField, Checkbox }                 from "../../components/tailwind_utils/checkbox"
import { SwitchGroup, SwitchField, Switch }                       from "../../components/tailwind_utils/switch"
import { RadioGroup, RadioField, Radio }                          from "../../components/tailwind_utils/radio"

/* --- helpers --- */
const categories = ["Game", "Sports", "Pop / Fashion"]
const gradingSvcs = ["PSA", "BGS", "CGC", "Other"]
const sortRadio   = ["List immediately", "Manual listing later"]

export default function ListingForm({ onSubmit }) {
  const { walletAddress } = useContext(WalletContext)
  const [form, setForm] = useState({
    cardsNumber: 1,
    isDuplicate: false,
    duplicateSymbol: "",
    cardName: "",
    category: categories[0],
    series: "",
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
    agree: false
  })

  const handleChange = (key, v) =>
    setForm(prev => ({ ...prev, [key]: v }))

  const handleFile = (key, e) => handleChange(key, e.target.files[0])

  const handleSave = e => {
    e.preventDefault()
    if (!form.agree) return alert("Please agree to the terms.")
    onSubmit(form)
  }

  return (
    <form
      onSubmit={handleSave}
      className="space-y-6 bg-white rounded-2xl shadow-lg p-6 overflow-auto"
    >
      {/* --- GENERAL --- */}
      <Section title="General">
        <Field label="# of card copies listing">
          <input
            type="number"
            min={1}
            value={form.cardsNumber}
            onChange={e => handleChange("cardsNumber", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Has the same card already been listed on X-Card?">
          <input
            type="checkbox"
            checked={form.isDuplicate}
            onChange={e => handleChange("isDuplicate", e.target.checked)}
            className="mr-2"
          />
          {form.isDuplicate && (
            <input
              type="text"
              placeholder="Existing token symbol"
              value={form.duplicateSymbol}
              onChange={e => handleChange("duplicateSymbol", e.target.value)}
              className="input ml-2"
            />
          )}
        </Field>
      </Section>

      {/* --- CARD INFO --- */}
      <Section title="Card Info">
        <Notice text="Card details entered here are subject to verification and X‑Card may revise them to match the card’s true condition." />

        <Field label="Card Name">
          <input
            type="text"
            value={form.cardName}
            onChange={e => handleChange("cardName", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Category">
          <select
            value={form.category}
            onChange={e => handleChange("category", e.target.value)}
            className="input"
          >
            {categories.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Series">
          <input
            type="text"
            value={form.series}
            onChange={e => handleChange("series", e.target.value)}
            className="input"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Card ID">
            <input
              type="text"
              value={form.cardId}
              onChange={e => handleChange("cardId", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Year">
            <input
              type="number"
              value={form.year}
              onChange={e => handleChange("year", e.target.value)}
              className="input"
            />
          </Field>
        </div>
      </Section>

      {/* --- CERTIFICATION --- */}
      <Section title="Certification">
        <Notice text="Pre‑certified cards must be shipped with their original certificate." />

        <Field label="Grading Service">
          <select
            value={form.gradingSvc}
            onChange={e => handleChange("gradingSvc", e.target.value)}
            className="input"
          >
            {gradingSvcs.map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Grade">
            <input
              type="text"
              value={form.grade}
              onChange={e => handleChange("grade", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Certification ID">
            <input
              type="text"
              value={form.certId}
              onChange={e => handleChange("certId", e.target.value)}
              className="input"
            />
          </Field>
        </div>
      </Section>

      {/* --- SUPPLY & PRICING --- */}
      <Section title="Supply & Pricing">
        <Field label="Listing behaviour">
          <label className="mr-4">
            <input
              type="radio"
              checked={form.listImmediately}
              onChange={() => handleChange("listImmediately", true)}
              className="mr-1"
            />
            List immediately at ask price
          </label>
          <label>
            <input
              type="radio"
              checked={!form.listImmediately}
              onChange={() => handleChange("listImmediately", false)}
              className="mr-1"
            />
            Manual listing later
          </label>
        </Field>

        <Field label="Total shares to mint (fixed)">
          <input type="number" value={1000} disabled className="input" />
        </Field>

        <Field label="Ask price per share (XRP)">
          <input
            type="number"
            step="0.0001"
            value={form.pricePer}
            onChange={e => handleChange("pricePer", e.target.value)}
            className="input"
          />
        </Field>
      </Section>

      {/* --- IMAGES --- */}
      <Section title="Images & Docs">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Front image">
            <input type="file" accept="image/*" onChange={e => handleFile("imgFront", e)} />
          </Field>
          <Field label="Back image">
            <input type="file" accept="image/*" onChange={e => handleFile("imgBack", e)} />
          </Field>
        </div>
        <Field label="Additional docs">
          <input type="file" onChange={e => handleFile("docs", e)} />
        </Field>
      </Section>

      {/* --- OWNER & CONTACT --- */}
      <Section title="Owner & Contact">
        <Field label="Wallet">
          <input type="text" value={walletAddress ?? ""} disabled className="input" />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={form.email}
            onChange={e => handleChange("email", e.target.value)}
            className="input"
          />
        </Field>
      </Section>

      {/* --- AGREEMENT --- */}
      <Section title="Agreement">
        <Notice text="Do NOT ship the card yet. After submitting, you will receive a unique ID; include it with your shipment." />

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={e => handleChange("agree", e.target.checked)}
            className="mr-2"
          />
          I confirm the information above is correct and accept the platform terms.
        </label>
      </Section>

      <div>
        <button
          type="submit"
          className="px-8 py-2 rounded-md bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold"
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
const Notice = ({ text }) => (
  <p className="text-xs text-gray-500 italic mb-1">{text}</p>
)

/* Tailwind shortcut */
const input =
  "input px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
