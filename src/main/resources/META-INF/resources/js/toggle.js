// // [추가] 다크/라이트모드토글JavaScript
// function toggleTheme() {
//     const body = document.body;
//     const btn= document.getElementById('themeToggleBtn');
//     const navbar = document.querySelector('.navbar');
//     body.classList.toggle('light-mode');
//     if (body.classList.contains('light-mode')) {
//         btn.textContent= 'LIGHT';
//         navbar.classList.remove('navbar-dark', 'bg-dark');
//         navbar.classList.add('navbar-light', 'bg-light');
//     } else {
//         btn.textContent= 'DARK';
//         navbar.classList.remove('navbar-light', 'bg-light');
//         navbar.classList.add('navbar-dark', 'bg-dark');
//     }
// }

// // 1. 문서에서 ID가 'themeToggleBtn'인 요소를 찾기
// const themeBtn = document.getElementById('themeToggleBtn');

// //2. 버튼이 존재할 경우에만 클릭 이벤트(addEventListener)를 연결하기.
// if (themeBtn) {
//     themeBtn.addEventListener('click', toggleTheme);
// }

{
    // 중괄호로 감싸면 이 안에서만 변수가 유효하므로 중복 선언 에러를 방지할 수 있습니다.
    const toggleTheme = () => {
        const body = document.body;
        const btn = document.getElementById('themeToggleBtn');
        const navbar = document.querySelector('.navbar');

        body.classList.toggle('light-mode');

        if (btn) {
            btn.textContent = body.classList.contains('light-mode') ? '☀️LIGHT' : '🌙DARK';
        }

        if (navbar) {
            if (body.classList.contains('light-mode')) {
                navbar.classList.remove('navbar-dark', 'bg-dark');
                navbar.classList.add('navbar-light', 'bg-light');
            } else {
                navbar.classList.remove('navbar-light', 'bg-light');
                navbar.classList.add('navbar-dark', 'bg-dark');
            }
        }
    };

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        // 기존에 달려있을지 모를 이벤트를 제거하고 다시 등록하거나, 
        // 간단하게 바로 등록합니다.
        themeBtn.onclick = toggleTheme; 
    }
}