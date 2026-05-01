<template>
    <nav class="navbar navbar-expand-lg fixed-top portfolio-navbar gradient navbar-dark">
        <div class="container">
            <a href="#" class="navbar-brand logo">Daniel Yevtushenko</a>
            <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navbarNav">
                <span class="visually-hidden">Toggle navigation</span>
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#intro">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#skills">Skills</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#projects">Projects</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#cv">CV</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.portfolio-navbar {
    background: linear-gradient(90deg, rgba(72, 98, 224, 0.9) 0%, rgba(86, 112, 238, 0.9) 55%, rgba(64, 92, 210, 0.9) 100%);
    box-shadow: 0 10px 30px rgba(6, 12, 28, 0.35);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.navbar {
    padding: 1rem 0;
}

.logo {
    font-weight: 700;
    font-size: 1.2rem;
    letter-spacing: 0.01em;
}

.nav-link {
    color: var(--text-light) !important;
    font-weight: 500;
    padding: 0.42rem 0.9rem !important;
    border-radius: 999px;
    transition: background-color 0.18s ease, color 0.18s ease;
}

.nav-link.active {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: none;
    color: #ffffff !important;
}
</style>
