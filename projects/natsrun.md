---
layout: layout.ejs
section: Projects
---

[NATSrun](https://github.com/Gooseus/natsrun){target=_blank} is a lightweight TypeScript library that provides Express/Koa-like routing capabilities for NATS messages. It uses pattern matching to route messages to appropriate handlers based on NATS subjects, making it easy to build microservices with clean, maintainable code.

## Features

- **Pattern-based message routing** - Uses NATS subject patterns (`user.*`, `user.>`) to route messages to appropriate handlers
- **Multiple handler support** - Multiple handlers can be registered for the same subject pattern
- **Async/await support** - Full support for modern async JavaScript patterns
- **Configurable handler sorting** - Three different sorting strategies: specificity, insertion order, or custom
- **Zero dependencies** - No external runtime dependencies (except TypeScript)
- **TypeScript-first design** - Built with TypeScript for full type safety

## Technical Approach

The library implements a pattern-matching router similar to Express.js but designed specifically for NATS messaging patterns. It supports:

- `*` wildcard matching for single tokens (`user.*` matches `user.created`, `user.updated`)
- `>` wildcard matching for multiple tokens (`user.>` matches `user.123.profile.updated`)
- Exact subject matching with precedence over wildcards
- Middleware-style handler chaining with context passing

## Installation & Usage

Available on [NPM](https://www.npmjs.com/package/@gooseus/natsrun){target=_blank} as `@gooseus/natsrun`:

```bash
npm install @gooseus/natsrun
```

Basic usage example:

```typescript
import { NatsRun } from '@gooseus/natsrun';

const router = new NatsRun();

// Add handlers for different subjects
router.add('user.created', async (msg, ctx, next) => {
  console.log('New user created:', msg);
  await next({ userId: msg.data.id });
});

router.add('user.*.updated', async (msg, ctx, next) => {
  console.log(`User updated:`, msg);
});

// Handle incoming messages
await router.handle('user.created', { id: 1, name: 'John' });
```

## Development Context

This project was created to solve the challenge of building scalable microservices with NATS messaging. While NATS provides excellent messaging capabilities, there wasn't a good pattern-matching router for TypeScript/Node.js applications that felt as natural as Express.js routing.

The library draws inspiration from other pattern-matching libraries like bloomrun and patrun, but is specifically optimized for NATS subject patterns and TypeScript development workflows.

**Technologies**: TypeScript, Node.js, NATS messaging, Pattern matching

**Links**: [GitHub Repository](https://github.com/Gooseus/natsrun){target=_blank} | [NPM Package](https://www.npmjs.com/package/@gooseus/natsrun){target=_blank} 