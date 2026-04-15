// MoneyCalcPro - Reviews System with LocalStorage

class ReviewSystem {
    constructor(storageKey = 'moneycalcpro_reviews') {
        this.storageKey = storageKey;
        this.reviews = this.loadReviews();
    }

    // Load reviews from localStorage
    loadReviews() {
        try {
            const reviews = localStorage.getItem(this.storageKey);
            return reviews ? JSON.parse(reviews) : [];
        } catch (error) {
            console.error('Error loading reviews:', error);
            return [];
        }
    }

    // Save reviews to localStorage
    saveReviews() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.reviews));
        } catch (error) {
            console.error('Error saving reviews:', error);
        }
    }

    // Add a new review
    addReview(name, message) {
        if (!name || !message) {
            return { success: false, error: 'Please fill in both name and review message' };
        }

        if (name.trim().length < 2) {
            return { success: false, error: 'Name must be at least 2 characters long' };
        }

        if (message.trim().length < 10) {
            const remaining = 10 - message.trim().length;
            return { success: false, error: `Please write at least ${remaining} more character${remaining > 1 ? 's' : ''} for your review` };
        }

        const review = {
            id: Date.now(),
            name: name.trim(),
            message: message.trim(),
            date: new Date().toISOString(),
            rating: 5 // Default rating
        };

        this.reviews.unshift(review);
        this.saveReviews();

        return { success: true, review };
    }

    // Get all reviews
    getReviews() {
        return this.reviews;
    }

    // Get review count
    getReviewCount() {
        return this.reviews.length;
    }

    // Delete a review (by ID)
    deleteReview(id) {
        this.reviews = this.reviews.filter(review => review.id !== id);
        this.saveReviews();
    }

    // Format date
    formatDate(isoDate) {
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Render reviews in the container
    renderReviews(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (this.reviews.length === 0) {
            container.innerHTML = `
                <div class="no-reviews" style="text-align: center; padding: 2rem; color: #6b7280;">
                    <p>No reviews yet. Be the first to share your experience!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.reviews.map(review => `
            <div class="review-item" data-id="${review.id}">
                <div class="review-author">${this.escapeHtml(review.name)}</div>
                <div class="review-date" style="font-size: 0.85rem; color: #9ca3af; margin-bottom: 0.5rem;">
                    ${this.formatDate(review.date)}
                </div>
                <div class="review-message">${this.escapeHtml(review.message)}</div>
            </div>
        `).join('');
    }

    // Initialize review form
    initForm(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = form.querySelector('#reviewName');
            const messageInput = form.querySelector('#reviewMessage');

            if (!nameInput || !messageInput) return;

            const name = nameInput.value;
            const message = messageInput.value;

            const result = this.addReview(name, message);

            if (result.success) {
                showNotification('Thank you for your review!', 'success');
                form.reset();
                this.renderReviews('reviewsList');
            } else {
                showNotification(result.error, 'error');
            }
        });
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize review system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const reviewSystem = new ReviewSystem();

    // Initialize form if it exists
    reviewSystem.initForm('reviewForm');

    // Render reviews if container exists
    reviewSystem.renderReviews('reviewsList');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReviewSystem;
}
