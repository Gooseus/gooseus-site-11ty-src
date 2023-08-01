---
layout: layout.ejs
section: Projects
footnotes:
  -
    symbol: '#49'
    html: I've written some more about <a href="/reviews/arrow-js/">why I like ArrowJS</a>.
---
### Minimalist Website with built-in Command Console UX

While rebuilding my personal site I wanted to experiment with some new libraries and frameworks. I had been pining for my [web development roots](/writing/on-learning-web-development-in-2005), when it seemed like I had a better grasp of the technology underlying what I was building. Modern frameworks like React, Angular, and Vue are powerful, but have so many dependencies, opinionated abstractions, syntactic sugar, and build requirements&mldr; it all seems like a lot of cognitive and computational overhead, especially for low to moderately complex applications.

I found [ArrowJS](https://www.arrow-js.com/){target=_blank} &ndash; a small, powerful reactivity library which reminded me of a super-simple React or a [Lit](https://lit.dev/){target=_blank} without the Web Components and build requirements<sup class="note">&#49;</sup>, so I decided to see what I could do with it.

This is when I had the idea for a website command console, similar those found in PC games, opened with the backtick (`) key which overlays the screen with a REPL-like interface that accepts commands that run functions, change the state of the page, and displays information.


Things I like about my site:
- It's very bare-bones and minimalist, so far every page comes in at less than 100kb, including all the Javascript and CSS for the command console and other features.
- The command console (opened with the backtick [`] key) is a fun way to interact with the site which has me thinking of a bunch of other things to build in.
{.main-list}