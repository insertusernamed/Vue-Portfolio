<template>
    <section id="cv" class="cv-section">
        <div class="container-fluid px-4">
            <h2 class="section-title">Curriculum Vitae</h2>

            <div class="work-experience group">
                <h3 class="group-title">Work Experience</h3>
                <div class="experience-item">
                    <div class="row">
                        <div class="col-md-6">
                            <h4>Software Development Engineer</h4>
                            <span class="company-badge">Ceridian HCM Inc</span>
                        </div>
                        <div class="col-md-6">
                            <span class="period">09/2023 - Present</span>
                        </div>
                    </div>
                    <p>Led the development of automated testing frameworks using SpecFlow and Selenium, achieving 40%
                        reduction in QA cycle time.
                        Implemented CI/CD pipelines and contributed to core platform features using C# and .NET Core.
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
                <div class="education-item">
                    <div class="row">
                        <div class="col-md-6">
                            <h4>High School Diploma</h4>
                            <span class="school-badge">Richmond Hill High School</span>
                        </div>
                        <div class="col-md-6">
                            <span class="period">08/2018 - 06/2022</span>
                        </div>
                    </div>
                    <p>Completed High School Diploma at Richmond Hill High School.</p>
                </div>
            </div>

            <div class="contact-info group">
                <h3 class="group-title">Contact Information</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <i class="icon ion-android-calendar"></i>
                        <span>11/22/2004</span>
                    </div>
                    <div class="info-item">
                        <i class="icon ion-person"></i>
                        <span>Daniel Yevtushenko</span>
                    </div>
                    <div class="info-item">
                        <i class="icon ion-ios-telephone"></i>
                        <span>(437)-216-6742</span>
                    </div>
                    <div class="info-item">
                        <i class="icon ion-at"></i>
                        <span>yevtushenkodan04@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.cv-section {
    background: var(--bg-cv);
    position: relative;
    padding: 6rem 0;
}

.group {
    margin-bottom: 4rem;
}

.group-title {
    color: var(--text-primary);
    font-size: 1.8rem;
    margin-bottom: 2rem;
    text-align: center;
}

.experience-item,
.education-item {
    background: linear-gradient(135deg, #fff, #f8f9fa);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px var(--card-shadow);
    margin-bottom: 1.5rem;
    border: none;
    transition: transform 0.3s ease, background 0.3s ease;
}

.experience-item:hover,
.education-item:hover {
    background: linear-gradient(135deg, #fff, #fff);
    transform: translateY(-3px);
}

.company-badge,
.school-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.875rem;
    margin-top: 0.5rem;
}

.company-badge {
    background: var(--gradient-primary);
    color: white;
}

.school-badge {
    background: var(--gradient-hover);
    color: white;
}

.period {
    color: #6c757d;
    display: block;
    text-align: right;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.info-item {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.info-item i {
    font-size: 1.5rem;
    color: var(--accent-3);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

h4 {
    color: var(--text-primary);
}

p {
    color: var(--text-secondary);
}

@media (max-width: 768px) {
    .period {
        text-align: left;
        margin-top: 0.5rem;
    }
}
</style>
