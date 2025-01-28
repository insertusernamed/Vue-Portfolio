<script setup lang="ts">
import LoadingIcon from './LoadingIcon.vue'
</script>

<template>
    <footer class="page-footer py-4">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h5>Quick Links</h5>
                    <ul>
                        <li><a href="#intro">Home</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#cv">CV</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h5>Contact</h5>
                    <ul>
                        <li>
                            <i class="icon ion-at"></i>
                            <a href="mailto:yevtushenkodan04@gmail.com">yevtushenkodan04@gmail.com</a>
                        </li>
                        <li>
                            <i class="icon ion-ios-telephone"></i>
                            <span>(437)-216-6742</span>
                        </li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h5>Connect</h5>
                    <div class="social-links">
                        <a href="https://www.linkedin.com/in/daniel-yevtushenko" target="_blank" title="LinkedIn">
                            <LoadingIcon iconClass="icon ion-social-linkedin" />
                        </a>
                        <a href="https://github.com/insertusernamed" target="_blank" title="GitHub">
                            <i class="icon ion-social-github"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p class="copyright">
                    © {{ new Date().getFullYear() }} Daniel Yevtushenko. Built with Vue.js
                </p>
                <div class="tech-stack">
                    <span>Technologies used:</span>
                    <i class="icon ion-social-html5" title="HTML5"></i>
                    <i class="icon ion-social-css3" title="CSS3"></i>
                    <i class="icon ion-social-javascript" title="JavaScript"></i>
                    <i class="icon ion-social-github" title="GitHub API"></i>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.page-footer {
    background: var(--bg-projects);
    color: var(--text-light);
    margin-top: auto;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-section h5 {
    color: var(--accent-4);
    font-size: 1.1rem;
    margin-bottom: 1rem;
}

.footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-section ul li {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.footer-section a {
    color: var(--text-code);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-section a:hover {
    color: var(--accent-4);
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-links a {
    font-size: 1.5rem;
    color: var(--text-light);
    transition: all 0.3s ease;
}

.social-links a:hover {
    color: var(--accent-4);
    transform: translateY(-2px);
}

.footer-bottom {
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.copyright {
    color: var(--text-code);
    margin: 0;
}

.tech-stack {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.tech-stack span {
    color: var (--text-code);
}

.tech-stack i {
    font-size: 1.25rem;
    color: var(--accent-4);
    transition: transform 0.3s ease;
}

.tech-stack i:hover {
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .footer-bottom {
        flex-direction: column;
        text-align: center;
    }

    .tech-stack {
        justify-content: center;
    }

    .footer-section {
        text-align: center;
    }

    .footer-section ul li {
        justify-content: center;
    }

    .social-links {
        justify-content: center;
    }
}
</style>
