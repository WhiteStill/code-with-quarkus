// function validateAndLogin() {
//     let valid = true;

//     // 입력값 가져오기
//     const usernameInput = document.getElementById('usernameInput');
//     const passwordInput = document.getElementById('passwordInput');
    
//     const username = usernameInput.value.trim();
//     const password = passwordInput.value;

//     // ① 아이디 유효성 검사 (4~20자 영문/숫자)
//     const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
//     if (!usernameRegex.test(username)) {
//         showError('usernameInput', 'usernameMsg', '아이디는 4~20자의 영문 및 숫자여야 합니다.');
//         valid = false;
//     } else {
//         clearError('usernameInput', 'usernameMsg');
//     }

//     // ② 패스워드 유효성 검사 (8자 이상, 영문+숫자+특수문자 포함)
//     const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
//     if (!passwordRegex.test(password)) {
//         showError('passwordInput', 'passwordMsg', '비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.');
//         valid = false;
//     } else {
//         clearError('passwordInput', 'passwordMsg');
//     }

//     // ③ 모든 항목 통과 시 로그인 실행
//     if (valid) {
//         // 기존에 정의된 submitLogin() 함수 호출
//         if (typeof submitLogin === 'function') {
//             submitLogin();
//         } else {
//             console.log("로그인 성공: 서버로 데이터를 전송합니다.");
//             // 실제 제출 로직이 없다면 여기에 추가 (예: document.getElementById('loginForm').submit();)
//         }
//     }

//     function showError(fieldId, message) {
//         const field = document.getElementById(fieldId);
//         field.classList.add('is-invalid');
//         const msg = document.getElementById(fieldId + 'Msg');
//         if (msg) msg.textContent = message;
//     }
//     function clearError(fieldId) {
//         const field = document.getElementById(fieldId);
//         field.classList.remove('is-invalid');
//         field.classList.add('is-valid');
//     }

//     async function submitLogin() {
//         const password = document.getElementById('passwordInput').value;
//         const hashed = await hashPassword(password);
//         document.getElementById('password').value = hashed;
//         document.getElementById('loginForm').submit();
//     }

// }
// [1] 로그인 유효성 검사 함수
function validateAndLogin() {
    let valid = true;

    // HTML에 적힌 ID와 정확히 일치시킵니다.
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    
    if (!usernameInput || !passwordInput) return;

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // ① 아이디 유효성 검사 (4~20자 영문/숫자)
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    if (!usernameRegex.test(username)) {
        // 첫 번째 인자는 테두리를 바꿀 input ID, 두 번째 인자는 글씨를 채울 div ID
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

    // ③ 모든 항목 통과 시 암호화 및 로그인 실행
    if (valid) {
        submitLogin();
    }
}

// [2] 에러 표시 함수 (HTML의 ID 구조를 명확히 받도록 인자 3개로 수정)
function showError(fieldId, msgId, message) {
    const field = document.getElementById(fieldId);
    const msg = document.getElementById(msgId);
    
    if (field) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
    }
    if (msg) {
        msg.textContent = message;
    }
}

// [3] 에러 제거 및 성공 표시 함수
function clearError(fieldId, msgId) {
    const field = document.getElementById(fieldId);
    const msg = document.getElementById(msgId);
    
    if (field) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    }
    if (msg) {
        msg.textContent = ''; // 기존 빨간 글씨 삭제
    }
}

// [4] 암호화 및 최종 제출 함수
async function submitLogin() {
    const passwordInputValue = document.getElementById('passwordInput').value;
    
    // 외부 암호화 함수 실행 (input_sha256.js 연동)
    const hashed = await hashPassword(passwordInputValue);
    
    const hiddenPasswordField = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    if (hiddenPasswordField) {
        hiddenPasswordField.value = hashed;
    }
    
    if (loginForm) {
        loginForm.submit();
    }
}