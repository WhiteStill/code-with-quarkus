# code-with-quarkus

# quarkus프로젝트시작! (학번: 20231405 이름: 박원빈)
매주수업내용을정리하자.
## 2주차수업내용
실습1 : 쿼크스환경구축및준비완료!
실습2 : HTML 기본및LOL 메인화면개발완료!

## 3주차수업내용
테스트, 깃허브 개설완료
프론트엔드: 몰입형 경험을 위해 마이크로 인터랙션과 호버/커서 피드백을 활용한 상호작용 디자인을 강조한다.
백엔드: 서버 중앙 집중형에서 탈피한 Web 3.0(탈중앙화/블록체인)의 현실화와 AI를 활용한 자동 결제 및 보안 강화를 다룬다.
AI 개발 환경: 단순 코드 자동 완성을 넘어, AI가 파일과 웹에 직접 접근해 수십 개의 작업을 수행하는 AI 에이전트(AI 바이브코딩) 시대로의 변화를 분석한다.
부트스트랩 5 활용: CDN 방식으로 최신 버전을 연동하고, 네비게이션 바(Navbar)와 반응형 레이아웃의 구조를 분석 및 수정한다. 
하이퍼링크와 경로: 외부 링크 연결과 로컬 이미지의 상대 경로/절대 경로 차이를 익히고, HTTP 상태 코드(200, 404 등)의 의미를 학습한다. 
그리드 및 모달: Bootstrap Grid 시스템으로 챔피언 카드를 배치하고, iframe을 삽입한 모달창을 구현해 세부 정보를 띄우는 심화 기술을 실습한다.

## 4주차수업내용

네비게이션바에 외부웹사이트 추가
외부웹사이트 하이퍼링크를 lol.ps로 연동 _blank로 세팅
_self - 현재 탭 (기본값)
_blank - 새 탭
_parent - 부모 프레임
_top - 최상위 프레임
imgsrc=“ “
• 다수의 이미지를 나열
• 외부주소로 부터 이미지 로딩함
다운받은 사진을 \resources에 새폴더를 생성해서 연동하였다.
부트스트렙 5로 상단 네비게이션 바를 교체하였다.
롤전적을 롤전적 사이트로 연동하였다.
네비바의 색갈을 검은색으로 바꾸었다.
아트록스 챔피언 카드를 추가하였다.
아트록스 카드 모달창을 구현하였다.

## 5주차수업내용

모달창에서 안에 내용을 구현하였다.
상대경로 ../image/A1.jpeg 이미지 위치를 지정하였다.
서브페이지 다운로드 페이지를 구현하였다.
다운로드 페이지에서 링크를 연동해서 lll.exe 파일을 다운로드 하게 하였다.
download.css에서 '../image/down.wb.jpeg' 연동해서 사진이 홈페이지에 나오도록 하였다.
download.html에 link rel="stylesheet" href="../css/download.css" 를 추가하여 디자인을 수정하였다.
download_table.html의 있는 내용을 download.html에 붙어넣어 최하단 시스템 사양 테이블 표를 추가하였다.
- 실습과제 - 
롤 로고 생성
a class="navbar-brand" href="#"
            img src="../image/Logo.jpeg" alt="LOL Logo" width="30" height="30"
        /a
네비바 가운데 정렬
ul class="navbar-nav mx-auto mb-2 mb-lg-0"
챔피언 3명 추가
각 영웅의 modals 3개 추가
<div align="center">
<img src="screenshots\스크린샷 2026-04-01 203900.png" width="45%" alt="실습1 화면">
<img src="screenshots\스크린샷 2026-04-01 204105.png" width="45%" alt="실습2 화면">
<img src="screenshots\스크린샷 2026-04-01 204115.png" width="45%" alt="실습3 화면">
<img src="screenshots\스크린샷 2026-04-01 204126.png" width="45%" alt="실습4 화면">
<img src="screenshots\스크린샷 2026-04-01 204521.png" width="45%" alt="실습5 화면">
</div>
<br>
코드는 수업자료를 바탕으로 작성하였다.

## 6주차수업내용

JS 폴더 생성해서 내부 로컬 파일로 연동하기 위해
script src="js/bootstrap.bundle.min.js" /script 를 추가하여
페이지가 로딩되면 로딩 완료 창이 뜨도록 하였다.
script
window.onload= function() {alert("메인페이지로딩완료");}
/script
또한 플레이 버튼을 누르면 '즐거운 플레이가 되세요'가 뜨도록 추가하였다.
a href="#" class="btnbtn-primary btn-lg" onclick="alert('즐거운플레이되세요')" 무료플레이 /a
let 과  const는 블록 스코프 내에서만 선언이 가능하다.
인터프리터 언어라 한 줄씩 실행한다.
var는 재선언과 재할당이 가능하지만 let은 재선언은 불가능하고 재할당은 가능하고 const는 재선언과 재할당이 불가능하다.
실시간 챔피언 검색하기 위한 코드가 추가되었다.
검색버튼 식별을 위해 id가 추가되었다.
form class="d-flex" id="searchForm">
input class="form-control me-2" type="search" placeholder="챔피언, 뉴스검색..."aria-label="Search" id="searchInput"
button class="btnbtn-outline-success" type="submit">검색하기 /button
/form
search.js 파일을 작성하고 html에 연동하였다.
document.getElementById('searchForm').addEventListener('submit', function(e) {
e.preventDefault(); // 폼기본동작차단(새로고침)
const query = document.getElementById('searchInput').value.trim();
if (!query) return;
window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
});
html 최하단에 script src="js/search.js"> /script을 추가하여 검색기능을 완성하였다.
preventDefault(); // 폼기본동작차단(새로고침) 넣어 검색을 아무것도 안하면 새로고침이 되지 않도록 추가하였다.
항상 리슨어를 form에 등록해야한다.

## 7주차수업내용
실시간 챔피언 검색하기 기능을 추가하였다.
search.js 자바스크립트에 챔피언과 뉴스 데이터를 추가하였다.
또한 main.css.를 추가하여 스타일을 main.css에서 관리하도록하였다.
기존에 index.html에 있는 스타일은 지웠다.
검색 동작 과정은
- 사용자가 검색어를 입력하고 'Enter'를 누른 직후, 콜스택(Call Stack)에서 performSearch
- js가 HTML 구조를 동적으로 생성하고, CSS를 조작하여 화면을 전환한다.
신규 3명의 멜, 유나라, 자헨의 검색 데이터를 추가하였다.
 { name: '멜', engName: 'Mel', role: '마법사', lane: '바텀', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Mel.png', difficulty: '중'},
{ name: '유나라', engName: 'Yunara', role: '원거리', lane: '바텀', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Yunara.png', difficulty: '중'},
{ name: '자헨', engName: 'Zaahen', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Zaahen.png', difficulty: '하'},
<div align="center">
<img src="screenshots\스크린샷 2026-04-16 173637.png" width="45%" alt="실습1 화면">
<img src="screenshots\스크린샷 2026-04-16 173655.png" width="45%" alt="실습2 화면">
<img src="screenshots\스크린샷 2026-04-16 173709.png" width="45%" alt="실습3 화면">
</div>
<br>
과제인 검색어가 없거나 공백일시 메인 화면으로 돌아가는 코드를 추가하였다.
    // ── 메인 화면으로 돌아가기 함수 ──────────────────────────────
    function showMainScreen() {
    // 1. 검색 결과 섹션 숨기기
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.classList.add('d-none');
        searchResults.style.display = 'none';
    }

    // 2. 숨겨졌던 메인 섹션들 다시 보이기
    // 히어로 섹션 보이기
    const hero = document.querySelector('.hero');
    if (hero) hero.classList.remove('d-none');

    // 모든 section 태그에서 d-none 제거 (searchResults 제외)
    document.querySelectorAll('section:not(#searchResults)').forEach(s => {
        s.classList.remove('d-none');
    });
기본 동작(코드)
현재 폼의 id : searchForm
핵심 함수 : performSearch
데이터 셋으로 부터 : filter(조건 충족)
키워드 가운데 출력 : searchKeywordDisplay
필터 결과 카운팅(숫자), 0개인 경우 화면 처리
탭(기본) 전환 : switchCategory
기존 섹션 숨김 : display: none
두 콘텐츠 하나만 표시 : 3항 연산자