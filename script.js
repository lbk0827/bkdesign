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
        summary: '작성 예정',
        team: '기획/개발 협업',
        role: '시스템 기획, 인게임 기획, 콘텐츠 기획, BM/상품 기획, 지표 분석',
        period: '2026. 03. ~ 현재',
        links: [],
        gallery: [
            { src: 'IMG_Projects/DartAway.jpg', alt: 'Dart Away 프로젝트 대표 스크린샷' }
        ],
        responsibilities: [
            '작성 예정'
        ],
        achievements: [
            '작성 예정'
        ],
        coreFeatures: [
            { title: '작성 예정', description: '작성 예정' }
        ],
        retrospective: '작성 예정'
    },
    'color-slide-jam': {
        title: 'Color Slide Jam / Wood Rush Puzzle',
        summary: '작성 예정',
        team: '기획/개발/QA/아트 협업',
        role: '시스템 기획, 인게임 기획, 콘텐츠 기획, BM/상품 기획, 지표 분석',
        period: '2024. 09. ~ 현재',
        links: [],
        gallery: [
            { src: 'IMG_Projects/ColorSlideJam.jpg', alt: 'Color Slide Jam 게임 화면' },
            { src: 'IMG_Projects/WoodRushPuzzle.jpg', alt: 'Wood Rush Puzzle 게임 화면' }
        ],
        responsibilities: [
            '작성 예정'
        ],
        achievements: [
            '작성 예정'
        ],
        coreFeatures: [
            { title: '작성 예정', description: '작성 예정' }
        ],
        retrospective: '작성 예정'
    },
    'bingo-haven': {
        title: 'Bingo Haven',
        summary: '작성 예정',
        team: '기획/운영 협업',
        role: '시스템 기획, 인게임 기획, 콘텐츠 기획, BM/상품 기획, 지표 분석',
        period: '2023. 03. ~ 2024. 08.',
        links: [],
        gallery: [
            { src: 'IMG_Projects/BingoHaven.jpg', alt: 'Bingo Haven 게임 화면' }
        ],
        responsibilities: [
            '작성 예정'
        ],
        achievements: [
            '작성 예정'
        ],
        coreFeatures: [
            { title: '작성 예정', description: '작성 예정' }
        ],
        retrospective: '작성 예정'
    },
    'ai-wars': {
        title: 'A.I Wars',
        summary: '작성 예정',
        team: '본부 간 협업',
        role: '인게임 기획, 시스템 기획, Level Editor Tool 기획',
        period: '2023. 05. ~ 2023. 08.',
        links: [],
        gallery: [
            { src: 'IMG_Projects/AIWars.webp', alt: 'A.I Wars 프로젝트 대표 화면' }
        ],
        responsibilities: [
            '작성 예정'
        ],
        achievements: [
            '작성 예정'
        ],
        coreFeatures: [
            { title: '작성 예정', description: '작성 예정' }
        ],
        retrospective: '작성 예정'
    },
    'spinning-in-space': {
        title: 'Spining In Space',
        summary: '작성 예정',
        team: '기획/개발 협업',
        role: '데이터 테이블 기획/관리, 튜토리얼 기획, 콘텐츠 기획',
        period: '2022. 04. ~ 2022. 12.',
        links: [],
        gallery: [
            { src: 'IMG_Projects/SpinningInSpace.jpg', alt: 'Spining In Space 게임 화면' }
        ],
        responsibilities: [
            '작성 예정'
        ],
        achievements: [
            '작성 예정'
        ],
        coreFeatures: [
            { title: '작성 예정', description: '작성 예정' }
        ],
        retrospective: '작성 예정'
    },
    '3on3-freestyle': {
        title: '3on3 FreeStyle',
        summary: '작성 예정',
        team: '사업/기획/운영 협업',
        role: '상품/BM 기획, 콘텐츠 기획, 지표 분석',
        period: '2020. 10. ~ 2022. 04.',
        links: [],
        gallery: [
            { src: 'IMG_Projects/3on3FreeStyle.jpeg', alt: '3on3 FreeStyle 게임 화면' }
        ],
        responsibilities: [
            '작성 예정'
        ],
        achievements: [
            '작성 예정'
        ],
        coreFeatures: [
            { title: '작성 예정', description: '작성 예정' }
        ],
        retrospective: '작성 예정'
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
