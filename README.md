# iaaxpage.com – Static Site Generation with Astro and WordPress



![thumbnail](private/thumbnail.png)


## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── home-components
│   │       └── ArticleCard.astro
│   │       └── FeaturedArticle.astro
│   │       └── SiteInfo.astro
│   │   └── post-components
│   │       └── PostHero.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
│       └── articulos
│           └── [slug].astro
└── package.json
```

## How to install

1. You will need a WordPress website with some published posts and Graphql installed
2. Clone the branch **article** from this repository
3. Create a new .env file and add these variables

```env
WP_GRAPQL_URL=https://yoursite.tld/graphql
FEATURED_ARTICLES_CATEGORY_ID=44
HOME_URL=http://localhost:3000
```

### Execute the following commands

```bash
$ yarn install
$ yarn build
$ yarn preview 
```

Visit http://localhost:3000

