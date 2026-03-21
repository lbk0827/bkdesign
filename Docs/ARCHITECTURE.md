# 프로젝트 아키텍처 및 구조

> 최종 업데이트: 2026-03-18
> 이 문서는 새로운 Claude Cowork 세션에서 프로젝트를 이해하고 작업을 이어가기 위한 참조 문서입니다.

---

## 1. 프로젝트 개요

BK의 게임 디자이너 포트폴리오 웹사이트. GitHub Pages로 호스팅되는 정적 SPA(Single Page Application)이다.

- **사이트 소유자**: BK (이병권) — 게임 기획자
- **호스팅**: GitHub Pages
- **로컬 경로**: `/Users/bk/Desktop/LBK/5. 웹사이트/MyPortfolio`
- **PPT 원본**: `/Users/bk/Desktop/LBK/5. 웹사이트/경력 포트폴리오_이병권_230601.pptx`

---

## 2. 기술 스택

- **HTML5**: 단일 index.html (SPA 구조)
- **CSS3**: style.css (다크 테마, Flexbox/Grid 레이아웃)
- **Vanilla JavaScript**: script.js (네비게이션, 경력 기간 자동 계산)
- **Git / GitHub Pages**: 버전 관리 및 배포
- **외부 라이브러리**: 없음 (순수 HTML/CSS/JS)

---

## 3. 디렉토리 구조

```
MyPortfolio/
├── index.html              # 메인 HTML (모든 페이지 콘텐츠 포함)
├── style.css               # 전체 스타일시트
├── script.js               # 네비게이션 + 경력 계산 + 이미지 드래그 방지
├── Docs/                   # 프로젝트 문서
│   ├── ARCHITECTURE.md     # 이 문서 (프로젝트 구조)
│   └── WORK_HISTORY.md     # 작업 히스토리 (상세 변경 기록)
├── IMG_Profile/            # 프로필 이미지
│   └── Profile.png
├── IMG_Logo/               # 회사 로고
│   ├── Logo_DoubleUGames_transparent.png
│   ├── Logo_DoubleUGames.webp
│   ├── Logo_Joycity_transparent.png
│   └── Logo_Joycity.webp
└── IMG_Highlights/         # HIGHLIGHTS 섹션 이미지
    ├── hl1_ps_store.png           # 성과1: PS 스토어 스크린샷
    ├── hl1_revenue_chart.png      # 성과1: 매출/DAU 비교 차트 (PPT 원본)
    ├── hl1_traffic_chart.png      # 성과1: DAU 비교 차트 (matplotlib 렌더링)
    ├── hl1_traffic_chart.svg      # (미사용) SVG 버전 — HTML에서 PNG 참조 중
    ├── hl2_dlc_chart.png          # 성과2: 캠프별 매출 차트 + 붉은 박스
    ├── hl2_reward.png             # 성과2: 초콜릿 캠프 보상 구조
    ├── hl2_table.png              # (미사용) 캠프 판매 기간 표
    ├── hl3_pet_chart.png          # 성과3: 펫 프로모션 매출 차트 (PPT 원본)
    ├── hl3_card_chart.svg         # 성과3: 카드 프로모션 매출/PU 차트 (SVG)
    ├── hl3_card_chart.png         # (미사용) PNG 버전 — 한글 깨짐
    ├── hl4_event_chart.png        # 성과4: DLC 판매량 변화 차트 + 붉은 박스
    ├── hl4_point_banner.png       # 성과4: POPUP POINT PAYBACK 배너
    └── hl4_dlc_banner.png         # 성과4: POPUP DLC PAYBACK 배너
```

---

## 4. SPA 구조

### 페이지 전환 방식

JavaScript로 구현된 클라이언트 사이드 라우팅이다. URL 해시나 History API는 사용하지 않고, CSS class 토글 방식으로 작동한다.

```
nav-link[data-page="about"] → click → #about.page.active
nav-link[data-page="projects"] → click → #projects.page.active
...
```

- 모든 `<section class="page">`는 기본 `display: none`
- `.page.active`만 `display: block`으로 표시
- 전환 시 fadeIn 애니메이션 적용 (0.3s)

### 페이지 구성 (5개 섹션)

| 섹션 ID | 메뉴명 | 상태 | 설명 |
|---------|--------|------|------|
| `about` | ABOUT | 완성 | 개인정보, 경력, 학력, 자격증, 사용 툴 |
| `projects` | PROJECTS | 더미 | 프로젝트 목록 (실제 데이터 미입력) |
| `highlights` | HIGHLIGHTS | 진행중 | 업무 성과 (조이시티 4건 완성, 더블유게임즈 미작성) |
| `documents` | DOCUMENTS | 더미 | 기획서 문서 (실제 파일 미연결) |
| `contact` | CONTACT | 더미 | 연락처 (실제 정보 미입력) |

---

## 5. 디자인 시스템

### 색상 팔레트

| 용도 | 색상 코드 | 설명 |
|------|----------|------|
| 배경 (body) | `#0a0a0f` | 거의 검은색 |
| 배경 (카드) | `#16161f` | 약간 밝은 다크 |
| 배경 (헤더) | `#1a1a2e` → `#16213e` | 그라데이션 |
| 배경 (네비) | `#12121a` | 네비게이션 바 |
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
macOS 기본 한글 폰트를 우선 사용. 별도 웹폰트 로드 없음.

---

## 6. 핵심 컴포넌트 구조

### HIGHLIGHTS 성과 카드 HTML 패턴

```html
<div class="hl-card">
    <h3 class="hl-card-title">성과 제목</h3>

    <!-- 이미지 갤러리 (1~3장 나란히) -->
    <div class="hl-card-images">
        <img src="IMG_Highlights/파일명.png" alt="설명" class="hl-card-img">
        <img src="IMG_Highlights/파일명.png" alt="설명" class="hl-card-img">
    </div>

    <!-- What 섹션 -->
    <div class="hl-section">
        <span class="hl-label hl-label-what">What</span>
        <div class="hl-content">
            <p>무엇을 했는지</p>
        </div>
    </div>

    <!-- How 섹션 -->
    <div class="hl-section">
        <span class="hl-label hl-label-how">How</span>
        <div class="hl-content">
            <p>어떻게 했는지</p>
        </div>
    </div>

    <!-- Result 섹션 -->
    <div class="hl-section">
        <span class="hl-label hl-label-result">Result</span>
        <div class="hl-content">
            <div class="hl-metrics">
                <div class="hl-metric">
                    <span class="hl-metric-value">수치와 설명을 한 문장으로</span>
                </div>
                <!-- 최대 3개 박스 나란히 -->
            </div>
            <p>추가 설명 (선택사항)</p>
        </div>
    </div>
</div>
```

### 경력 기간 자동 계산 (script.js)

```javascript
// 기준 날짜
const CAREER_START = '2020-10-19';   // 총 경력 시작일 (조이시티 입사)
const WGAMES_START = '2022-04-11';   // 더블유게임즈 입사일

// 대상 요소
#careerYM  → 총 경력 "N년 M개월"
#wgamesYM  → 더블유게임즈 재직기간
#wgamesRange → "2022. 04. ~ 현재" 동적 갱신
```

60초마다 자동 갱신. 조이시티는 퇴사해서 고정 값("1년 6개월")으로 표시.

---

## 7. 이미지 관리

### 이미지 소스

대부분의 HIGHLIGHTS 이미지는 PPT(경력 포트폴리오_이병권_230601.pptx)에서 추출했다.

- **PPT 슬라이드 매핑**: 슬라이드 16~17 = 성과 1, 슬라이드 18~19 = 성과 2, 슬라이드 20 = 성과 3, 슬라이드 21 = 성과 4
- **추출 방법**: python-pptx로 이미지 추출, 차트 오브젝트는 데이터 추출 후 matplotlib 또는 SVG로 렌더링
- **붉은 박스**: PPT의 `직사각형` 도형(#FF0000 테두리)을 EMU→픽셀 좌표 변환 후 PIL로 합성

### 한글 폰트 제약

Claude Cowork의 Linux VM 환경에는 한글 폰트가 정상 작동하지 않는다 (DroidSansFallbackFull.ttf가 존재하나 글리프 렌더링 불가). 따라서:

- **matplotlib로 생성한 PNG**: 한글 라벨 대신 영문 사용 (hl1_traffic_chart.png)
- **한글이 필요한 차트**: SVG로 생성하여 브라우저 폰트로 렌더링 (hl3_card_chart.svg)
- **PPT에서 직접 추출한 이미지**: 원본 그대로 한글 표시됨

### 이미지 CSS

```css
.hl-card-img {
    background-color: rgba(255, 255, 255, 0.9);  /* 약간 투명한 흰 배경 */
    border-radius: 10px;                          /* 둥근 모서리 */
    max-height: 280px;
    object-fit: contain;
    padding: 10px;
}
```

이미지 갤러리(`.hl-card-images`)는 `display: flex; gap: 10px`으로 자식 이미지를 나란히 배치한다. 자식 `.hl-card-img`는 `flex: 1; min-width: 0`으로 균등 분배.

---

## 8. Git 히스토리

```
834c7cf fix(highlights): 성과 1 트래픽 차트 원본 PNG로 복원
57fb779 feat(highlights): 성과별 이미지 추가 및 UI 개선
d0bcc02 feat(highlights): What/How/Result 라벨 전환 및 국어 교정
38a55ee feat(about): build portfolio site with about page, career timeline, and tools
```

---

## 9. 알려진 이슈 및 주의사항

1. **Git push**: Claude Cowork VM에서는 네트워크가 제한되어 push 불가. 사용자가 로컬 터미널에서 직접 실행해야 함
2. **GitHub Pages 캐시**: 변경 배포 후 Cmd+Shift+R (하드 리프레시) 필요
3. **한글 폰트 없음**: matplotlib/PIL에서 한글 렌더링 불가. SVG 또는 이미지 편집 도구 사용
4. **PPT 경로에 한글**: `5. 웹사이트` 폴더명에 한글/공백 포함 — python-pptx 사용 시 파일을 단순 경로로 복사 후 작업
5. **미사용 이미지 파일**: hl2_table.png, hl3_card_chart.png, hl1_traffic_chart.svg가 HTML에서 참조되지 않고 남아있음 — 정리 필요

---

## 10. 새 세션에서 작업 시작 시 체크리스트

1. 이 문서(ARCHITECTURE.md)와 WORK_HISTORY.md를 먼저 읽기
2. index.html 전체 구조 파악 (SPA 5개 섹션)
3. style.css의 색상 팔레트 및 클래스 체계 확인
4. Git 로그로 최신 커밋 상태 확인: `git log --oneline -5`
5. 미완료 작업은 WORK_HISTORY.md의 "미완료 / 향후 작업" 섹션 참고
