![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

# _Quantified Trees (Qtrees) – Citizens Frontend_
> The [_Qtrees – Citizens Frontend_]() is an interactive map of Berlin that shows how thirsty the public trees of berlin are. More precisely, it visualizes the trees' ground suction tension. This suction tension represents the amount of energy tree roots are needing in order to suck out water from the ground. Using open data as well as sensors distributed under the ground of about a hundred trees, an AI developed by [Birds on Mars](https://www.birdsonmars.com/) is able to generate forecasts for the trees not equiped with sensors. This web-app is oriented towards the public and should inform about the AI-generated forecasts in a simple and intuitive way.

## Context
Climate change is causing increasingly hot, dry weather in many places. In recent years, Berlin has also experienced more hot days than ever before. Determining whether trees are in need of water isn't as easy as looking at the ground on the surface level. Many factors such as the tree's age, specie, plate size or ground quality play an important role. Old trees, for instance, tend to have deep roots and thereby be less dependent on additional watering. Overwatering can in fact be more detrimental to a tree than helpful.

This application is completely based on open data, much of which is administrative or weather data. Open data is now an important part of Berlin's administrative activities and not only creates transparency and openness, but also enables analysis and applications like this to make everyday life a little bit more pleasant. You can find more open data at the [Berlin Open Data Portal](https://daten.berlin.de/).

## Tech stack
This website is a NextJS app configured with:

- [Typescript](https://www.typescriptlang.org/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)

## Install and contribute

### Requirements

#### [MapTiler](https://maptiler.com/)
We use [MapTiler](https://maptiler.com/) for rendering the basemap in the background. You will need to put your MapTiler API key into the `NEXT_PUBLIC_MAPTILER_KEY` environment variable. Make also sure to add whatever URL the app is run on to the list of allowed URLs in your MapTiler configuration.

Because we use a customized basemap hosted on MapTiler, you also need to provide the `NEXT_PUBLIC_MAPTILER_BASEMAP_URL`.

Both variables can be found in our shared vault.

#### Trees vector tiles

We fetch the actual trees data from our self-hosted tileserver as a vector tileset. Add the URL to that tileset to the environment variable `NEXT_PUBLIC_TREE_TILES_URL`. Find the variable in our shared vault as well.

#### [Matomo](https://matomo.org/)
We use the Google Analytics alternative [Matomo](https://matomo.org/), which is more respectful of the users' privacy, in order to track the page-visits on the page.

You will need a [Matomo](https://matomo.org/) account if you wish to use page analytics as well and configure the environment variables `NEXT_PUBLIC_MATOMO_URL` and `NEXT_PUBLIC_MATOMO_SITE_ID` for this purpose.

### Installation

```bash
# Clone the repo
git clone git@github.com:technologiestiftung/qtrees-citizens-frontend.git

# Move into the repo
cd qtrees-citizens-frontend

# Install the npm dependencies
npm install

# Create your own .env file
cp .env.example .env

# Edit the .env file with your own values
vim .env # Use your favourite editor here
```

## Deployment
_Qtrees – Citizens Frontend_ is deployed to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/dnsos"><img src="https://avatars.githubusercontent.com/u/15640196?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Dennis Ostendorf</b></sub></a><br /><a href="https://github.com/technologiestiftung/qtrees-citizens-frontend/commits?author=dnsos" title="Code">💻</a> <a href="https://github.com/technologiestiftung/qtrees-citizens-frontend/commits?author=dnsos" title="Documentation">📖</a></td>
    <td align="center"><a href="https://vogelino.com/"><img src="https://avatars.githubusercontent.com/u/2759340?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Lucas Vogel</b></sub></a><br /><a href="https://github.com/technologiestiftung/qtrees-citizens-frontend/commits?author=vogelino" title="Code">💻</a> <a href="https://github.com/technologiestiftung/qtrees-citizens-frontend/commits?author=vogelino" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


## Content Licencing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/). 

## Credits

<a src="https://citylab-berlin.org/en/start/">
  <img width="200" src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg" />
</a>
<br />
<br />
<table>
  <tr>
    <td>
      A project by:
      <br />
      <a src="https://www.technologiestiftung-berlin.de/en/">
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-en.svg" />
      </a><br/>
      <a src="https://www.birdsonmars.com/">
        <img width="100" src="https://logos.citylab-berlin.org/logo-birds-on-mars.png" /><br/>
      </a><br/>
      <a src="https://www.berlin.de/ba-mitte/politik-und-verwaltung/aemter/strassen-und-gruenflaechenamt/">
        <img width="300" src="https://qtrees.ai/wp-content/uploads/2021/11/berlin_mitte_logo.png" /><br/>
      </a><br/>
    </td>
    <td>
      Associated partners:
      <br />
      <img width="200" src="https://qtrees.ai/wp-content/uploads/2022/06/B_BA_W_NE_Logo_DE_H_PT_4C-2048x342.png" />
      <br/>
      <img width="200" src="https://qtrees.ai/wp-content/uploads/2022/06/logo_arbor_revital_20mm.png" />
    </td>
    <td>
      Sponsors:
      <br/>
      <img width="160" src="https://qtrees.ai/wp-content/uploads/2022/04/BMUV_Fz_2021_Office_Farbe_de_c-1536x1122.png" />
      <img width="160" src="https://qtrees.ai/wp-content/uploads/2021/12/zug-logo.png" />
    </td>
  </tr>
</table>
