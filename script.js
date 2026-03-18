console.log("Portfolio site loaded");

const toggleButton = document.getElementById("themeToggle");
const logo = document.getElementById("siteLogo");
const cards = document.querySelectorAll(".card");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const typingText = document.getElementById("typingText");

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalFeatures = document.getElementById("modalFeatures");
const modalGithub = document.getElementById("modalGithub");

const heroTitle = "Sammie's Portfolio";
let typingIndex = 0;

const projectData = {
    zombie: {
        title: "Zombie War Simulation",
        image: "images/zombie-war.png",
        imageAlt: "Zombie War Simulation screenshot",
        description: "A Java object-oriented combat simulation featuring survivors, zombies, weapons, and battle logic designed with UML and multiple classes.",
        tech: ["Java", "Object-Oriented Programming", "UML Design"],
        features: [
            "Multiple survivor and zombie interactions",
            "Weapon system with different damage and accuracy values",
            "Battle simulation logic",
            "Class-based project design"
        ],
        github: "https://github.com/sambo0709"
    },
    recipe: {
        title: "Recipe API",
        image: "images/recipe-api.png",
        imageAlt: "Recipe API screenshot",
        description: "A Node.js REST API built with Express and MongoDB that supports authentication, structured routes, and recipe management.",
        tech: ["Node.js", "Express", "MongoDB", "REST API Design"],
        features: [
            "Recipe CRUD routes",
            "Authentication support",
            "MongoDB integration",
            "Structured backend routing"
        ],
        github: "https://github.com/sambo0709"
    },
    pet: {
        title: "Pet Database",
        image: "images/pet-database.png",
        imageAlt: "Pet Database screenshot",
        description: "A JavaFX desktop application for managing pet records with a structured interface and database design.",
        tech: ["Java", "JavaFX", "Database Design", "Object-Oriented Programming"],
        features: [
            "Graphical user interface for records",
            "Pet data management",
            "Organized class structure",
            "Desktop application workflow"
        ],
        github: "https://github.com/sambo0709/PetDatabase"
    },
    taskflow: {
        title: "TaskFlow API",
        image: "images/taskflow-api.png",
        imageAlt: "TaskFlow API screenshot",
        description: "A Python Flask backend for task management demonstrating REST concepts, routing, and API development.",
        tech: ["Python", "Flask", "REST API Development"],
        features: [
            "Task management endpoints",
            "Flask route handling",
            "Structured backend logic",
            "API-focused design"
        ],
        github: "https://github.com/sambo0709"
    }
};

function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggleButton.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        toggleButton.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
}

function revealCards() {
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < window.innerHeight - 100) {
            card.classList.add("show");
        }
    });
}

function updateLogo() {
    if (window.scrollY > 60) {
        logo.classList.add("scrolled");
    } else {
        logo.classList.remove("scrolled");
    }
}

function updateActiveNav() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

function typeHeroTitle() {
    if (!typingText) return;

    if (typingIndex < heroTitle.length) {
        typingText.textContent += heroTitle.charAt(typingIndex);
        typingIndex++;
        setTimeout(typeHeroTitle, 90);
    }
}

function fillList(target, items) {
    target.innerHTML = "";

    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        target.appendChild(li);
    });
}

function openProject(projectKey) {
    const project = projectData[projectKey];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = project.imageAlt;
    modalDescription.textContent = project.description;
    modalGithub.href = project.github;

    fillList(modalTech, project.tech);
    fillList(modalFeatures, project.features);

    modal.showModal();
}

if (modal) {
    modal.addEventListener("click", (event) => {
        const article = modal.querySelector(".modal-card");
        const rect = article.getBoundingClientRect();

        const clickedInside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!clickedInside) {
            modal.close();
        }
    });
}

window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        toggleButton.textContent = "☀️";
    }

    revealCards();
    updateLogo();
    updateActiveNav();
    typeHeroTitle();
});

window.addEventListener("scroll", () => {
    revealCards();
    updateLogo();
    updateActiveNav();
});