// src/main.ts

// 1. Define a function to initialize the interactive elements
function initializeCards(): void {
    // Get all card elements
    const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.dungeon-card');

    // 2. Add an event listener to each card
    cards.forEach((card: HTMLElement) => {
        // TypeScript ensures 'card' is an HTMLElement here.
        
        // Add a click handler (example interaction)
        card.addEventListener('click', (event: MouseEvent) => {
            // Find the heading element inside the clicked card
            const heading = card.querySelector('.dungeon-card-heading');

            if (heading) {
                // Example of type-checking: TypeScript confirms 'heading' is an Element
                console.log(`Card Clicked: ${heading.textContent}`);

                // Simple visual feedback
                card.style.opacity = '0.9'; 
                setTimeout(() => card.style.opacity = '1', 100);
            }
        });
    });

    // 3. Example of accessing a specific element by class
    const titleElement = document.querySelector('.dungeon-integration-title');
    // If the element exists, use it. The 'if (titleElement)' check is good practice.
    if (titleElement) {
        // TypeScript correctly infers titleElement is an Element (or specifically, an HTMLElement if you cast it)
        titleElement.textContent = "NEW: Multiple Integration Options (TypeScript Initialized)";
    }
}

// Ensure the DOM is fully loaded before trying to access elements
document.addEventListener('DOMContentLoaded', initializeCards);