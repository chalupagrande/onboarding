# PH Onboarding

## Happy Path

This is a prototype to illustrate the design concepts. Meaning that there is somewhat of a 'Happy Path' that will illustrate the concept best.

If `window.correctPage` is set to `true` the Guide will NOT show the intro page. If it is set to `false` (default), then the Guide WILL show the intro page. This only works for the first Guide. The second guide (Response Time Graph) is simply there to illustrate that you can have other Guides available using the same methods, and they will auto populate in the slideout.

If you `Skip [the] Tutorial` on the Intro page, then the `window.correctPage` variable will be set to `true`. You can then re-enter the guide, and see the Guide at its normal state.

###Getting Started

`$ bower install` => `$ npm install` => `gulp`

###Demo:
https://ninth-mind.github.io/onboarding/dist/