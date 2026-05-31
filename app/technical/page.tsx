import { PageLayout } from '@/components/PageLayout'
import { Callout } from '@/components/Callout'
import { Card } from '@/components/Card'
import { SectionLabel } from '@/components/SectionLabel'

const TOC = [
  { id: 'requirements',   label: 'Requirements' },
  { id: 'architecture',   label: 'Architecture' },
  { id: 'checkout-methods', label: 'Checkout Methods' },
  { id: 'payment-flow',   label: 'Payment Flow' },
  { id: 'webhook',        label: 'Webhook' },
  { id: 'rest-endpoints', label: 'REST Endpoints' },
  { id: 'settings-ref',   label: 'Settings Reference' },
  { id: 'order-meta',     label: 'Order Meta' },
  { id: 'logging',        label: 'Logging' },
]

export default function TechnicalPage() {
  return (
    <PageLayout toc={TOC}>
      <div className="space-y-14">

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

        {/* Requirements */}
        <section id="requirements">
          <SectionLabel>Setup</SectionLabel>
          <h2>Requirements</h2>
          <Card className="mt-4">
            <table>
              <thead><tr><th>Dependency</th><th>Minimum</th></tr></thead>
              <tbody>
                <tr><td><strong>WordPress</strong></td><td><code>6.8+</code></td></tr>
                <tr><td><strong>WooCommerce</strong></td><td><code>7.0+</code></td></tr>
                <tr><td><strong>PHP</strong></td><td><code>8.0+</code></td></tr>
              </tbody>
            </table>
          </Card>
          <Callout type="info">
            Pure WordPress plugin — no Composer, npm, or build tooling. PHP, JS, and CSS served directly. No automated test suite.
          </Callout>
        </section>

        <Divider />

        {/* Architecture */}
        <section id="architecture">
          <SectionLabel>Code Structure</SectionLabel>
          <h2>Architecture</h2>
          <pre>{`yourpropfirm-fanbasis.php              Bootstrap, constants, activation hooks
includes/
  class-yourpropfirm-fanbasis.php              Core class, hook wiring
  class-yourpropfirm-fanbasis-loader.php       Action/filter registry
  class-yourpropfirm-fanbasis-gateway.php      WC_Payment_Gateway - process_payment()
  class-yourpropfirm-fanbasis-api.php          Fanbasis REST API client
  class-yourpropfirm-fanbasis-webhook.php      REST endpoints + webhook handler
  class-yourpropfirm-fanbasis-helper.php       Logging, SDK config builders
admin/
  class-yourpropfirm-fanbasis-settings.php     WooCommerce settings tab
public/
  js/yourpropfirm-fanbasis-checkout.js         Modal + AJAX intercept
  css/yourpropfirm-fanbasis-public.css         Modal styles`}</pre>
          <p className="text-sm mt-2">
            WooCommerce integration registered at <code>plugins_loaded</code> priority 11 (WC loads at priority 10).
          </p>
        </section>

        <Divider />

        {/* Checkout Methods */}
        <section id="checkout-methods">
          <SectionLabel>Gateway</SectionLabel>
          <h2>Checkout Methods</h2>

          <div className="mt-4 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3>Embed — Popup Modal</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#dbeafe', color: '#1d4ed8' }}>default</span>
              </div>
              <p className="text-sm">Payment form opens as a full-screen overlay modal on the WooCommerce checkout page. No redirect — customer stays on the checkout page.</p>
              <pre>{`Customer clicks "Place Order"
  → WC AJAX checkout
  → process_embed_modal() - create checkout session + embedded session
  → PHP returns { result: 'success', redirect: '#fanbasis-embed-modal', sdk_config }
  → JS intercepts AJAX, opens modal
  → PaymentCheckout.create() initialises SDK inside modal
  → Payment completes → SDK redirects to WC order-received`}</pre>
            </div>

            <div>
              <h3 className="mb-2">Embed — WC Order Pay Page</h3>
              <p className="text-sm">Payment form renders inside the native WC order-pay page (<code>/checkout/order-pay/{'{id}'}/</code>), within your active store theme.</p>
              <pre>{`Customer clicks "Place Order"
  → process_embed_wc_pay_page() - create checkout session + embedded session
  → SDK config saved to order meta
  → Redirect to $order->get_checkout_payment_url(true)
  → woocommerce_receipt_ hook fires
  → render_embed_on_pay_page() - enqueue SDK, output container HTML
  → PaymentCheckout.create() initialises SDK in-page
  → Payment completes → SDK redirects to WC order-received`}</pre>
            </div>
          </div>
        </section>

        <Divider />

        {/* Payment Flow */}
        <section id="payment-flow">
          <SectionLabel>Flow</SectionLabel>
          <h2>Payment Flow</h2>
          <pre>{`1. Gateway::process_payment()
     → API::create_checkout()             POST /checkout-sessions
                                           type: onetime_reusable, expiry: +24h
     → API::create_embedded_checkout()    POST /checkout-sessions/embedded
     → SDK config saved to order meta
     → prepare_order(): pending, stock reduced, cart emptied

2. Customer completes payment inside Fanbasis SDK iframe

3. Fanbasis POSTs webhook to /wp-json/yourpropfirm-fanbasis/v1/webhook
     → HMAC-SHA256 signature validation
     → order lookup: api_metadata.orderId → additional_params.data.order_id → session_id meta
     → amount validation (±0.01 tolerance)
     → payment_complete() + update_status('completed')
     → order note added: fan_product_id, fan_transaction_id, fan_payment_id, fan_payment_method
     → delete_checkout_session() - deactivates payment link

4. SDK redirects customer to WC order-received page`}</pre>
        </section>

        <Divider />

        {/* Webhook */}
        <section id="webhook">
          <SectionLabel>Webhook</SectionLabel>
          <h2>Webhook</h2>

          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            <Card className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-faint)' }}>Endpoint</p>
              <code className="text-xs block break-all">POST /wp-json/yourpropfirm-fanbasis/v1/webhook</code>
            </Card>
            <Card className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-faint)' }}>Registered Events</p>
              <div className="flex flex-wrap gap-1">
                <code className="text-xs">payment.succeeded</code>
                <code className="text-xs">payment.failed</code>
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-faint)' }}>Signature</p>
              <p className="text-sm" style={{ margin: 0 }}>HMAC-SHA256 via <code>x-webhook-signature</code> header, compared using <code>hash_equals()</code></p>
            </Card>
          </div>

          <h3 className="mt-6 mb-2">Order Lookup Priority</h3>
          <ol className="text-sm space-y-1 list-decimal list-inside" style={{ color: 'var(--text-muted)' }}>
            <li><code>api_metadata.data.orderId</code></li>
            <li><code>additional_params.data.order_id</code></li>
            <li><code>checkout_session_id</code> / <code>service_id</code> order meta query</li>
          </ol>

          <Callout type="tip">
            Registration is a single-shot WP-Cron event triggered 5 seconds after settings save. Checks for existing subscription by URL to avoid duplicates. Clears and re-registers when API key or environment changes.
          </Callout>
        </section>

        <Divider />

        {/* REST Endpoints */}
        <section id="rest-endpoints">
          <SectionLabel>API</SectionLabel>
          <h2>REST Endpoints</h2>
          <Card className="mt-4">
            <table>
              <thead><tr><th>Method</th><th>Route</th><th>Description</th></tr></thead>
              <tbody>
                {[
                  ['POST', '/wp-json/yourpropfirm-fanbasis/v1/webhook', 'Fanbasis webhook receiver'],
                  ['GET',  '/wp-json/yourpropfirm-fanbasis/v1/webhook', 'Health check'],
                  ['GET',  '/wp-json/yourpropfirm-fanbasis/v1/return/{id}/{key}', 'Return after redirect payment'],
                  ['GET',  '/wp-json/yourpropfirm-fanbasis/v1/fail/{id}/{key}', 'SDK failure redirect — marks order failed'],
                  ['GET',  '/wp-json/yourpropfirm-fanbasis/v1/embed/{id}/{key}', 'Full-page embed with iframe'],
                  ['GET',  '/wp-json/yourpropfirm-fanbasis/v1/embed-return/{id}/{key}', 'Iframe return — redirects parent window'],
                  ['GET',  '/wp-json/yourpropfirm-fanbasis/v1/order-status/{id}', 'Poll payment status (Wait for Payment mode)'],
                ].map(([m, r, d]) => (
                  <tr key={`${m}-${r}`}>
                    <td>
                      <span
                        className="text-xs font-bold px-1.5 py-0.5 rounded"
                        style={{
                          background: m === 'POST' ? '#fef3c7' : '#dbeafe',
                          color: m === 'POST' ? '#92400e' : '#1e40af',
                        }}
                      >
                        {m}
                      </span>
                    </td>
                    <td><code className="text-xs">{r}</code></td>
                    <td>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        <Divider />

        {/* Settings Reference */}
        <section id="settings-ref">
          <SectionLabel>Configuration</SectionLabel>
          <h2>Settings Reference</h2>
          <p className="text-sm">Location: <strong>WooCommerce → Settings → Yourpropfirm Fanbasis</strong></p>

          <SettingsTable title="General" rows={[
            ['API Key',       'yourpropfirm_fanbasis_api_key',         '—'],
            ['Environment',   'yourpropfirm_fanbasis_mode',            'test'],
            ['Creator ID',    'yourpropfirm_fanbasis_creator_id',      'ypf'],
          ]} />

          <SettingsTable title="Advanced Settings" rows={[
            ['Checkout Method',       'yourpropfirm_fanbasis_checkout_method',        'embed_modal'],
            ['Verify Payment Method', 'yourpropfirm_fanbasis_verify_payment_method',  'webhook'],
          ]} />

          <SettingsTable title="Additional Settings" rows={[
            ['Enable Logs',                     'yourpropfirm_fanbasis_enable_logs',                     'no'],
            ['Log Mode',                        'yourpropfirm_fanbasis_log_mode',                        'simple'],
            ['Show Payment Method Column',      'yourpropfirm_fanbasis_enable_payment_method_column',    'yes'],
            ['Show Fanbasis Meta on Order Detail', 'yourpropfirm_fanbasis_enable_order_meta',            'yes'],
          ]} />

          <SettingsTable title="Fields Control" rows={[
            ['Email',       'yourpropfirm_fanbasis_field_email',       'disable'],
            ['First Name',  'yourpropfirm_fanbasis_field_first_name',  'disable'],
            ['Last Name',   'yourpropfirm_fanbasis_field_last_name',   'disable'],
            ['Phone',       'yourpropfirm_fanbasis_field_phone',       'disable'],
            ['Address',     'yourpropfirm_fanbasis_field_address',     'disable'],
          ]} />
          <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
            Values: <code>disable</code> (locked) · <code>hide</code> (hidden, data still sent) · <code>editable</code>
          </p>

          <SettingsTable title="Styling Config — Fanbasis" rows={[
            ['Theme',                   'yourpropfirm_fanbasis_sdk_theme',                    'light'],
            ['Accent Color',            'yourpropfirm_fanbasis_sdk_accent_color',             '#007BFF'],
            ['Show Coupon Row',         'yourpropfirm_fanbasis_sdk_show_coupon_row',          'no'],
            ['Show Powered By',         'yourpropfirm_fanbasis_sdk_show_powered_by',          'no'],
            ['Show Headings',           'yourpropfirm_fanbasis_sdk_show_headings',            'yes'],
            ['Product Layout',          'yourpropfirm_fanbasis_sdk_product_layout',           'left'],
            ['Billing Form Placement',  'yourpropfirm_fanbasis_sdk_billing_form_placement',   'above'],
          ]} />
          <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
            Color overrides (leave blank for SDK default): <code>background_color</code>, <code>surface_color</code>, <code>border_color</code>, <code>input_background_color</code>, <code>label_color</code>, <code>heading_color</code>, <code>secondary_color</code>, <code>product_text_color</code>.
          </p>

          <SettingsTable title="Styling Config — Overlay" rows={[
            ['Enable Overlay',     'yourpropfirm_fanbasis_enable_overlay',       'no'],
            ['Overlay Background', 'yourpropfirm_fanbasis_overlay_bg_color',     '#ffffff'],
            ['Overlay Spinner',    'yourpropfirm_fanbasis_overlay_spinner_color','#1a1a1a'],
          ]} />
        </section>

        <Divider />

        {/* Order Meta */}
        <section id="order-meta">
          <SectionLabel>Database</SectionLabel>
          <h2>Order Meta Keys</h2>
          <Card className="mt-4">
            <table>
              <thead><tr><th>Meta Key</th><th>Description</th></tr></thead>
              <tbody>
                {[
                  ['_yourpropfirm_fanbasis_checkout_session_id', 'Fanbasis checkout session ID'],
                  ['_yourpropfirm_fanbasis_session_id',          'Product ID from checkout session response'],
                  ['_yourpropfirm_fanbasis_payment_id',          'Transaction ID confirmed by webhook'],
                  ['_yourpropfirm_fanbasis_fan_product_id',      'Fanbasis product ID (encrypted)'],
                  ['_yourpropfirm_fanbasis_fan_transaction_id',  'Fanbasis transaction history ID'],
                  ['_yourpropfirm_fanbasis_fan_payment_method',  'Payment method (e.g. card)'],
                  ['_yourpropfirm_fanbasis_payment_status',      'Event label: succeeded / failed'],
                  ['_yourpropfirm_fanbasis_sdk_secret',          'Embedded session checkout_session_secret'],
                  ['_yourpropfirm_fanbasis_sdk_product_id',      'Product ID used in embedded session'],
                  ['_yourpropfirm_fanbasis_sdk_creator_id',      'Fanbasis creator slug at checkout time'],
                  ['_yourpropfirm_fanbasis_sdk_environment',     'sandbox or production at checkout time'],
                ].map(([k, d]) => (
                  <tr key={k}><td><code className="text-xs">{k}</code></td><td>{d}</td></tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        <Divider />

        {/* Logging */}
        <section id="logging">
          <SectionLabel>Debugging</SectionLabel>
          <h2>Logging</h2>
          <p className="text-sm">Enable at <strong>Additional Settings → Enable Logs</strong>.</p>
          <Card className="mt-4">
            <table>
              <thead><tr><th>Mode</th><th>What is logged</th></tr></thead>
              <tbody>
                <tr><td><strong>Simple</strong></td><td>Key events: begin/end markers, signature valid, webhook received, payment completed, errors</td></tr>
                <tr><td><strong>Advanced</strong></td><td>All of Simple + raw API payloads, full request/response bodies</td></tr>
              </tbody>
            </table>
          </Card>
          <p className="text-sm mt-3">
            <strong>View:</strong> WooCommerce → Status → Logs → source <code>yourpropfirm-fanbasis-debug</code>
          </p>
          <Callout type="warn">
            Log files follow WooCommerce&apos;s <strong>Retention period</strong> (WooCommerce → Status → Logs → Settings). Default: 30 days. Ensure <strong>Level threshold</strong> is set to <strong>None</strong> to capture all log levels.
          </Callout>
        </section>

      </div>
    </PageLayout>
  )
}

function Divider() {
  return <hr style={{ borderColor: 'var(--border)' }} />
}

function SettingsTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>{title}</h3>
      <Card>
        <table>
          <thead><tr><th>Field</th><th>Option Key</th><th>Default</th></tr></thead>
          <tbody>
            {rows.map(([f, k, d]) => (
              <tr key={k}>
                <td><strong>{f}</strong></td>
                <td><code className="text-xs">{k}</code></td>
                <td><code className="text-xs">{d}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
