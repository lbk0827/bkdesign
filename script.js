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
        galleryLayout: 'grid',
        links: [],
        gallery: [
            { src: 'IMG_Projects/BingoHaven.jpg', alt: 'Bingo Haven 프로젝트 대표 화면' },
            { src: 'IMG_Projects/BingoHaven_Slides/BingoHaven_Slide_02.jpg', alt: 'Bingo Haven 슬라이드 3 스크린샷 2' },
            { src: 'IMG_Projects/BingoHaven_Slides/BingoHaven_Slide_03.jpg', alt: 'Bingo Haven 슬라이드 3 스크린샷 3' },
            { src: 'IMG_Projects/BingoHaven_Slides/BingoHaven_Slide_04.jpg', alt: 'Bingo Haven 슬라이드 3 스크린샷 4' }
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
            { src: 'IMG_Projects/AIWars.webp', alt: 'A.I Wars 프로젝트 대표 화면' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_1.png', alt: 'A.I Wars 스크린샷 1' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_2.png', alt: 'A.I Wars 스크린샷 2' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_3.png', alt: 'A.I Wars 스크린샷 3' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_4.png', alt: 'A.I Wars 스크린샷 4' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_5.png', alt: 'A.I Wars 스크린샷 5' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_Mode_01.png', alt: 'A.I Wars Noise Crasher 모드 스크린샷 1' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_Mode_02.png', alt: 'A.I Wars Noise Crasher 모드 스크린샷 2' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_Mode_03.png', alt: 'A.I Wars Noise Crasher 모드 스크린샷 3' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_Mode_04.png', alt: 'A.I Wars Noise Crasher 모드 스크린샷 4' }
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
        galleryLayout: 'row',
        links: [],
        gallery: [
            { src: 'IMG_Projects/SpinningInSpace_Downloads/SpinningInSpace_Extra_00.jpg', alt: 'Spining In Space 추가 스크린샷 0' },
            { src: 'IMG_Projects/SpinningInSpace_Downloads/SpinningInSpace_Extra_01.jpg', alt: 'Spining In Space 추가 스크린샷 1' },
            { src: 'IMG_Projects/SpinningInSpace_Downloads/SpinningInSpace_Extra_02.jpg', alt: 'Spining In Space 추가 스크린샷 2' },
            { src: 'IMG_Projects/SpinningInSpace_Downloads/SpinningInSpace_Extra_03.jpg', alt: 'Spining In Space 추가 스크린샷 3' },
            { src: 'IMG_Projects/SpinningInSpace_Downloads/SpinningInSpace_Extra_04.jpg', alt: 'Spining In Space 추가 스크린샷 4' }
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
        summary: 'PS4·PS5·Xbox·Steam에서 글로벌 서비스 중인 3v3 스트리트 농구 게임으로, PM 직무로 게임 업계에 입문한 프로젝트다. 상품/BM 기획부터 콘텐츠·이벤트 설계, 지표 분석까지 라이브 서비스 운영의 전 과정을 경험했으며, SONY 글로벌 팀과의 직접 협업과 매출 구조 개편 등을 주도하며 데이터 기반 의사결정의 기초를 다졌다.',
        team: '사업/기획/운영 협업',
        role: '상품/BM 기획, 콘텐츠 기획, 지표 분석',
        period: '2020. 10. ~ 2022. 04.',
        links: [],
        gallery: [
            { src: 'IMG_Projects/3on3FreeStyle.jpeg', alt: '3on3 FreeStyle 게임 화면' },
            { src: 'IMG_Projects/FS_1.jpg', alt: '3on3 FreeStyle 스크린샷 1' },
            { src: 'IMG_Projects/FS_2.jpg', alt: '3on3 FreeStyle 스크린샷 2' },
            { src: 'IMG_Projects/FS_3.jpg', alt: '3on3 FreeStyle 스크린샷 3' },
            { src: 'IMG_Projects/FS_4.jpg', alt: '3on3 FreeStyle 스크린샷 4' }
        ],
        responsibilities: [
            { tag: '지표 분석 및 KPI 관리', desc: 'DAU, 매출, PU(과금 유저) 등 핵심 지표를 일 단위로 모니터링하고, 주간·월간 KPI 리포트를 작성하여 의사결정 근거를 제공. 지표 이상 징후 발생 시 원인을 분석하고 대응 방안을 도출' },
            { tag: '상품 / BM 기획', desc: '지표 분석을 기반으로 DLC·인게임 상품의 가격 정책과 판매 전략을 수립. 유저 과금 데이터 분석을 통해 가격대를 재설정하고, 시즌별 프로모션 및 할인 구조를 설계' },
            { tag: '콘텐츠 / 이벤트 기획', desc: '시즌 이벤트, 챌린지 캠프 DLC, 운영 이벤트 등 라이브 서비스 콘텐츠를 기획하고 일정을 관리. 웹 이벤트 페이지를 기획하여 인게임 외부에서의 유저 참여 접점을 확대' },
            { tag: '마케팅', desc: 'SONY 글로벌 프로모션 팀과 직접 협업하여 PS 스토어 메인 페이지 노출 및 PS+ 유료 구독자 대상 마케팅을 기획·실행. YouTube 라이브 방송을 활용한 유저 컴페티션 이벤트를 기획·운영하여 커뮤니티 활성화 및 신규 유입을 유도' },
            { tag: '업데이트 스펙 관리', desc: '월 목표 매출 달성을 위해 과거 BM 상품 판매 실적 및 이벤트 효과를 분석하고, 이를 기반으로 월 단위 업데이트·패치 스케줄을 수립·관리' },
            { tag: '커뮤니케이션', desc: '기획팀, 클라이언트팀, 서버팀 등 유관 부서와의 협업 창구를 담당하며, 업데이트 요건 정의부터 QA·배포까지 부서 간 일정 조율 및 이슈 커뮤니케이션을 주도' }
        ],
        retrospective: '작성 예정'
    }
};

const projectOverlay = document.getElementById('projectOverlay');
const projectOverlayPanel = document.querySelector('.proj-overlay-panel');
const overlayCloseBtn = document.getElementById('overlayCloseBtn');
const overlayTitle = document.getElementById('overlayProjectTitle');
const overlayPeriod = document.getElementById('overlayProjectPeriod');
const overlaySummary = document.getElementById('overlayProjectSummary');
const overlayMeta = document.getElementById('overlayProjectMeta');
const overlayLinks = document.getElementById('overlayProjectLinks');
const overlayGalleryImages = document.getElementById('overlayGalleryImages');
const overlayResponsibilities = document.getElementById('overlayResponsibilities');
const overlayRetrospective = document.getElementById('overlayRetrospective');

let lastFocusedCard = null;

function resetOverlayScroll() {
    if (projectOverlayPanel) {
        projectOverlayPanel.scrollTop = 0;
    }
    if (projectOverlay) {
        projectOverlay.scrollTop = 0;
    }
}

function renderOverlayList(targetEl, items) {
    targetEl.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        targetEl.appendChild(li);
    });
}

function renderResponsibilities(items) {
    overlayResponsibilities.innerHTML = '';
    items.forEach(item => {
        if (typeof item === 'string') {
            const li = document.createElement('div');
            li.className = 'resp-item-simple';
            li.textContent = item;
            overlayResponsibilities.appendChild(li);
        } else {
            const block = document.createElement('div');
            block.className = 'resp-item';
            const tag = document.createElement('span');
            tag.className = 'resp-tag';
            tag.textContent = item.tag;
            const desc = document.createElement('span');
            desc.className = 'resp-desc';
            desc.textContent = item.desc;
            block.appendChild(tag);
            block.appendChild(desc);
            overlayResponsibilities.appendChild(block);
        }
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

function renderOverlayGallery(gallery, layout = 'grid') {
    overlayGalleryImages.innerHTML = '';
    overlayGalleryImages.classList.toggle('is-row', layout === 'row');
    if (layout === 'row') {
        overlayGalleryImages.style.setProperty('--gallery-cols', String(gallery?.length || 1));
    } else {
        overlayGalleryImages.style.removeProperty('--gallery-cols');
    }

    if (!gallery || gallery.length === 0) {
        return;
    }

    gallery.forEach((image) => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.className = 'proj-overlay-gallery-image';
        overlayGalleryImages.appendChild(img);
    });
}


function openProjectOverlay(projectId, cardEl) {
    const detail = PROJECT_DETAILS[projectId];
    if (!detail) {
        return;
    }

    lastFocusedCard = cardEl || null;

    overlayTitle.textContent = detail.title;
    overlayPeriod.textContent = detail.period;
    overlaySummary.textContent = detail.summary;
    overlayMeta.textContent = detail.role;
    overlayRetrospective.textContent = detail.retrospective;

    renderOverlayLinks(detail.links);
    renderOverlayGallery(detail.gallery, detail.galleryLayout || 'grid');
    renderResponsibilities(detail.responsibilities);

    resetOverlayScroll();

    projectOverlay.classList.add('is-open');
    projectOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    overlayCloseBtn.focus();

    // display 전환 직후에도 스크롤 위치를 한 번 더 초기화해 브라우저별 잔존 스크롤을 방지
    requestAnimationFrame(resetOverlayScroll);
}

function closeProjectOverlay() {
    projectOverlay.classList.remove('is-open');
    projectOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    resetOverlayScroll();
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
