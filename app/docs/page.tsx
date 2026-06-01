import { PageLayout } from '@/components/PageLayout'
import { Callout } from '@/components/Callout'
import { Card } from '@/components/Card'
import { SectionLabel } from '@/components/SectionLabel'
import { SettingsTabs } from '@/components/SettingsTabs'
import { LightboxImage } from '@/components/LightboxImage'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const TOC = [
  { id: 'overview',         label: 'Overview' },
  { id: 'integration',      label: 'Integration' },
  { id: 'payment-flow',     label: 'Payment Flow' },
  { id: 'checkout-methods', label: 'Checkout Methods' },
  { id: 'features',         label: 'Features' },
  { id: 'settings',         label: 'Settings' },
  { id: 'limitations',      label: 'Limitations' },
  { id: 'faq',              label: 'FAQ' },
]

export default function DocsPage() {
  return (
    <PageLayout toc={TOC}>
      <div className="space-y-16">

        {/* Internal notice */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm border"
          style={{ background: 'var(--accent-lt)', borderColor: 'var(--border-mid)', color: 'var(--text-muted)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" style={{ color: 'var(--brand-mid)' }}>
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>
            This documentation is for <strong style={{ color: 'var(--text)' }}>internal use only</strong>. Do not distribute or share outside the team.
          </span>
        </div>

        {/* Overview */}
        <section id="overview">
          <SectionLabel>About</SectionLabel>
          <h2>What is Yourpropfirm Fanbasis?</h2>
          <p>
            <strong>Yourpropfirm Fanbasis</strong> is a WordPress plugin that connects your WooCommerce store to the
            Fanbasis platform. It adds Fanbasis as a selectable payment method at checkout, embedding the payment form
            directly inside your website so customers never leave your store to complete a purchase.
          </p>
          <p className="mt-2">
            Once a customer pays, Fanbasis sends a real-time notification (webhook) to your store. The plugin validates
            it and automatically marks the WooCommerce order as completed - no manual action required.
          </p>
          <Callout type="info">
            <strong>Requirements</strong> - WordPress 6.8+, WooCommerce 7.0+, PHP 8.0+. No build tools or external
            dependencies needed.
          </Callout>
        </section>

        <Divider />

        {/* Integration */}
        <section id="integration">
          <SectionLabel>Integration</SectionLabel>
          <h2>Where Does This Plugin Fit?</h2>
          <p>
            This diagram shows how <strong>Yourpropfirm Fanbasis</strong> sits within the broader WooCommerce ecosystem,
            connecting the payment processor to the WooCommerce gateway layer.
          </p>

          <FlowchartCard
            color="#2563eb"
            title="Integration Area"
            subtitle="WooCommerce · Fanbasis · Yourpropfirm Plugin connections"
            imgSrc={`${basePath}/images/assets-01-flowchart-simple-integration-area.png`}
            imgAlt="Integration area diagram"
            className="mt-6"
          />

          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: '🏪', title: 'WooCommerce', desc: 'The store platform. Manages products, checkout, and order lifecycle. Yourpropfirm Fanbasis registers itself here as a payment gateway option.' },
              { icon: '💳', title: 'Fanbasis', desc: 'The payment processor. Handles the secure payment form, card processing, and sends a webhook back to your store when a payment is confirmed or fails.' },
              { icon: '🔗', title: 'Yourpropfirm Plugin', desc: 'Downstream plugin that reads the WooCommerce order status to provision trading accounts or trigger other business actions.' },
            ].map(c => (
              <Card key={c.title} className="p-5">
                <div className="text-2xl mb-2">{c.icon}</div>
                <h3 className="font-semibold mb-1">{c.title}</h3>
                <p className="text-sm">{c.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* Payment Flow */}
        <section id="payment-flow">
          <SectionLabel>Payment Flow</SectionLabel>
          <h2>How a Payment Works</h2>
          <p>From the moment a customer adds a product to their cart to the order confirmation email, here is the complete journey.</p>

          <div className="flex flex-col lg:flex-row gap-8 mt-6">
            <FlowchartCard
              color="#059669"
              title="Payment Process"
              subtitle="Cart to Order Confirmation"
              imgSrc={`${basePath}/images/assets-02-flowchart-woocommerce-fanbasis.png`}
              imgAlt="Payment process flowchart"
              className="lg:w-80 flex-shrink-0"
            />

            <div className="flex-1">
              <div className="space-y-4">
                {[
                  { n: 1, title: 'Add to Cart & Checkout', desc: 'Customer browses the store, adds a product, and proceeds to the WooCommerce checkout page.' },
                  { n: 2, title: 'Select Fanbasis Payment', desc: 'Customer fills in billing details and selects Fanbasis as the payment method, then clicks Place Order.' },
                  { n: 3, title: 'Payment Form Opens', desc: 'The Fanbasis payment form opens directly inside your website (popup modal or in-page). Billing details are pre-filled automatically.' },
                  { n: 4, title: 'Payment is Processed', desc: 'The customer submits the payment. Fanbasis processes it securely and returns a result.' },
                  { n: 5, title: 'Result: Success or Retry', desc: 'Success: Fanbasis notifies your store via webhook. The plugin validates and marks the order as Completed. Failed: error shown, customer can retry without restarting checkout.' },
                  { n: 6, title: 'Order Confirmation', desc: 'Customer is redirected to the WooCommerce order-received page and receives a confirmation email.' },
                ].map(s => (
                  <div key={s.n} className="flex gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 text-white"
                      style={{ background: 'linear-gradient(135deg,#27374D,#526D82)' }}
                    >
                      {s.n}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{s.title}</h3>
                      <p className="text-sm mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Callout type="tip">
                <strong>Webhook confirmation happens automatically.</strong> There is no manual step - your store receives
                and validates the payment notification in the background, then updates the order status instantly.
              </Callout>
            </div>
          </div>
        </section>

        <Divider />

        {/* Checkout Methods */}
        <section id="checkout-methods">
          <SectionLabel>Configuration</SectionLabel>
          <h2>Checkout Methods</h2>
          <p>Choose how the Fanbasis payment form is presented to your customers. Both methods keep the customer on your website throughout the entire payment process.</p>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <Card className="overflow-visible">
              <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: '#dbeafe', color: '#1d4ed8' }}
                  >
                    Default
                  </span>
                </div>
                <h3 className="font-semibold">Embed - Popup Modal</h3>
                <p className="text-sm mt-1">The payment form opens as a full-screen overlay on the WooCommerce checkout page. No redirect, customer stays on the checkout page.</p>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-faint)' }}>Best for</p>
                <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: 'var(--text-muted)' }}>
                  <li>Standard WooCommerce themes</li>
                  <li>Fastest setup, no template files needed</li>
                  <li>Seamless experience without page navigation</li>
                </ul>
              </div>
            </Card>

            <Card>
              <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--accent-lt)', color: 'var(--brand-mid)' }}
                  >
                    Alternative
                  </span>
                </div>
                <h3 className="font-semibold">Embed - WC Order Pay Page</h3>
                <p className="text-sm mt-1">The payment form renders inside the native WooCommerce order-pay page, within your active store theme including header and footer.</p>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-faint)' }}>Best for</p>
                <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: 'var(--text-muted)' }}>
                  <li>Stores wanting full branding during payment</li>
                  <li>Optionally copy <code>form-pay.php</code> template into your theme</li>
                  <li>Works well with custom page builders</li>
                </ul>
              </div>
            </Card>
          </div>
        </section>

        <Divider />

        {/* Features */}
        <section id="features">
          <SectionLabel>Features</SectionLabel>
          <h2>Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {[
              { icon: '🔒', title: 'Secure Embedded Form', desc: 'Fanbasis Hosted JS SDK renders a secure iframe, card data never passes through your server.' },
              { icon: '⚡', title: 'Real-time Webhook Confirmation', desc: 'Payment events arrive via webhook and orders are completed automatically, no polling or manual steps.' },
              { icon: '📋', title: 'Billing Prefill', desc: 'Email, name, phone, and address from the WooCommerce order are pre-populated in the Fanbasis form.' },
              { icon: '🎛️', title: 'Fields Control', desc: 'Each billing field can be set to Locked (read-only), Hidden, or Editable per your store\'s requirements.' },
              { icon: '🎨', title: 'Full Styling Control', desc: 'Customise the SDK form: theme, accent color, background, border, input, label, heading, and more.' },
              { icon: '🔗', title: 'Auto Webhook Registration', desc: 'The plugin registers your webhook with Fanbasis automatically when you save settings, no manual setup.' },
            ].map(f => (
              <Card key={f.title} className="p-5">
                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <h3 className="font-semibold text-sm">{f.title}</h3>
                    <p className="text-sm mt-1">{f.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* Settings */}
        <section id="settings">
          <SectionLabel>Configuration</SectionLabel>
          <h2>Plugin Settings</h2>
          <p>All settings are found at <strong>WooCommerce → Settings → Yourpropfirm Fanbasis</strong>.</p>
          <SettingsTabs />
        </section>

        <Divider />

        {/* Limitations */}
        <section id="limitations">
          <SectionLabel>Limitations</SectionLabel>
          <h2>Known Limitations</h2>
          <p>The following limitations apply to the current version. Understanding these boundaries helps set the right expectations before integration.</p>

          <div className="space-y-4 mt-6">
            {[
              { icon: '🔌', title: 'WooCommerce Standard Integration', desc: 'This plugin follows the WooCommerce payment gateway standard. The integration scope is limited to the payment flow: creating a temporary one-time payment product from the WooCommerce order, generating a Fanbasis checkout session (embedded via SDK iframe), processing payment, and verifying it via webhook. No customization outside this flow is included.' },
              { icon: '📦', title: 'Order Status Behavior', desc: 'After payment is verified by Fanbasis webhook, the order status (Processing or Completed) depends on your WooCommerce configuration and any third-party plugins you use. The plugin itself sets the status to Completed upon successful webhook validation.' },
              { icon: '🔗', title: 'Post-Payment Third-Party Integration', desc: 'Any business logic or provisioning that happens after payment is outside the scope of this plugin. These are handled by other third-party integrations.' },
              { icon: '📊', title: 'Marketing & Event Tracking', desc: 'Event tracking integration (GA4, GTM - add-to-cart, begin checkout, purchase events) follows the WooCommerce standard and is handled by dedicated third-party plugins. For accurate purchase event firing, enable Wait for Payment Confirmation mode.' },
              { icon: '💱', title: 'Currency - USD Only', desc: 'Fanbasis currently only accepts USD as the payment currency. Multi-currency is not yet supported. Your WooCommerce store must be configured with USD as the active currency for payments to work correctly.' },
              { icon: '🌐', title: 'Language - English Only', desc: 'The Fanbasis checkout form and this plugin currently support English only. Multi-language and localization (i18n) are not yet supported. The Fanbasis payment form will still render in English regardless of store locale.' },
              { icon: '↩️', title: 'Refund - Not Supported', desc: 'This plugin does not support automated refunds. The WooCommerce refund button will not trigger a refund on the Fanbasis side. Refunds must be processed manually through the Fanbasis Dashboard.' },
            ].map(l => (
              <Card key={l.title} className="p-5">
                <div className="flex gap-4">
                  <span className="text-xl flex-shrink-0 mt-0.5">{l.icon}</span>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{l.title}</h3>
                    <p className="text-sm">{l.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Callout type="info">
            Limitations marked above reflect the current state of both this plugin and the Fanbasis platform. Some may be
            lifted in future releases as the Fanbasis API evolves.
          </Callout>
        </section>

        <Divider />

        {/* FAQ */}
        <section id="faq">
          <SectionLabel>Support</SectionLabel>
          <h2>Frequently Asked Questions</h2>

          <div className="mt-6">
            <details open>
              <summary>How do I match a WooCommerce order with a Fanbasis transaction?</summary>
              <div className="faq-body">
                <p>Check the order detail page in WooCommerce. Under the <strong>Fanbasis Payment Info</strong> panel, you will find:</p>
                <ul>
                  <li><code>fan_product_id</code> - Fanbasis product/session ID</li>
                  <li><code>fan_transaction_id</code> - Fanbasis transaction history ID</li>
                  <li><code>fan_payment_id</code> - Fanbasis payment ID</li>
                  <li><code>fan_payment_method</code> - payment method used (e.g. <em>card</em>)</li>
                </ul>
                <p>Cross-reference these with the transaction list in your <strong>Fanbasis Dashboard</strong> to verify and reconcile each payment.</p>
              </div>
            </details>
            <details>
              <summary>Do I need to set up the webhook manually?</summary>
              <div className="faq-body">
                <p>No. The plugin registers the Fanbasis webhook automatically when you save settings. You can check the registration status, environment, and webhook URL under <strong>Webhook Status</strong> on the settings page. The webhook is also re-registered automatically if you change your API key or switch environments.</p>
              </div>
            </details>
            <details>
              <summary>Where can I view payment activity logs?</summary>
              <div className="faq-body">
                <p>Go to <strong>WooCommerce → Status → Logs</strong> and filter by source <code>yourpropfirm-fanbasis-debug</code>. Make sure <strong>Enable Logs</strong> is turned on under Additional Settings. Use <strong>Advanced</strong> log mode when debugging - it shows full API payloads and responses.</p>
              </div>
            </details>
            <details>
              <summary>Is the API key validated?</summary>
              <div className="faq-body">
                <p>Yes. Every time you click <strong>Save changes</strong> on the settings page, the plugin sends a test request to the Fanbasis API to verify your key. If the key is invalid, an error message appears and settings are not saved.</p>
              </div>
            </details>
            <details>
              <summary>Can I customise how the payment form looks?</summary>
              <div className="faq-body">
                <p>Yes. The <strong>Styling Config</strong> section in settings gives you full control over the Fanbasis checkout form (theme, accent color, all color overrides, layout toggles), the popup modal (backdrop, container, header, spinner), and the processing overlay (enable/disable, background, spinner, text colors).</p>
              </div>
            </details>
            <details>
              <summary>What order status is set after a successful payment?</summary>
              <div className="faq-body">
                <p>When Fanbasis confirms payment via webhook, the plugin validates the amount, calls WooCommerce&apos;s <code>payment_complete()</code>, and sets the order status to <strong>Completed</strong>. An order note is automatically added with <code>fan_product_id</code>, <code>fan_transaction_id</code>, <code>fan_payment_id</code>, and <code>validation_method: webhook</code>.</p>
              </div>
            </details>
            <details>
              <summary>What happens to the Fanbasis payment link after payment?</summary>
              <div className="faq-body">
                <p>After a successful payment, the plugin automatically calls the Fanbasis API to delete the checkout session. This deactivates the payment link and prevents it from being reused for a duplicate charge.</p>
              </div>
            </details>
          </div>
        </section>

      </div>
    </PageLayout>
  )
}

function Divider() {
  return <hr style={{ borderColor: 'var(--border)' }} />
}

function FlowchartCard({ color, title, subtitle, imgSrc, imgAlt, className = '' }: {
  color: string; title: string; subtitle: string
  imgSrc: string; imgAlt: string; className?: string
}) {
  return (
    <Card className={className}>
      <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs" style={{ margin: 0 }}>{subtitle}</p>
        </div>
      </div>
      <div className="p-4">
        <LightboxImage src={imgSrc} alt={imgAlt} />
      </div>
    </Card>
  )
}
