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
                            <LoadingIcon iconClass="icon ion-at" />
                            <a href="mailto:yevtushenkodan04@gmail.com">yevtushenkodan04@gmail.com</a>
                        </li>
                        <li>
                            <LoadingIcon iconClass="icon ion-ios-telephone" />
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
                            <LoadingIcon iconClass="icon ion-social-github" />
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
                    <LoadingIcon iconClass="icon ion-social-html5" title="HTML5" />
                    <LoadingIcon iconClass="icon ion-social-css3" title="CSS3" />
                    <LoadingIcon iconClass="icon ion-social-javascript" title="JavaScript" />
                    <LoadingIcon iconClass="icon ion-social-github" title="GitHub API" />
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.page-footer {
    background: rgba(13, 17, 23, 0.95);
    backdrop-filter: blur(10px);
    position: relative;
    z-index: 2;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
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
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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

.footer-section a,
.footer-section span {
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
    color: rgba(255, 255, 255, 0.7);
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
