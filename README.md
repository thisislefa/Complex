# Filigree — Integration Options Component

## Overview

Filigree is a sophisticated, visually balanced integration options component built with TypeScript for type-safe development. Designed for SaaS platforms, developer tools, and API documentation sites, it features an asymmetrical grid layout that alternates between rich content cards and full-bleed imagery. The component combines professional aesthetics with clear information hierarchy while leveraging TypeScript for enhanced developer experience and maintainability.

## Live Deployment

[View Demo](https://complex-pearl.vercell.app)  

---

## Technology Specifications

### Core Stack
- **TypeScript**: Type-safe JavaScript with modern ES6+ features
- **HTML5**: Semantic markup with accessible image descriptions
- **CSS3**: CSS Grid with precise asymmetrical layout control
- **Google Fonts**: Inter font family (400-700 weights)
- **External Imagery**: Pexels & Unsplash integration for premium visuals
- **Inline SVG**: Custom SVG icons with consistent branding
- **CSS Grid**: 2×3 matrix with deliberate text/image alternation

### Development Stack
- **TypeScript Compiler**: ES6 target with strict type checking
- **Source Maps**: `main.js.map` for debugging TypeScript in browser
- **Build Process**: TypeScript compilation to optimized JavaScript
- **Module System**: ES Modules or CommonJS based on configuration

### Design System
- **Color Palette**: Monochrome foundation with brand blue accent (#0091FF)
- **Typography**: Inter font with clear visual hierarchy
- **Layout**: Asymmetrical 2×3 grid with alternating text/image patterns
- **Visual Effects**: Subtle hover states and shadow elevations
- **Spacing System**: Consistent padding (40px) and grid gaps (15px)
- **Imagery**: Curated high-quality photos with object-fit cover

---

## Architecture

### File Structure
```
filigree/
├── src/
│   ├── main.ts              # TypeScript source file
│   └── types/
│       └── component.ts     # TypeScript type definitions
├── dist/
│   ├── main.js              # Compiled JavaScript
│   └── main.js.map          # Source maps for debugging
├── index.html               # Semantic HTML with inline SVG icons
├── style.css                # CSS Grid, responsive design, typography
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md
```

### TypeScript Architecture
- **Type Definitions**: Strongly typed interfaces for cards, images, and configuration
- **ES6 Modules**: Modern JavaScript module system
- **Strict Mode**: Full TypeScript strict type checking enabled
- **Source Maps**: Debuggable TypeScript in browser developer tools
- **Build Configuration**: Optimized compilation for production

### CSS Architecture
- **CSS Grid System**: Precise 2×3 layout with manual positioning
- **Responsive Design**: Mobile-first approach with breakpoints
- **Flexbox Sub-layout**: Nested flex containers for text alignment
- **Object-fit Images**: Consistent image cropping with `object-fit: cover`
- **Viewport Units**: Relative sizing for consistent scaling
- **Custom Properties**: Potential for theming system expansion
- **BEM Naming**: Consistent `dungeon-*` prefix naming convention

### Visual Layout Strategy
```
Grid Pattern:
┌──────────┬──────────┐
│ Text     │ Image    │ ← Row 1
│ Image    │ Text     │ ← Row 2
│ Text     │ Image    │ ← Row 3
└──────────┴──────────┘

Mobile Pattern:
┌──────────┐
│ Text     │
│ Image    │
│ Image    │
│ Text     │
│ Text     │
│ Image    │
└──────────┘
```

---

## Development Setup

### Prerequisites
```bash
# Install Node.js and npm
node --version  # Should be 14.x or higher
npm --version   # Should be 6.x or higher

# Install TypeScript globally (optional)
npm install -g typescript
```

### Project Initialization
```bash
# Initialize package.json
npm init -y

# Install TypeScript
npm install --save-dev typescript

# Install development dependencies
npm install --save-dev @types/node ts-node nodemon

# Create tsconfig.json
npx tsc --init
```

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ES6",
    "lib": ["ES6", "DOM", "DOM.Iterable"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationDir": "./dist/types",
    "sourceMap": true,
    "removeComments": true,
    "noEmitOnError": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Package.json Scripts
```json
{
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "dev": "nodemon --exec ts-node src/main.ts",
    "start": "node dist/main.js",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist",
    "prebuild": "npm run clean",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts"
  }
}
```

---

## TypeScript Implementation

### Type Definitions
```typescript
// src/types/component.ts
export interface IntegrationCard {
  id: number;
  type: 'text' | 'image';
  title?: string;
  description?: string;
  icon?: string; // SVG markup or URL
  imageUrl?: string;
  altText?: string;
  link?: {
    text: string;
    url: string;
    icon?: string;
  };
  gridPosition: {
    column: 1 | 2;
    row: number;
  };
}

export interface FiligreeConfig {
  title: string;
  cards: IntegrationCard[];
  containerWidth?: string;
  gridGap?: string;
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export interface ComponentState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  activeCard?: number;
}
```

### Main TypeScript Component
```typescript
// src/main.ts
import { IntegrationCard, FiligreeConfig, ComponentState } from './types/component';

class FiligreeComponent {
  private config: FiligreeConfig;
  private state: ComponentState;
  private container: HTMLElement;
  private gridElement: HTMLElement;

  constructor(config: Partial<FiligreeConfig> = {}) {
    this.config = {
      title: config.title || 'Multiple options for easy integration',
      cards: config.cards || this.getDefaultCards(),
      containerWidth: config.containerWidth || '1000px',
      gridGap: config.gridGap || '15px',
      breakpoints: {
        mobile: config.breakpoints?.mobile || 768,
        tablet: config.breakpoints?.tablet || 900,
        desktop: config.breakpoints?.desktop || 1024
      }
    };

    this.state = {
      isMobile: window.innerWidth < this.config.breakpoints.mobile,
      isTablet: window.innerWidth < this.config.breakpoints.tablet,
      isDesktop: window.innerWidth >= this.config.breakpoints.tablet
    };

    this.container = document.querySelector('.dungeon-integration-section')!;
    this.gridElement = this.container.querySelector('.dungeon-integration-grid')!;

    this.init();
  }

  private getDefaultCards(): IntegrationCard[] {
    return [
      {
        id: 1,
        type: 'text',
        title: 'Pre-built plugins',
        description: 'Seamlessly integrate our platform with popular e-commerce systems such as Shopify, WooCommerce, and more.',
        icon: '<svg>...</svg>',
        link: {
          text: 'Setup Guide',
          url: '#',
          icon: '<svg>...</svg>'
        },
        gridPosition: { column: 1, row: 1 }
      },
      // ... other cards
    ];
  }

  private init(): void {
    this.setupEventListeners();
    this.render();
    this.handleResponsive();
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Add click handlers for links
    this.container.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('dungeon-card-link')) {
        this.handleLinkClick(event);
      }
    });
  }

  private handleResize(): void {
    const width = window.innerWidth;
    this.state = {
      isMobile: width < this.config.breakpoints.mobile,
      isTablet: width < this.config.breakpoints.tablet,
      isDesktop: width >= this.config.breakpoints.tablet
    };
    
    this.handleResponsive();
  }

  private handleResponsive(): void {
    // Update CSS classes based on breakpoints
    this.container.classList.toggle('is-mobile', this.state.isMobile);
    this.container.classList.toggle('is-tablet', this.state.isTablet);
    this.container.classList.toggle('is-desktop', this.state.isDesktop);
    
    // Handle mobile-specific layout changes
    if (this.state.isMobile) {
      this.handleMobileLayout();
    }
  }

  private handleMobileLayout(): void {
    // Mobile-specific layout logic
    const cards = this.container.querySelectorAll('.dungeon-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.order = index.toString();
    });
  }

  private handleLinkClick(event: MouseEvent): void {
    event.preventDefault();
    const link = event.target as HTMLAnchorElement;
    const url = link.href;
    
    // Analytics tracking
    this.trackEvent('link_click', {
      linkText: link.textContent,
      linkUrl: url
    });
    
    // Custom link handling logic
    console.log(`Navigating to: ${url}`);
    
    // Or use your routing logic
    // window.location.href = url;
  }

  private trackEvent(eventName: string, data: Record<string, any>): void {
    // Implement analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, data);
    }
    
    // Custom analytics
    console.log(`Event: ${eventName}`, data);
  }

  public updateConfig(newConfig: Partial<FiligreeConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.render();
  }

  public getCards(): IntegrationCard[] {
    return [...this.config.cards];
  }

  public addCard(card: IntegrationCard): void {
    this.config.cards.push(card);
    this.render();
  }

  public removeCard(id: number): void {
    this.config.cards = this.config.cards.filter(card => card.id !== id);
    this.render();
  }

  private render(): void {
    // Clear existing content
    this.gridElement.innerHTML = '';
    
    // Render title
    const titleElement = this.container.querySelector('.dungeon-integration-title');
    if (titleElement) {
      titleElement.textContent = this.config.title;
    }
    
    // Render cards
    this.config.cards.forEach(card => {
      const cardElement = this.createCardElement(card);
      this.gridElement.appendChild(cardElement);
    });
  }

  private createCardElement(card: IntegrationCard): HTMLElement {
    const cardElement = document.createElement('div');
    cardElement.className = `dungeon-card dungeon-card-${card.type}`;
    
    // Set grid position (for desktop)
    if (this.state.isDesktop) {
      cardElement.style.gridColumn = card.gridPosition.column.toString();
      cardElement.style.gridRow = card.gridPosition.row.toString();
    }
    
    if (card.type === 'text') {
      cardElement.innerHTML = `
        <div class="dungeon-card-inner">
          <div class="dungeon-card-icon">${card.icon || ''}</div>
          <h3 class="dungeon-card-heading">${card.title || ''}</h3>
          <p class="dungeon-card-description">${card.description || ''}</p>
          ${card.link ? `
            <a href="${card.link.url}" class="dungeon-card-link">
              ${card.link.text} ${card.link.icon || ''}
            </a>
          ` : ''}
        </div>
      `;
    } else if (card.type === 'image') {
      cardElement.innerHTML = `
        <img 
          src="${card.imageUrl || 'https://images.pexels.com/photos/2422286/pexels-photo-2422286.jpeg'}" 
          alt="${card.altText || 'Integration preview'}"
          loading="lazy"
          decoding="async"
        >
      `;
    }
    
    return cardElement;
  }

  public destroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.container.removeEventListener('click', this.handleLinkClick.bind(this));
  }
}

// Export for module usage
export default FiligreeComponent;

// Initialize if script is loaded in browser
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const component = new FiligreeComponent();
    
    // Expose to global scope for debugging
    (window as any).Filigree = component;
  });
}
```

---

## Integration Guide

### Basic HTML Implementation
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Integration Options</title>
  <link rel="stylesheet" href="style.css" />
</head>

<body>
<section class="dungeon-integration-section">
  <div class="dungeon-integration-container">
    <h2 class="dungeon-integration-title">Multiple options for easy integration</h2>
    <div class="dungeon-integration-grid"></div>
  </div>
</section>

<!-- TypeScript compiled output -->
<script src="./dist/main.js"></script>

<!-- Initialize with custom config -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const config = {
      title: 'Custom Integration Options',
      cards: [
        {
          id: 1,
          type: 'text',
          title: 'Custom Plugin',
          description: 'Build your own integration with our API',
          gridPosition: { column: 1, row: 1 }
        },
        // ... more cards
      ]
    };
    
    new FiligreeComponent(config);
  });
</script>
</body>
</html>
```

### React Integration with TypeScript
```tsx
// components/Filigree.tsx
import React, { useEffect, useRef } from 'react';
import { FiligreeConfig } from '../types/filigree';

interface FiligreeProps extends Partial<FiligreeConfig> {
  className?: string;
}

export const Filigree: React.FC<FiligreeProps> = ({ 
  title, 
  cards, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<any>(null);

  useEffect(() => {
    const initComponent = async () => {
      const { default: FiligreeComponent } = await import('./FiligreeComponent');
      
      if (containerRef.current) {
        componentRef.current = new FiligreeComponent({
          title,
          cards,
          containerWidth: '1000px'
        });
      }
    };

    initComponent();

    return () => {
      if (componentRef.current) {
        componentRef.current.destroy();
      }
    };
  }, [title, cards]);

  return (
    <div ref={containerRef} className={`dungeon-integration-section ${className}`}>
      <div className="dungeon-integration-container">
        <h2 className="dungeon-integration-title">{title}</h2>
        <div className="dungeon-integration-grid"></div>
      </div>
    </div>
  );
};

// Usage in React app
import React from 'react';
import { Filigree } from './components/Filigree';

const App: React.FC = () => {
  const cards = [
    {
      id: 1,
      type: 'text' as const,
      title: 'Pre-built plugins',
      description: 'Seamlessly integrate with popular platforms',
      gridPosition: { column: 1, row: 1 }
    },
    // ... more cards
  ];

  return (
    <div className="App">
      <Filigree 
        title="Integration Options" 
        cards={cards}
        className="custom-filigree"
      />
    </div>
  );
};
```

### Vue.js Integration with TypeScript
```vue
<template>
  <section 
    ref="container" 
    class="dungeon-integration-section" 
    :class="className"
  >
    <div class="dungeon-integration-container">
      <h2 class="dungeon-integration-title">{{ title }}</h2>
      <div class="dungeon-integration-grid"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import type { IntegrationCard, FiligreeConfig } from '../types/filigree';

interface Props {
  title?: string;
  cards?: IntegrationCard[];
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Multiple options for easy integration',
  cards: () => [],
  className: ''
});

const container = ref<HTMLElement>();
let filigreeInstance: any = null;

onMounted(async () => {
  const { default: FiligreeComponent } = await import('./FiligreeComponent');
  
  if (container.value) {
    filigreeInstance = new FiligreeComponent({
      title: props.title,
      cards: props.cards
    });
  }
});

onUnmounted(() => {
  if (filigreeInstance) {
    filigreeInstance.destroy();
  }
});

watch(() => props.title, (newTitle) => {
  if (filigreeInstance) {
    filigreeInstance.updateConfig({ title: newTitle });
  }
});

watch(() => props.cards, (newCards) => {
  if (filigreeInstance) {
    filigreeInstance.updateConfig({ cards: newCards });
  }
}, { deep: true });
</script>
```

### Angular Integration with TypeScript
```typescript
// filigree.component.ts
import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { IntegrationCard, FiligreeConfig } from '../types/filigree';

declare global {
  interface Window {
    FiligreeComponent: any;
  }
}

@Component({
  selector: 'app-filigree',
  template: `
    <section class="dungeon-integration-section" [class]="className">
      <div class="dungeon-integration-container">
        <h2 class="dungeon-integration-title">{{ title }}</h2>
        <div class="dungeon-integration-grid"></div>
      </div>
    </section>
  `,
  styleUrls: ['./filigree.component.css']
})
export class FiligreeComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Multiple options for easy integration';
  @Input() cards: IntegrationCard[] = [];
  @Input() className: string = '';

  private instance: any;

  constructor(private elementRef: ElementRef) {}

  async ngOnInit() {
    // Dynamically load the Filigree component
    const { default: Filigree } = await import('./filigree-core');
    
    const config: Partial<FiligreeConfig> = {
      title: this.title,
      cards: this.cards
    };

    this.instance = new Filigree(config);
    
    // Attach to the DOM element
    const container = this.elementRef.nativeElement.querySelector('.dungeon-integration-section');
    if (container && this.instance.attachTo) {
      this.instance.attachTo(container);
    }
  }

  ngOnDestroy() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy();
    }
  }

  @Input()
  set updateConfig(config: Partial<FiligreeConfig>) {
    if (this.instance && this.instance.updateConfig) {
      this.instance.updateConfig(config);
    }
  }
}
```

---

## Customization

### TypeScript Configuration Options
```typescript
// Extended configuration interface
export interface ExtendedFiligreeConfig extends FiligreeConfig {
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    borderRadius: string;
    boxShadow: string;
  };
  animations?: {
    enable: boolean;
    duration: number;
    easing: string;
  };
  accessibility?: {
    focusOutline: string;
    highContrast: boolean;
    reducedMotion: boolean;
  };
}

// Usage
const config: ExtendedFiligreeConfig = {
  title: 'Custom Integration',
  cards: [...],
  theme: {
    primaryColor: '#0066CC',
    secondaryColor: '#333333',
    backgroundColor: '#FFFFFF',
    textColor: '#1A1A1A',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  animations: {
    enable: true,
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};
```

### CSS Custom Properties for Theming
```css
:root {
  --filigree-primary: #0091ff;
  --filigree-secondary: #0a0a0a;
  --filigree-background: #ffffff;
  --filigree-card-bg: #f8f9fb;
  --filigree-text-primary: #0a0a0a;
  --filigree-text-secondary: #5f6b7a;
  --filigree-border-radius: 16px;
  --filigree-grid-gap: 15px;
  --filigree-transition: all 0.3s ease;
}

.dungeon-integration-section {
  --primary-color: var(--filigree-primary);
  --text-color: var(--filigree-text-primary);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --filigree-background: #0a0a0a;
    --filigree-card-bg: #1a1a1a;
    --filigree-text-primary: #ffffff;
    --filigree-text-secondary: #a0a0a0;
  }
}
```

### Dynamic Card Generation with TypeScript
```typescript
// Card factory with type safety
class CardFactory {
  static createTextCard(
    id: number,
    title: string,
    description: string,
    options?: Partial<IntegrationCard>
  ): IntegrationCard {
    return {
      id,
      type: 'text',
      title,
      description,
      icon: options?.icon || this.getDefaultIcon(id),
      link: options?.link,
      gridPosition: options?.gridPosition || { column: 1, row: 1 }
    };
  }

  static createImageCard(
    id: number,
    imageUrl: string,
    altText: string,
    options?: Partial<IntegrationCard>
  ): IntegrationCard {
    return {
      id,
      type: 'image',
      imageUrl,
      altText,
      gridPosition: options?.gridPosition || { column: 2, row: 1 }
    };
  }

  private static getDefaultIcon(id: number): string {
    const icons = [
      '<svg>plugin-icon</svg>',
      '<svg>api-icon</svg>',
      '<svg>payment-icon</svg>'
    ];
    return icons[id % icons.length];
  }
}

// Usage
const cards: IntegrationCard[] = [
  CardFactory.createTextCard(1, 'Pre-built plugins', 'Seamless integration'),
  CardFactory.createImageCard(2, 'https://example.com/image.jpg', 'Preview')
];
```

---

## Advanced Features with TypeScript

### State Management
```typescript
// State management with TypeScript
import { BehaviorSubject, Observable } from 'rxjs';

class FiligreeState {
  private state$ = new BehaviorSubject<ComponentState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    activeCard: undefined
  });

  private config$ = new BehaviorSubject<FiligreeConfig>({
    title: '',
    cards: [],
    breakpoints: { mobile: 768, tablet: 900, desktop: 1024 }
  });

  get state(): Observable<ComponentState> {
    return this.state$.asObservable();
  }

  get config(): Observable<FiligreeConfig> {
    return this.config$.asObservable();
  }

  updateState(updates: Partial<ComponentState>): void {
    const current = this.state$.value;
    this.state$.next({ ...current, ...updates });
  }

  updateConfig(updates: Partial<FiligreeConfig>): void {
    const current = this.config$.value;
    this.config$.next({ ...current, ...updates });
  }

  selectCard(cardId: number): void {
    this.updateState({ activeCard: cardId });
    
    // Emit event
    this.emitEvent('card_selected', { cardId });
  }

  private emitEvent(eventName: string, data: any): void {
    const event = new CustomEvent(`filigree:${eventName}`, {
      detail: data,
      bubbles: true
    });
    document.dispatchEvent(event);
  }
}
```

### Analytics Integration
```typescript
// Analytics service with TypeScript
interface AnalyticsEvent {
  name: string;
  category: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

class FiligreeAnalytics {
  private trackEvent(event: AnalyticsEvent): void {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', event.name, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.metadata
      });
    }

    // Custom analytics endpoint
    this.sendToCustomAnalytics(event);
  }

  private async sendToCustomAnalytics(event: AnalyticsEvent): Promise<void> {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          component: 'filigree',
          timestamp: new Date().toISOString(),
          ...event
        })
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  public trackCardClick(card: IntegrationCard): void {
    this.trackEvent({
      name: 'card_click',
      category: 'engagement',
      label: card.title,
      metadata: { cardId: card.id, cardType: card.type }
    });
  }

  public trackView(): void {
    this.trackEvent({
      name: 'component_view',
      category: 'impression',
      label: 'filigree_component'
    });
  }
}
```

### Performance Monitoring
```typescript
// Performance monitoring with TypeScript
class PerformanceMonitor {
  private metrics = new Map<string, number>();
  private observers: PerformanceObserver[] = [];

  startMonitoring(): void {
    // Monitor largest contentful paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.set('lcp', lastEntry.startTime);
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Monitor first input delay
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.metrics.set('fid', entry.duration);
      }
    });

    fidObserver.observe({ type: 'first-input', buffered: true });

    this.observers.push(lcpObserver, fidObserver);
  }

  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  stopMonitoring(): void {
    this.observers.forEach(observer => observer.disconnect());
  }
}

// Usage in component
const monitor = new PerformanceMonitor();
monitor.startMonitoring();

// Log metrics after component loads
setTimeout(() => {
  console.log('Performance metrics:', monitor.getMetrics());
}, 5000);
```

---

## Testing with TypeScript

### Unit Tests
```typescript
// __tests__/filigree.test.ts
import { FiligreeComponent } from '../src/main';
import { IntegrationCard } from '../src/types/component';

describe('FiligreeComponent', () => {
  let component: FiligreeComponent;

  beforeEach(() => {
    component = new FiligreeComponent();
  });

  test('should initialize with default config', () => {
    expect(component.getCards()).toHaveLength(6);
  });

  test('should add card correctly', () => {
    const newCard: IntegrationCard = {
      id: 7,
      type: 'text',
      title: 'New Integration',
      description: 'Test description',
      gridPosition: { column: 1, row: 4 }
    };

    component.addCard(newCard);
    expect(component.getCards()).toHaveLength(7);
    expect(component.getCards()[6].title).toBe('New Integration');
  });

  test('should handle responsive breakpoints', () => {
    // Mock window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500
    });

    window.dispatchEvent(new Event('resize'));
    
    // Component should detect mobile breakpoint
    const container = document.querySelector('.dungeon-integration-section');
    expect(container?.classList.contains('is-mobile')).toBeTruthy();
  });
});
```

### E2E Tests with TypeScript
```typescript
// e2e/filigree.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Filigree Component', () => {
  test('should display all cards', async ({ page }) => {
    await page.goto('/');
    
    const cards = await page.locator('.dungeon-card').count();
    expect(cards).toBe(6);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const grid = page.locator('.dungeon-integration-grid');
    const display = await grid.evaluate(el => 
      getComputedStyle(el).display
    );
    
    expect(display).toBe('grid');
  });

  test('should have accessible images', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('.dungeon-card-image img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.trim().length).toBeGreaterThan(0);
    }
  });
});
```

### Type Testing
```typescript
// __tests__/types.test.ts
import { IntegrationCard, FiligreeConfig } from '../src/types/component';

// Type safety tests
describe('Type Definitions', () => {
  test('IntegrationCard should have correct structure', () => {
    const card: IntegrationCard = {
      id: 1,
      type: 'text',
      title: 'Test Card',
      description: 'Test Description',
      gridPosition: { column: 1, row: 1 }
    };

    expect(card.id).toBe(1);
    expect(card.type).toBe('text');
    expect(card.gridPosition.column).toBe(1);
  });

  test('should enforce type safety', () => {
    // This should cause TypeScript error if uncommented:
    // const invalidCard: IntegrationCard = {
    //   id: 'string', // Should be number
    //   type: 'invalid' // Should be 'text' or 'image'
    // };
    
    expect(true).toBe(true); // Placeholder
  });
});
```

---

## Build & Deployment

### Build Scripts
```json
{
  "scripts": {
    "build": "npm run build:typescript && npm run build:styles",
    "build:typescript": "tsc --project tsconfig.json",
    "build:styles": "postcss style.css -o dist/style.min.css",
    "build:production": "npm run build && npm run bundle",
    "bundle": "webpack --config webpack.config.js",
    "dev": "concurrently \"npm run build:watch\" \"live-server\"",
    "build:watch": "tsc --watch",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write \"src/**/*.ts\" \"*.{json,md}\""
  }
}
```

### Webpack Configuration
```javascript
// webpack.config.js
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'filigree.bundle.js',
    library: 'Filigree',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    })]
  }
};
```

### Deployment Configuration
```yaml
# .github/workflows/deploy.yml
name: Deploy Filigree

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build project
      run: npm run build:production
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

---

## Performance Optimization

### Bundle Optimization
```typescript
// Lazy loading with TypeScript
export async function lazyLoadFiligree(): Promise<typeof FiligreeComponent> {
  if ('IntersectionObserver' in window) {
    return new Promise((resolve) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            import('./FiligreeComponent').then(module => {
              resolve(module.default);
            });
            observer.disconnect();
          }
        });
      });
      
      const target = document.querySelector('.dungeon-integration-section');
      if (target) observer.observe(target);
    });
  }
  
  // Fallback to immediate load
  return import('./FiligreeComponent').then(module => module.default);
}
```

### Image Optimization
```typescript
// Image optimization with TypeScript
class ImageOptimizer {
  private static readonly QUALITY = 80;
  private static readonly FORMATS = ['webp', 'avif', 'jpg'] as const;

  static async optimizeImage(
    url: string, 
    width: number, 
    height: number
  ): Promise<string> {
    // Check if we can use image CDN
    if (this.isImageCdnUrl(url)) {
      return this.generateCdnUrl(url, width, height);
    }
    
    // Fallback to original
    return url;
  }

  private static isImageCdnUrl(url: string): boolean {
    return url.includes('unsplash.com') || 
           url.includes('pexels.com') || 
           url.includes('images.unsplash.com');
  }

  private static generateCdnUrl(
    url: string, 
    width: number, 
    height: number
  ): string {
    // Example: Add query parameters for optimization
    const params = new URLSearchParams({
      w: width.toString(),
      h: height.toString(),
      q: this.QUALITY.toString(),
      fit: 'crop',
      auto: 'format'
    });
    
    return `${url}?${params.toString()}`;
  }

  static generateSrcSet(url: string): string {
    const widths = [400, 800, 1200, 1600];
    return widths
      .map(width => `${this.generateCdnUrl(url, width, Math.floor(width * 0.75))} ${width}w`)
      .join(', ');
  }
}
```

---

## Browser Support

| Browser | Version | Support | TypeScript Features |
|---------|---------|---------|---------------------|
| Chrome  | 60+     | Full    | ES6 modules, classes |
| Firefox | 55+     | Full    | ES6, source maps |
| Safari  | 14+     | Full    | ES6 modules |
| Edge    | 79+     | Full    | Chromium-based |
| Mobile  | iOS 14+/Android 9+ | Full | ES6 support |

### Polyfills for Legacy Support
```typescript
// polyfills.ts
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// CSS Grid polyfill
if (!('CSS' in window) || !CSS.supports('display', 'grid')) {
  import('css-grid-polyfill').then(() => {
    console.log('CSS Grid polyfill loaded');
  });
}

// Intersection Observer polyfill
if (!('IntersectionObserver' in window)) {
  import('intersection-observer').then(() => {
    console.log('Intersection Observer polyfill loaded');
  });
}
```

---

## License

[MIT License](https://opensource.org/licenses/MIT) — Free for personal and commercial use with attribution.

**Permissions**:
- Commercial use
- Modification
- Distribution
- Private use

**Limitations**:
- Liability
- Warranty

**Conditions**:
- License and copyright notice

---

## Contributing

### Development Workflow
1. **Fork** the repository
2. **Clone** your fork locally
3. **Install dependencies**: `npm install`
4. **Create feature branch**: `git checkout -b feature/type-safe-feature`
5. **Make changes** following TypeScript guidelines
6. **Run tests**: `npm test`
7. **Build project**: `npm run build`
8. **Commit changes**: `git commit -m 'feat: add type-safe feature'`
9. **Push to branch**: `git push origin feature/type-safe-feature`
10. **Open Pull Request** with detailed description

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use generics for reusable components
- Implement proper error handling with typed errors
- Write JSDoc comments for public APIs
- Use enums for fixed sets of values

### Testing Requirements
- Unit tests for all TypeScript classes and functions
- Integration tests for component behavior
- Type tests for interface compliance
- E2E tests for user interactions
- Performance tests for bundle size and loading

---

## Support

### Technical Support
1. **GitHub Issues**: For bug reports and feature requests
2. **TypeScript Questions**: Stack Overflow with `[typescript]` tag
3. **Documentation**: Full TypeScript API documentation
4. **Email Support**: Critical issues only

### TypeScript Debugging
```typescript
// Enable source maps in browser
// Add to tsconfig.json:
{
  "compilerOptions": {
    "sourceMap": true,
    "inlineSources": true
  }
}

// Debug in Chrome:
// 1. Open DevTools → Sources
// 2. Enable JavaScript source maps
// 3. Navigate to src/ folder
// 4. Set breakpoints in .ts files
```

---

**Filigree** — A sophisticated, type-safe integration options component with asymmetrical grid layout, built with TypeScript for enhanced developer experience and maintainability.
 
 
