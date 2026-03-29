// 모든 네비게이션 링크 가져오기
const navLinks = document.querySelectorAll('.nav-link');

// 모든 페이지 섹션 가져오기
const pages = document.querySelectorAll('.page');

// 각 네비게이션 링크에 클릭 이벤트 추가
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // 어떤 페이지를 보여줄지 가져오기
        const targetPage = this.getAttribute('data-page');

        // 모든 링크에서 active 제거
        navLinks.forEach(nav => nav.classList.remove('active'));

        // 클릭한 링크에 active 추가
        this.classList.add('active');

        // 모든 페이지 숨기기
        pages.forEach(page => page.classList.remove('active'));

        // 선택한 페이지만 보여주기
        document.getElementById(targetPage).classList.add('active');

        // 페이지 전환 시 항상 최상단에서 시작
        window.scrollTo(0, 0);
    });
});

// ===== 경력 기간 자동 계산 =====

// 총 경력 시작일 (조이시티 입사)
const CAREER_START = '2020-10-19';
// 더블유게임즈 입사일
const WGAMES_START = '2022-04-11';

// 개월 수 계산 함수
function calcYearsMonths(from, to) {
    let months = (to.getFullYear() - from.getFullYear()) * 12
               + (to.getMonth() - from.getMonth());
    const sameDayThisMonth = new Date(to.getFullYear(), to.getMonth(), from.getDate());
    if (to < sameDayThisMonth) months -= 1;
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return { years, months: remMonths };
}

// YYYY. MM. 포맷
function fmtYYYYMM(dt) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    return `${y}. ${m}.`;
}

function renderCareerDurations() {
    const now = new Date();

    // 총 경력
    const total = calcYearsMonths(new Date(CAREER_START), now);
    const careerEl = document.getElementById('careerYM');
    if (careerEl) careerEl.textContent = `${total.years}년 ${total.months}개월`;

    // 더블유게임즈
    const wgames = calcYearsMonths(new Date(WGAMES_START), now);
    const wgamesYMEl = document.getElementById('wgamesYM');
    if (wgamesYMEl) wgamesYMEl.textContent = `${wgames.years}년 ${wgames.months}개월`;

    const wgamesRangeEl = document.getElementById('wgamesRange');
    if (wgamesRangeEl) wgamesRangeEl.textContent = `2022. 04. ~ ${fmtYYYYMM(now)}`;
}

// 최초 실행 + 1분마다 갱신
renderCareerDurations();
setInterval(renderCareerDurations, 60 * 1000);

// ===== 이미지 드래그 방지 =====
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// ===== 참여 프로젝트 상세 오버레이 =====
const PROJECT_DETAILS = {
    'dart-away': {
        title: 'Dart Away : Balloon Pop Puzzle',
        summary: '풍선 팝 퍼즐의 초기 프로토타입 단계에서 핵심 루프와 메타 구조를 정의하고, 라이브 확장을 고려한 시스템 골격을 설계한 프로젝트',
        team: '기획/개발 협업',
        role: '시스템 기획, 인게임 기획, 콘텐츠 기획, BM/상품 기획, 지표 분석',
        period: '2026. 03. ~ 현재',
        links: [],
        gallery: [
            { src: 'IMG_Projects/DartAway.jpg', alt: 'Dart Away 프로젝트 대표 스크린샷' },
            { src: 'IMG_Projects/ColorSlideJam.jpg', alt: '퍼즐 콘텐츠 레퍼런스 화면' }
        ],
        responsibilities: [
            '게임의 핵심 플레이 루프와 세션 구조를 정의하고 플레이 흐름 문서화',
            '실패/보상 구간 설계를 통해 튜토리얼 이후 체류 구간의 재미 포인트 정리',
            '상품 노출 지점과 플레이 흐름 간 충돌을 줄이는 BM 동선 초안 작성'
        ],
        achievements: [
            '초기 기획안 기준으로 프로토타입 우선순위를 정리해 개발 착수 리드타임 단축',
            '핵심 기능 범위를 명확히 하여 팀 내 의사결정 속도 향상'
        ],
        coreFeatures: [
            { title: '풍선 타겟팅 퍼즐 루프', description: '짧은 세션 안에서 즉시 목표를 인지하고 달성하도록 설계한 기본 플레이 구조' },
            { title: '진행 구간별 난이도 체감', description: '초반 학습 구간과 중반 도전 구간의 난이도 전이를 단계적으로 구성' },
            { title: '보상 기반 재도전 구조', description: '실패 후 재도전 동기를 유지하도록 보상 노출 타이밍을 조정한 구조' }
        ],
        retrospective: '다음 단계에서는 핵심 루프 검증을 위한 A/B 테스트 항목을 사전에 정의해 초기 지표 수집의 정확도를 더 높일 계획입니다.'
    },
    'color-slide-jam': {
        title: 'Color Slide Jam / Wood Rush Puzzle',
        summary: '기믹/스테이지/수익화 요소를 함께 설계해 라이브 서비스의 재미와 성과를 동시에 개선한 퍼즐 프로젝트',
        team: '기획/개발/QA/아트 협업',
        role: '시스템 기획, 인게임 기획, 콘텐츠 기획, BM/상품 기획, 지표 분석',
        period: '2024. 09. ~ 현재',
        links: [
            {
                label: '기믹 상호작용 가이드',
                url: 'https://docs.google.com/spreadsheets/d/1HruZz2tJ-SBnpbmwf9WAopbE4p3bYlRByLy4HcCUuDs/edit?gid=1444205979#gid=1444205979'
            }
        ],
        gallery: [
            { src: 'IMG_Projects/ColorSlideJam.jpg', alt: 'Color Slide Jam 게임 화면' },
            { src: 'IMG_Projects/WoodRushPuzzle.jpg', alt: 'Wood Rush Puzzle 게임 화면' },
            { src: 'IMG_Highlights/hl_gimmick_blocks.png', alt: 'ColorSlideJam 기믹 블록 1~14종 일람' },
            { src: 'IMG_Highlights/hl_sales_chart.png', alt: 'ColorSlideJam 하반기 상품 매출 성과 차트' },
            { src: 'IMG_Highlights/hl_retention_chart.png', alt: 'ColorSlideJam 월별 리텐션 추이 차트' }
        ],
        responsibilities: [
            '기믹 32종을 기획하고 기믹 간 상호작용 룰을 통합 문서로 정의',
            '신규 스테이지 약 300종 제작 및 교차 검증 프로세스로 품질 안정화',
            '실패 상황과 BM 노출 지점을 연계해 구매 전환 흐름을 설계'
        ],
        achievements: [
            "기믹 기반 Fail Bundle 판매량 약 3.3만 건, 매출 16만 USD 달성",
            '4분기 평균 D7 리텐션 25.9% 달성(3분기 대비 약 40% 상승)',
            'D28 리텐션 8.77% → 15.42%로 성장'
        ],
        coreFeatures: [
            { title: '기믹 상호작용 시스템', description: '기믹 간 우선순위와 예외 케이스를 규격화해 안정적인 플레이 제공' },
            { title: '대량 스테이지 운영 파이프라인', description: '제작-검증-반영의 반복 사이클을 빠르게 돌릴 수 있는 운영 구조' },
            { title: '실패 상황 연계 BM 구조', description: '유저 위기 상황을 즉시 해결하는 번들을 자연스럽게 노출하는 방식' },
            { title: '리텐션 개선형 레벨 디자인', description: '기믹 조합 변주를 통해 반복 피로를 줄이고 장기 체류를 유도' }
        ],
        retrospective: '스테이지 제작량이 늘어나는 시점에 자동 검증 도구를 더 빠르게 도입했다면 QA 리소스를 추가로 절감할 수 있었을 것으로 판단합니다.'
    },
    'bingo-haven': {
        title: 'Bingo Haven',
        summary: '라이브 운영과 콘텐츠 확장을 병행하며 서비스 안정성과 시즌 업데이트 속도를 유지한 프로젝트',
        team: '기획/운영 협업',
        role: '시스템 기획, 인게임 기획, 콘텐츠 기획, BM/상품 기획, 지표 분석',
        period: '2023. 03. ~ 2024. 08.',
        links: [],
        gallery: [
            { src: 'IMG_Projects/BingoHaven.jpg', alt: 'Bingo Haven 게임 화면' },
            { src: 'IMG_Highlights/hl5_data_table_mgmt.png', alt: '데이터 관리 문서 예시' }
        ],
        responsibilities: [
            '시즌 콘텐츠 기획 및 운영 이슈 대응 기준 수립',
            '상품 구성과 이벤트 구조를 지표 기반으로 개선',
            '라이브 환경에서 반복되는 운영 업무의 프로세스 정리'
        ],
        achievements: [
            '콘텐츠 업데이트 주기를 안정적으로 유지하며 라이브 운영 품질 확보',
            '운영 업무 표준화로 팀 커뮤니케이션 비용 절감'
        ],
        coreFeatures: [
            { title: '시즌형 콘텐츠 운영', description: '주기적 업데이트에 맞춘 콘텐츠 설계 및 배포 구조' },
            { title: '운영 지표 기반 개선 루프', description: '핵심 지표를 기반으로 우선순위를 선정하고 반복 개선' },
            { title: '이벤트/상품 연동 설계', description: '이벤트 참여 경험과 상품 노출 간 연결성을 강화한 구조' }
        ],
        retrospective: '운영 이벤트의 재사용 템플릿을 더 일찍 구축했다면 시즌 전환 시점의 준비 시간을 더 단축할 수 있었습니다.'
    },
    'ai-wars': {
        title: 'A.I Wars',
        summary: '타 본부 출시 일정에 맞춰 미니게임 메타 콘텐츠를 기획·개발하고 전달한 협업 지원 프로젝트',
        team: '본부 간 협업',
        role: '인게임 기획, 시스템 기획, Level Editor Tool 기획',
        period: '2023. 05. ~ 2023. 08.',
        links: [],
        gallery: [
            { src: 'IMG_Projects/AIWars.webp', alt: 'A.I Wars 프로젝트 대표 화면' },
            { src: 'IMG_Highlights/hl6_ai_wars_classic.png', alt: 'A.I Wars 클래식 모드' },
            { src: 'IMG_Highlights/hl6_ai_wars_boss.png', alt: 'A.I Wars 보스전 모드' }
        ],
        responsibilities: [
            '요청 본부와 방향성/콘셉트를 정리하고 미니게임 구조 설계',
            '인게임 규칙과 레벨 제작 흐름을 Level Editor Tool 요구사항으로 구체화',
            '자체 본부 프로그래머와 협업해 구현 우선순위 조율'
        ],
        achievements: [
            '클래식, 하이스코어, 보스전, 산성비 등 4종 모드 구현',
            'Level Editor Tool 기반 스테이지 제작 환경 구축',
            '출시 일정 내 콘텐츠 전달 완료'
        ],
        coreFeatures: [
            { title: '모드 확장형 미니게임', description: '공통 코어 위에 다양한 플레이 모드를 빠르게 확장 가능한 설계' },
            { title: '에디터 기반 레벨 제작', description: '운영팀이 직접 스테이지를 생산할 수 있는 제작 파이프라인 구성' },
            { title: '출시 대응형 협업 프로세스', description: '외부 요청 일정에 맞춰 범위와 품질을 동시에 관리한 실행 구조' }
        ],
        retrospective: '향후 유사한 지원 프로젝트에서는 초기 단계에 QA 체크리스트를 함께 정의해 마감 직전 리스크를 더 줄일 계획입니다.'
    },
    'spinning-in-space': {
        title: 'Spining In Space',
        summary: '데이터/튜토리얼/콘텐츠 기획을 맡아 초기 라이브 운영 기반을 갖춘 프로젝트',
        team: '기획/개발 협업',
        role: '데이터 테이블 기획/관리, 튜토리얼 기획, 콘텐츠 기획',
        period: '2022. 04. ~ 2022. 12.',
        links: [],
        gallery: [
            { src: 'IMG_Projects/SpinningInSpace.jpg', alt: 'Spining In Space 게임 화면' },
            { src: 'IMG_Highlights/hl5_data_table_mgmt.png', alt: '데이터 테이블 트래킹 문서' }
        ],
        responsibilities: [
            '튜토리얼 경험을 재설계해 신규 유저의 초기 진입 이해도 개선',
            '데이터 테이블 관리 체계를 정리하고 변경 히스토리 기록 구조 구축',
            '콘텐츠 업데이트를 위한 기획/운영 기준 문서화'
        ],
        achievements: [
            '데이터 테이블 트래킹 시스템 구축으로 변경 이력 추적 및 협업 효율 향상',
            '운영 대응 속도 개선으로 업데이트 안정성 확보'
        ],
        coreFeatures: [
            { title: '튜토리얼 온보딩 플로우', description: '초기 이탈을 줄이기 위한 단계별 학습 시퀀스 설계' },
            { title: '데이터 변경 이력 관리', description: '작업자/시간/변경점을 한 화면에서 추적하는 운영 구조' },
            { title: '콘텐츠 운영 문서 체계', description: '기획 의도와 운영 기준을 한 문서 흐름으로 통합' }
        ],
        retrospective: '향후에는 데이터 점검 자동화 항목을 추가해 운영 이슈 감지 시간을 더 줄이는 것이 목표입니다.'
    },
    '3on3-freestyle': {
        title: '3on3 FreeStyle',
        summary: '라이브 서비스의 매출 하락 구간에서 BM/이벤트 구조를 재설계해 성과 반등을 만든 프로젝트',
        team: '사업/기획/운영 협업',
        role: '상품/BM 기획, 콘텐츠 기획, 지표 분석',
        period: '2020. 10. ~ 2022. 04.',
        links: [],
        gallery: [
            { src: 'IMG_Projects/3on3FreeStyle.jpeg', alt: '3on3 FreeStyle 게임 화면' },
            { src: 'IMG_Highlights/hl1_ps_store.png', alt: 'PS 스토어 메인 페이지 노출' },
            { src: 'IMG_Highlights/hl1_revenue_chart.png', alt: 'PS+ 프로모션 성과 차트' },
            { src: 'IMG_Highlights/hl2_dlc_chart.png', alt: 'DLC 성과 차트' },
            { src: 'IMG_Highlights/hl3_card_chart.svg', alt: '프로모션 매출/PU 차트' }
        ],
        responsibilities: [
            'SONY 협업을 통한 스토어 노출 및 프로모션 실행',
            'DLC 보상 구조 개편과 이벤트 설계로 구매 동기 강화',
            '가챠/확정판매 방식 전환 및 가격 정책 재설계'
        ],
        achievements: [
            'PS+ 경로 신규 유저 +15%, 복귀 유저 +34% 증가',
            '펫 가챠 매출 전 분기 대비 +150%, 전월 대비 +336%',
            '운영 이벤트 설계를 통해 DLC 매출 방어 및 반등'
        ],
        coreFeatures: [
            { title: '스토어 연계 마케팅 플로우', description: '외부 플랫폼 노출과 인게임 이벤트를 연동한 유입 구조' },
            { title: 'DLC 동기 강화 보상 설계', description: '즉시 보상 체감과 희소가치를 동시에 강화한 보상 구조' },
            { title: '상품 판매 방식 최적화', description: '유저 과금 패턴 기반으로 판매 형태와 가격대를 재설정' },
            { title: '운영 이벤트 대응 프레임', description: '정책 제약 내에서 매출 하락을 방어하는 대안 이벤트 구조' }
        ],
        retrospective: '앞으로는 프로모션 실험 설계를 더 세분화해 지역별로 최적화된 BM 전략을 더 빠르게 검증하려고 합니다.'
    }
};

const projectOverlay = document.getElementById('projectOverlay');
const projectOverlayPanel = document.querySelector('.proj-overlay-panel');
const overlayCloseBtn = document.getElementById('overlayCloseBtn');
const overlayTitle = document.getElementById('overlayProjectTitle');
const overlaySummary = document.getElementById('overlayProjectSummary');
const overlayMeta = document.getElementById('overlayProjectMeta');
const overlayLinks = document.getElementById('overlayProjectLinks');
const overlayMainImage = document.getElementById('overlayMainImage');
const overlayThumbs = document.getElementById('overlayThumbs');
const overlayResponsibilities = document.getElementById('overlayResponsibilities');
const overlayAchievements = document.getElementById('overlayAchievements');
const overlayCoreFeatures = document.getElementById('overlayCoreFeatures');
const overlayRetrospective = document.getElementById('overlayRetrospective');

let lastFocusedCard = null;

function renderOverlayList(targetEl, items) {
    targetEl.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        targetEl.appendChild(li);
    });
}

function renderOverlayLinks(links) {
    overlayLinks.innerHTML = '';

    if (!links || links.length === 0) {
        return;
    }

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.label;
        a.className = 'proj-overlay-link';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        overlayLinks.appendChild(a);
    });
}

function setGalleryMainImage(image) {
    overlayMainImage.src = image.src;
    overlayMainImage.alt = image.alt;
}

function renderOverlayGallery(gallery) {
    overlayThumbs.innerHTML = '';

    if (!gallery || gallery.length === 0) {
        overlayMainImage.src = '';
        overlayMainImage.alt = '';
        return;
    }

    setGalleryMainImage(gallery[0]);

    gallery.forEach((image, idx) => {
        const thumb = document.createElement('img');
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.className = `proj-overlay-thumb${idx === 0 ? ' is-active' : ''}`;
        thumb.addEventListener('click', () => {
            setGalleryMainImage(image);
            overlayThumbs.querySelectorAll('.proj-overlay-thumb').forEach(node => {
                node.classList.remove('is-active');
            });
            thumb.classList.add('is-active');
        });
        overlayThumbs.appendChild(thumb);
    });
}

function renderCoreFeatures(features) {
    overlayCoreFeatures.innerHTML = '';
    features.forEach(feature => {
        const card = document.createElement('div');
        card.className = 'proj-overlay-feature';
        const title = document.createElement('h5');
        title.className = 'proj-overlay-feature-title';
        title.textContent = feature.title;
        const desc = document.createElement('p');
        desc.className = 'proj-overlay-feature-desc';
        desc.textContent = feature.description;
        card.appendChild(title);
        card.appendChild(desc);
        overlayCoreFeatures.appendChild(card);
    });
}

function openProjectOverlay(projectId, cardEl) {
    const detail = PROJECT_DETAILS[projectId];
    if (!detail) {
        return;
    }

    lastFocusedCard = cardEl || null;

    overlayTitle.textContent = detail.title;
    overlaySummary.textContent = detail.summary;
    overlayMeta.textContent = `${detail.period} | 팀 ${detail.team} | 역할 ${detail.role}`;
    overlayRetrospective.textContent = detail.retrospective;

    renderOverlayLinks(detail.links);
    renderOverlayGallery(detail.gallery);
    renderOverlayList(overlayResponsibilities, detail.responsibilities);
    renderOverlayList(overlayAchievements, detail.achievements);
    renderCoreFeatures(detail.coreFeatures);

    if (projectOverlayPanel) {
        projectOverlayPanel.scrollTop = 0;
    }

    projectOverlay.classList.add('is-open');
    projectOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    overlayCloseBtn.focus();
}

function closeProjectOverlay() {
    projectOverlay.classList.remove('is-open');
    projectOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedCard) {
        lastFocusedCard.focus();
    }
}

document.querySelectorAll('.proj-card[data-project-id]').forEach(card => {
    card.addEventListener('click', () => {
        openProjectOverlay(card.dataset.projectId, card);
    });

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProjectOverlay(card.dataset.projectId, card);
        }
    });
});

if (projectOverlay) {
    projectOverlay.addEventListener('click', (e) => {
        if (e.target.matches('[data-close-overlay]')) {
            closeProjectOverlay();
        }
    });
}

if (overlayCloseBtn) {
    overlayCloseBtn.addEventListener('click', closeProjectOverlay);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectOverlay && projectOverlay.classList.contains('is-open')) {
        closeProjectOverlay();
    }
});

// ===== 푸터 연도 자동 갱신 =====
document.getElementById('year').textContent = new Date().getFullYear();
