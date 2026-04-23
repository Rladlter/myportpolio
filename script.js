// [학습 포인트] 
// 1. querySelectorAll: 조건에 맞는 모든 HTML 요소를 가져옵니다.
// 2. forEach: 가져온 요소들을 하나씩 반복하며 기능을 부여합니다.
// 3. getBoundingClientRect: 요소가 화면 어디에 있는지 위치를 계산합니다.

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');

    const showCardsOnScroll = () => {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // 카드가 화면 하단에서 100px 위로 올라오면 보이게 설정
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // 초기 설정
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', showCardsOnScroll);
    showCardsOnScroll(); // 실행 시 첫 화면 카드 체크
});