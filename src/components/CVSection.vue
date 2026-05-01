<template>
    <section id="cv" class="cv-section">
        <div class="container-fluid px-4">
            <h2 class="section-title">Professional Journey</h2>

            <div class="work-experience group">
                <h3 class="group-title">Work Experience</h3>
                <div class="experience-item">
                    <div class="row">
                        <div class="col-md-6">
                            <h4>Test Engineer Intern</h4>
                            <span class="company-badge">Dayforce (formerly Ceridian HCM Inc)</span>
                        </div>
                        <div class="col-md-6">
                            <span class="period">09/2023 - 01/2024</span>
                        </div>
                    </div>
                    <p>
                        Built and maintained automated test coverage with SpecFlow and collaborated with developers on
                        defect triage and release readiness. Focused on reducing manual regression effort and improving
                        reliability in day-to-day QA workflows.
                    </p>
                </div>
                <div class="experience-item">
                    <div class="row">
                        <div class="col-md-6">
                            <h4>Full Stack Developer</h4>
                            <span class="company-badge">B-Right Software</span>
                        </div>
                        <div class="col-md-6">
                            <span class="period">10/2021 - 02/2023</span>
                        </div>
                    </div>
                    <p>
                        Developed internal and client-facing features using Vue.js and Python, and automated repetitive
                        team workflows. The automation work reduced manual processing time and improved turnaround for
                        routine operations.
                    </p>
                </div>
            </div>

            <div class="education group">
                <h3 class="group-title">Education</h3>
                <div class="education-item">
                    <div class="row">
                        <div class="col-md-6">
                            <h4>Bachelor of Computer Science</h4>
                            <span class="school-badge">Lakehead University</span>
                        </div>
                        <div class="col-md-6">
                            <span class="period">05/2024 - Present</span>
                        </div>
                    </div>
                    <p>Currently pursuing a Bachelor of Computer Science with a focus on software engineering.</p>
                </div>
                <div class="education-item">
                    <div class="row">
                        <div class="col-md-6">
                            <h4>Computer Programming Diploma (CMPG)</h4>
                            <span class="school-badge">Georgian College</span>
                        </div>
                        <div class="col-md-6">
                            <span class="period">09/2022 - 04/2024</span>
                        </div>
                    </div>
                    <p>Completed a Computer Programming Co-op diploma with hands-on experience in full-stack project work.</p>
                </div>
            </div>

            <div class="contact-info group">
                <h3 class="group-title">Contact Information</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <i class="icon ion-at"></i>
                        <a href="mailto:yevtushenkodan04@gmail.com">yevtushenkodan04@gmail.com</a>
                    </div>
                    <div class="info-item">
                        <i class="icon ion-social-github"></i>
                        <a href="https://github.com/insertusernamed" target="_blank" rel="noopener">GitHub Profile</a>
                    </div>
                    <div class="info-item">
                        <i class="icon ion-ios-telephone"></i>
                        <a href="tel:+14372166742">(437)-216-6742</a>
                    </div>
                    <div class="info-item">
                        <i class="icon ion-social-linkedin"></i>
                        <a href="https://linkedin.com/in/daniel-yevtushenko" target="_blank" rel="noopener">LinkedIn
                            Profile</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.cv-section {
    background: linear-gradient(to bottom, rgba(5, 8, 16, 0.42), rgba(4, 6, 12, 0.62));
    backdrop-filter: blur(4px);
    padding: 3rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.section-title {
    text-align: center;
    margin-bottom: 3rem;
    color: #e0e0ff;
    font-size: 2rem;
}

.group {
    margin-bottom: 3rem;
}

.group-title {
    color: #e0e0ff;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

.experience-item,
.education-item {
    background: rgba(12, 16, 30, 0.9);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.company-badge,
.school-badge {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    background: linear-gradient(135deg, #9f72ff 0%, #6d4aff 100%);
    color: white;
}

.period {
    color: #c9d2ea;
    display: block;
    text-align: right;
    font-size: 0.95rem;
}

h4 {
    color: #e0e0ff;
    margin-bottom: 0.5rem;
}

p {
    color: #d3daec;
    line-height: 1.7;
    font-size: 1rem;
    margin-top: 0.5rem;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    background: rgba(12, 16, 30, 0.9);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem;
    background: rgba(18, 24, 42, 0.85);
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.06);
}

.info-item i {
    font-size: 1.2rem;
    background: linear-gradient(135deg, #9f72ff 0%, #6d4aff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.info-item a {
    color: #f0f3ff;
    text-decoration: none;
    font-size: 1rem;
}

.info-item a:hover,
.info-item a:focus-visible {
    text-decoration: underline;
    text-underline-offset: 2px;
}

@media (max-width: 768px) {
    .period {
        text-align: left;
        margin-top: 0.5rem;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }
}
</style>
