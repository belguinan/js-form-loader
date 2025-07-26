# js-form-loader

[![npm version](https://img.shields.io/npm/v/js-form-loader.svg)](https://www.npmjs.com/package/js-form-loader)
[![npm downloads](https://img.shields.io/npm/dm/js-form-loader.svg)](https://www.npmjs.com/package/js-form-loader)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/min/js-form-loader@1.1.1)](https://bundlephobia.com/package/js-form-loader@1.1.1)
[![Bundle Size (gzip)](https://img.shields.io/bundlephobia/minzip/js-form-loader@1.1.1)](https://bundlephobia.com/package/js-form-loader@1.1.1)

A lightweight, vanilla JavaScript library for creating beautiful loading overlays on any DOM element with a fluent API design, perfect for forms and interactive elements.

## Features

- **Framework Agnostic** - Pure vanilla JavaScript with no dependencies
- **Fluent API** - Simple `.loader().show()` and `.loader().hide()` syntax
- **Element-Scoped** - Target specific elements instead of full-page overlays
- **Lightweight** - Minimal footprint with embedded CSS

## Installation

```bash
npm install js-form-loader
```

Or via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/js-form-loader/dist/js-form-loader.min.js"></script>
```

## Quick Start

```javascript
// Show loading overlay
document.getElementById('my-form').loader().show();

// Hide loading overlay
document.getElementById('my-form').loader().hide();
```

## Usage Examples

### Basic Form Loading

```javascript
const form = document.querySelector('#login-form');

// Show loader during form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    form.loader().show();
    
    try {
        await submitForm(new FormData(form));
    } finally {
        form.loader().hide();
    }
});
```

### Card Component Loading

```javascript
const card = document.querySelector('.product-card');

// Load product data
async function loadProduct(id) {
    card.loader().show();
    
    try {
        const product = await fetch(`/api/products/${id}`).then(r => r.json());
        updateCardContent(product);
    } finally {
        card.loader().hide();
    }
}
```

### Multiple Elements

```javascript
const buttons = document.querySelectorAll('.action-button');

buttons.forEach(button => {
    button.addEventListener('click', async () => {
        button.loader().show();
        await performAction();
        button.loader().hide();
    });
});
```

## API Reference

### Methods

#### `.loader()`
Returns the FormLoader instance for the element, creating one if it doesn't exist.

**Returns:** `FormLoader`

#### `.show()`
Displays the loading overlay on the element.

```javascript
element.loader().show();
```

#### `.hide()`
Removes the loading overlay from the element.

```javascript
element.loader().hide();
```

### CSS Classes

The loader automatically injects the following CSS classes:

- `.js-form-loader-overlay` - Main overlay container
- `.js-spinner-container` - Spinner wrapper with centering
- `.js-form-loader-spinner` - Animated spinner element

### CSS Customization

Override the default styles by targeting the CSS classes:

```css
.js-form-loader-overlay {
    
}

.js-form-loader-spinner {
    
}
```

## Framework Integration

### React

```jsx
import { useRef, useEffect } from 'react';
import 'js-form-loader';

function MyComponent() {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (loading) {
            formRef.current.loader().show();
        } else {
            formRef.current.loader().hide();
        }
    }, [loading]);
    
    return <form ref={formRef}>...</form>;
}
```

### Vue

```vue
<template>
    <form ref="formElement">...</form>
</template>

<script>
import 'js-form-loader';

export default {
    data() {
        return { loading: false };
    },
    watch: {
        loading(newVal) {
            if (newVal) {
                this.$refs.formElement.loader().show();
            } else {
                this.$refs.formElement.loader().hide();
            }
        }
    }
}
</script>
```

## Architecture

### Design Principles

1. **Non-Destructive** - Preserves original element state
2. **Singleton Pattern** - One loader instance per element
3. **Smart Positioning** - Handles static/relative position edge cases
4. **Memory Efficient** - Lazy instantiation with caching

### Class Structure

```
HTMLElement.prototype.loader()
    └── FormLoader
        ├── constructor(element)
        ├── createOverlay()
        ├── show()
        └── hide()
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin my-feature`
5. Submit a pull request

### Development Setup

```bash
git clone https://github.com/belguinan/js-form-loader.git
cd js-form-loader
npm install
npm run build
npm test
```

## License

MIT License - see [LICENSE](LICENSE) file for details.
