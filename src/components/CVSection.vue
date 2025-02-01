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
                        Developed automation tests using SpecFlow to enhance testing efficiency and quality assurance
                        processes.
                        Collaborated with development teams to identify, report, and troubleshoot software defects.
                        Performed maintenance on existing codebase to improve code quality and resolve issues.
                        Automated critical test scenarios, significantly reducing manual testing efforts.
                        Actively contributed to testing deliverables, ensuring timely release of high-quality software.
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
                    <p>Architected and developed scalable web applications using Vue.js and Python.
                        Implemented automated workflows that increased team productivity by 45% and reduced manual
                        processing time by 70%.</p>
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
                    <p>Currently pursuing a Computer Science Bachelors Degree at Lakehead University.</p>
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
                    <p>Completed Computer Programming Co-op Diploma at Georgian College.</p>
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
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    padding: 3rem 0;
    border-top: 1px solid rgba(159, 114, 255, 0.1);
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
    background: rgba(20, 20, 35, 0.6);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border: 1px solid rgba(159, 114, 255, 0.1);
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
    color: #b8b8ff;
    display: block;
    text-align: right;
    font-size: 0.9rem;
}

h4 {
    color: #e0e0ff;
    margin-bottom: 0.5rem;
}

p {
    color: #b8b8ff;
    line-height: 1.6;
    margin-top: 0.5rem;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    background: rgba(20, 20, 35, 0.6);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(159, 114, 255, 0.1);
}

.info-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem;
    background: rgba(30, 30, 50, 0.4);
    border-radius: 6px;
}

.info-item i {
    font-size: 1.2rem;
    background: linear-gradient(135deg, #9f72ff 0%, #6d4aff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.info-item a {
    color: #e0e0ff;
    text-decoration: none;
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
