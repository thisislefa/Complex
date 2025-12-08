# Complex — Asymmetrical Integration Grid

## Overview
Complex is an asymmetrical grid component that alternates between text content cards and full-image cards. Designed for showcasing integration options or feature comparisons, it combines visual and textual information in an engaging pattern.

## Live Deployment 

[View Complex](https://complex-pearl.vercel.app)

---

## Technology
- **HTML5**: Semantic structure with section/article elements
- **CSS3**: CSS Grid with manual positioning, flexbox
- **TypeScript**: Interactive card functionality with click events
- **Google Fonts**: Extensive font library with Inter as primary
- **Pexels/Unsplash**: High-quality integration imagery

---

## Integration

### Basic Setup
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
  <link rel="stylesheet" href="complex.css">
</head>
<body>
  <!-- Complex component -->
  <script src="complex.js"></script>
</body>
</html>
```

### React Component
```jsx
import { useState, useEffect } from 'react';
import './complex.css';

function ComplexGrid({ integrations = [] }) {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (index) => {
    setActiveCard(index);
    console.log(`Card clicked: ${integrations[index]?.title}`);
  };

  return (
    <section className="dungeon-integration-section">
      <div className="dungeon-integration-container">
        <h2 className="dungeon-integration-title">Multiple options for easy integration</h2>
        
        <div className="dungeon-integration-grid">
          {integrations.map((integration, index) => (
            <article 
              key={index}
              className={`dungeon-card ${integration.type === 'image' ? 'dungeon-card-image' : 'dungeon-card-text'} ${activeCard === index ? 'active' : ''}`}
              onClick={() => handleCardClick(index)}
              role="button"
              tabIndex="0"
            >
              {integration.type === 'image' ? (
                <img src={integration.src} alt={integration.alt} />
              ) : (
                <div className="dungeon-card-inner">
                  <div className="dungeon-card-icon" dangerouslySetInnerHTML={{ __html: integration.icon }} />
                  <h3 className="dungeon-card-heading">{integration.title}</h3>
                  <p className="dungeon-card-description">{integration.description}</p>
                  {integration.link && (
                    <a href={integration.link.url} className="dungeon-card-link">
                      {integration.link.text} →
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### TypeScript Core
```typescript
// complex.ts
interface IntegrationCard {
  type: 'text' | 'image';
  title?: string;
  description?: string;
  src?: string;
  alt?: string;
  link?: {
    text: string;
    url: string;
  };
}

class ComplexGrid {
  private cards: NodeListOf<HTMLElement>;
  
  constructor() {
    this.cards = document.querySelectorAll('.dungeon-card');
    this.init();
  }
  
  private init(): void {
    this.cards.forEach((card: HTMLElement, index: number) => {
      card.addEventListener('click', () => this.handleCardClick(card, index));
      card.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          this.handleCardClick(card, index);
        }
      });
    });
  }
  
  private handleCardClick(card: HTMLElement, index: number): void {
    const heading = card.querySelector('.dungeon-card-heading');
    if (heading) {
      console.log(`Card ${index + 1} clicked: ${heading.textContent}`);
    }
    
    // Visual feedback
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new ComplexGrid();
});
```

### WordPress Integration
```php
function complex_grid_shortcode($atts) {
    $integrations = [
        [
            'type' => 'text',
            'icon' => '<svg>...</svg>',
            'title' => 'Pre-built plugins',
            'description' => 'Seamlessly integrate with popular e-commerce systems.',
            'link' => ['text' => 'Setup Guide', 'url' => '#']
        ],
        [
            'type' => 'image',
            'src' => 'https://images.pexels.com/photos/2422286/pexels-photo-2422286.jpeg',
            'alt' => 'Plugin integrations'
        ]
        // Add more items...
    ];
    
    ob_start();
    ?>
    <section class="dungeon-integration-section">
        <div class="dungeon-integration-container">
            <h2 class="dungeon-integration-title">Multiple integration options</h2>
            <div class="dungeon-integration-grid">
                <?php foreach ($integrations as $index => $item): ?>
                <article class="dungeon-card <?php echo $item['type'] === 'image' ? 'dungeon-card-image' : 'dungeon-card-text'; ?>">
                    <?php if ($item['type'] === 'image'): ?>
                        <img src="<?php echo esc_url($item['src']); ?>" alt="<?php echo esc_attr($item['alt']); ?>">
                    <?php else: ?>
                        <div class="dungeon-card-inner">
                            <div class="dungeon-card-icon"><?php echo $item['icon']; ?></div>
                            <h3 class="dungeon-card-heading"><?php echo esc_html($item['title']); ?></h3>
                            <p class="dungeon-card-description"><?php echo esc_html($item['description']); ?></p>
                            <?php if (!empty($item['link'])): ?>
                                <a href="<?php echo esc_url($item['link']['url']); ?>" class="dungeon-card-link">
                                    <?php echo esc_html($item['link']['text']); ?> →
                                </a>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode('complex_grid', 'complex_grid_shortcode');
```

---

## Customization

### Grid Layout Patterns
```css
/* Custom pattern: Text-Image-Image-Text */
.dungeon-integration-grid.custom-pattern .dungeon-card:nth-child(1) { grid-column: 1; grid-row: 1; }
.dungeon-integration-grid.custom-pattern .dungeon-card:nth-child(2) { grid-column: 2; grid-row: 1; }
.dungeon-integration-grid.custom-pattern .dungeon-card:nth-child(3) { grid-column: 1; grid-row: 2; }
.dungeon-integration-grid.custom-pattern .dungeon-card:nth-child(4) { grid-column: 2; grid-row: 2; }

/* 3-column layout */
.dungeon-integration-grid.three-col {
    grid-template-columns: repeat(3, 1fr);
}

/* Masonry layout */
.dungeon-integration-grid.masonry {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-flow: dense;
}
```

### Interactive Enhancements
```css
/* Hover effects */
.dungeon-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.dungeon-card-image:hover img {
    transform: scale(1.05);
}

/* Active state */
.dungeon-card.active {
    border: 2px solid #0091ff;
    box-shadow: 0 0 0 3px rgba(0, 145, 255, 0.1);
}

/* Focus styles for accessibility */
.dungeon-card:focus {
    outline: 3px solid #0091ff;
    outline-offset: 2px;
}
```

### Theming System
```css
:root {
    --complex-bg: #ffffff;
    --complex-card-bg: #f8f9fb;
    --complex-text: #0a0a0a;
    --complex-secondary: #5f6b7a;
    --complex-accent: #0091ff;
    --complex-radius: 16px;
    --complex-shadow: 0 1px 3px rgba(0,0,0,0.08);
    --complex-font: 'Inter', sans-serif;
}

.dungeon-integration-section {
    background: var(--complex-bg);
    font-family: var(--complex-font);
}

.dungeon-card {
    background: var(--complex-card-bg);
    border-radius: var(--complex-radius);
    box-shadow: var(--complex-shadow);
}

.dungeon-card-heading {
    color: var(--complex-text);
}

.dungeon-card-description {
    color: var(--complex-secondary);
}

.dungeon-card-link {
    color: var(--complex-accent);
}
```

---

## Responsive Design

### Breakpoints
- **Desktop**: 2×3 grid with explicit positioning
- **Tablet (900px)**: Reduced container width
- **Mobile (768px)**: Single column stack, equal card heights

### Mobile Optimization
```css
@media (max-width: 768px) {
    .dungeon-integration-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    /* Reset manual positioning on mobile */
    .dungeon-card {
        grid-column: 1 !important;
        grid-row: auto !important;
        min-height: 280px;
    }
    
    .dungeon-card-image {
        order: -1; /* Images first on mobile */
    }
    
    .dungeon-card-text {
        padding: 30px;
    }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
    .dungeon-card {
        min-height: 300px; /* Larger touch targets */
    }
    
    .dungeon-card-link {
        padding: 12px 0; /* Larger touch area */
    }
}
```

---

## TypeScript Features

### Core Functionality
```typescript
// Enhanced TypeScript class with more features
class ComplexIntegrationGrid {
    private cards: NodeListOf<HTMLElement>;
    private activeIndex: number | null = null;
    
    constructor(selector: string = '.dungeon-card') {
        this.cards = document.querySelectorAll(selector);
        this.init();
    }
    
    private init(): void {
        this.cards.forEach((card, index) => {
            // Click handling
            card.addEventListener('click', () => this.selectCard(index));
            
            // Keyboard navigation
            card.addEventListener('keydown', (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectCard(index);
                }
            });
            
            // Focus management
            card.addEventListener('focus', () => {
                card.classList.add('focused');
            });
            
            card.addEventListener('blur', () => {
                card.classList.remove('focused');
            });
        });
        
        // Arrow key navigation between cards
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (this.activeIndex !== null) {
                if (e.key === 'ArrowRight') {
                    this.navigate(1);
                } else if (e.key === 'ArrowLeft') {
                    this.navigate(-1);
                }
            }
        });
    }
    
    private selectCard(index: number): void {
        // Remove active class from all cards
        this.cards.forEach(card => card.classList.remove('active'));
        
        // Add active class to selected card
        this.cards[index].classList.add('active');
        this.activeIndex = index;
        
        // Dispatch custom event
        const event = new CustomEvent('complex:card-select', {
            detail: { index, element: this.cards[index] }
        });
        document.dispatchEvent(event);
        
        // Analytics tracking
        this.trackInteraction(index);
    }
    
    private navigate(direction: number): void {
        if (this.activeIndex === null) return;
        
        const newIndex = this.activeIndex + direction;
        if (newIndex >= 0 && newIndex < this.cards.length) {
            this.selectCard(newIndex);
            this.cards[newIndex].focus();
        }
    }
    
    private trackInteraction(index: number): void {
        // Integration with analytics services
        if (typeof gtag !== 'undefined') {
            gtag('event', 'card_select', {
                'event_category': 'engagement',
                'event_label': `Card ${index + 1}`,
                'value': index
            });
        }
    }
    
    // Public API methods
    public getCardCount(): number {
        return this.cards.length;
    }
    
    public selectFirstCard(): void {
        this.selectCard(0);
    }
    
    public selectLastCard(): void {
        this.selectCard(this.cards.length - 1);
    }
}
```

### Build Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["DOM", "ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## Performance

### Optimizations
- **Critical CSS**: Above-the-fold styles inlined
- **Image optimization**: Responsive images with lazy loading
- **Font loading**: `font-display: swap` for Inter font
- **JavaScript**: TypeScript compiled to efficient ES2020
- **CSS containment**: Isolated component styles

### Loading Strategy
```html
<!-- Preload critical resources -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" as="style">
<link rel="preload" href="complex.css" as="style">
<link rel="preload" href="complex.js" as="script">

<!-- Lazy load non-critical images -->
<img 
    src="placeholder.jpg" 
    data-src="integration-image.jpg" 
    class="dungeon-card-img lazy"
    alt="Integration preview"
    loading="lazy"
    width="600"
    height="400"
>
```

---

## Accessibility

### WCAG Compliance
- **Semantic HTML**: article, section, h2, h3 elements
- **Keyboard navigation**: Full keyboard support with arrow keys
- **Focus management**: Visible focus indicators
- **Screen readers**: ARIA labels and proper alt text
- **Color contrast**: 4.5:1 minimum ratio

### ARIA Enhancements
```html
<article 
    class="dungeon-card dungeon-card-text"
    role="button"
    tabindex="0"
    aria-labelledby="card-title-1"
    aria-describedby="card-desc-1"
    data-index="1"
>
    <div class="dungeon-card-inner">
        <h3 id="card-title-1" class="dungeon-card-heading">Pre-built plugins</h3>
        <p id="card-desc-1" class="dungeon-card-description">
            Seamlessly integrate our platform with popular e-commerce systems.
        </p>
    </div>
</article>
```

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .dungeon-card {
        transition: none;
    }
    
    .dungeon-card:hover {
        transform: none;
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    .dungeon-card {
        border: 2px solid currentColor;
    }
    
    .dungeon-card-link {
        text-decoration: underline;
    }
}
```

---

## Browser Support

| Browser | Version | Features |
|---------|---------|----------|
| Chrome  | 60+     | Grid, Flexbox, ES2020 |
| Firefox | 55+     | Grid, Flexbox |
| Safari  | 10.1+   | Grid, Flexbox |
| Edge    | 79+     | Grid, Flexbox, ES2020 |

### Fallbacks
```css
/* Flexbox fallback for older browsers */
.dungeon-integration-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.dungeon-card {
    flex: 1 1 calc(50% - 15px);
    margin-bottom: 15px;
}

@supports (display: grid) {
    .dungeon-integration-grid {
        display: grid;
    }
    
    .dungeon-card {
        flex: none;
        margin-bottom: 0;
    }
}
```

---

## SEO & Analytics

### Structured Data
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Integration Options",
  "description": "Multiple integration methods for our platform",
  "numberOfItems": 6,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Pre-built plugins",
        "description": "Seamlessly integrate with popular e-commerce systems"
      }
    }
    // Additional items...
  ]
}
</script>
```

### Event Tracking
```typescript
// Track user interactions
function trackGridInteractions() {
  document.addEventListener('complex:card-select', (event) => {
    const detail = (event as CustomEvent).detail;
    
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'card_select', {
        card_index: detail.index,
        card_type: detail.element.classList.contains('dungeon-card-text') ? 'text' : 'image'
      });
    }
    
    // Custom analytics
    console.log(`User selected card ${detail.index + 1}`);
  });
}
```

---

## Quick Start

1. **Include CSS and JavaScript**
```html
<link rel="stylesheet" href="complex.css">
<script src="complex.js" defer></script>
```

2. **Add HTML structure**
```html
<section class="dungeon-integration-section">
  <div class="dungeon-integration-container">
    <h2 class="dungeon-integration-title">Your Title</h2>
    <div class="dungeon-integration-grid">
      <!-- Cards here -->
    </div>
  </div>
</section>
```

3. **Initialize with TypeScript**
```typescript
import { ComplexIntegrationGrid } from './complex-grid';

document.addEventListener('DOMContentLoaded', () => {
  const grid = new ComplexIntegrationGrid();
  // Optional: grid.selectFirstCard();
});
```

---

## Troubleshooting

### Common Issues
1. **Grid layout broken**: Check browser support for CSS Grid
2. **Images not loading**: Verify image URLs and CORS policies
3. **TypeScript errors**: Ensure proper compilation with tsconfig.json
4. **Interactive features not working**: Check JavaScript console for errors

### Development Tools
```bash
# Install TypeScript
npm install -g typescript

# Compile TypeScript
tsc --watch

# Build for production
tsc --build
```

---

**Complex** — Asymmetrical grid for showcasing integration options with TypeScript interactivity.
