// [추가] 다크/라이트모드토글JavaScript
function toggleTheme() {
    const body = document.body;
    const btn= document.getElementById('themeToggleBtn');
    const navbar = document.querySelector('.navbar');
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        btn.textContent= 'LIGHT';
        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');
    } else {
        btn.textContent= 'DARK';
        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
    }
}

// 1. 문서에서 ID가 'themeToggleBtn'인 요소를 찾기
const themeBtn = document.getElementById('themeToggleBtn');

//2. 버튼이 존재할 경우에만 클릭 이벤트(addEventListener)를 연결하기.
if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
}