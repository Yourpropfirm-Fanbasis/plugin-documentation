'use client'
import { useState } from 'react'
import { Card } from './Card'

const TABS = [
  { key: 'general',    label: 'General' },
  { key: 'advanced',   label: 'Advanced' },
  { key: 'additional', label: 'Additional' },
  { key: 'fields',     label: 'Fields Control' },
  { key: 'styling',    label: 'Styling Config' },
]

export function SettingsTabs() {
  const [active, setActive] = useState('general')

  return (
    <div className="mt-6">
      {/* Tab bar */}
      <div className="flex gap-1 p-1 rounded-xl mb-4 flex-wrap" style={{ background: 'var(--accent-lt)' }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: active === t.key ? 'var(--bg-card)' : 'transparent',
              color: active === t.key ? 'var(--brand)' : 'var(--text-muted)',
              boxShadow: active === t.key ? 'var(--shadow)' : 'none',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      {active === 'general' && (
        <Card>
          <table>
            <thead><tr><th>Setting</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><strong>Fanbasis API Key</strong></td><td>Your private API key from the Fanbasis dashboard. Validated automatically on save.</td></tr>
              <tr><td><strong>Environment</strong></td><td>Sandbox for testing, Live for real payments.</td></tr>
              <tr><td><strong>Creator ID</strong></td><td>Your Fanbasis account slug (e.g. <code>ypf</code>). Required for embedded checkout.</td></tr>
              <tr><td><strong>Webhook Status</strong></td><td>Shows registration status, signature secret presence, environment, and webhook URL.</td></tr>
            </tbody>
          </table>
        </Card>
      )}
      {active === 'advanced' && (
        <Card>
          <table>
            <thead><tr><th>Setting</th><th>Options</th><th>Description</th></tr></thead>
            <tbody>
              <tr>
                <td><strong>Checkout Method</strong></td>
                <td>Popup Modal<br/>WC Order Pay Page</td>
                <td>How the Fanbasis payment form is displayed to the customer.</td>
              </tr>
              <tr>
                <td><strong>Verify Payment Method</strong></td>
                <td>Webhook<br/>Webhook + Thank You Page</td>
                <td><strong>Webhook:</strong> order completed by webhook only.<br/><strong>Webhook + Thank You Page:</strong> webhook completes the order; cron also runs on the order-received page as a fallback if the webhook is late.</td>
              </tr>
              <tr>
                <td><strong>Thank-you Page Mode</strong></td>
                <td>Immediate<br/>Wait for Payment Confirmation</td>
                <td><strong>Immediate:</strong> customer lands on order-received right away. Order status may still be <em>Pending</em> while the webhook processes in the background.<br/><strong>Wait for Payment Confirmation:</strong> an overlay polls until the order becomes <em>Completed</em>. Use this when GA4/GTM needs the order to be Completed before firing the purchase event.</td>
              </tr>
            </tbody>
          </table>
        </Card>
      )}
      {active === 'additional' && (
        <Card>
          <table>
            <thead><tr><th>Setting</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><strong>Enable Logs</strong></td><td><Pill color="red">Off</Pill></td><td>Write activity logs to WooCommerce → Status → Logs.</td></tr>
              <tr><td><strong>Log Mode</strong></td><td>Simple</td><td>Simple: key events only. Advanced: full API payloads and responses.</td></tr>
              <tr><td><strong>Show Payment Method Column</strong></td><td><Pill color="green">On</Pill></td><td>Adds a Payment Method column to the WooCommerce orders list.</td></tr>
              <tr><td><strong>Show Fanbasis Meta on Order Detail</strong></td><td><Pill color="green">On</Pill></td><td>Displays Fanbasis session ID, transaction ID, and payment status on the order detail page.</td></tr>
            </tbody>
          </table>
        </Card>
      )}
      {active === 'fields' && (
        <Card>
          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)', margin: 0 }}>
              Control how each billing field behaves inside the Fanbasis checkout form. Pre-filling ensures a smooth experience — the customer only needs to enter their card number.
            </p>
          </div>
          <table>
            <thead><tr><th>Field</th><th>Default</th><th>Options</th></tr></thead>
            <tbody>
              {['Email','First Name','Last Name','Phone'].map(f => (
                <tr key={f}>
                  <td><strong>{f}</strong></td>
                  <td><Pill color="blue">Locked</Pill></td>
                  <td rowSpan={f === 'Email' ? 5 : undefined} style={{ verticalAlign: 'middle' }}>
                    {f === 'Email' ? (
                      <>
                        <strong>Locked</strong> — pre-filled, not editable<br/>
                        <strong>Hidden</strong> — hidden, data still sent<br/>
                        <strong>Editable</strong> — shown as editable field
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
              <tr>
                <td><strong>Address (all sub-fields)</strong></td>
                <td><Pill color="blue">Locked</Pill></td>
              </tr>
            </tbody>
          </table>
        </Card>
      )}
      {active === 'styling' && (
        <Card>
          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)', margin: 0 }}>
              Customise the Fanbasis checkout form, popup modal, and processing overlay to match your store branding.
            </p>
          </div>
          <table>
            <thead><tr><th>Section</th><th>Controls</th></tr></thead>
            <tbody>
              <tr>
                <td><strong>Fanbasis Form</strong></td>
                <td>Theme (Light/Dark), Accent Color, Background, Surface, Border, Input, Label, Heading, Secondary & Product Text colors · Show Product Info, Product Layout, Billing Form Placement · Show/hide Coupon Row, Powered By, Section Headings</td>
              </tr>
              <tr>
                <td><strong>Modal</strong></td>
                <td>Backdrop color, Container background, Header background, Header title color, Header subtitle color, Spinner color</td>
              </tr>
              <tr>
                <td><strong>Overlay</strong></td>
                <td>Enable/disable overlay (default: off) · Background, Spinner, Title, and Subtitle colors</td>
              </tr>
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}

function Pill({ color, children }: { color: 'green' | 'red' | 'blue'; children: React.ReactNode }) {
  const colors = {
    green: { bg: '#dcfce7', text: '#15803d' },
    red:   { bg: '#fee2e2', text: '#dc2626' },
    blue:  { bg: '#dbeafe', text: '#1d4ed8' },
  }
  const darkColors = {
    green: { bg: '#14532d', text: '#86efac' },
    red:   { bg: '#450a0a', text: '#fca5a5' },
    blue:  { bg: '#1e3a5f', text: '#93c5fd' },
  }
  const c = colors[color]
  const d = darkColors[color]
  return (
    <>
      <span
        className={`pill-${color} inline-block text-xs font-semibold px-2 py-0.5 rounded-full`}
        style={{ background: c.bg, color: c.text }}
      >
        {children}
      </span>
      <style>{`.dark .pill-${color} { background: ${d.bg} !important; color: ${d.text} !important; }`}</style>
    </>
  )
}
