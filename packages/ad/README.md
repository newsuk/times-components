# Ad

Ads use GPT
([Google Publisher Tag](https://developers.google.com/doubleclick-gpt/)) to
select and serve targeted ads. GPT is an ad tagging
[library](https://developers.google.com/doubleclick-gpt/reference) for DFP
(Doubleclick For Publishers) that can dynamically build ad requests. GPT takes
key details (targeting parameters) such as ad unit name, ad size, and custom
targeting, builds the request, and displays the ad on web pages.

When an ad is still loading or the app is offline, the ad component will show a
placeholder image.

## DFP setup

DFP is used by the commercial team to set up the campaigns. They use this to
configure:

- Ad images of various sizes
- Type of ad (display, sponsored, etc)
- Date range of campaign
- Target number of impressions
- Loading pattern (more impression up front or even spread over time)
- Creatives per page (i.e. whether to repeat ads on page)
- Rotation weighting rules (e.g. optimise to place best performing ad more
  often)
- Frequency capping
- Targeting

## Targeting

Contact the internal commercial team for a list of targeting keys and their
relative descriptions.

### Page config

These are the parameters which are generic to the page such as the user cookie,
page title etc. To list all current targeting keys in the console:

```
googletag.pubads().getTargetingKeys();
```

To see the value for a specific key:

```
googletag.pubads().getTargeting('example_key');
```

### Slot config

These are the params which are specific to each slot on the page. We can have
more than on the slot on the page.

## Advert Brand Protection

This mechanism helps us to determine if a certain Ad should not be shown on a
particular page (e.g. because it contains terror or hate speech related
content).

### Web - With Grapeshot

We use grapeshot as a Times brand safety mechanism. We send a request to the
Grapeshot service with the article url and in response we get an array of
category ids for that page which we then pass to GPT, using the `gs_cat` page
targeting key.

For web we send a uri to grapeshot, who scan the page and return a list of
categories they associate with that web page. These categories are then passed
to the DFP code via page targeting, which determines whether to show ads or not.

### Mobile

For native we do not use grapeshot. Instead, we pass a string of comma-seperated
keywords that typically come from TPA. These keywords are then passed to DFP
using page targeting, and DFP determines whether to show the page from this
"list".

Example:

```
googletag.setTargeting("kw", "these,are,my,example,keywords");
```

## Ad slots

We have distinct positions on a page where we can display Ads. We refer to them
as ad slots with a unique identifiers so that we can request ads for those
positions uniquely from DFP. Each ad slot allows for certain fixed ad sizes.

- Header - this is the slot on the top of the article page.
- Inline - this is the ad slot after the 5th paragraph of an article body
- Sponsored ads - TBD
- Pixel - TBD
- Pixelskin - TBD
- Pixelteads - TBD

## Testing GPT and Grapeshot

To test Ads in general, follow below steps:

1. Goto page where you want to test, and open the console.
2. Type `googletag.openConsole();` on the console, this will open a DFP console
   on the page and will display all the info about the ads on the page.
3. To look for all Ad slots on the page use `googletag.pubads().getSlots();`.
4. On the network panel, filter for ads?, this is the ad request that gpt makes
   to DFP with all the relevant config.
5. In the ads request, the config is sent as query params, the `cust_params` key
   has the page level config values and `prev_scp` has the slot level config
   values.
6. On the network panel, filter for grapeshot, the second request has the key
   values that we get from grapeshot.

## Header bidding

This is an advanced programmatic technique, wherein publishers request for bids
from some ad-exchanges simultaneously before actually making calls to their ad
servers. The idea is that by letting multiple bidders bid for the same ad slot
at the same time, publishers increase their yield and make more money. The
returned bids are then passed to the ad server.

[Prebid](http://prebid.org/) is a free open source library that helps publishers
implement header bidding. We load a prebid script which adds a `pbjs` object
onto the `window` object. The gpt request waits for prebid request to fulfill.
These are some of the bidders:

- appnexus
- Rubicon
- Criteo
- Pubmatic
- indexExchange
- Amazon - has a separate script that does the bidding for amazon.

## Testing

Note: Test with local.thetimes.co.uk (some of the ads look for the domain from
which the request is coming)

1. Go to the page and open the console on the browser
2. Write `pbjs.getBidResponses();` on the console, this gets all the bids we
   have received for all the slots on the page
3. For Appnexus, to check if it has sent out request for bidding, filter for
   adnxs in the network panel
4. For Rubicon, to check if it has sent out request for bidding, filter for
   rubicon in the network panel
5. For Criteo, to check if it has sent out request for bidding, filter for
   criteo in the network panel
6. For Pubmatic, to check if it has sent out request for bidding, filter for
   pubmatic in the network panel
7. For indexExchange, to check if it has sent out request for bidding, filter
   for casale in the network panel
8. For Amazon, to check if it has sent out request for bidding, filter for
   domain aax.amazon-adsystem in the network panel. On Console, do
   `apstag.debug('enable');` and refresh page [This forces amazon ads to win]
9. Write `googletag.pubads().getSlots().map(s=>s.getTargetingMap());` in the
   console, the key `hb_bidder` is the winner for the slot

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before contributing to this
package

## Running the code

Please see our main [README.md](../README.md) to get the project running locally

## Development

The code can be formatted and linted in accordance with the agreed standards.

```
yarn fmt
yarn lint
```

## Testing

This package uses [yarn](https://yarnpkg.com) (latest) to run unit tests on each
platform with [jest](https://facebook.github.io/jest/).

```
yarn test:all
yarn test:android
yarn test:ios
yarn test:web
```

Visit the official
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Primitives%2FAdvertisement&selectedStory=Placeholder&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available ads templates.

## Future

Ads do not responsively resize at the moment, which is something we intend to
rectify in the near future. Also, brand protection leaves a blank advert on the
page at the moment, rather than a placeholder or nothing at all. We intend to
improve on this feature soon.
