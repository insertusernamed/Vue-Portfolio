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
                                A passionate full-stack developer focused on creating elegant, efficient, and
                                user-centric
                                digital solutions. Combining modern technology with creative problem-solving to build
                                applications that make a difference.
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
        description: 'Experienced in modern web development using Vue.js, React, and Node.js. Building robust applications with TypeScript, Spring Boot, and cloud-native architectures. Proficient in both SQL and NoSQL databases.',
        core: 'Vue.js · React · Node.js · TypeScript'
    },
    {
        icon: 'icon ion-settings',
        title: 'System Architecture',
        description: 'Designing scalable distributed systems with a focus on microservices architecture and API design. Experienced in implementing domain-driven design principles and event-driven architectures.',
        core: 'Microservices · API Design · System Architecture'
    },
    {
        icon: 'icon ion-cloud',
        title: 'DevOps & Cloud',
        description: 'Orchestrating cloud infrastructure on AWS and Azure. Implementing containerized solutions with Docker and Kubernetes, along with automated CI/CD pipelines using modern DevOps practices.',
        core: 'AWS · Docker · Kubernetes · CI/CD'
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
    color: #9f72ff;
    text-shadow: 0 0 15px rgba(159, 114, 255, 0.5);
}

.intro-text .lead {
    max-width: 700px;
    margin: 0 auto 2rem;
    color: #e0e0ff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    line-height: 1.8;
}

.btn-primary {
    padding: 0.8rem 2.5rem;
    font-weight: 500;
    border-radius: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: transform 0.2s;
    background: linear-gradient(135deg, #9f72ff 0%, #6d4aff 100%);
    border: none;
    box-shadow: 0 4px 15px rgba(159, 114, 255, 0.3);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(159, 114, 255, 0.5);
}

.skills-section {
    padding: 6rem 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(159, 114, 255, 0.1);
    width: 100%;
    position: relative;
}

.section-title {
    text-align: center;
    margin-bottom: 4rem;
    color: #e0e0ff;
    font-size: 2.5rem;
    padding-top: 76px;
    margin-top: -76px;
    text-shadow: 0 0 10px rgba(159, 114, 255, 0.3);
}

.row {
    margin: 0 -15px;
    display: flex;
    flex-wrap: wrap;
}

.skill-card {
    height: 100%;
    margin: 0;
    background: rgba(20, 20, 35, 0.6);
    border: 1px solid rgba(159, 114, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    padding: 2rem;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.skill-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(159, 114, 255, 0.1), rgba(109, 74, 255, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
}

.skill-card:hover {
    transform: translateY(-5px);
    background: rgba(30, 30, 50, 0.8);
    border-color: rgba(159, 114, 255, 0.3);
    box-shadow: 0 8px 30px rgba(159, 114, 255, 0.2);
}

.skill-card:hover::before {
    opacity: 1;
}

.core-tech {
    color: #9f72ff;
    font-size: 0.95rem;
    margin: 0.5rem 0 1rem;
    letter-spacing: 0.5px;
}

.skill-description {
    color: #b8b8ff;
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
    background: linear-gradient(135deg, #9f72ff 0%, #6d4aff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.skill-card h3 {
    color: #e0e0ff;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-shadow: 0 0 5px rgba(159, 114, 255, 0.3);
}

.skill-card p {
    color: #b8b8ff;
    line-height: 1.6;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.intro-section {
    background-color: var(--bg-intro);
    position: relative;
    padding: 0;
    z-index: 2;
    background: transparent;
    height: 100vh;
    display: flex;
    align-items: center;
}

.intro-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(20, 20, 35, 0.7) 100%);
    z-index: -1;
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
        min-height: 100vh;
        height: auto;
    }
}
</style>
