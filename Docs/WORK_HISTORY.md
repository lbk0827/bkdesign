# 작업 히스토리

> 최종 업데이트: 2026-03-18
> 작업 도구: Claude Cowork (Claude Opus 4.6)

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

## 미완료 / 향후 작업

### 높은 우선순위
- **더블유게임즈 HIGHLIGHTS 섹션**: 아직 미작성. 조이시티와 동일한 카드 구조로 추가 필요
- **차트 이미지 숫자 블러 처리**: 사용자가 직접 편집 도구로 작업하기로 결정
- **성과 1 트래픽 차트 제목 한글화**: 현재 영문 ("2020 vs 2021 Daily Active Users") → 한글 변경 필요. 이미지 편집 도구로 직접 수정 권장

### 보통 우선순위
- **PROJECTS 페이지**: 현재 더미 데이터 상태. 실제 프로젝트 정보로 교체 필요
- **DOCUMENTS 페이지**: 현재 더미 데이터 상태. 실제 기획서 PDF 등 링크 필요
- **CONTACT 페이지**: 현재 더미 이메일/GitHub. 실제 정보로 교체 필요
- **반응형 디자인**: 모바일 대응 미적용 상태
- **미사용 이미지 정리**: hl2_table.png, hl3_card_chart.png, hl1_traffic_chart.svg 등 HTML에서 참조하지 않는 파일 존재

### 참고 사항
- Git push는 이 환경에서 네트워크 제한으로 불가. 사용자가 로컬 터미널에서 직접 push 필요
- GitHub Pages 캐시 문제: 변경 후 Cmd+Shift+R로 하드 리프레시 필요
- PPT 원본 경로: `/Users/bk/Desktop/LBK/5. 웹사이트/경력 포트폴리오_이병권_230601.pptx`
- 프로젝트 로컬 경로: `/Users/bk/Desktop/LBK/5. 웹사이트/MyPortfolio`
