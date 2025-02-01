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
            </div>
        </div>
    </footer>
</template>

<style scoped>
.page-footer {
    background: rgba(13, 17, 23, 0.95);
    backdrop-filter: blur(10px);
    position: relative;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: auto;
    padding: 0.5rem 0;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-section {
    flex: 1;
}

.footer-section h5 {
    color: #fff;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-section a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
}

.footer-section a:hover {
    color: var(--accent-4);
}

.social-links {
    display: flex;
    gap: 1rem;
}

.footer-bottom {
    padding-top: 0.5rem;
    text-align: center;
}

.copyright {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
}

@media (max-width: 768px) {
    .footer-section {
        text-align: center;
        width: 100%;
    }

    .social-links {
        justify-content: center;
    }
}
</style>
