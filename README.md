# Goose.us 11ty Static Site

This is the personal website of Shawn Marincas (Gooseus), built using [11ty](https://www.11ty.dev/), a modern static site generator. The site features a minimalist design and a unique command console interface.

## Project Overview

This is a static site with the following features:
- Built with 11ty (Eleventy) static site generator
- Minimalist design approach (<100kb per page including all assets)
- Command console UI activated with backtick (`) key
- Reactive components using [ArrowJS](https://www.arrow-js.com/)
- State management with [Robot](https://thisrobot.life/) state machines
- Content written in Markdown with frontmatter

## Site Content

The site includes:
- Personal and professional information
- Resume
- Projects showcase
- Reviews of technologies and books
- Blog posts/writing on various topics

## Project Structure

- `_includes/` - Templates and layouts
- `_data/` - Site configuration data
- `css/` - Stylesheets
- `js/` - JavaScript files
- `images/` - Image assets
- `projects/`, `reviews/`, `writing/`, etc. - Content sections
- `.eleventy.js` - Eleventy configuration

## Local Development Setup

### Requirements
- Node.js and npm
- [mkcert](https://github.com/FiloSottile/mkcert) for local SSL certificates

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

3. Generate local SSL certificates:
   ```
   mkcert -install
   mkcert localdev.goose.us "*.localdev.goose.us" localhost 127.0.0.1 ::1
   ```

4. Build the site for development:
   ```
   npm run build:dev
   ```

5. Start the development server:
   ```
   npm run serve
   ```

   You can then access the site at https://localhost:8080

### Available Scripts

- `npm run build:dev` - Build the site for development
- `npm run build:dev:watch` - Build with watch mode (auto rebuild on changes)
- `npm run build:prod` - Build the site for production (outputs to `../gooseus.github.io` directory)
- `npm run build:prod:watch` - Build for production with watch mode
- `npm run serve` - Serve the site locally with HTTPS

## 2025 Development Updates

Considerations for updating the site in 2025:

2. **ArrowJS and Robot**: Check for updates or alternatives if these libraries are no longer maintained
3. **Modern CSS Approaches**: Consider integrating Tailwind CSS or CSS custom properties for more flexible styling
4. **Performance Optimization**: Implement image optimization and lazy loading techniques
5. **Accessibility Improvements**: Audit and improve site accessibility
6. **Content Management**: Consider headless CMS integration for easier content management
7. **Build Process**: Optimize build pipeline and explore modern bundling tools
8. **Analytics**: Add privacy-respecting analytics
9. **SEO**: Improve metadata and SEO features
10. **Web Components**: Consider incorporating Web Components for more reusable UI elements

## License

- Page content is licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)
- Site source code and examples are licensed under [MIT](LICENSE.md)