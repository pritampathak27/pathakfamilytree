document.addEventListener('DOMContentLoaded', () => {

    const welcomeScreen = document.getElementById('welcome-screen');
    const exploreBtn = document.getElementById('explore-btn');
    const treeContainer = document.querySelector('.tree');

    // --- Welcome Screen Logic ---
    exploreBtn.addEventListener('click', () => {
        welcomeScreen.classList.add('fade-out');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
        }, 1000);
    });

    // --- Main Tree Interaction Logic ---
    treeContainer.addEventListener('click', (event) => {
        const target = event.target;
        const card = target.closest('.card');
        const arrow = target.closest('.arrow');

        // --- Logic for clicking on a PERSON's CARD ---
        if (card && card.dataset.state === 'initial') {
            const parentLi = card.closest('li');
            
            // Reveal the spouse if they exist
            const spouse = parentLi.querySelector('.spouse');
            if (spouse) {
                spouse.classList.remove('hidden');
            }

            // Reveal the arrow OR the "End" message
            const generationLink = parentLi.querySelector('.generation-link');
            const endOfLine = parentLi.querySelector('.end-of-line');

            if (generationLink) {
                generationLink.classList.remove('hidden');
            } else if (endOfLine) {
                endOfLine.classList.remove('hidden');
            }
            
            // Update state to prevent re-triggering
            card.dataset.state = 'revealed';
        }

        // --- Logic for clicking on the ARROW ---
        if (arrow) {
            const parentLi = arrow.closest('li');
            // Select the children list that is a DIRECT child of this li
            const childrenUl = parentLi.querySelector(':scope > ul.children');

            if (childrenUl) {
                // Show the next generation
                childrenUl.classList.remove('hidden');
                // Hide the arrow after it's clicked
                arrow.parentElement.classList.add('hidden');
            }
        }
    });

});