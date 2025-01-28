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
    background: var(--gradient-primary);
    box-shadow: 0 2px 15px var(--card-shadow);
}

.navbar {
    padding: 1rem 0;
}

.logo {
    font-weight: 700;
    font-size: 1.2rem;
}

.nav-link {
    color: var(--text-light) !important;
    font-weight: 500;
    padding: 0.5rem 1rem !important;
}

.nav-link.active {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    transition: all 0.3s ease;
    border-radius: 4px;
}
</style>
