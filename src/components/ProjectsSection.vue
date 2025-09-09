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
import { onMounted } from 'vue'
import { useGitHubStore } from '../stores/githubStore'

const githubStore = useGitHubStore()
const { projects, loading, error } = githubStore

onMounted(async () => {
    await githubStore.fetchProjects()
})

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
</style>
