// Blog App JavaScript
class BlogApp {
    constructor() {
        this.likeCount = 0;
        this.newsVotes = 0;
        this.blogVotes = 0;
        this.comments = [];
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.updateUI();
        this.setupEventListeners();
    }

    // Storage Methods
    loadFromStorage() {
        const savedData = localStorage.getItem('blogAppData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.likeCount = data.likeCount || 0;
            this.newsVotes = data.newsVotes || 0;
            this.blogVotes = data.blogVotes || 0;
            this.comments = data.comments || [];
        }
    }

    saveToStorage() {
        const data = {
            likeCount: this.likeCount,
            newsVotes: this.newsVotes,
            blogVotes: this.blogVotes,
            comments: this.comments
        };
        localStorage.setItem('blogAppData', JSON.stringify(data));
    }

    // Like Functionality
    likePost() {
        this.likeCount++;
        this.updateLikeCount();
        this.saveToStorage();
        this.showNotification('Post liked! 👍');
    }

    updateLikeCount() {
        const likeElement = document.getElementById('likeCount');
        if (likeElement) {
            likeElement.textContent = this.likeCount;
            likeElement.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                likeElement.style.animation = '';
            }, 300);
        }
    }

    // Poll Functionality
    vote(type) {
        if (type === 'news') {
            this.newsVotes++;
        } else if (type === 'blog') {
            this.blogVotes++;
        }
        this.updatePollResults();
        this.saveToStorage();
        this.showNotification(`Voted for ${type} app! 🗳️`);
    }

    updatePollResults() {
        const newsElement = document.getElementById('newsVotes');
        const blogElement = document.getElementById('blogVotes');
        
        if (newsElement) newsElement.textContent = this.newsVotes;
        if (blogElement) blogElement.textContent = this.blogVotes;
    }

    // Comment Functionality
    addComment() {
        const input = document.getElementById('commentInput');
        const commentText = input.value.trim();

        if (commentText === '') {
            this.showNotification('Please enter a comment! ⚠️', 'warning');
            return;
        }

        const comment = {
            id: Date.now(),
            text: commentText,
            timestamp: new Date().toLocaleString()
        };

        this.comments.unshift(comment);
        this.renderComments();
        this.saveToStorage();
        
        input.value = '';
        this.showNotification('Comment added! 💬');
    }

    renderComments() {
        const commentList = document.getElementById('commentList');
        if (!commentList) return;

        commentList.innerHTML = '';
        
        this.comments.forEach(comment => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="comment-text">${this.escapeHtml(comment.text)}</div>
                <div class="comment-time">${comment.timestamp}</div>
            `;
            commentList.appendChild(li);
        });
    }

    // Authentication
    handleLogin() {
        const username = document.querySelector('#auth-section input[placeholder="Username"]');
        const password = document.querySelector('#auth-section input[placeholder="Password"]');
        
        if (!username.value.trim() || !password.value.trim()) {
            this.showNotification('Please enter username and password! ⚠️', 'warning');
            return;
        }
        
        this.showNotification(`Welcome back, ${username.value}! 👋`);
        username.value = '';
        password.value = '';
    }

    handleSignup() {
        const username = document.querySelectorAll('#auth-section input[placeholder="New Username"]')[1];
        const password = document.querySelectorAll('#auth-section input[placeholder="New Password"]')[1];
        
        if (!username.value.trim() || !password.value.trim()) {
            this.showNotification('Please enter username and password! ⚠️', 'warning');
            return;
        }
        
        if (password.value.length < 6) {
            this.showNotification('Password must be at least 6 characters! ⚠️', 'warning');
            return;
        }
        
        this.showNotification(`Account created for ${username.value}! 🎉`);
        username.value = '';
        password.value = '';
    }

    // UI Updates
    updateUI() {
        this.updateLikeCount();
        this.updatePollResults();
        this.renderComments();
    }

    // Utility Methods
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#28a745' : '#ffc107'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    setupEventListeners() {
        // Add enter key support for comment input
        const commentInput = document.getElementById('commentInput');
        if (commentInput) {
            commentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addComment();
                }
            });
        }

        // Add enter key support for login/signup forms
        const inputs = document.querySelectorAll('#auth-section input');
        inputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    if (input.placeholder.includes('Username') || input.placeholder.includes('Password')) {
                        this.handleLogin();
                    } else {
                        this.handleSignup();
                    }
                }
            });
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .comment-text {
        font-weight: 500;
        margin-bottom: 0.5rem;
    }
    
    .comment-time {
        font-size: 0.85rem;
        color: #6c757d;
        font-style: italic;
    }
`;
document.head.appendChild(style);

// Initialize the app
const blogApp = new BlogApp();

// Global functions for HTML onclick handlers
function likePost() {
    blogApp.likePost();
}

function vote(type) {
    blogApp.vote(type);
}

function addComment() {
    blogApp.addComment();
}

function handleLogin() {
    blogApp.handleLogin();
}

function handleSignup() {
    blogApp.handleSignup();
}
