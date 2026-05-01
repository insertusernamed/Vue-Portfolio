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

            <div v-else>
                <!-- Pinned Projects Section -->
                <div v-if="pinnedProjects.length > 0" class="projects-group">
                    <h3 class="group-title">Featured Projects</h3>
                    <div class="masonry-grid">
                        <div class="masonry-item" v-for="project in pinnedProjects" :key="project.name">
                            <div class="project-card"
                                :style="getProjectStyle(project.languages.nodes[0]?.color || '#666')">
                                <!-- Project Screenshot -->
                                <div class="project-screenshot"
                                    v-if="getProjectScreenshot(project.name)?.screenshot_url && !hasFailedScreenshot(project.name)">
                                    <img :src="getProjectScreenshot(project.name)?.screenshot_url || ''"
                                        :alt="`Screenshot of ${project.name}`" class="screenshot-img fade-in"
                                        @error="onImageError" @load="onImageLoad" />
                                    <div class="screenshot-overlay">
                                        <a v-if="project.preview_url" :href="project.preview_url" target="_blank"
                                            class="screenshot-link">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6">
                                                </path>
                                                <polyline points="15,3 21,3 21,9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                <div class="project-content">
                                    <div class="project-header">
                                        <h3>{{ project.name }}</h3>
                                    </div>
                                    <p>{{ project.description || 'No description available.' }}</p>

                                    <div class="languages-tags" v-if="project.languages.nodes.length > 0">
                                        <span v-for="lang in getVisibleLanguages(project.languages.nodes)"
                                            :key="lang.name" class="language-tag"
                                            :style="getLanguageTagStyle(lang.color)">
                                            {{ lang.name }}
                                        </span>
                                        <span v-if="getRemainingLanguageCount(project.languages.nodes) > 0"
                                            class="language-tag language-tag-more">
                                            +{{ getRemainingLanguageCount(project.languages.nodes) }}
                                        </span>
                                    </div>

                                    <div class="button-group mt-3">
                                        <a :href="project.url" target="_blank" class="btn btn-primary">View on
                                            GitHub</a>
                                        <a v-if="project.preview_url" :href="project.preview_url" target="_blank"
                                            class="btn btn-secondary">Visit Demo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Other Projects Section -->
                <div v-if="otherProjects.length > 0" class="projects-group">
                    <h3 class="group-title">Other Projects</h3>
                    <div class="masonry-grid">
                        <div class="masonry-item" v-for="project in visibleOtherProjects" :key="project.name">
                            <div class="project-card"
                                :style="getProjectStyle(project.languages.nodes[0]?.color || '#666')">
                                <!-- Project Screenshot -->
                                <div class="project-screenshot"
                                    v-if="getProjectScreenshot(project.name)?.screenshot_url && !hasFailedScreenshot(project.name)">
                                    <img :src="getProjectScreenshot(project.name)?.screenshot_url || ''"
                                        :alt="`Screenshot of ${project.name}`" class="screenshot-img fade-in"
                                        @error="onImageError" @load="onImageLoad" />
                                    <div class="screenshot-overlay">
                                        <a v-if="project.preview_url" :href="project.preview_url" target="_blank"
                                            class="screenshot-link">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6">
                                                </path>
                                                <polyline points="15,3 21,3 21,9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                <div class="project-content">
                                    <div class="project-header">
                                        <h3>{{ project.name }}</h3>
                                    </div>
                                    <p>{{ project.description || 'No description available.' }}</p>

                                    <div class="languages-tags" v-if="project.languages.nodes.length > 0">
                                        <span v-for="lang in getVisibleLanguages(project.languages.nodes)"
                                            :key="lang.name" class="language-tag"
                                            :style="getLanguageTagStyle(lang.color)">
                                            {{ lang.name }}
                                        </span>
                                        <span v-if="getRemainingLanguageCount(project.languages.nodes) > 0"
                                            class="language-tag language-tag-more">
                                            +{{ getRemainingLanguageCount(project.languages.nodes) }}
                                        </span>
                                    </div>

                                    <div class="button-group mt-3">
                                        <a :href="project.url" target="_blank" class="btn btn-primary">View on
                                            GitHub</a>
                                        <a v-if="project.preview_url" :href="project.preview_url" target="_blank"
                                            class="btn btn-secondary">Visit Demo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="view-more-wrap" v-if="otherProjects.length > OTHER_PROJECTS_INITIAL_LIMIT">
                        <button class="btn btn-secondary view-more-btn" @click="showAllOther = !showAllOther">
                            {{ showAllOther ? 'Show Less' : 'View More' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGitHubStore } from '../stores/githubStore'
import { useScreenshotStore } from '../stores/screenshotStore'

const githubStore = useGitHubStore()
const screenshotStore = useScreenshotStore()
const { pinnedProjects, otherProjects, loading, error } = storeToRefs(githubStore)
const OTHER_PROJECTS_INITIAL_LIMIT = 6
const showAllOther = ref(false)

const allProjects = computed(() => githubStore.allProjects)
const visibleOtherProjects = computed(() =>
    showAllOther.value ? otherProjects.value : otherProjects.value.slice(0, OTHER_PROJECTS_INITIAL_LIMIT)
)

onMounted(async () => {
    await githubStore.fetchProjects()
    if (allProjects.value.length > 0) {
        await screenshotStore.fetchScreenshots(allProjects.value)
    }
})

onUnmounted(() => {
    screenshotStore.cleanupBlobUrls()
})

function getSortedLanguages(nodes: { name: string; color: string }[]) {
    return [...nodes].sort((a, b) => a.name.localeCompare(b.name))
}

function getVisibleLanguages(nodes: { name: string; color: string }[]) {
    return getSortedLanguages(nodes).slice(0, 3)
}

function getRemainingLanguageCount(nodes: { name: string; color: string }[]) {
    return Math.max(nodes.length - 3, 0)
}

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
        background: `linear-gradient(165deg, var(--card-bg-dark) 0%, ${adjustColor(color, 0.025)} 100%)`,
        borderLeft: `1px solid ${adjustColor(color, 0.35)}`
    }
}

function getLanguageTagStyle(color: string) {
    return {
        backgroundColor: adjustColor(color, 0.2),
        borderColor: adjustColor(color, 0.7),
        color: '#f8fbff'
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

/* Masonry Grid Layout */
.masonry-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
}

@media (max-width: 992px) {
    .masonry-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 576px) {
    .masonry-grid {
        grid-template-columns: 1fr;
    }
}

.masonry-item {
    display: flex;
    width: 100%;
    min-height: 100%;
}

.project-card {
    background: var(--card-bg-dark);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px var(--card-shadow);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.project-card:hover {
    transform: none;
    box-shadow: 0 4px 20px var(--card-shadow);
}

.project-header {
    margin-bottom: 0.8rem;
}

.project-content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.project-content h3 {
    color: var(--text-light);
    margin-bottom: 0.65rem;
    font-size: 1.08rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.3;
    min-height: 2.8rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.project-content p {
    color: var(--text-code);
    margin-bottom: 1rem;
    line-height: 1.5;
    font-size: 0.86rem;
    min-height: 4rem;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
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

.languages-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1rem;
    min-height: 2rem;
}

.language-tag {
    padding: 0.28rem 0.58rem;
    border-radius: 6px;
    font-size: 0.74rem;
    font-weight: 600;
    border: 1px solid;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1.1;
    letter-spacing: 0.01em;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.45);
}

.language-tag:hover {
    transform: none;
    filter: none;
}

.language-tag-more {
    color: #9fb3d7 !important;
    background: rgba(255, 255, 255, 0.04) !important;
    border-color: rgba(255, 255, 255, 0.12) !important;
}

.error-message {
    color: var(--text-light);
    text-align: center;
    padding: 2rem;
}

.button-group {
    display: flex;
    gap: 0.55rem;
    margin-top: auto;
}

.btn {
    padding: 0.45rem 0.7rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.15s ease;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.35px;
    position: relative;
    top: 0;
    white-space: nowrap;
}

.btn:active {
    top: 0;
}

.btn-primary {
    background: var(--gradient-primary);
    border: none;
    box-shadow: 0 3px 10px rgba(56, 106, 255, 0.2);
}

.btn-primary:hover {
    box-shadow: 0 6px 20px var(--card-shadow);
}

.btn-primary:active {
    box-shadow: 0 2px 10px var(--card-shadow);
}

.btn-secondary {
    background: transparent;
    border: 1px solid var(--text-light);
    color: var(--text-light);
    position: relative;
    overflow: hidden;
    z-index: 1;
    box-shadow: none;
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
    height: 180px;
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

.projects-group {
    margin-bottom: 3.5rem;
}

.group-title {
    color: var(--text-light);
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
}

.view-more-wrap {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
}

.view-more-btn {
    min-width: 140px;
}

@media (max-width: 576px) {
    .project-content {
        padding: 1rem;
    }

    .project-content h3 {
        font-size: 0.98rem;
        min-height: 2.45rem;
    }

    .project-content p {
        font-size: 0.8rem;
        min-height: 3.7rem;
        -webkit-line-clamp: 3;
    }

    .project-screenshot {
        height: 150px;
    }
}
</style>
