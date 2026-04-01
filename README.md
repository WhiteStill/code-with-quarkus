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
<imgsrc=“ “>
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
<divalign="center">
<img src="screenshots\스크린샷 2026-04-01 203900.png"width="45%"alt="실습1 화면">
<img src="screenshots\스크린샷 2026-04-01 204105.png"width="45%"alt="실습2 화면">
<img src="screenshots\스크린샷 2026-04-01 204115.png"width="45%"alt="실습3 화면">
<img src="screenshots\스크린샷 2026-04-01 204126.png"width="45%"alt="실습4 화면">
<img src="screenshots\스크린샷 2026-04-01 204521.png"width="45%"alt="실습5 화면">
</div>
<br>
코드는 수업자료를 바탕으로 작성하였다.