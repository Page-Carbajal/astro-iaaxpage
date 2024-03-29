# Iaax Page Website - Change Log

### January 24th 

- Fixed robots.txt.ts issues. 


### January 20th 

- Fixed issue with sharp, Astro Image uses it to transform images was not working
- Re-added pages/robots.txt.ts
- Added redirections for deprecated articles


### January 19th

- Conditional Open Graph Tags for articles
- Quick pagination for articles
- Small changes on article archives


### January 18th

- Added src/assets/images/iaax-page-logo-large-black-no-background.png
- Fixed Strapi Integration Errors


### January 17th 

- RC1 for Strapi Integration
- Added PostImage to the articles
- Fixed missing featured articles
- Fixed back link on ArticleHeader


### January 16th 

- Refactored getPostBySlug
- Added function strapiClient/getLatestArticles


### January 15th 

- Added lib/strapiClient
- Changed some configs on the Articles and Categories
- Refactored api/getAllPublishedPostsSlugs to use StrapiClient


### January 5th

- Added src/config.ts lib/types.ts
- Imported @page-carbajal/wp-graphql
- Created articles/fuente.json.ts


## 2023

### December 30th 

- Created component SocialShareButton
- Created class socialShareButton.scss
- Icons from 
  - https://icons8.com/icons/set/twitter-x
  - https://svgrepo.com
- Upgraded astro to Version 4


### December 29th 

- Added components ArticleHeader
- Implemented styles for article header animation
- Implemented @tailwindcss/typography


### February 26th 

- Added support for partytown
- Added support for sitemap


### February 25th 

- Implemented poemas/ route and entries
- Added robots.txt to prevent listing as duplicated content while developing
- Added styles for UL
- Added styles/post
- Created api.getLatestFeaturedArticle method
- Created FeaturedArticle
- Created post-components/PostHero
- Created components ArticleCard, FeaturedArticles and SiteInfo
- Created fixed Footer.astro component
- Created a new temaplet using shuffle.dev, Tailwind and Bendis
- First commit
