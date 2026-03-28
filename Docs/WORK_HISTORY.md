# 작업 히스토리

> 최종 업데이트: 2026-03-28
> 작업 도구: Claude Cowork (Claude Opus 4.6 → Claude Sonnet 4.6)

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

## 미완료 / 향후 작업

### 높은 우선순위
- **CONTACT 페이지**: 현재 더미 이메일/GitHub. 실제 정보로 교체 필요
- **차트 이미지 숫자 블러 처리**: 사용자가 직접 편집 도구로 작업하기로 결정
- **성과 1 트래픽 차트 제목 한글화**: 현재 영문 ("2020 vs 2021 Daily Active Users") → 이미지 편집 도구로 직접 수정 권장

### 보통 우선순위
- **DOCUMENTS 페이지**: 현재 더미 데이터 상태. 실제 기획서 PDF 등 링크 필요
- **미사용 이미지 정리**: hl2_table.png, hl3_card_chart.png, hl1_traffic_chart.svg 등 HTML에서 참조하지 않는 파일 존재

### 완료된 이전 미완료 항목
- ~~더블유게임즈 HIGHLIGHTS 섹션~~ → 세션 6·8에서 완성 (5건 작성)
- ~~PROJECTS 페이지~~ → 세션 5·6에서 완성 (6개 카드)
- ~~반응형 디자인~~ → 세션 7에서 완성

### 참고 사항
- Git push는 이 환경에서 네트워크 제한으로 불가. 사용자가 로컬 터미널에서 직접 push 필요
- GitHub Pages 캐시 문제: 변경 후 Cmd+Shift+R로 하드 리프레시 필요
- PPT 원본 경로: `/Users/bk/Desktop/LBK/5. 웹사이트/경력 포트폴리오_이병권_230601.pptx`
- 프로젝트 로컬 경로: `/Users/bk/Desktop/LBK/5. 웹사이트/MyPortfolio`
