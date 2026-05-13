function validateAndLogin() {
    let valid = true;

    // 입력값 가져오기
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // ① 아이디 유효성 검사 (4~20자 영문/숫자)
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    if (!usernameRegex.test(username)) {
        showError('usernameInput', 'usernameMsg', '아이디는 4~20자의 영문 및 숫자여야 합니다.');
        valid = false;
    } else {
        clearError('usernameInput', 'usernameMsg');
    }

    // ② 패스워드 유효성 검사 (8자 이상, 영문+숫자+특수문자 포함)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showError('passwordInput', 'passwordMsg', '비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.');
        valid = false;
    } else {
        clearError('passwordInput', 'passwordMsg');
    }

    // ③ 모든 항목 통과 시 로그인 실행
    if (valid) {
        // 기존에 정의된 submitLogin() 함수 호출
        if (typeof submitLogin === 'function') {
            submitLogin();
        } else {
            console.log("로그인 성공: 서버로 데이터를 전송합니다.");
            // 실제 제출 로직이 없다면 여기에 추가 (예: document.getElementById('loginForm').submit();)
        }
    }
}