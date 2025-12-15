// Активация мобильного меню
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const headerButtons = document.querySelector('.header-buttons');

    // Переключение мобильного меню
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Показываем кнопки в мобильном меню
            if (navMenu.classList.contains('active')) {
                headerButtons.style.display = 'flex';
                headerButtons.style.flexDirection = 'column';
                headerButtons.style.gap = '15px';
                headerButtons.style.marginTop = '20px';
                headerButtons.style.width = '100%';

                // Добавляем кнопки в меню
                const loginBtn = document.querySelector('.btn-login').cloneNode(true);
                const signupBtn = document.querySelector('.btn-signup').cloneNode(true);

                // Очищаем предыдущие кнопки
                const existingButtons = navMenu.querySelectorAll('.mobile-btn');
                existingButtons.forEach(btn => btn.remove());

                // Добавляем новые кнопки
                loginBtn.classList.add('mobile-btn');
                signupBtn.classList.add('mobile-btn');
                loginBtn.style.width = '100%';
                signupBtn.style.width = '100%';

                navMenu.appendChild(loginBtn);
                navMenu.appendChild(signupBtn);
            } else {
                headerButtons.style.display = 'none';
            }
        });
    }

    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.header-content') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            headerButtons.style.display = 'none';
        }
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Закрываем мобильное меню при переходе
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    headerButtons.style.display = 'none';
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка всех кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();

            // Разные действия для разных кнопок
            if (button.classList.contains('btn-login')) {
                alert('Login form would open here');
            } else if (button.classList.contains('btn-signup')) {
                alert('Sign up form would open here');
            } else if (button.classList.contains('btn-primary')) {
                alert('Joining for free... Redirecting to registration.');
            } else if (button.classList.contains('btn-secondary')) {
                alert('Opening video demonstration...');
            } else if (button.classList.contains('btn-join')) {
                alert('Joining User Experience Class at 12:00 PM...');
            } else if (button.classList.contains('btn-learn')) {
                alert('Learning more about TOTC...');
            } else if (button.classList.contains('btn-access')) {
                const accessCode = document.querySelector('.access-input').value;
                if (accessCode) {
                    alert(`Joining with access code: ${accessCode}`);
                } else {
                    alert('Please enter an access code');
                }
            } else if (button.classList.contains('quiz-submit')) {
                alert('Answer submitted successfully!');
            } else if (button.classList.contains('btn-more')) {
                alert('Loading more features...');
            } else if (button.classList.contains('btn-seeall')) {
                alert('Showing all courses...');
            } else if (button.classList.contains('btn-explore')) {
                alert('Exploring course...');
            } else if (button.classList.contains('btn-assessment')) {
                alert('Opening assessment form...');
            } else if (button.classList.contains('newsletter-btn')) {
                // Обработка формы подписки
                event.preventDefault();
                const newsletterForm = document.getElementById('newsletterForm');
                const emailInput = newsletterForm.querySelector('.newsletter-input');

                if (emailInput.value) {
                    alert(`Thank you for subscribing with ${emailInput.value}! You'll receive our newsletter soon.`);
                    emailInput.value = '';
                } else {
                    alert('Please enter your email address');
                }
            } else {
                alert(`${buttonText} button clicked!`);
            }
        });
    });

    // Обработка опций в тесте
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение у всех опций
            quizOptions.forEach(opt => {
                opt.style.background = 'var(--white)';
                opt.style.borderColor = 'var(--border-color)';
                opt.style.color = 'var(--text-dark)';
            });

            // Выделяем выбранную опцию
            this.style.background = 'var(--primary-blue)';
            this.style.borderColor = 'var(--primary-blue)';
            this.style.color = 'var(--white)';
        });
    });

    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми секциями
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Анимация для статистики
    const statNumbers = document.querySelectorAll('.stat-box .number');
    statNumbers.forEach(stat => {
        const originalText = stat.textContent;
        stat.textContent = '0';

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(stat, originalText);
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(stat);
    });

    // Функция анимации счетчика
    function animateCounter(element, target) {
        const targetNumber = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        let currentNumber = 0;
        const increment = targetNumber / 50;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentNumber) + suffix;
        }, 30);
    }

    // Обработка формы подписки
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');

            if (emailInput.value && validateEmail(emailInput.value)) {
                alert(`Thank you for subscribing with ${emailInput.value}! You'll receive our newsletter soon.`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }

    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Добавляем эффект наведения для всех карточек
    const cards = document.querySelectorAll('.tool-card, .feature-item, .feature-grid-item, .course-card, .news-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Инициализация года в футере
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-column h4');
    if (yearElement && yearElement.textContent.includes('2023')) {
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear.toString());
    }
});
