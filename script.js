function setupLoadingAnimation() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.loader').classList.add('fade-out');
        }, 500);
    });
}

function setupNavbarScrollEffect() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function setupScrollTopButton() {
    window.addEventListener('scroll', () => {
        const scrollTop = document.querySelector('.scroll-top');
        if (window.scrollY > 300) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });

    document.querySelector('.scroll-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function setupNavigationHandler() {
    setupNavbarScrollEffect();
    setupScrollTopButton();
    setupSmoothScrolling();
}

function setupSolutionModalEventListeners() {
    const learnMoreButtons = document.querySelectorAll('.solution-learn-more');
    const foodModal = document.getElementById('foodModal');
    const waterModal = document.getElementById('waterModal');
    const energyModal = document.getElementById('energyModal');
    const closeButtons = document.querySelectorAll('.solution-modal-close');

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            openModal(event.currentTarget.getAttribute('data-solution'));
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeAllModals();
        });
    });

    window.addEventListener('click', event => {
        if (event.target.classList.contains('solution-modal')) {
            closeAllModals();
        }
    });

    function openModal(solutionType) {
        if (solutionType === 'food') {
            foodModal.style.display = 'block';
        } else if (solutionType === 'water') {
            waterModal.style.display = 'block';
        } else if (solutionType === 'energy') {
            energyModal.style.display = 'block';
        }
    }

    function closeAllModals() {
        foodModal.style.display = 'none';
        waterModal.style.display = 'none';
        energyModal.style.display = 'none';
    }
}

function setupImpactCalculator() {
    const transportationRange = document.getElementById('transportationRange');
    const transportationValue = document.getElementById('transportationValue');
    const energyRange = document.getElementById('energyRange');
    const energyValue = document.getElementById('energyValue');
    const waterRange = document.getElementById('waterRange');
    const waterValue = document.getElementById('waterValue');
    const meatRange = document.getElementById('meatRange');
    const meatValue = document.getElementById('meatValue');
    const wasteRange = document.getElementById('wasteRange');
    const wasteValue = document.getElementById('wasteValue');
    const recyclingRange = document.getElementById('recyclingRange');
    const recyclingValue = document.getElementById('recyclingValue');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsContainer = document.getElementById('resultsContainer');

    transportationRange.addEventListener('input', () => {
        transportationValue.textContent = transportationRange.value;
    });

    energyRange.addEventListener('input', () => {
        energyValue.textContent = energyRange.value;
    });

    waterRange.addEventListener('input', () => {
        waterValue.textContent = waterRange.value;
    });

    meatRange.addEventListener('input', () => {
        meatValue.textContent = meatRange.value;
    });

    wasteRange.addEventListener('input', () => {
        wasteValue.textContent = wasteRange.value;
    });

    recyclingRange.addEventListener('input', () => {
        recyclingValue.textContent = recyclingRange.value;
    });

    calculateBtn.addEventListener('click', () => {
        calculateImpact();
    });

    function calculateImpact() {
        const transportation = parseInt(transportationRange.value);
        const energy = parseInt(energyRange.value);
        const water = parseInt(waterRange.value);
        const meat = parseInt(meatRange.value);
        const waste = parseInt(wasteRange.value);
        const recycling = parseInt(recyclingRange.value);

        const transportationEmissions = transportation * 0.9;
        const energyEmissions = energy * 0.85;
        const meatEmissions = meat * 6.6;

        const totalCarbonMonthly = (transportationEmissions * 30) + energyEmissions + (meatEmissions * 4);

        const waterImpactScore = water * 30;

        const wasteImpactScore = (waste * 4) * (1 - (recycling / 100));

        updateImpactLevels(totalCarbonMonthly, waterImpactScore, wasteImpactScore);

        generateTips(transportation, energy, water, meat, waste, recycling);

        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    function updateImpactLevels(totalCarbonMonthly, waterImpactScore, wasteImpactScore) {
        let carbonImpactLevel, waterImpactLevel, wasteImpactLevel;

        if (totalCarbonMonthly < 1000) {
            carbonImpactLevel = "Low Impact (Good)";
            document.getElementById('carbonImpact').className = "impact-level impact-low";
        } else if (totalCarbonMonthly < 2000) {
            carbonImpactLevel = "Medium Impact";
            document.getElementById('carbonImpact').className = "impact-level impact-medium";
        } else {
            carbonImpactLevel = "High Impact (Needs Improvement)";
            document.getElementById('carbonImpact').className = "impact-level impact-high";
        }

        if (waterImpactScore < 2000) {
            waterImpactLevel = "Low Impact (Good)";
            document.getElementById('waterImpact').className = "impact-level impact-low";
        } else if (waterImpactScore < 3500) {
            waterImpactLevel = "Medium Impact";
            document.getElementById('waterImpact').className = "impact-level impact-medium";
        } else {
            waterImpactLevel = "High Impact (Needs Improvement)";
            document.getElementById('waterImpact').className = "impact-level impact-high";
        }

        if (wasteImpactScore < 50) {
            wasteImpactLevel = "Low Impact (Good)";
            document.getElementById('wasteImpact').className = "impact-level impact-low";
        } else if (wasteImpactScore < 100) {
            wasteImpactLevel = "Medium Impact";
            document.getElementById('wasteImpact').className = "impact-level impact-medium";
        } else {
            wasteImpactLevel = "High Impact (Needs Improvement)";
            document.getElementById('wasteImpact').className = "impact-level impact-high";
        }

        document.getElementById('carbonImpact').textContent = carbonImpactLevel;
        document.getElementById('waterImpact').textContent = waterImpactLevel;
        document.getElementById('wasteImpact').textContent = wasteImpactLevel;

        const overallScore = Math.round((totalCarbonMonthly / 30) + (waterImpactScore / 50) + (wasteImpactScore));
        let overallImpactText;

        if (overallScore < 100) {
            overallImpactText = "Your overall impact is LOW! Great job being eco-friendly!";
        } else if (overallScore < 200) {
            overallImpactText = "Your overall impact is MEDIUM. There's room for improvement.";
        } else {
            overallImpactText = "Your overall impact is HIGH. Consider making some lifestyle changes.";
        }

        document.getElementById('totalImpact').textContent = overallImpactText;
    }

    function generateTips(transportation, energy, water, meat, waste, recycling) {
        const tipsList = document.getElementById('tipsList');
        tipsList.innerHTML = "";

        const tips = [];

        if (transportation > 30) {
            tips.push("Consider carpooling, public transportation, or biking for shorter trips to reduce your transportation emissions.");
        }

        if (energy > 600) {
            tips.push("Reduce your energy consumption by using energy-efficient appliances and turning off lights and electronics when not in use.");
        }

        if (water > 100) {
            tips.push("Install water-saving fixtures and be mindful of water usage during showers and when washing dishes.");
        }

        if (meat > 14) {
            tips.push("Try incorporating more plant-based meals into your diet to reduce the environmental impact of meat consumption.");
        }

        if (waste > 30) {
            tips.push("Reduce waste by buying products with less packaging and composting organic waste.");
        }

        if (recycling < 50) {
            tips.push("Increase your recycling efforts by learning what can be recycled in your area and setting up a convenient recycling system in your home.");
        }

        tips.push("Consider using renewable energy sources like solar panels for your home.");
        tips.push("Buy locally grown food to reduce transportation emissions and support local farmers.");

        tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipsList.appendChild(li);
        });
    }
}

function setupBackgroundAnimation() {
    const canvas = document.getElementById('background-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;

    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
        colors[i] = Math.random() * 0.5 + 0.5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        vertexColors: true
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
        requestAnimationFrame(animate);

        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;

        renderer.render(scene, camera);
    }

    animate();
}

function setupGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out'
    });

    gsap.from('#definition h2', {
        scrollTrigger: {
            trigger: '#definition',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    gsap.from('#definition p', {
        scrollTrigger: {
            trigger: '#definition p',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3
    });

    gsap.from('#solutions h2', {
        scrollTrigger: {
            trigger: '#solutions',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    gsap.from('.solution-card', {
        scrollTrigger: {
            trigger: '.card-container',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2
    });

    gsap.from('#impact-calculator h2', {
        scrollTrigger: {
            trigger: '#impact-calculator',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    gsap.from('.calculator-container', {
        scrollTrigger: {
            trigger: '.calculator-container',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
}

function initializeApp() {
    setupLoadingAnimation();
    setupNavigationHandler();
    setupSolutionModalEventListeners();
    setupImpactCalculator();
    setupBackgroundAnimation();
    setupGSAPAnimations();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});