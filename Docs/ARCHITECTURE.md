# 프로젝트 아키텍처 및 구조

> 최종 업데이트: 2026-07-26
> 이 문서는 새로운 세션에서 프로젝트를 이해하고 작업을 이어가기 위한 참조 문서입니다.

---

## 1. 프로젝트 개요

BK의 게임 기획자 포트폴리오 웹사이트. GitHub Pages로 호스팅되는 정적 SPA(Single Page Application)이다.

- **사이트 소유자**: BK (이병권) — 게임 기획자 / 시스템 기획 · 바이브 코더
- **호스팅**: GitHub Pages
- **작업 환경**: Windows 11 (로컬 경로: `C:\Users\Admin\Docs\99. Projects\bkdesign`)
- **PDF 포트폴리오**: `마비노기_모바일_해외_라이브_서비스_기획자_이병권_포트폴리오.pdf` (별도 배포용)

> 과거 이력: 초기에는 macOS + Claude Cowork(Linux VM) 환경에서 제작되었고, 일부 HIGHLIGHTS 이미지는 PPT(`경력 포트폴리오_이병권_230601.pptx`)에서 추출했다. 현재는 Windows 로컬 환경에서 유지보수 중이다.

---

## 2. 기술 스택

- **HTML5**: 단일 index.html (SPA 구조, ~1,900줄)
- **CSS3**: style.css (다크 테마, Flexbox/Grid 레이아웃, ~3,500줄)
- **Vanilla JavaScript**: script.js (라우팅, 경력 계산, 오버레이/라이트박스, ~875줄)
- **Git / GitHub Pages**: 버전 관리 및 배포
- **외부 라이브러리**: 없음 (순수 HTML/CSS/JS)

---

## 3. 디렉토리 구조

```
bkdesign/
├── index.html              # 메인 HTML (6개 섹션 전체 콘텐츠)
├── style.css               # 전체 스타일시트
├── script.js               # 라우팅 + 경력 계산 + 문서/프로젝트 오버레이 + 라이트박스
├── TodoList.md             # 미완료 작업 체크리스트
├── history.md              # 요약 히스토리 (상세는 Docs/WORK_HISTORY.md)
├── 마비노기_..._포트폴리오.pdf   # 배포용 PDF 포트폴리오
├── Docs/
│   ├── ARCHITECTURE.md     # 이 문서 (프로젝트 구조)
│   ├── WORK_HISTORY.md     # 작업 히스토리 (상세 변경 기록)
│   └── PORTFOLIO_REVIEW_2026-07-20.md
├── IMG_Profile/            # 프로필 이미지 (MyPic.png 등)
├── IMG_Logo/               # 회사 로고 (더블유게임즈 / 조이시티)
├── IMG_Highlights/         # 업무 성과 섹션 이미지 (차트, 스크린샷 등)
├── IMG_Gimmicks/           # 기믹 관련 이미지 (ColorSlideJam)
├── IMG_Projects/           # 참여/개인 프로젝트 썸네일·갤러리
│   └── ProjectA/           # 개인 프로젝트 Project-A 이미지 (츠키, 몬스터 등)
└── GameDesignDocs/         # 기획 문서 페이지 이미지 (섹션별 폴더)
    ├── CSJ-DailyChallenge/     # 데일리 챌린지 (daily_NN.png)
    ├── CSJ-NewUserMission/     # 신규 사용자 미션 (mission_NN.png)
    ├── CSJ-PinataParty/        # 피냐타 파티 (pinata_NN.png)
    ├── CSJ-InGame_InGameFlow/  # 인게임 플로우 (ingame_NN.png)
    └── CSJ-InGame_Control/     # 블록 조작 / 분쇄 (control_NN.png)
```

> 참고: `BK'sPortfolio.html`, `BK_Portfolio_Source.html`는 초기/보조 파일이며 운영 파일은 `index.html`이다.

---

## 4. SPA 구조

### 페이지 전환 방식

JavaScript로 구현된 클라이언트 사이드 라우팅이다. URL 해시나 History API는 사용하지 않고, CSS class 토글 방식으로 작동한다.

```
nav-link[data-page="intro"] → click → #intro.page.active
nav-link[data-page="about"] → click → #about.page.active
...
```

- 모든 `<section class="page">`는 기본 `display: none`
- `.page.active`만 표시되며 전환 시 fadeIn 애니메이션 적용

### 페이지 구성 (6개 섹션, GNB 순서대로)

| 섹션 ID | 메뉴명 | 상태 | 설명 |
|---------|--------|------|------|
| `intro` | 자기소개 | 완성 | 프로필 사진, 소개 태그라인, 이메일/전화 연락처 (기본 활성 페이지) |
| `about` | 이력서 | 완성 | 개인정보, 경력(더블유게임즈·조이시티), 학력, 자격증, 자기개발, 사용 툴 |
| `personal-projects` | 개인 프로젝트 | 진행중 | Project-A (Godot 덱빌딩 로그라이크). 진행 작업 / 캐릭터(츠키) / 몬스터 / 데이터 테이블 |
| `projects` | 참여 프로젝트 | 완성(일부 '작성 예정') | 프로젝트 카드 8종. 클릭 시 상세 오버레이 |
| `highlights` | 업무 성과 | 완성 | What/How/Result 성과 카드 (더블유게임즈 6건 + 조이시티 4건) |
| `documents` | 기획 문서 | 완성 | 실제 기획서 이미지 뷰어 (5종) |

---

## 5. 주요 기능 및 인터랙션 (script.js)

### 5-1. 페이지 라우팅
`.nav-link[data-page]` 클릭 → 해당 `.page`에 `.active` 토글.

### 5-2. 경력 기간 자동 계산

```javascript
const CAREER_START = '2020-10-19';   // 총 경력 시작일 (조이시티 입사)
const WGAMES_START = '2022-04-11';   // 더블유게임즈 입사일

#careerYM   → 총 경력 "N년 M개월"
#wgamesYM   → 더블유게임즈 재직기간
#wgamesRange → "2022. 04. ~ 현재" 동적 갱신
#projectARangeEnd → Project-A 진행 기간 종료 표기
```

60초마다 자동 갱신. 조이시티는 퇴사 고정 값("1년 6개월").

### 5-3. 기획 문서 오버레이 (`DOC_DATA`)
`.doc-item[data-doc-id]` 클릭 → 폴더 내 연속 이미지(`prefix + NN.png`)를 로드해 뷰어에 표시.

- **줌**: 60~160% (버튼 / `DOC_ZOOM_STEP` 10 단위)
- **팬(드래그 이동)**: pointer 이벤트 기반
- **PDF 다운로드**: iframe에 이미지들을 넣고 브라우저 인쇄(`window.print`)로 PDF 생성
- 문서별 `defaultZoom` 지정 (데일리 챌린지 80%, 나머지 100%)

`DOC_DATA` 키: `new-user-mission`, `daily-challenge`, `ingame-flow`, `ingame-control`, `pinata-party`

### 5-4. 참여 프로젝트 상세 오버레이 (`PROJECT_DETAILS`)
`.proj-card[data-project-id]` 클릭 → `#projectOverlay` 패널에 상세 정보 렌더.

- 필드: `title`, `summary`, `team`, `role`, `period`, `links`, `galleryLayout`(row/grid), `gallery`, `responsibilities`, `achievements`, `coreFeatures`, `retrospective`
- 세로형 스크린샷은 `row`, 가로형은 `grid` 레이아웃으로 분리
- 열릴 때 스크롤 초기화, Esc / 배경 클릭으로 닫힘

`PROJECT_DETAILS` 키: `match-hexa-deck`, `stud-pop`, `dart-away`, `color-slide-jam`, `bingo-haven`, `ai-wars`, `spinning-in-space`, `3on3-freestyle`

### 5-5. 이미지 라이트박스
업무 성과 이미지 및 프로젝트 오버레이 갤러리 이미지 클릭 → `#imageLightbox`로 확대. Esc / 배경 클릭으로 닫힘.

---

## 6. 콘텐츠 상세

### 6-1. 참여 프로젝트 (8종)

**더블유게임즈 (7종)** — 최신순
| 카드 ID | 프로젝트 | 기간 | 비고 |
|---------|----------|------|------|
| `match-hexa-deck` | Match Hexa Deck | 2026.04~05 | 신규 추가 (작업 중) |
| `stud-pop` | Stud Pop: Match & Unbuild | 2026.03~04 | 바이브 코딩, 업무 성과 '작성 예정' |
| `dart-away` | Dart Away : Balloon Pop Puzzle | 2026.02~03 | 바이브 코딩, 4주 출시 |
| `color-slide-jam` | Color Slide Jam / Wood Rush Puzzle | 2024.09~2026.02 | 기믹 32종·스테이지 300종 |
| `bingo-haven` | Bingo Haven | 2023.03~2024.08 | 비동기식 스킬 시스템 |
| `ai-wars` | A.I Wars | 2023.05~08 | 전투/레벨 밸런스 |
| `spinning-in-space` | Spining In Space | 2022.04~12 | 데이터 테이블 트래킹 |

**조이시티 (1종)**
| `3on3-freestyle` | 3on3 FreeStyle | 2020.10~2022.04 | SONY PS 스토어 협업 (사업 PM) |

### 6-2. 업무 성과 (HIGHLIGHTS, 10건)

- **더블유게임즈 (6건)**: 기믹 32종 기획·매출 기여 / 스테이지 300종·리텐션 / 기믹 상호작용 통합 가이드 / 비동기식 스킬 시스템 / 메타 콘텐츠 기획·개발 / 데이터 테이블 트래킹 문서
- **조이시티 (4건)**: SONY PS 스토어 마케팅 / 유료 DLC 보상 구조 개편 / 아이템 판매 방식 개선 / 운영 이벤트 매출 방어

### 6-3. 기획 문서 (5종)
- **콘텐츠/시스템 기획서** 📕: 피냐타 파티(45p) / 데일리 챌린지(50p) / 신규 사용자 미션(35p)
- **인게임 기획서** 📗: 인게임 플로우(7p) / 블록 조작·분쇄(9p)

### 6-4. 개인 프로젝트 Project-A
AI(Claude / Codex)를 활용해 Godot 엔진으로 개발 중인 덱 빌딩 로그라이크. 섹션 구성:
1. 진행 작업
2. 캐릭터 기획 — 츠키(액션 프리뷰 WebP 5종 포함)
3. 몬스터 기획 — 7종 역할/패턴/레벨 디자인 카드
4. 데이터 테이블 — 다수의 `data-table-card`

---

## 7. 디자인 시스템

### 색상 팔레트

| 용도 | 색상 코드 | 설명 |
|------|----------|------|
| 배경 (body) | `#0a0a0f` | 거의 검은색 |
| 배경 (카드) | `#16161f` | 약간 밝은 다크 |
| 배경 (헤더) | `#1a1a2e` → `#16213e` | 그라데이션 |
| 메인 액센트 | `#00d4ff` | 시안/하늘색 — 링크, 라벨, 메트릭 값 |
| 텍스트 (기본) | `#e0e0e0` | 밝은 회색 |
| 텍스트 (보조) | `#888` / `#bbb` / `#ccc` | 단계별 회색 |
| 텍스트 (강조) | `#ffffff` | 제목, 이름 등 |
| 구분선 | `#2a2a3a` | 다크 보더 |

### HIGHLIGHTS 라벨 색상

| 라벨 | 텍스트 | 배경 | 테두리 |
|------|--------|------|--------|
| What | `#ff6b6b` | `rgba(255,107,107,0.1)` | `rgba(255,107,107,0.25)` |
| How | `#ffd93d` | `rgba(255,217,61,0.1)` | `rgba(255,217,61,0.25)` |
| Result | `#6bcb77` | `rgba(107,203,119,0.1)` | `rgba(107,203,119,0.25)` |

### 폰트

```css
font-family: 'Apple SD Gothic Neo', sans-serif;
```
별도 웹폰트 로드 없이 시스템 한글 폰트를 우선 사용.

---

## 8. 이미지 관리

### 이미지 소스
- **참여 프로젝트 썸네일/갤러리**: `IMG_Projects/` (webp/jpg/png 혼용)
- **업무 성과 차트**: PPT 원본 추출 또는 matplotlib/SVG 렌더링 (`IMG_Highlights/`)
- **기획 문서**: Confluence 원문을 이미지로 재가공하여 페이지별 저장 (`GameDesignDocs/`)
- **개인 프로젝트**: `IMG_Projects/ProjectA/` (캐릭터 액션 WebP, 몬스터 포트레이트 등)

### 한글 폰트 제약 (과거 Cowork Linux VM 이슈)
matplotlib/PIL에서 한글 글리프 렌더링이 불가했던 이력이 있어, 일부 차트는 영문 라벨 PNG 또는 SVG로 생성했다. 현재 Windows 환경에서는 제약이 없으나, 기존 자산은 그대로 유지 중이다.

### 미사용/백업 이미지
`IMG_Highlights/`에 `*_backup.png`, `*_kr.png`, 참조되지 않는 구버전 차트(`hl2_table.png`, `hl3_card_chart.png` 등)가 남아있다 — 정리 대상.

---

## 9. 알려진 이슈 및 주의사항

1. **캐시**: 변경 배포 후 하드 리프레시(Ctrl+Shift+R) 필요
2. **script.js 버전 쿼리**: `index.html` 하단 `<script src="script.js?v=...">`의 버전 쿼리를 갱신하면 캐시 무효화에 도움
3. **'작성 예정' 잔여 콘텐츠**: 일부 프로젝트의 업무 성과 / 오버레이 필드가 미작성 상태 (TodoList.md 참고)
4. **미사용 이미지 파일**: `IMG_Highlights/` 백업·구버전 이미지 정리 필요
5. **경로 한글/공백**: 프로젝트 경로에 한글·공백 포함 — 스크립트 처리 시 인용 부호 필요

---

## 10. 새 세션에서 작업 시작 시 체크리스트

1. 이 문서(ARCHITECTURE.md)와 `TodoList.md`를 먼저 읽기
2. `index.html` 6개 섹션 구조 파악 (intro / about / personal-projects / projects / documents / highlights)
3. `script.js`의 데이터 구조 확인 (`DOC_DATA`, `PROJECT_DETAILS`)
4. `style.css`의 색상 팔레트 및 클래스 체계 확인
5. Git 로그로 최신 커밋 상태 확인: `git log --oneline -5`
6. 미완료 작업은 `TodoList.md` 참고
