<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchGitHubProjects } from '../services/github'
import type { GitHubProject } from '../services/github'

const projects = ref<GitHubProject[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
    try {
        projects.value = await fetchGitHubProjects()
    } catch (e) {
        error.value = 'Failed to load projects'
        console.error(e)
    } finally {
        loading.value = false
    }
})
</script>

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
                    <div class="project-card">
                        <div class="project-content">
                            <h3>{{ project.name }}</h3>
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

                            <a :href="project.html_url" target="_blank" class="btn btn-primary mt-3">View on GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

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
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 20px var(--card-shadow);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.project-card:hover {
    transform: translateY(-5px);
    background: var(--card-bg-dark);
}

.project-content {
    padding: 1.5rem;
}

.project-content h3 {
    color: var(--text-light);
    margin-bottom: 1rem;
}

.project-content p {
    color: var(--text-code);
    margin-bottom: 1.5rem;
}

.language-name {
    color: var(--text-code);
    font-size: 0.9rem;
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
    height: 8px;
    display: flex;
    border-radius: 4px;
    overflow: hidden;
    margin: 1rem 0;
}

.language-progress {
    height: 100%;
}

.languages-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
}

.language-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.language-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.btn-primary {
    background: var(--gradient-primary);
    border: none;
    box-shadow: 0 4px 15px var(--card-shadow);
}

.error-message {
    color: var(--text-light);
    text-align: center;
    padding: 2rem;
}
</style>
