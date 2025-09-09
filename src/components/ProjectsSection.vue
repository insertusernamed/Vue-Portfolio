<template>
    <section id="projects" class="projects-section">
        <div class="container-fluid px-4">
            <h2 class="section-title">Recent Work</h2>

            <div v-if="loading" class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading projects...</p>
            </div>

            <div v-else-if="error" class="error-message">
                {{ error }}
            </div>

            <div v-else class="row">
                <div class="col-md-6 col-lg-4 mb-4" v-for="project in projects" :key="project.name">
                    <div class="project-card" :style="getProjectStyle(project.topLanguages[0]?.color || '#666')">
                        <!-- Project Screenshot -->
                        <div class="project-screenshot" v-if="getProjectScreenshot(project.name)?.screenshot_url">
                            <img :src="getProjectScreenshot(project.name)?.screenshot_url || ''"
                                :alt="`Screenshot of ${project.name}`" class="screenshot-img fade-in"
                                @error="onImageError" @load="onImageLoad" />
                            <div class="screenshot-overlay">
                                <a v-if="project.preview_url" :href="project.preview_url" target="_blank"
                                    class="screenshot-link">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15,3 21,3 21,9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <!-- Placeholder for projects without screenshots -->
                        <div class="project-placeholder"
                            v-else-if="project.preview_url && !hasFailedScreenshot(project.name)">
                            <div class="placeholder-content">
                                <LoadingIcon icon-class="fa-solid fa-image" />
                                <p>Screenshot loading...</p>
                            </div>
                        </div>

                        <!-- Failed screenshot state -->
                        <div class="project-placeholder failed" v-else-if="hasFailedScreenshot(project.name)">
                            <div class="placeholder-content">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                </svg>
                                <p>Screenshot unavailable</p>
                            </div>
                        </div>

                        <div class="project-content">
                            <div class="project-header">
                                <h3>{{ project.name }}</h3>
                                <div class="project-decoration"
                                    :style="{ background: adjustColor(project.topLanguages[0]?.color || '#666', 0.15) }">
                                </div>
                            </div>
                            <p>{{ project.description || 'No description available.' }}</p>

                            <div class="languages-bar">
                                <div v-for="lang in project.topLanguages" :key="lang.language" class="language-progress"
                                    :style="{
                                        width: lang.percent + '%',
                                        backgroundColor: lang.color
                                    }">
                                </div>
                            </div>

                            <div class="languages-legend">
                                <div v-for="lang in project.topLanguages" :key="lang.language" class="language-item">
                                    <span class="language-dot" :style="{ backgroundColor: lang.color }"></span>
                                    <span class="language-name">{{ lang.language }}</span>
                                </div>
                            </div>

                            <div class="button-group mt-3">
                                <a :href="project.html_url" target="_blank" class="btn btn-primary">View on GitHub</a>
                                <a v-if="project.preview_url" :href="project.preview_url" target="_blank"
                                    class="btn btn-secondary">Visit Demo</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGitHubStore } from '../stores/githubStore'
import { useScreenshotStore } from '../stores/screenshotStore'
import LoadingIcon from './LoadingIcon.vue'

const githubStore = useGitHubStore()
const screenshotStore = useScreenshotStore()
const { projects, loading, error } = storeToRefs(githubStore)
const { screenshots, loading: screenshotLoading } = storeToRefs(screenshotStore)

onMounted(async () => {
    await githubStore.fetchProjects()
    if (projects.value.length > 0) {
        await screenshotStore.fetchScreenshots(projects.value)
    }
})

onUnmounted(() => {
    screenshotStore.cleanupBlobUrls()
})

function getProjectScreenshot(projectName: string) {
    return screenshotStore.getScreenshotByName(projectName)
}

function hasFailedScreenshot(projectName: string) {
    const screenshot = screenshotStore.getScreenshotByName(projectName)
    return screenshot && screenshot.status === 'failed'
}

function onImageError(event: Event) {
    const img = event.target as HTMLImageElement
    img.style.display = 'none'
}

function onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement
    img.classList.add('loaded')
}

function getProjectStyle(color: string) {
    return {
        background: `linear-gradient(145deg, var(--card-bg-dark) 0%, ${adjustColor(color, 0.05)} 100%)`,
        borderLeft: `3px solid ${adjustColor(color, 0.7)}`
    }
}

function adjustColor(color: string, opacity: number): string {
    // Handle undefined or invalid colors
    if (!color || color === '#000') return '#666666';

    // Remove # if present
    const hex = color.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
</script>


<style scoped>
.projects-section {
    background: var(--bg-projects);
    position: relative;
    padding: 6rem 0;
}

.section-title {
    color: var(--text-light);
}

.project-card {
    background: var(--card-bg-dark);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px var(--card-shadow);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    position: relative;
}

.project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px var(--card-shadow);
}

.project-header {
    position: relative;
    margin-bottom: 1.5rem;
}

.project-decoration {
    position: absolute;
    top: -1.5rem;
    right: -1.5rem;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.15;
    pointer-events: none;
}

.project-content {
    padding: 2rem;
    position: relative;
    z-index: 1;
}

.project-content h3 {
    color: var(--text-light);
    margin-bottom: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.02em;
}

.project-content p {
    color: var(--text-code);
    margin-bottom: 1.5rem;
    line-height: 1.6;
    font-size: 0.95rem;
}

.loading-spinner {
    color: var(--text-light);
    text-align: center;
    padding: 2rem;
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.languages-bar {
    height: 6px;
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    margin: 1.5rem 0;
    background: rgba(0, 0, 0, 0.2);
}

.language-progress {
    height: 100%;
    transition: all 0.2s ease;
}

.project-card:hover .language-progress {
    transform: scaleY(1.2);
}

.languages-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.language-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.language-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.language-name {
    color: var(--text-code);
    font-size: 0.85rem;
    font-weight: 500;
}

.btn-primary {
    background: var(--gradient-primary);
    border: none;
    box-shadow: 0 4px 15px var(--card-shadow);
}

.btn-primary:hover {
    box-shadow: 0 6px 20px var(--card-shadow);
}

.btn-primary:active {
    box-shadow: 0 2px 10px var(--card-shadow);
}

.error-message {
    color: var(--text-light);
    text-align: center;
    padding: 2rem;
}

.button-group {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.btn {
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.15s ease;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    top: 0;
}

.btn:active {
    top: 2px;
}

.btn-secondary {
    background: transparent;
    border: 1px solid var(--text-light);
    color: var(--text-light);
    position: relative;
    overflow: hidden;
    z-index: 1;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-secondary:hover {
    color: var(--card-bg-dark);
    border-color: transparent;
    background: var(--text-light);
}

.btn-secondary:active {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: #e0e0e0;
}

/* Screenshot Styles */
.project-screenshot {
    position: relative;
    overflow: hidden;
    border-radius: 16px 16px 0 0;
    height: 200px;
    background: rgba(0, 0, 0, 0.1);
}

.screenshot-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease, opacity 0.4s ease;
    opacity: 0;
}

.screenshot-img.fade-in {
    opacity: 0;
    animation: fadeInImage 0.6s ease-out forwards;
}

.screenshot-img.loaded {
    opacity: 1;
}

@keyframes fadeInImage {
    from {
        opacity: 0;
        transform: scale(1.05);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.project-card:hover .screenshot-img {
    transform: scale(1.05);
}

.screenshot-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project-screenshot:hover .screenshot-overlay {
    opacity: 1;
}

.screenshot-link {
    color: white;
    padding: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.screenshot-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
    color: white;
}

.project-placeholder {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 16px 16px 0 0;
    transition: all 0.3s ease;
}

.project-placeholder.failed {
    background: rgba(220, 53, 69, 0.1);
    border: 1px dashed rgba(220, 53, 69, 0.3);
}

.placeholder-content {
    text-align: center;
    color: var(--text-code);
    opacity: 0.6;
    animation: fadeInPlaceholder 0.4s ease-out;
}

.project-placeholder.failed .placeholder-content {
    color: rgba(220, 53, 69, 0.8);
}

@keyframes fadeInPlaceholder {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 0.6;
        transform: translateY(0);
    }
}

.placeholder-content svg {
    margin-bottom: 0.5rem;
    opacity: 0.5;
}

.placeholder-content p {
    margin: 0;
    font-size: 0.85rem;
}
</style>
