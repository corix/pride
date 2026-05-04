# PA Pride

Build the 1.0 basic version of a website for PA Pride, a nonprofit organization that hosts an annual "Pride on the Pier" 1-day festival in Port Angeles, Washington.

The organization, PA Pride, is a 501(c)(3) that can accept tax-deductible donations.

## Requirements

- Must be accessible, mobile friendly, and professional-looking
- Use visual branding of 2SLGBTQIAA+ — classic rainbow Pride flag, updated progress flag, flags of other queer identities, pink triangle

### Content requirements

- Basic pamphlet style landing page
- Link to accept donations
- Sign up forms
- Optional pages for About, Resources, etc.

### Non-goals

- Doesn't need a calendar (yet)
- Not a community support portal (yet)

## Current status (May 2026)

The repo is a Vite-built single-page site: **hero** (2026 date, Facebook RSVP), **About**, and **Festival** are live with accessible navigation (skip link, mobile menu), progress-style stripe branding, and basic SEO/OG tags. **Get involved** (volunteer / vendor / newsletter CTAs), **gallery**, and **donate** blocks exist in `index.html` but are commented out; primary nav links to those sections are disabled. Inline festival photos are wired in `src/main.js` (responsive WebP via imagetools) but `**SHOW_PHOTOS` is `false`**, so the public view uses the CSS gradient hero and empty image slots until permissions and the flag are flipped. Footer **contact email** and **photo credits** lines are still commented placeholders.

## TODOs


| Item                                      | Status      | Notes                                                                                                      |
| ----------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| Buy top-level domains                     | Done | prideofpa and prideonthepier .org |
| Ship visible 1.0 pamphlet (core sections) | Done        | About + Festival + hero + footer; no separate About/Resources pages yet                                    |
| Turn on inline/hero photos                | Not started | Set `SHOW_PHOTOS` in `src/main.js` when permissions are cleared                                            |
| Uncomment Get involved / Gallery / Donate | Not started | Re-enable nav + footer “on this page” when content and backends are ready                                  |
| Public contact email in footer            | Not started | Replace commented `mailto` placeholder                                                                     |
| Donation payment processor                | Not started | Wire Stripe, Donorbox, or similar; donate section is commented                                             |
| Volunteer signup form                     | Not started | Was stubbed in commented Get involved section                                                              |
| Vendor application form                   | Not started | Same                                                                                                       |
| Newsletter signup                         | Not started | Same                                                                                                       |


## Appendix

- PA Pride [Facebook Group](https://www.facebook.com/profile.php?id=61574747745779)
- Facebook event for [Pride on the Pier 2026](https://www.facebook.com/events/924895537022838/?rdid=DE8d0ZcGhbIuin4K&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14dos9483NA%2F#)

Reference

- [Pride on the Pier 2024 poster](https://scontent-sea5-1.xx.fbcdn.net/v/t39.30808-6/485806557_965793162433345_4398537487027882785_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7e0d18&_nc_ohc=KIoA_JI2ZxwQ7kNvwE6x_57&_nc_oc=AdpW7xygQvVDqLjocvyoXH6P_SevzfTCFOQAYzwR-INfGW2Nt6Bq4Fbcz-Ffc70zYys&_nc_zt=23&_nc_ht=scontent-sea5-1.xx&_nc_gid=_mlUg9FN3h_ohiHs6XqdLA&_nc_ss=7a3a8&oh=00_Af3jd2AG1VEJcrGh9tDHay-rIKkefBV7jQinj0tpCo7c6g&oe=69E8AF2F)
- [Pride on the Pier 2025 event description](https://happeningnext.com/event/2025-port-angeles-pride-on-the-pier-eid3a0cdfmn78)
- Jesse Major photos of [Pride on the Pier 2022](https://www.jessemajorphoto.com/Port-Angeles-Pride-2022)
- Photos from Kasia [https://www.facebook.com/media/set/?set=a.10104248213468171&type=3](https://www.facebook.com/media/set/?set=a.10104248213468171&type=3)

Comparisons/inspiration

WA state local
Kitsap Pride [https://kitsappride.org/](https://kitsappride.org/)
Olympia (Capitol City) Pride [https://www.capitalcitypride.net/](https://www.capitalcitypride.net/)
Bellingham Pride [https://prideinbellingham.org/](https://prideinbellingham.org/)
Spokane Pride [https://www.spokanepride.org/](https://www.spokanepride.org/)
Yakima Pride [https://www.yakimapride.org/](https://www.yakimapride.org/)
PT Pride [https://www.theproductionalliance.org/ptpride](https://www.theproductionalliance.org/ptpride)
Anacortes Pride [https://www.anacortespride.org/](https://www.anacortespride.org/)

PNW regional
Eugene Pride [https://www.eugenepride.org/](https://www.eugenepride.org/)
Missoula Pride [https://www.missoulapride.com/](https://www.missoulapride.com/)
Newport OR Pride [https://www.newportoregonpride.com/](https://www.newportoregonpride.com/)
Southern Oregon Pride [https://www.sopride.org/](https://www.sopride.org/)

NPW major metros
Seattle Pride [https://seattlepride.org/](https://seattlepride.org/)
Portland Pride [https://portlandpride.org/](https://portlandpride.org/)
Victoria Pride [https://victoriapridesociety.org/](https://victoriapridesociety.org/)

### Other

Ashland KY Pride [https://www.ashlandpride.com/](https://www.ashlandpride.com/)
Sonoma County Pride [https://www.sonomacountypride.org/](https://www.sonomacountypride.org/)
Queer Humboldt [https://www.queerhumboldt.org/](https://www.queerhumboldt.org/)
Russian River Pride [https://www.russianriverpride.org/](https://www.russianriverpride.org/)
Central PA Pride [https://centralpapride.org/](https://centralpapride.org/)