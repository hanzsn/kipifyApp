// LoadPlaces.js
import { placesAPI } from './Api.js';

// create a single global observer instead of reinitializing
let globalObserver = null;

const initializeObserver = () => {
    if (globalObserver) {
        globalObserver.disconnect();
    }

    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    globalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // unobserve after animation to improve performance
                globalObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    return globalObserver;
};

export const loadPlaces = async (region = null) => {
    const container = document.querySelector('.card-container');
    if (!container) {
        console.error('Card container not found!');
        return;
    }

    container.innerHTML = '<div class="flex flex-row gap-4 col-span-3 justify-center py-12 text-white">Loading places...<div class="inline-block w-8 h-8 border-b-2 border-white rounded-full animate-spin"></div></div>';

    try {
        const places = region
            ? await placesAPI.getPlacesByRegion(region)
            : await placesAPI.getAllPlaces();

        if (!places || places.length === 0) {
            container.innerHTML = '<div class="col-span-3 text-center py-12 text-white">No places found</div>';
            return;
        }

        // use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();

        const animationPattern = [
            'left-text', 'top', 'right',
            'left-text', 'top', 'right',
            'left-text', 'bot', 'right',
            'left-text', 'bot', 'right'
        ];

        places.forEach((place, index) => {
            const cardWrapper = document.createElement('div');
            const animationClass = animationPattern[index % animationPattern.length];
            cardWrapper.className = `w-full ${animationClass}`;

            const card = document.createElement('app-card');
            card.setAttribute('name', place.name);
            card.setAttribute('province', place.province);
            card.setAttribute('region', place.region);
            card.setAttribute('description', place.description);
            card.setAttribute('image', place.image_url);
            card.setAttribute('place-id', place.id);

            cardWrapper.appendChild(card);
            fragment.appendChild(cardWrapper);
        });

        // single DOM update instead of multiple
        container.innerHTML = '';
        container.appendChild(fragment);

        console.log(`Loaded ${places.length} places`);

        // initialize observer once
        const observer = initializeObserver();

        // observe all animated elements
        requestAnimationFrame(() => {
            const animatedElements = container.querySelectorAll('.top, .left, .left-text, .right, .bot');
            animatedElements.forEach(el => observer.observe(el));
        });

    } catch (error) {
        console.error('Error loading places:', error);
        container.innerHTML = '<div class="col-span-3 text-center py-12 text-red-500">Error loading places. Check console.</div>';
    }
};

// export the observer for cleanup if needed
export const cleanupObserver = () => {
    if (globalObserver) {
        globalObserver.disconnect();
        globalObserver = null;
    }
};