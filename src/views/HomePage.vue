<template>
    <div class="portfolio-page" role="main">
        <BlackHoleCanvas :particle-count="particleCount" />
        <DebugMenu v-model:particle-count="particleCount" />
        <div class="content-container">
            <section id="intro" class="intro-section">
                <div class="container-fluid px-4 h-100 d-flex align-items-center">
                    <div class="content-wrapper">
                        <div class="avatar-wrapper">
                            <div class="avatar"></div>
                        </div>
                        <div class="intro-text">
                            <h1>Hi, I'm <span>Daniel Yevtushenko</span></h1>
                            <p class="lead">
                                I build full-stack products with Vue, Java/Spring Boot, GraphQL, and Docker. Recent
                                work includes a university scheduling platform, NASA Space Apps submissions, and a
                                portfolio data pipeline that serves live project data from GitHub.
                            </p>
                            <a href="mailto:yevtushenkodan04@gmail.com" class="btn btn-primary btn-lg">
                                Let's Connect
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="skills" class="skills-section">
                <div class="container-fluid px-4">
                    <h2 class="section-title">Technical Expertise</h2>
                    <div class="row">
                        <div class="col-lg-4 col-md-6 mb-4" v-for="(skill, index) in skills" :key="index">
                            <div class="skill-card">
                                <div class="icon-wrapper">
                                    <i :class="skill.icon"></i>
                                </div>
                                <h3>{{ skill.title }}</h3>
                                <p class="core-tech">{{ skill.core }}</p>
                                <p class="skill-description">{{ skill.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProjectsSection />

            <CVSection />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import CVSection from '../components/CVSection.vue'
import BlackHoleCanvas from '../components/BlackHoleCanvas.vue'
import DebugMenu from '../components/DebugMenu.vue'

const getDefaultParticleCount = () => {
    return window.innerWidth < 768 ? 2000 : 4000
}

const particleCount = ref(getDefaultParticleCount())

const skills = ref([
    {
        icon: 'icon ion-code',
        title: 'Full-Stack Development',
        description: 'Built and shipped Vue + TypeScript frontends backed by Java/Spring Boot and Node services. Comfortable owning features across API contracts, database integration, and UI implementation.',
        core: 'Vue.js · React · Node.js · TypeScript'
    },
    {
        icon: 'icon ion-settings',
        title: 'Data & API Design',
        description: 'Designed a GraphQL layer that shapes GitHub data for frontend consumption, including filtering, caching, and resolver-based aggregation to keep the client simpler and faster.',
        core: 'GraphQL · REST · Caching · Schema Design'
    },
    {
        icon: 'icon ion-cloud',
        title: 'Applied Product Work',
        description: 'Delivered practical projects like a carpool app prototype, an e-commerce platform for plant sales, and simulation/data tools with production-style deployment workflows.',
        core: 'Product Delivery · Docker · Vercel · Iteration'
    }
])
</script>


<style scoped>
.black-hole-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 1;
}

.content-container {
    position: relative;
    z-index: 1;
    background: transparent;
}

.portfolio-page {
    width: 100%;
    overflow-x: hidden;
    background-color: #0a0a0a;
    position: relative;
    isolation: isolate;
}

.container-fluid {
    max-width: 1400px;
    margin: 0 auto;
}

.content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding: 0 15px;
}

.avatar-wrapper {
    margin-bottom: 2rem;
}

.avatar {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    margin: 0 auto;
    background: url('@/assets/avatar.jpg') center/cover;
    border: 4px solid rgba(159, 114, 255, 0.3);
    box-shadow: 0 4px 20px rgba(159, 114, 255, 0.2);
}

.intro-text {
    margin-bottom: 2rem;
}

.intro-text h1 {
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.intro-text h1 span {
    color: #8f84ff;
    text-shadow: none;
}

.intro-text .lead {
    max-width: 700px;
    margin: 0 auto 2rem;
    color: #d0d6e8;
    text-shadow: none;
    line-height: 1.8;
}

.btn-primary {
    padding: 0.8rem 2.5rem;
    font-weight: 500;
    border-radius: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: transform 0.2s;
    background: linear-gradient(135deg, #6479ff 0%, #4c60d8 100%);
    border: none;
    box-shadow: 0 4px 12px rgba(58, 90, 214, 0.25);
}

.btn-primary:hover {
    transform: none;
    box-shadow: 0 4px 12px rgba(58, 90, 214, 0.25);
}

.skills-section {
    padding: 6rem 0;
    background: rgba(8, 10, 18, 0.92);
    backdrop-filter: blur(6px);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    width: 100%;
    position: relative;
}

.section-title {
    text-align: center;
    margin-bottom: 4rem;
    color: #e5e9f5;
    font-size: 2.5rem;
    padding-top: 76px;
    margin-top: -76px;
    text-shadow: none;
}

.row {
    margin: 0 -15px;
    display: flex;
    flex-wrap: wrap;
}

.skill-card {
    height: 100%;
    margin: 0;
    background: rgba(14, 18, 30, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    padding: 2rem;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.skill-card:hover {
    transform: none;
    background: rgba(18, 22, 36, 0.95);
    border-color: rgba(143, 132, 255, 0.25);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.core-tech {
    color: #8f84ff;
    font-size: 0.95rem;
    margin: 0.5rem 0 1rem;
    letter-spacing: 0.5px;
}

.skill-description {
    color: #b6bfd8;
    line-height: 1.6;
    margin: 0;
}

.skill-header,
.expertise-badge,
.tech-section,
.primary-tech,
.additional-tech,
.tech-tag,
.tech-tag.primary {
    display: none;
}

.icon-wrapper {
    font-size: 2.5rem;
    color: var(--accent-1);
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #8f84ff 0%, #6a81f2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.skill-card h3 {
    color: #e5e9f5;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-shadow: none;
}

.skill-card p {
    color: #b6bfd8;
    line-height: 1.6;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.intro-section {
    position: relative;
    padding: 0;
    z-index: 1;
    background: transparent;
    min-height: 100svh;
    display: flex;
    align-items: center;
    overflow: clip;
}

.intro-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom,
            rgba(4, 7, 14, 0.58) 0%,
            rgba(8, 10, 18, 0.76) 100%);
    z-index: 0;
}

.intro-section>* {
    position: relative;
    z-index: 1;
}

.section-separator {
    height: 4rem;
    background: linear-gradient(to bottom right, var(--bg-skills), var(--bg-projects));
}

@media (min-width: 768px) {
    .container-fluid {
        padding: 0 30px;
    }
}

@media (max-width: 767px) {
    .container-fluid {
        padding: 0 15px;
    }

    .intro-section {
        padding: 0;
        min-height: 100svh;
        height: auto;
    }
}
</style>
