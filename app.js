/* ==========================================================================
   E-Portfolio JS Engine - Interactivity & Simulation Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Web App Setup
    initLoader();
    initTheme();
    initMobileMenu();
    initTypewriter();
    initScrollAnimations();
    initBackToTop();
    initProjectSimulators();
    initContactForm();
    initResumeDownloader();
});

/* ==========================================================================
   1. Loader Animation
   ========================================================================== */
function initLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.classList.add('fade-out');
        });
        // Fallback in case load event takes too long
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 1500);
    }
}

/* ==========================================================================
   2. Dark & Light Mode Theme Switcher
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check saved choice or system preferences
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        updateThemeIcon('light');
    } else {
        body.classList.remove('light-theme');
        updateThemeIcon('dark');
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('portfolio-theme', currentTheme);
            updateThemeIcon(currentTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            if (theme === 'light') {
                icon.className = 'fa-solid fa-sun';
            } else {
                icon.className = 'fa-solid fa-moon';
            }
        }
    }
}

/* ==========================================================================
   3. Mobile Responsive Menu
   ========================================================================== */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
            });
        });
    }
}

/* ==========================================================================
   4. Tagline Typewriter Animation
   ========================================================================== */
function initTypewriter() {
    const textSpan = document.querySelector('.typing-text');
    if (!textSpan) return;

    const words = [
        "First-Year CSIT Student.",
        "Aspiring Software Developer.",
        "AI/ML Enthusiast.",
        "Critical Problem Solver."
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIdx];
        if (isDeleting) {
            textSpan.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50; // Deletion is faster
        } else {
            textSpan.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIdx === currentWord.length) {
            // Word complete, pause before deletion
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   5. Scroll Linked Animations & Active Navigation
   ========================================================================== */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    // Intersection Observer for scroll fades/reveals
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Skill bar loader trigger
    const skillsSection = document.getElementById('skills');
    if (skillsSection && skillProgressBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillProgressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        skillsObserver.observe(skillsSection);
    }

    // Scroll Spy for Navbar highlighting
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ==========================================================================
   6. Back To Top Action
   ========================================================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* ==========================================================================
   7. Projects Interactive Elements & Live Simulators
   ========================================================================== */
function initProjectSimulators() {
    // -------------------------------------------------------------
    // PROJECT 1: Cyberbullying ML Model simulation
    // -------------------------------------------------------------
    const mlDemoBtn = document.getElementById('btn-proj1-demo');
    const mlDemoBox = document.getElementById('ml-demo-box');
    const mlRunBtn = document.getElementById('btn-run-ml');
    const mlInput = document.getElementById('ml-test-input');
    const mlResult = document.getElementById('ml-result');

    if (mlDemoBtn && mlDemoBox) {
        mlDemoBtn.addEventListener('click', () => {
            mlDemoBox.classList.toggle('hidden');
        });
    }

    if (mlRunBtn && mlInput && mlResult) {
        mlRunBtn.addEventListener('click', () => {
            const text = mlInput.value.trim().toLowerCase();
            if (!text) {
                mlResult.textContent = "Result: Please enter comment text first!";
                mlResult.style.color = "var(--text-muted)";
                return;
            }

            mlResult.textContent = "Processing features...";
            mlResult.style.color = "var(--primary)";

            // List of hostile or mock offensive terms
            const bullyingKeywords = ["loser", "idiot", "hate", "ugly", "stupid", "dummy", "kill", "shut up"];

            setTimeout(() => {
                let containsBadWord = bullyingKeywords.some(keyword => text.includes(keyword));
                if (containsBadWord) {
                    mlResult.innerHTML = `Result: <span style="color:var(--danger)"><i class="fa-solid fa-triangle-exclamation"></i> Hostile Content Detected (Prob: ${(80 + Math.random() * 15).toFixed(1)}%)</span>`;
                } else {
                    mlResult.innerHTML = `Result: <span style="color:var(--success)"><i class="fa-solid fa-circle-check"></i> Safe / Clean Content (Prob: ${(85 + Math.random() * 14).toFixed(1)}%)</span>`;
                }
            }, 800);
        });
    }

    // -------------------------------------------------------------
    // PROJECT 3: Student Management System Database widget
    // -------------------------------------------------------------
    const smsDemoBtn = document.getElementById('btn-proj3-demo');
    const smsDemoBox = document.getElementById('sms-demo-box');
    const smsList = document.getElementById('sms-list');
    const smsNameInput = document.getElementById('sms-name-input');
    const smsGpaInput = document.getElementById('sms-gpa-input');
    const smsAddBtn = document.getElementById('btn-add-student');

    let studentDatabase = [
        { id: 101, name: "Aria Smith", course: "B.Tech CSIT", gpa: 9.1 },
        { id: 102, name: "David Miller", course: "B.Tech CSIT", gpa: 8.4 },
        { id: 103, name: "Ethan Hunt", course: "B.Tech CSIT", gpa: 9.5 }
    ];

    function renderSmsTable() {
        if (!smsList) return;
        smsList.innerHTML = '';
        studentDatabase.forEach(st => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${st.id}</td>
                <td><strong>${st.name}</strong></td>
                <td>${st.course}</td>
                <td><span style="color:var(--primary); font-weight:600">${st.gpa.toFixed(1)}</span></td>
            `;
            smsList.appendChild(tr);
        });
    }

    if (smsDemoBtn && smsDemoBox) {
        smsDemoBtn.addEventListener('click', () => {
            smsDemoBox.classList.toggle('hidden');
            renderSmsTable();
        });
    }

    if (smsAddBtn && smsNameInput && smsGpaInput) {
        smsAddBtn.addEventListener('click', () => {
            const name = smsNameInput.value.trim();
            const gpaVal = parseFloat(smsGpaInput.value);

            if (!name || isNaN(gpaVal) || gpaVal < 0 || gpaVal > 10) {
                alert("Please enter a valid student name and GPA scale (0.0 to 10.0).");
                return;
            }

            const newId = 101 + studentDatabase.length;
            studentDatabase.push({
                id: newId,
                name: name,
                course: "B.Tech CSIT",
                gpa: gpaVal
            });

            // Keep database size limited
            if (studentDatabase.length > 5) {
                studentDatabase.shift();
            }

            smsNameInput.value = '';
            smsGpaInput.value = '';
            renderSmsTable();
        });
    }

    // -------------------------------------------------------------
    // PROJECT 2: 2D Graphics Canvas Simulator (Integrated from old project)
    // -------------------------------------------------------------
    const simWrapper = document.getElementById('c-graphics-simulator');
    const toggleSimBtn = document.getElementById('btn-toggle-c-simulator');
    const closeSimBtn = document.getElementById('btn-close-simulator');

    if (toggleSimBtn && simWrapper) {
        toggleSimBtn.addEventListener('click', () => {
            simWrapper.classList.toggle('hidden');
            if (!simWrapper.classList.contains('hidden')) {
                simWrapper.scrollIntoView({ behavior: 'smooth' });
                // Force simulation engine initialization
                initCanvasEngine();
            }
        });
    }

    if (closeSimBtn && simWrapper) {
        closeSimBtn.addEventListener('click', () => {
            simWrapper.classList.add('hidden');
        });
    }
}

/* ==========================================================================
   2D Graphics Editor Simulator Engine (Procedural coordinate plotter)
   ========================================================================== */
let canvasEngineInitialized = false;

function initCanvasEngine() {
    if (canvasEngineInitialized) return; // Prevent double-attaching listeners
    canvasEngineInitialized = true;

    const WIDTH = 80;
    const HEIGHT = 25;
    let objects = [];
    let nextId = 1;
    let canvas = Array(HEIGHT).fill().map(() => Array(WIDTH).fill('_'));

    // DOM Elements Hook
    const canvasGrid = document.getElementById('canvas-grid');
    const shapeSelect = document.getElementById('shape-select');
    const btnAddShape = document.getElementById('btn-add-shape');
    const btnUndo = document.getElementById('btn-undo');
    const btnClear = document.getElementById('btn-clear');
    const btnSave = document.getElementById('btn-save');
    const btnLoad = document.getElementById('btn-load');
    const hoverCoord = document.getElementById('hover-coord');
    const activeCount = document.getElementById('active-count');
    const shapesListBody = document.getElementById('shapes-list-body');

    // Smiley Face Template Data
    const smileyData = [
        { id: 1, type: 4, x1: 40, y1: 12, radius: 10 }, 
        { id: 2, type: 4, x1: 35, y1: 9, radius: 1.5 },   
        { id: 3, type: 4, x1: 45, y1: 9, radius: 1.5 },   
        { id: 4, type: 2, x1: 34, y1: 17, x2: 40, y2: 19 },
        { id: 5, type: 2, x1: 40, y1: 19, x2: 46, y2: 17 }  
    ];

    function clearCanvas() {
        for (let i = 0; i < HEIGHT; i++) {
            for (let j = 0; j < WIDTH; j++) {
                canvas[i][j] = '_';
            }
        }
    }

    function plot(x, y) {
        if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
            canvas[y][x] = '*';
        }
    }

    function displayCanvas() {
        let result = "";
        for (let i = 0; i < HEIGHT; i++) {
            result += canvas[i].join('') + "\n";
        }
        canvasGrid.textContent = result;
    }

    /* --- Drawing Math Algorithms --- */

    function drawLine(x1, y1, x2, y2) {
        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);
        let sx = (x1 < x2) ? 1 : -1;
        let sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            plot(x1, y1);
            if (x1 === x2 && y1 === y2) break;
            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }

    function drawRectangle(x1, y1, x2, y2) {
        const startX = Math.min(x1, x2);
        const endX = Math.max(x1, x2);
        const startY = Math.min(y1, y2);
        const endY = Math.max(y1, y2);

        for (let x = startX; x <= endX; x++) {
            plot(x, startY);
            plot(x, endY);
        }
        for (let y = startY; y <= endY; y++) {
            plot(startX, y);
            plot(endX, y);
        }
    }

    function drawTriangle(x1, y1, x2, y2, x3, y3) {
        drawLine(x1, y1, x2, y2);
        drawLine(x2, y2, x3, y3);
        drawLine(x3, y3, x1, y1);
    }

    function drawCircle(xc, yc, r) {
        for (let y = yc - r; y <= yc + r; y++) {
            for (let x = xc - r; x <= xc + r; x++) {
                let dx = x - xc;
                let dy = y - yc;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist >= r - 0.5 && dist <= r + 0.5) {
                    plot(x, y);
                }
            }
        }
    }

    // Redraw Canvas Pipeline
    function redrawCanvas() {
        clearCanvas();
        objects.forEach(obj => {
            switch (obj.type) {
                case 1:
                    drawRectangle(obj.x1, obj.y1, obj.x2, obj.y2);
                    break;
                case 2:
                    drawLine(obj.x1, obj.y1, obj.x2, obj.y2);
                    break;
                case 3:
                    drawTriangle(obj.x1, obj.y1, obj.x2, obj.y2, obj.x3, obj.y3);
                    break;
                case 4:
                    drawCircle(obj.x1, obj.y1, obj.radius);
                    break;
            }
        });
        displayCanvas();
        updateShapesTable();
    }

    /* --- DOM View Updates --- */

    function getShapeName(type) {
        switch (type) {
            case 1: return "Rectangle";
            case 2: return "Line";
            case 3: return "Triangle";
            case 4: return "Circle";
            default: return "Shape";
        }
    }

    function getShapeBadgeClass(type) {
        switch (type) {
            case 1: return "badge-rect";
            case 2: return "badge-line";
            case 3: return "badge-tri";
            case 4: return "badge-circle";
            default: return "";
        }
    }

    function getCoordsString(obj) {
        if (obj.type === 4) {
            return `Center: (${obj.x1}, ${obj.y1}) | R: ${obj.radius}`;
        } else if (obj.type === 3) {
            return `P1: (${obj.x1}, ${obj.y1}), P2: (${obj.x2}, ${obj.y2}), P3: (${obj.x3}, ${obj.y3})`;
        } else {
            return `Start: (${obj.x1}, ${obj.y1}) | End: (${obj.x2}, ${obj.y2})`;
        }
    }

    function updateShapesTable() {
        if (activeCount) activeCount.textContent = `${objects.length} Shape${objects.length === 1 ? '' : 's'}`;
        if (!shapesListBody) return;

        if (objects.length === 0) {
            shapesListBody.innerHTML = `
                <tr>
                    <td colspan="4" class="no-shapes-row">No active shapes plotted. Customize variables to draw!</td>
                </tr>
            `;
            return;
        }

        shapesListBody.innerHTML = '';
        objects.forEach(obj => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>#${obj.id}</strong></td>
                <td><span class="badge-shape ${getShapeBadgeClass(obj.type)}">${getShapeName(obj.type)}</span></td>
                <td><span class="coord-val">${getCoordsString(obj)}</span></td>
                <td>
                    <button class="btn btn-danger btn-xs btn-delete-shape" data-id="${obj.id}">
                        <i class="fa-solid fa-trash-can"></i> Del
                    </button>
                </td>
            `;
            shapesListBody.appendChild(tr);
        });

        // Attach delete events
        const delBtns = shapesListBody.querySelectorAll('.btn-delete-shape');
        delBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                objects = objects.filter(obj => obj.id !== id);
                redrawCanvas();
            });
        });
    }

    // Toggle Coordinate input forms on dropdown change
    if (shapeSelect) {
        shapeSelect.addEventListener('change', (e) => {
            const type = parseInt(e.target.value);
            
            // Hide all input forms
            document.querySelectorAll('.inputs-group').forEach(group => {
                group.classList.add('hidden');
            });

            // Show current shape selection's form inputs
            if (type === 4) {
                document.getElementById('inputs-circle').classList.remove('hidden');
            } else if (type === 3) {
                document.getElementById('inputs-triangle').classList.remove('hidden');
            } else {
                document.getElementById('inputs-line-rect').classList.remove('hidden');
            }
        });
    }

    // Add Plotted Shape Action
    if (btnAddShape) {
        btnAddShape.addEventListener('click', () => {
            const type = parseInt(shapeSelect.value);
            let shape = { id: nextId++, type: type };

            if (type === 4) { // Circle
                const xc = parseInt(document.getElementById('circle-xc').value);
                const yc = parseInt(document.getElementById('circle-yc').value);
                const r = parseInt(document.getElementById('circle-r').value);
                
                if (isNaN(xc) || isNaN(yc) || isNaN(r)) {
                    alert("Enter numeric radius & coordinate indices!");
                    return;
                }
                shape.x1 = xc;
                shape.y1 = yc;
                shape.radius = r;
            } else if (type === 3) { // Triangle
                const x1 = parseInt(document.getElementById('tri-x1').value);
                const y1 = parseInt(document.getElementById('tri-y1').value);
                const x2 = parseInt(document.getElementById('tri-x2').value);
                const y2 = parseInt(document.getElementById('tri-y2').value);
                const x3 = parseInt(document.getElementById('tri-x3').value);
                const y3 = parseInt(document.getElementById('tri-y3').value);
                
                if ([x1,y1,x2,y2,x3,y3].some(val => isNaN(val))) {
                    alert("Enter valid coordinates for all points!");
                    return;
                }
                shape.x1 = x1; shape.y1 = y1;
                shape.x2 = x2; shape.y2 = y2;
                shape.x3 = x3; shape.y3 = y3;
            } else { // Line or Rectangle
                const x1 = parseInt(document.getElementById('shape-x1').value);
                const y1 = parseInt(document.getElementById('shape-y1').value);
                const x2 = parseInt(document.getElementById('shape-x2').value);
                const y2 = parseInt(document.getElementById('shape-y2').value);
                
                if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
                    alert("Coordinates must be valid numbers!");
                    return;
                }
                shape.x1 = x1; shape.y1 = y1;
                shape.x2 = x2; shape.y2 = y2;
            }

            objects.push(shape);
            redrawCanvas();
        });
    }

    // Canvas Operation commands
    if (btnUndo) {
        btnUndo.addEventListener('click', () => {
            if (objects.length > 0) {
                objects.pop();
                redrawCanvas();
            } else {
                alert("Nothing to undo.");
            }
        });
    }

    if (btnClear) {
        btnClear.addEventListener('click', () => {
            objects = [];
            redrawCanvas();
        });
    }

    if (btnSave) {
        btnSave.addEventListener('click', () => {
            if (objects.length === 0) {
                alert("Canvas buffer is empty.");
                return;
            }
            let output = `${objects.length}\n`;
            objects.forEach(obj => {
                output += `${obj.id} ${obj.type} ${obj.x1 || 0} ${obj.y1 || 0} ${obj.x2 || 0} ${obj.y2 || 0} ${obj.x3 || 0} ${obj.y3 || 0} ${obj.radius || 0}\n`;
            });
            
            // Create download anchor
            const blob = new Blob([output], { type: 'text/plain' });
            const anchor = document.createElement('a');
            anchor.href = URL.createObjectURL(blob);
            anchor.download = 'objects.txt';
            anchor.click();
        });
    }

    if (btnLoad) {
        btnLoad.addEventListener('click', () => {
            objects = JSON.parse(JSON.stringify(smileyData));
            nextId = 6;
            redrawCanvas();
        });
    }

    // Grid Hover coordinates tracker
    if (canvasGrid) {
        canvasGrid.addEventListener('mousemove', (e) => {
            const rect = canvasGrid.getBoundingClientRect();
            const col = Math.floor(((e.clientX - rect.left) / rect.width) * WIDTH);
            const row = Math.floor(((e.clientY - rect.top) / rect.height) * HEIGHT);
            
            if (col >= 0 && col < WIDTH && row >= 0 && row < HEIGHT) {
                hoverCoord.textContent = `X: ${col}, Y: ${row}`;
            } else {
                hoverCoord.textContent = 'X: --, Y: --';
            }
        });
        
        canvasGrid.addEventListener('mouseleave', () => {
            hoverCoord.textContent = 'X: --, Y: --';
        });
    }

    // Start with blank screen display
    redrawCanvas();
}

/* ==========================================================================
   8. Contact Form Client-side Validator
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successBanner = document.getElementById('form-success-alert');
    
    if (!form) return;

    const fields = [
        { input: document.getElementById('contact-name'), error: document.getElementById('name-error'), check: (val) => val.trim().length > 0 },
        { input: document.getElementById('contact-email'), error: document.getElementById('email-error'), check: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
        { input: document.getElementById('contact-subject'), error: document.getElementById('subject-error'), check: (val) => val.trim().length > 0 },
        { input: document.getElementById('contact-message'), error: document.getElementById('message-error'), check: (val) => val.trim().length > 0 }
    ];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        fields.forEach(field => {
            if (!field.input) return;
            const parent = field.input.parentElement;
            const isValid = field.check(field.input.value);

            if (!isValid) {
                parent.classList.add('invalid');
                isFormValid = false;
            } else {
                parent.classList.remove('invalid');
            }
            
            // Re-validate on input typing
            field.input.addEventListener('input', () => {
                if (field.check(field.input.value)) {
                    parent.classList.remove('invalid');
                }
            });
        });

        if (isFormValid) {
            const submitBtn = document.getElementById('btn-submit-contact');
            const originalHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...`;

            setTimeout(() => {
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHtml;
                
                // Show success block
                if (successBanner) {
                    successBanner.classList.remove('hidden');
                    setTimeout(() => {
                        successBanner.classList.add('hidden');
                    }, 4000);
                }

                form.reset();
            }, 1200);
        }
    });
}

/* ==========================================================================
   9. Resume Downloader Simulation
   ========================================================================== */
function initResumeDownloader() {
    const resumeBtn = document.getElementById('btn-download-resume');
    if (!resumeBtn) return;

    resumeBtn.addEventListener('click', () => {
        const resumeText = `==========================================================================
                      UJJWAL GD - COMPUTER SCIENCE & IT
==========================================================================
Email: ujjwalgd200612@gmail.com
Phone: +91 98765 43210 (Placeholder)
Location: Bengaluru, Karnataka, India
GitHub: github.com/ujjwalgd200612-sudo
LinkedIn: linkedin.com/in/ujjwalgd200612-sudo

--------------------------------------------------------------------------
CAREER OBJECTIVE
--------------------------------------------------------------------------
Ambitious, analytical First-Year CSIT student aspiring to become a Software
Developer and AI/ML Engineer. Proficient in program syntax, procedural logic,
and algorithms, aiming to design efficient, user-centric solutions.

--------------------------------------------------------------------------
EDUCATION
--------------------------------------------------------------------------
* B.Tech in Computer Science and IT (Ongoing - First Year)
  Reva University, Bengaluru | Expected Graduation: 2029

* Pre-University Education (PCME)
  REVA Independent PU College, Bengaluru | Year: 2023 - 2025
  Academic Grade: 94.5%

--------------------------------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------------------------------
* Programming: Python, C, C++, Java, JavaScript
* Web Technologies: HTML5, CSS3, ES6 JavaScript
* Version Control & Tools: Git, GitHub, VS Code, Antigravity IDE
* Theoretical Focus: Data Structures (DSA), Object-Oriented Programming (OOP)
                      Database Management Systems (DBMS), Operating Systems

--------------------------------------------------------------------------
PROJECTS LOG
--------------------------------------------------------------------------
1. Cyberbullying Detection Model
   - Developed a machine learning text classifier utilizing Python.
   - Performed TF-IDF token vectorization and Logistic Regression classification.
   - Analyzed social feed text for automated hostile content filtering.

2. 2D Console Graphics Editor in C
   - Programmed a vector-to-raster graphic renderer running in standard C.
   - Embedded coordinate geometry logic mapping lines, circles, and shapes.
   - Built Bresenham's Line and Midpoint Circle algorithms onto character matrices.

3. Student Management System
   - Constructed a C++ file-serializable student indexing app.
   - Designed storage sorting parameters tracking records efficiently.

--------------------------------------------------------------------------
CERTIFICATIONS
--------------------------------------------------------------------------
- Python for Data Science (IBM / Coursera)
- Introduction to Machine Learning (Kaggle)
- Responsive Web Design (freeCodeCamp)

==========================================================================`;

        const blob = new Blob([resumeText], { type: 'text/plain' });
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = 'Ujjwal_GD_Resume.txt';
        anchor.click();
    });
}
