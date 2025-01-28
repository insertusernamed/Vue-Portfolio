<script setup lang="ts">
import { ref } from 'vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import CVSection from '../components/CVSection.vue'

const skills = ref([
    {
        icon: 'icon ion-code',
        title: 'Full-Stack Development',
        description: 'Experienced in both frontend and backend development using modern technologies like Vue, React, Node.js, and Spring Boot. Strong foundation in cloud-native applications.'
    },
    {
        icon: 'icon ion-settings',
        title: 'System Architecture',
        description: 'Skilled in designing scalable and maintainable software architectures, with expertise in microservices, API design, and distributed systems.'
    },
    {
        icon: 'icon ion-cloud',
        title: 'DevOps & Cloud',
        description: 'Proficient with CI/CD pipelines, containerization, and cloud platforms including AWS and Azure. Experience with infrastructure as code and automated deployment.'
    }
])
</script>

<template>
    <div class="portfolio-page">
        <section id="intro" class="intro-section">
            <div class="container-fluid px-4">
                <div class="content-wrapper">
                    <div class="avatar-wrapper">
                        <div class="avatar"></div>
                    </div>
                    <div class="intro-text">
                        <h1>Hi, I'm <span>Daniel Yevtushenko</span></h1>
                        <p class="lead">
                            A passionate full-stack developer focused on creating elegant, efficient, and user-centric
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
                            <p>{{ skill.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <ProjectsSection />

        <CVSection />
    </div>
</template>

<style scoped>
.portfolio-page {
    width: 100%;
    overflow-x: hidden;
    background-color: #ffffff;
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
    border: 4px solid #fff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.intro-text {
    margin-bottom: 2rem;
}

.intro-text h1 {
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
    color: #2c3e50;
}

.intro-text h1 span {
    color: var(--primary-blue);
}

.intro-text .lead {
    max-width: 700px;
    margin: 0 auto 2rem;
    color: #6c757d;
    line-height: 1.8;
}

.btn-primary {
    padding: 0.8rem 2.5rem;
    font-weight: 500;
    border-radius: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: transform 0.2s;
    background: var(--gradient-primary);
    border: none;
    box-shadow: 0 4px 15px var(--card-shadow);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--card-shadow);
}

.skills-section {
    padding: 6rem 0;
    background: var(--gradient-skills);
    width: 100%;
    position: relative;
}

.section-title {
    text-align: center;
    margin-bottom: 4rem;
    color: #2c3e50;
    font-size: 2.5rem;
    padding-top: 76px;
    /* Add padding to account for fixed navbar */
    margin-top: -76px;
    /* Offset the padding for smooth scrolling */
}

.row {
    margin: 0 -15px;
    display: flex;
    flex-wrap: wrap;
}

.skill-card {
    height: 100%;
    margin: 0;
    background: linear-gradient(135deg, #fff, #f8f9fa);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px var(--card-shadow);
    border: none;
    transition: transform 0.3s ease;
}

.skill-card:hover {
    transform: translateY(-5px);
    background: linear-gradient(135deg, #fff, #fff);
}

.icon-wrapper {
    font-size: 2.5rem;
    color: var(--accent-1);
    margin-bottom: 1.5rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.skill-card h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.skill-card p {
    color: var(--text-secondary);
    line-height: 1.6;
}

.intro-section {
    background-color: var(--bg-intro);
    position: relative;
    padding: 6rem 0;
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
        padding: 3rem 0;
    }

    .skills-section {
        padding: 3rem 0;
    }
}
</style>
