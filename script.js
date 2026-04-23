// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 내비게이션 부드러운 스크롤 기능
    const navLinks = document.querySelectorAll('.nav-links a, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 앵커 이동 동작 방지
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 내비게이션 바 높이를 고려한 스크롤 위치 계산
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. 스크롤에 따른 요소 등장 애니메이션 (Intersection Observer 활용)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 요소가 10% 화면에 보일 때 트리거
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 페이드 인 효과를 위해 opacity와 transform 변경 (CSS에 클래스를 추가해도 좋지만 JS로 직접 제어)
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // 한 번 애니메이션 후 감시 해제
            }
        });
    }, observerOptions);

    // 애니메이션을 적용할 요소들 초기 상태 설정 및 관찰 시작
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-text');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});