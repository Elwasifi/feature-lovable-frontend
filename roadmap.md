# Roadmap

## Done
- [x] Six detail pages (properties, providers, offers, investment opportunities, countries, products): hardened loaders, graceful not-found, SEO meta, fully translated labels, linked from each list page. Verified with real and invalid ids.

## Pending
- [ ] Machine-translate database content (all content tables) into the 9 supported languages, stored so the switcher swaps content text too. Report summary before publishing.

## Blocked
- [ ] Custom email sending domain (notify.egyptora-hub.com) — DNS records pending; after verification, switch auth emails to own domain and re-enable email confirmation.

## Payments (Trip Builder bookings)
- [x] Price-column audit: only providers (price_from/currency USD), properties (price_usd) and investment_opportunities (min/max USD) hold real prices.
- [x] bookings table extended: amount, currency, stripe_session_id, stripe_payment_intent_id, paid_at.
- [x] "Request booking" action on provider detail page; records provider price_from as amount in USD.
- [ ] BLOCKED: Stripe test checkout + webhook — Lovable built-in payments unavailable for seller country EG; needs the user's own Stripe test key (BYO) or a non-EG seller entity.
