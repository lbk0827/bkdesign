# 작업 히스토리

> 최종 업데이트: 2026-04-13
> 작업 도구: Claude Cowork, Codex (GPT-5)

---

## 세션 1: 포트폴리오 사이트 초기 구축

### 커밋: `38a55ee` — feat(about): build portfolio site with about page, career timeline, and tools

ABOUT 페이지 중심의 포트폴리오 사이트 초기 버전을 구축했다.

**작업 내용:**
- SPA(Single Page Application) 구조로 index.html / style.css / script.js 3파일 기반 사이트 생성
- 다크 테마 적용 (배경 #0a0a0f, 액센트 #00d4ff)
- 네비게이션 메뉴: ABOUT / PROJECTS / HIGHLIGHTS / DOCUMENTS / CONTACT
- ABOUT 페이지 완성: 개인정보, 경력사항(타임라인), 학력, 자격증/자기개발, 사용 툴
- 경력 기간 자동 계산 (script.js에서 현재 날짜 기준으로 동적 갱신)
- 회사 로고 이미지 배치 (더블유게임즈, 조이시티)
- GitHub Pages 배포

---

## 세션 2: HIGHLIGHTS 섹션 구축 및 교정

### 커밋: `d0bcc02` — feat(highlights): What/How/Result 라벨 전환 및 국어 교정

조이시티 3on3 FreeStyle 업무 성과 4건을 HIGHLIGHTS 섹션에 추가하고, 전문적인 한국어 교정을 진행했다.

**작업 내용:**

1. **HIGHLIGHTS 섹션 레이아웃 설계**
   - 회사 헤더 (로고 + 회사명 + 프로젝트명/직무)
   - 성과 카드 4장 (What / How / Result 구조)
   - Result 영역에 시안색(#00d4ff) 메트릭 박스 3개 나란히 배치

2. **라벨 시스템 변경**
   - Problem/Solution/Result → What/How/Result 로 전환
   - What = 빨간색(#ff6b6b), How = 노란색(#ffd93d), Result = 녹색(#6bcb77)

3. **성과 카드 4건 작성 및 국어 교정**
   - 성과 1: SONY와의 협업을 통한 PS 스토어 마케팅
   - 성과 2: 유료 DLC 보상 구조 개편을 통한 매출 향상
   - 성과 3: 아이템 판매 방식 전환을 통한 매출 반등
   - 성과 4: 운영 이벤트 자체 설계를 통한 DLC 매출 방어

4. **메트릭 박스 스타일 조정**
   - 모든 텍스트를 시안색(#00d4ff), 동일 폰트 크기(13px)로 통일
   - 값과 설명을 한 문장으로 결합 (줄바꿈 제거)
   - 3개 박스 가로 나란히 배치 (flex: 1; min-width: 140px)

**사용자 피드백 반영:**
- What 라벨 색상: 파란색 → 빨간색으로 복원 (사용자 요청)
- 메트릭 박스: 세로 쌓기 → 가로 나란히 (사용자 선호)
- 메트릭 텍스트: 줄바꿈 제거, 자연스러운 한 문장으로 통합

---

## 세션 3: 이미지 추가 및 UI 개선

### 커밋: `57fb779` — feat(highlights): 성과별 이미지 추가 및 UI 개선

PPT(경력 포트폴리오_이병권_230601.pptx)에서 이미지와 차트 데이터를 추출하여 각 성과 카드에 이미지 갤러리를 추가했다.

**작업 내용:**

1. **PPT 이미지 추출 및 처리**
   - python-pptx로 슬라이드 16~21의 모든 이미지 추출
   - 추출 경로: `/ppt_images/slide{N}_img{M}.png`
   - 차트 오브젝트(embedded chart)에서 데이터 추출 후 matplotlib로 렌더링

2. **성과별 이미지 배치**
   - 성과 1: PS 스토어 스크린샷 + 매출/DAU 비교 차트 + 트래픽 비교 차트 (3장)
   - 성과 2: 캠프별 매출 차트(붉은 박스 포함) + 보상 구조 이미지 (2장)
   - 성과 3: 펫 프로모션 매출 차트 + 카드 프로모션 매출/PU 차트 (2장)
   - 성과 4: DLC 판매량 변화 차트(붉은 박스 포함) + 포인트 배너 + DLC 배너 (3장)

3. **붉은 박스(Red Box) 합성**
   - PPT 도형(직사각형, line_color=#FF0000)의 좌표를 추출
   - 이미지와 도형의 EMU 좌표 → 픽셀 좌표로 변환 후 PIL로 합성
   - 적용 대상: 성과 2 차트(발렌타인 캠프 영역), 성과 4 차트(08월 20일 영역)

4. **차트 한글 렌더링 문제 해결**
   - 이 환경에 한글 폰트가 없어서 matplotlib PNG에서 한글이 깨짐
   - 해결: SVG 형식으로 전환 (브라우저 폰트로 렌더링)
   - 적용 대상: 성과 3 카드 프로모션 차트 (hl3_card_chart.svg)
   - 성과 1 트래픽 차트는 원본 PNG 유지 (사용자 요청, 영문 라벨)

5. **이미지 배경 처리**
   - 다크 테마와 조화를 위해 이미지 배경을 rgba(255,255,255,0.9) 투명 처리
   - border-radius: 10px 적용

6. **이미지 드래그 버그 수정**
   - 이미지 드래그 시 브라우저가 이미지 URL로 네비게이션하는 문제
   - script.js에 dragstart 이벤트의 preventDefault() 추가

7. **텍스트 수정**
   - 성과 2 메트릭: "발렌타인 챌린지 캠프 : " 접두어 추가

### 커밋: `834c7cf` — fix(highlights): 성과 1 트래픽 차트 원본 PNG로 복원

SVG로 변환했던 성과 1 트래픽 차트를 원본 matplotlib PNG로 복원 (사용자 요청: 원본 비주얼 유지).

---

## 세션 4: 문서화 및 GNB 한글화

### 커밋: `ea83d6e` — feat: GNB 및 페이지 제목 한글화, 프로젝트 문서 추가

**작업 내용:**
- GNB 메뉴 영문 → 한글 전환: 프로필 / 참여 프로젝트 / 업무 성과 / 기획 문서 / 연락처
- 각 섹션 h2 제목도 동일하게 한글 변경
- Docs/WORK_HISTORY.md 신규 작성 (세션 1~3 작업 이력)
- Docs/ARCHITECTURE.md 신규 작성 (프로젝트 구조 및 설계 문서)

---

## 세션 5: 참여 프로젝트 페이지 구현

### 커밋: `d8bdd0f` — feat(projects): 참여 프로젝트 페이지 구현 및 프로필 업데이트

**작업 내용:**
- 참여 프로젝트 카드(요약형) 6개 신규 추가
  - 더블유게임즈 5개: Dart Away / Color Slide Jam+Wood Rush Puzzle / Bingo Haven / A.I Wars / Spining In Space
  - 조이시티 1개: 3on3 FreeStyle (썸네일 이미지 + 업무 기여 내용 포함)
- 프로젝트 카드 CSS 스타일링: 2열 그리드, 호버 효과, 태그 디자인
- 조이시티 프로필 업무 태그 확장

### 커밋: `c3207df` — feat(projects): 프로젝트 카드 개선 및 프로필 업데이트

**작업 내용:**
- 전 프로젝트 카드에 썸네일 이미지 적용 (IMG_Projects/ 7종 추가)
- Color Slide Jam / Wood Rush Puzzle 카드에 좌우 반반 썸네일 레이아웃 적용
- 장르/플랫폼/엔진 태그 색상 분리 (시안/보라/초록)
- 전 프로젝트에 엔진 태그(Unity/Unreal Engine 4) 추가
- 조이시티 프로필 업무 태그 정리

---

## 세션 6: 프로젝트 카드 상세화 및 더블유게임즈 성과 섹션 추가

### 커밋: `a177754` — feat(projects/highlights): 프로젝트 카드 상세화 및 더블유게임즈 성과 섹션 추가

**작업 내용:**
- 참여 프로젝트 카드에 주요 업무 / 업무 성과 리스트 추가 (전 프로젝트)
- Dart Away 카드에 A.I. 프로젝트 태그 및 전용 스타일 추가
- 더블유게임즈 HIGHLIGHTS 섹션 신규 작성 (성과 2건)
  - 성과: A.I. Wars 메타 콘텐츠 기획·개발을 통한 타 본부 출시 지원
  - 성과: 데이터 테이블 트래킹 시스템 구축으로 업무 효율 향상
- 관련 이미지 3종 추가 (hl5_data_table_mgmt.png, hl6_ai_wars_boss.png, hl6_ai_wars_classic.png)

---

## 세션 7: 반응형 모바일 레이아웃 적용

### 커밋: `5e4d320` — feat(responsive): add mobile breakpoints for portfolio layout

**작업 내용:**
- style.css에 모바일 미디어 쿼리 추가 (breakpoint: 768px)
- 헤더, 네비게이션, 프로젝트 그리드, HIGHLIGHTS 카드, 타임라인 등 전 영역 반응형 처리

### 커밋: `f05eb42` — fix(responsive): strengthen iPhone mobile layout visibility

**작업 내용:**
- iPhone 실기기에서 레이아웃 깨짐 이슈 보완
- 추가 모바일 스타일 강화 (43개 선언 추가)

---

## 세션 8: ColorSlideJam 성과 3건 추가 및 콘텐츠 교정

### 커밋: `f49e4b2` — feat(highlights): ColorSlideJam 성과 3건 추가 및 시각 자료 생성

**작업 내용:**
- 더블유게임즈 성과 카드 3건 신규 작성 (더블유게임즈 섹션 최상단 배치)
  - 성과: 기믹 32종 기획·적용을 통한 콘텐츠 확대 및 매출 기여
  - 성과: 스테이지 약 300종 제작·검증을 통한 리텐션 성장 견인
  - 성과: 기믹 상호작용 통합 가이드 구축으로 협업 효율 향상
- 시각 자료 3종 생성 및 추가
  - hl_gimmick_blocks.png: 기믹 블록 1~14종 합성 일람
  - hl_retention_chart.png: 월별 D1/D7/D28 리텐션 추이 차트
  - hl_sales_chart.png: 상품 판매량·매출 Top 10 차트
- 기믹 상호작용 통합 가이드 Google Sheets 하이퍼링크 추가

### 커밋: `336f459` — refactor(projects/highlights): 제목 축약, 내용 교정 및 프로젝트 메타 정보 보강

**작업 내용:**
- 성과 카드 제목 4건 축약 (가독성 개선)
- 기믹 성과 What 문장에 연간 32종·하반기 12종 맥락 명시
- 통합 가이드 What 문장 맥락 보강
- Color Slide Jam / Wood Rush Puzzle 장르(캐주얼), 엔진(Unity) 반영
- 더블유게임즈 전 프로젝트 엔진 Unity, 플랫폼 iOS/Android로 통일

---

## 세션 9: 푸터 연도 자동 갱신

### 커밋: 진행 중 — chore(footer): 푸터 연도 자동 갱신 (현재 연도 동적 반영)

**작업 내용:**
- index.html 푸터의 고정 연도(`© 2025`) → `<span id="year">` 동적 태그로 교체
- script.js에 `document.getElementById('year').textContent = new Date().getFullYear()` 추가
- 이후 매년 자동으로 현재 연도가 표시됨

---

## 세션 10: 참여 프로젝트 상세 오버레이 구현 및 UX 보완

### 커밋: `0a71426` — feat(projects): 참여 프로젝트 상세 오버레이 추가

**작업 내용:**
- 프로젝트 카드 클릭 시 상세 오버레이를 열 수 있도록 구현
- 오버레이 섹션 구성: 한 줄 요약 / 스크린샷 / 담당 업무 / 업무 성과 / 핵심 기능 / 회고
- 프로젝트별 데이터 객체 기반 렌더링 방식 적용
- 닫기 UX 지원: 닫기 버튼 / 배경 클릭 / ESC
- 접근성 보완: 카드 키보드 포커스 및 Enter/Space 오픈

### 커밋: `53e747c` — fix(ui): 오버레이 스크롤바 톤 및 페이지 전환 스크롤 초기화

**작업 내용:**
- 오버레이 스크롤바 색상을 오버레이 테마에 맞게 조정
- 탭(페이지) 전환 시 항상 최상단에서 시작하도록 스크롤 초기화 적용

### 커밋: `8cd111d` — fix(overlay): 상세 오버레이 열림 시 스크롤 위치 초기화

**작업 내용:**
- 오버레이를 다시 열 때 이전 스크롤 위치가 남지 않도록 내부 스크롤 초기화

---

## 세션 11: 정보 구조 정리 및 내비게이션 확장

### 커밋: `817ec1c` — chore(overlay): 상세 내용 플레이스홀더 및 이미지 구성 정리

**작업 내용:**
- 오버레이 텍스트 영역을 `작성 예정`으로 통일
- 프로젝트 상세의 성과용 보조 이미지 제거, 메인 스크린샷 중심으로 단순화

### 커밋: `a9bf593` — feat(nav): 개인 프로젝트 탭 추가 및 기믹 이미지 반영

**작업 내용:**
- GNB에 `개인 프로젝트` 카테고리 추가 (`기획 문서` 우측)
- `개인 프로젝트` 페이지 섹션 신규 생성
- `IMG_Gimmicks/` 이미지 에셋 저장소 반영

---

## 세션 12: 프로젝트 스크린샷 확장 (PPT 기반 추출)

### 커밋: `1ad1dbe` — feat(overlay): 프로젝트 스크린샷 갤러리 확장 반영

**작업 내용:**
- PPT 원본에서 프로젝트 스크린샷 추출 후 프로젝트별 폴더로 정리
- A.I Wars: 메인 + Noise Crasher 모드 스크린샷 추가
- Spining In Space: 슬라이드 스크린샷 추가
- Bingo Haven: 슬라이드 스크린샷 추가 및 불필요 이미지 제외

**추가된 폴더:**
- `IMG_Projects/AIWars_Modes/`
- `IMG_Projects/SpinningInSpace_Slides/`
- `IMG_Projects/BingoHaven_Slides/`

---

## 세션 13: 프로젝트 장르 태그 정리

### 커밋: `0a10f0d` — chore(projects): 프로젝트 장르 태그 문구 정리

**작업 내용:**
- Dart Away: `캐주얼 / 퍼즐`
- Color Slide Jam / Wood Rush Puzzle: `캐주얼 / 퍼즐`
- A.I Wars: `캐주얼 / RPG`
- Spining In Space: `캐주얼 / 어드벤처 / 소셜 카지노`
- 3on3 FreeStyle: `캐주얼 / 스포츠 / 경쟁`
- Bingo Haven: `캐주얼 / 소셜 빙고 / 하우징`

---

## 세션 14: 스크린샷 레이아웃 정책 분리 (세로형/가로형)

### 커밋: `18bddc2` — feat(overlay): 스크린샷 레이아웃 개선 및 Spining In Space 이미지 갱신

**작업 내용:**
- 오버레이 스크린샷 표시 방식을 단일 선택형(대표 1장)에서 다중 노출형으로 변경
- 프로젝트별 갤러리 레이아웃 옵션 도입
  - `row`: 세로로 긴 이미지(Spining In Space) 좌→우 1행 배치
  - `grid`: 가로 이미지(Bingo Haven 등) 바둑판 배치
- Spining In Space 이미지를 `/Downloads/screen-0~4.jpg` 기준으로 교체
- row 레이아웃에서 이미지 수 기반 자동 컬럼 계산으로 오버레이 너비 내 표시(스크롤 제거)

**추가된 폴더:**
- `IMG_Projects/SpinningInSpace_Downloads/`

---

## 세션 15: 오버레이 UX 개선 및 3on3 FreeStyle 콘텐츠 정리

### 커밋: `981a372` — fix(overlay): 3on3 FreeStyle 오버레이 첫 번째 스크린샷 제거

**작업 내용:**
- 3on3 FreeStyle 오버레이 갤러리에서 불필요한 첫 번째 스크린샷 제거

### 커밋: `35bc0de` — feat(overlay): 오버레이 주요 업무를 태그 뱃지 스타일로 변경

**작업 내용:**
- 오버레이 팝업의 role(주요 업무) 표시 방식을 한 줄 텍스트 → 태그 뱃지(pill badge) 스타일로 변경
- `.overlay-role-badge` CSS 추가 (border-radius 4px, padding 2px 8px)
- role 문자열을 콤마로 분리하여 개별 뱃지로 렌더링
- 뱃지와 프로젝트 섬머리 사이 spacing 조정 (6px)

### 커밋: `e9d1730` — feat(overlay): 담당 업무를 테이블 레이아웃으로 변경

**작업 내용:**
- 오버레이 담당 업무 렌더링 방식을 불릿 리스트 → 테이블 레이아웃으로 전환
- 컬럼 구성: 업무(tag) | 세부 내용(desc)
- `{tag, desc}` 객체 배열은 테이블, 단순 문자열은 기존 불릿 리스트로 폴백
- `.resp-table` CSS 추가 (다크 테마, 호버 효과)

---

## 세션 16: 프로젝트 카드 성과 수치 및 A.I Wars 대폭 개선

### 커밋: `1c08960` — feat(projects): 업무 성과 수치 태그 추가 및 A.I Wars summary 작성

**작업 내용:**
- 3on3 FreeStyle, Spinning in Space 프로젝트 카드에 `.proj-achievement-detail` 스팬 추가
- A.I Wars 오버레이 summary 작성
- `.proj-achievement-detail` CSS 추가 (에메랄드 그린 #34d399, 11.5px)

### 커밋: `77ac568` — feat(projects): A.I Wars 프로젝트 카드 및 오버레이 담당 업무 대폭 개선

**작업 내용:**
- A.I Wars 오버레이 담당 업무 8종 작성 (인게임, 전투 시스템, 스테이지 생성 툴, 데이터 테이블, 레벨 밸런스, UI/UX, QA, 연출/사운드)
- 프로젝트 카드 주요 업무 항목에 `.proj-detail` 스팬 추가
- DB 테이블 → 데이터 테이블 용어 통일

### 커밋: `aa4b26b` ~ `0a9f223` — A.I Wars 세부 수정

**작업 내용:**
- 인게임 기획 세부 내역(조작, 패링, 아이템 시스템) 누락 반영
- 인게임/시스템 기획 세부 항목 재분류 (전투 로직 등 → 인게임, 플레이 모드 등 → 시스템)
- 모드명 수정: 랜덤 → 하이 스코어

### 커밋: `7abc3ac` — fix(projects): 3on3 FreeStyle 업무 성과 문구 수정 및 가챠→뽑기 용어 변경

**작업 내용:**
- 3on3 FreeStyle 업무 성과 문구 간결화 (DLC 보상 구조 개선, 아이템 판매 방식 개선 등)
- 업무 성과 페이지 및 오버레이에서 "가챠" → "뽑기"로 전면 변경 (4개소)
- "트래킹 시스템" → "트래킹 문서"로 변경

### 커밋: `bd9d3e0` — fix(highlights): A.I Wars 업무 성과 스크린샷 교체

**작업 내용:**
- A.I Wars 성과 카드 스크린샷을 AIWars_Mode_01~04로 교체

---

## 세션 17: 서브 갤러리, 라이트박스, Bingo Haven 콘텐츠 대폭 확장

### 커밋: `4b702a6` ~ `dc00928` — A.I Wars 서브 갤러리 및 위치 조정

**작업 내용:**
- 오버레이 담당 업무 섹션에 서브 갤러리(`subGallery`) 시스템 신규 구현
- A.I Wars 4종 플레이 모드 스크린샷을 서브 갤러리로 배치 (담당 업무 타이틀 아래, 테이블 위)
- 캡션 텍스트 추가 (모드별 설명)
- A.I Wars 오버레이 메인 갤러리에서 1번·5번 스크린샷 제거

### 커밋: `4fab9a8` — fix(overlay): Bingo Haven 오버레이 1번 스크린샷 교체

**작업 내용:**
- Bingo Haven 오버레이 1번 스크린샷을 BingoHaven_Slide_05.jpg로 교체

### 커밋: `557f972` — feat: 이미지 클릭 시 라이트박스 확대 기능 추가

**작업 내용:**
- 업무 성과 페이지 갤러리, 오버레이 갤러리, 서브 갤러리 이미지 클릭 시 라이트박스 확대 기능 구현
- ESC 키, 배경 클릭, 닫기 버튼으로 닫기 지원
- 호버 시 opacity 변경 및 cursor pointer 스타일 적용

### 커밋: `cb1ba99` — feat: 빙고 헤이븐 이미지 추가

---

## 세션 18: Bingo Haven / Color Slide Jam / 3on3 FreeStyle 카드 개선 및 TodoList 작성

### 커밋: `73dd156` — feat: Bingo Haven 오버레이 담당 업무 8종 작성 및 프로젝트 카드 세부 업무 추가

**작업 내용:**
- Bingo Haven 오버레이 담당 업무 8종 tag+desc 테이블 형식으로 작성
  - 캐릭터(가디언) 시스템, 하우징, 상점/멤버십, 퀘스트, 신규 유저 온보딩, 미니 게임, UI/UX, 데이터 테이블 설계
- Bingo Haven 프로젝트 카드 주요 업무에 `.proj-detail` 스팬 추가
- 주요 업무 순서 변경: 인게임 → 시스템 → 콘텐츠 → BM/상품 (지표 분석 제거)

### 커밋: `3e7fb7e` — feat: Bingo Haven 업무 성과 추가 (비동기식 스킬 시스템 설계)

**작업 내용:**
- Bingo Haven 프로젝트 카드에 업무 성과 섹션 추가: "비동기식 스킬 시스템 설계 ▸ 실시간 대전 스킬 딜레이 이슈 해결"
- 업무 성과 페이지에 비동기식 스킬 시스템 카드 추가 (What/How/Result 구조)
  - 동기화 딜레이 문제 인식 → 서버 사전 계산 비동기식 구조 전환 → 딜레이 제거 및 확률 무결성 유지

### 커밋: `d79133a` — refactor: 3on3 FreeStyle 업무 성과 문구 간결화

**작업 내용:**
- "DLC 보상 구조 개선을 통한 매출 향상" → "DLC 보상 구조 개선"
- "아이템 판매 방식 개선을 통한 매출 향상" → "아이템 판매 방식 개선"

### 커밋: `ef93286` — feat: Color Slide Jam 프로젝트 카드 주요 업무 순서 변경 및 업무 성과 세부 내역 추가

**작업 내용:**
- 주요 업무 순서 변경: 인게임 → 시스템 → 콘텐츠 → BM/상품 → 지표 분석
- 업무 성과 3개 항목에 `.proj-achievement-detail` 스팬 추가
  - 기믹 32종 기획·적용 ▸ Fail Bundle 하반기 판매량 3.3만 건, 매출 16만 USD
  - 스테이지 약 300종 제작·검증 ▸ D7 리텐션 40%↑, D28 리텐션 75%↑
  - 기믹 상호작용 통합 가이드 구축 ▸ 유관 부서 커뮤니케이션 비용 최소화

### 커밋: `55a1d4f` — feat: Bingo Haven summary 작성 및 Color Slide Jam 카드 개선

**작업 내용:**
- Bingo Haven 오버레이 summary 작성 (비동기식 스킬, 데이터 테이블 구조 강조)
- Bingo Haven 오버레이 role에서 지표 분석 제거

### 기타:
- `TodoList.md` 신규 생성 — 남은 작업 항목 카테고리별 정리 (검토 필요 / 오버레이 / 카드 / 페이지)

---

## 세션 19: 이력서/프로필 영역 정보 정리

### 커밋: `9413a0c` / `a37e2e8` — 경력 타임라인 소속 정보 보강 및 레이아웃 정리

**작업 내용:**
- 경력 타임라인에 본부/팀 소속 정보 추가
- 타임라인 소속 정보 레이아웃을 2행 구조로 정리

### 커밋: `4326957` — chore(profile/education): 프로필 이미지 및 학력 표기 정리

**작업 내용:**
- 상단 헤더 로고와 이력서 사진 분리 운용
- 이력서 학력 정보 실명 표기 반영
  - 삼육대학교(서울), 국민대학교(서울)
  - 해외 학교 국가 표기 한글화(태국/남아공)
- 학력 `구분` 컬럼 형식 롤백(졸업/중퇴/편입·졸업)

---

## 세션 20: 프로젝트 카드 문구 및 수치 표현 정리

### 커밋: `9486d16` — chore(projects): A.I Wars/Spining In Space 성과 문구 레이아웃 정리

**작업 내용:**
- A.I Wars/Spining In Space 카드 성과 문구를 `항목 + ▸ 상세` 형식으로 통일

### 커밋: `10f82ab` — chore(projects): 카드 업무 문구 정리 및 성과 수치 표현 완화

**작업 내용:**
- Color Slide Jam 카드 주요 업무 세부 항목 정리
- Dart Away 카드는 기존 주요 업무 목록 형식으로 복구
- 절대 수치 표기를 완화하여 리스크 낮은 표현으로 조정

### 커밋: `e42d97d` — chore(projects): Color Slide Jam 리텐션 성과 문구 상세화

**작업 내용:**
- Color Slide Jam 카드의 `스테이지 약 300종 제작·검증` 성과에 D7/D28 수치 문구 반영

---

## 세션 21: 오버레이 담당 업무 문구 고도화

### 커밋: `dc0bd52` — chore(overlay): Color Slide Jam 담당 업무 문구 정리

**작업 내용:**
- Color Slide Jam / Wood Rush Puzzle 오버레이 담당 업무를 실무 맥락 중심 문장으로 정리
- 항목 구성: 인게임 / 시스템 / 콘텐츠 / 밸런스 / BM

### 진행 중(미커밋)
- Color Slide Jam 오버레이 담당 업무에 `UI/UX 기획` 항목 추가 반영 완료
- 문구 방향: 실패·성공·종료 등 인게임 주요 UI 흐름/사용자 경험 기획

---

## 세션 22: 문서 재가공 방식 검토

**작업 내용:**
- Confluence PDF 원문의 레이아웃 붕괴 이슈 확인
- 원문 내용 유지 + 보기 좋은 재정리 샘플 생성
  - `Docs/Confluence_Redesign/ColorSlideJam_콘텐츠_언락_개선_리디자인.md`
  - `Docs/Confluence_Redesign/ColorSlideJam_콘텐츠_언락_개선_리디자인.html`
- 최종 방향은 스크린샷 기반 문서화(이미지 중심) 채택

---

## 세션 23: 카오스 제로 나이트메어 지원용 포트폴리오 방향 분석

**작업 내용:**
- 현재 포트폴리오 전체 구조를 `자기소개 / 이력서 / 개인 프로젝트 / 참여 프로젝트 / 업무 성과 / 기획 문서` 기준으로 재파악
- 나한이 기획자 포트폴리오와 비교하여 BK 포트폴리오의 강점과 보강 지점을 정리
- 경력직 포트폴리오 관점에서 탭 순서 후보 검토
  - 추천 후보: `자기소개 → 이력서 → 업무 성과 → 개인 프로젝트 → 참여 프로젝트 → 기획 문서`
- Project-A 개인 프로젝트 탭의 역할을 `전투 기획 실무를 직접 재현한 제작형 포트폴리오`로 정의
- 츠키 애니메이션 GIF/WebP 제작 가능성을 확인하고 5종 후보를 정리
  - Idle / Attack / Sonic Boom 이동 후 Attack / Dead / Five Slash + Moon Slash VFX
- 분석 결과를 `Docs/PORTFOLIO_REVIEW_2026-07-20.md`에 문서화

---

## 세션 24: 카오스 제로 나이트메어 전투 기획자 공고 맞춤 Project-A 보강

**작업 내용:**
- 채용 홈페이지의 주요업무 기준을 반영해 Project-A 개인 프로젝트 탭의 설명을 `캐릭터 설계 / 몬스터 설계 / 데이터 작업 / 전투 시스템 / 레벨 디자인` 중심으로 조정
- 츠키 액션 프리뷰 WebP 5종 제작 및 삽입
  - `tsuki_idle.webp`
  - `tsuki_attack.webp`
  - `tsuki_dead.webp`
  - `tsuki_sonic_boom_attack.webp`
  - `tsuki_five_slash_moon_vfx.webp`
- 몬스터 7종 포트레이트 WebP 제작 및 삽입
  - 마이어 임프 / 늪 추적자 / 뼈 크롤러 / 무덤 크롤러 / 프로스트 레버넌트 / 왕관 시종 / 심연 왕관 수호자
- 기존 단일 Mire Imp 중심 몬스터 섹션을 몬스터별 역할, 플레이어에게 요구하는 판단, 인카운터 곡선, 데이터 테이블 구조 관점으로 확장
- 모바일 대응 CSS 추가

---

## 미완료 / 향후 작업

### 검토 필요
- **절대 수치 → 상대 수치 변환 검토**: Color Slide Jam 성과 ("매출 16만 USD", "판매량 3.3만 건" 등) NDA 확인 후 결정

### 높은 우선순위
- **프로젝트 오버레이 콘텐츠 작성**: Color Slide Jam / Wood Rush Puzzle, Dart Away 담당 업무 (현재 '작성 예정')
- **프로젝트 오버레이 나머지 섹션**: Bingo Haven achievements / coreFeatures / retrospective (현재 '작성 예정')
- **프로젝트 카드 proj-detail 추가**: Color Slide Jam / Wood Rush Puzzle, Dart Away
- **자기소개 페이지**: 콘텐츠 작성 (현재 '작성 예정')

### 보통 우선순위
- **DOCUMENTS 페이지**: 현재 더미 데이터 상태. 실제 기획서 PDF 등 링크 필요
- **차트 이미지 숫자 블러 처리**: 사용자가 직접 편집 도구로 작업하기로 결정
- **미사용 이미지 정리**: hl2_table.png, hl3_card_chart.png, hl1_traffic_chart.svg 등 HTML에서 참조하지 않는 파일 존재

### 완료된 이전 미완료 항목
- ~~더블유게임즈 HIGHLIGHTS 섹션~~ → 세션 6·8에서 완성 (5건 작성)
- ~~PROJECTS 페이지~~ → 세션 5·6에서 완성 (6개 카드)
- ~~반응형 디자인~~ → 세션 7에서 완성
- ~~A.I Wars 오버레이 담당 업무~~ → 세션 16·17에서 완성 (8종)
- ~~Bingo Haven 오버레이 담당 업무~~ → 세션 18에서 완성 (8종)
- ~~Bingo Haven summary~~ → 세션 18에서 완성

### 참고 사항
- GitHub Pages 캐시 문제: 변경 후 Cmd+Shift+R로 하드 리프레시 필요
- PPT 원본 경로: `/Users/bk/Desktop/LBK/5. 웹사이트/경력 포트폴리오_이병권_230601.pptx`
- 프로젝트 로컬 경로: `/Users/bk/Desktop/LBK/5. 웹사이트/MyPortfolio`
