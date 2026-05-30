window.onload = function() {
    // 1. [독립 실행] URL 파라미터 감지 및 메시지 표시 로직
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const success = params.get('success');

    const msgEl = document.getElementById('updateMsg');

    // 회원정보 수정 성공/실패 알림
    if (msgEl) {
        if (success === 'updated') {
            msgEl.className = 'alert alert-success';
            msgEl.textContent = '✅ 개인정보가 수정되었습니다.';
            msgEl.classList.remove('d-none'); // 알림창 보이기
        } else if (error === 'duplicate_email') {
            msgEl.className = 'alert alert-danger';
            msgEl.textContent = '⚠️ 이미 사용 중인 이메일입니다.';
            msgEl.classList.remove('d-none'); // 알림창 보이기
        }
    }

    // 비밀번호 불일치 알림
    if (error === 'wrong_password') {
        // ① Toast 알림 (함수가 구현되어 있는 경우에만 실행)
        if (typeof showToast === 'function') {
            showToast('⚠️ 현재 비밀번호가 일치하지 않습니다.', 'danger');
        }
        
        const pwMsgEl = document.getElementById('pwMsg');
        if (pwMsgEl) {
            pwMsgEl.className = 'alert alert-danger';
            pwMsgEl.textContent = '⚠️ 현재 비밀번호가 일치하지 않습니다.';
            pwMsgEl.classList.remove('d-none');
        }
    }

    // 파일 업로드 오류 알림
    if (error) {
        const messages = {
            'invalid_type': 'jpg, png, gif, webp 파일만 가능합니다.',
            'too_large': '파일 크기는 5MB 이하여야 합니다.',
            'upload_fail': '업로드 실패. 다시 시도해주세요.'
        };
        const msg = messages[error];
        const div = document.getElementById('uploadErrorMsg');
        if (msg && div) {
            div.textContent = msg;
            div.classList.remove('d-none');
        }
    } // 👈 닫는 중괄호 위치를 여기로 수정해서 error 블록을 완전히 끝냅니다!

    // ② 비밀번호 변경 성공 처리 (error 블록 외부로 독립 탈출)
    if (success === 'password_changed') {
        // Toast 출력
        if (typeof showToast === 'function') {
            showToast('✅ 비밀번호 변경 완료, 로그인 페이지로 이동합니다.', 'success');
        }
        // 3.5초 후 로그인 페이지로 이동
        setTimeout(function() {
            window.location.href = '/logout?next=login';
        }, 3500);
    }

    // ==========================================
    // 2. 서버에서 프로필 정보 가져오기 (기존 비동기 fetch 유지)
    // ==========================================
    fetch('/profile/info')
        .then(res => res.json())
        .then(data => {
            // 기존 정보 테이블 표시
            if (document.getElementById('infoUsername')) document.getElementById('infoUsername').textContent = data.username;
            if (document.getElementById('infoEmail')) document.getElementById('infoEmail').textContent = data.email;
            if (document.getElementById('infoPhone')) document.getElementById('infoPhone').textContent = data.phone;
            
            // 프로필 이미지 표시
            if (data.profileImage && document.getElementById('profileImg')) {
                document.getElementById('profileImg').src = '/uploads/profile/' + data.profileImage;
            }
            
            // 수정 폼에 기존 값 자동 채우기
            if (document.getElementById('updateEmail')) document.getElementById('updateEmail').value = data.email;
            if (document.getElementById('updatePhone')) document.getElementById('updatePhone').value = data.phone;
            
            // Tooltip 사용자명 표시
            const profileLink = document.getElementById('profileNavLink');
            if (profileLink) {
                profileLink.setAttribute('data-bs-title', '👋 ' + data.username);
                new bootstrap.Tooltip(profileLink);
            }
        })
        .catch(err => console.error("데이터 로딩 실패:", err));
};
    
async function validateAndChangePassword() {
    let valid = true;
    const currentPw = document.getElementById('currentPwInput').value;
    const newPw = document.getElementById('newPwInput').value;
    const newPwConfirm = document.getElementById('newPwConfirm').value;
    
    // ① 현재 비밀번호 빈값 체크
    if (!currentPw) {
        showFieldError('currentPwInput', 'currentPwMsg', '현재 비밀번호를 입력해주세요.');
        valid = false;
    } else {
        clearFieldError('currentPwInput');
    }
    
    // ② 새 비밀번호 정규식 검사
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!pwRegex.test(newPw)) {
        showFieldError('newPwInput', 'newPwMsg', '8자 이상, 영문+숫자+특수문자를 포함해야 합니다.');
        valid = false;
    } else {
        clearFieldError('newPwInput');
    }
    
    // ③ 새 비밀번호 확인 일치
    if (newPw !== newPwConfirm) {
        showFieldError('newPwConfirm', 'newPwConfirmMsg', '새 비밀번호가 일치하지 않습니다.');
        valid = false;
    } else {
        clearFieldError('newPwConfirm');
    }
    
    if (!valid) return;
    
    // ④ 현재/새 비밀번호 SHA-256 해시 생성
    const hashedCurrent = await hashPassword(currentPw);
    const hashedNew = await hashPassword(newPw);
    document.getElementById('currentPassword').value = hashedCurrent;
    document.getElementById('newPassword').value = hashedNew;
    
    // F12 콘솔 확인
    console.log('현재 PW 해시:', hashedCurrent);
    console.log('새 PW 해시:', hashedNew);
    document.getElementById('pwForm').submit();
}

function clearFieldError(inputId) {
    const inputEl = document.getElementById(inputId);
    if (inputEl) {
        inputEl.classList.remove('is-invalid');
    }
}

function showFieldError(inputId, msgId, message) {
    const inputEl = document.getElementById(inputId);
    const msgEl = document.getElementById(msgId);
    if (inputEl) inputEl.classList.add('is-invalid');
    if (msgEl) {
        msgEl.textContent = message;
        msgEl.style.display = 'block';
    }
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}