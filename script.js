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

    const projectARangeEndEl = document.getElementById('projectARangeEnd');
    if (projectARangeEndEl) projectARangeEndEl.textContent = fmtYYYYMM(now);
}

// 최초 실행 + 1분마다 갱신
renderCareerDurations();
setInterval(renderCareerDurations, 60 * 1000);

// ===== 기획 문서 오버레이 시스템 =====
const DOC_DATA = {
    'new-user-mission': {
        title: '캐주얼 게임 - 신규 사용자 미션',
        folder: 'GameDesignDocs/CSJ-NewUserMission',
        prefix: 'mission_',
        count: 35,
        defaultZoom: 100
    },
    'daily-challenge': {
        title: '캐주얼 게임 - 데일리 챌린지',
        folder: 'GameDesignDocs/CSJ-DailyChallenge',
        prefix: 'daily_',
        count: 50,
        defaultZoom: 80
    },
    'ingame-flow': {
        title: '캐주얼 게임 - 인게임 플로우',
        folder: 'GameDesignDocs/CSJ-InGame_InGameFlow',
        prefix: 'ingame_',
        count: 7,
        defaultZoom: 100
    },
    'ingame-control': {
        title: '캐주얼 게임 - 블록 조작 / 분쇄',
        folder: 'GameDesignDocs/CSJ-InGame_Control',
        prefix: 'control_',
        count: 9,
        defaultZoom: 100
    },
    'pinata-party': {
        title: '캐주얼 게임 - 피냐타 파티 + 리소스 변경(에셋 번들) 시스템',
        folder: 'GameDesignDocs/CSJ-PinataParty',
        prefix: 'pinata_',
        count: 45,
        defaultZoom: 100
    }
};

const docOverlay = document.getElementById('doc-overlay');
const docOverlayTitle = document.getElementById('doc-overlay-title');
const docOverlayBody = document.getElementById('doc-overlay-body');
const docOverlayClose = document.getElementById('doc-overlay-close');
const docDownloadPdfBtn = document.getElementById('doc-download-pdf');
const docZoomOutBtn = document.getElementById('doc-zoom-out');
const docZoomInBtn = document.getElementById('doc-zoom-in');
const docZoomLevel = document.getElementById('doc-zoom-level');

const DOC_ZOOM_MIN = 60;
const DOC_ZOOM_MAX = 160;
const DOC_ZOOM_STEP = 10;
const DOC_ZOOM_DEFAULT = 100;
let docZoom = DOC_ZOOM_DEFAULT;
let isDocPanning = false;
let docPanStartX = 0;
let docPanStartY = 0;
let docPanScrollLeft = 0;
let docPanScrollTop = 0;
let currentDocId = null;

function applyDocZoom(nextZoom = DOC_ZOOM_DEFAULT) {
    docZoom = Math.min(DOC_ZOOM_MAX, Math.max(DOC_ZOOM_MIN, nextZoom));
    docOverlay.style.setProperty('--doc-zoom', String(docZoom / 100));
    docOverlay.classList.toggle('is-zoomed', docZoom > DOC_ZOOM_DEFAULT);
    if (docZoomLevel) {
        docZoomLevel.textContent = `${docZoom}%`;
    }
    if (docZoomOutBtn) {
        docZoomOutBtn.disabled = docZoom <= DOC_ZOOM_MIN;
    }
    if (docZoomInBtn) {
        docZoomInBtn.disabled = docZoom >= DOC_ZOOM_MAX;
    }
}

document.querySelectorAll('.doc-item').forEach(item => {
    item.addEventListener('click', function() {
        const docId = this.getAttribute('data-doc-id');
        const doc = DOC_DATA[docId];
        if (!doc) return;
        currentDocId = docId;

        docOverlayTitle.textContent = doc.title;
        docOverlayBody.innerHTML = '';

        for (let i = 1; i <= doc.count; i++) {
            const img = document.createElement('img');
            img.src = `${doc.folder}/${doc.prefix}${String(i).padStart(2, '0')}.png`;
            img.alt = `${doc.title} - ${i}페이지`;
            img.loading = 'lazy';
            docOverlayBody.appendChild(img);
        }

        applyDocZoom(doc.defaultZoom || DOC_ZOOM_DEFAULT);
        docOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

function buildDocImageUrls(doc) {
    const urls = [];
    for (let i = 1; i <= doc.count; i++) {
        const fileName = `${doc.prefix}${String(i).padStart(2, '0')}.png`;
        urls.push(new URL(`${doc.folder}/${fileName}`, window.location.href).href);
    }
    return urls;
}

function openDocPdfWindow(doc) {
    const imageUrls = buildDocImageUrls(doc);
    const escapedTitle = (doc.title || '문서').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const imageHtml = imageUrls
        .map((src, index) => `<img src="${src}" alt="${escapedTitle} ${index + 1}페이지" />`)
        .join('');

    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '-10000px';
    printFrame.style.bottom = '-10000px';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.opacity = '0';
    printFrame.setAttribute('aria-hidden', 'true');
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentDocument || printFrame.contentWindow?.document;
    if (!frameDoc) {
        printFrame.remove();
        return;
    }

    frameDoc.open();
    frameDoc.write(`<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>${escapedTitle} - PDF</title>
  <style>
    @page { margin: 8mm; }
    html, body { margin: 0; padding: 0; background: #ffffff; color: #111; font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif; }
    .title { padding: 12px 16px; font-size: 14px; font-weight: 700; border-bottom: 1px solid #ddd; }
    .pages { padding: 0; }
    img { width: 100%; max-width: 100%; display: block; margin: 0 0 6px 0; break-inside: avoid; page-break-inside: avoid; }
    @media print { .title { display: none; } img { margin: 0; } }
  </style>
</head>
<body>
  <div class="title">${escapedTitle} · 인쇄 창</div>
  <div class="pages">${imageHtml}</div>
</body>
</html>`);
    frameDoc.close();

    const frameWindow = printFrame.contentWindow;
    if (!frameWindow) {
        printFrame.remove();
        return;
    }

    const cleanup = () => {
        setTimeout(() => {
            if (printFrame.parentNode) {
                printFrame.parentNode.removeChild(printFrame);
            }
        }, 300);
    };

    frameWindow.addEventListener('afterprint', cleanup, { once: true });

    // Print after the frame document settles.
    setTimeout(() => {
        frameWindow.focus();
        frameWindow.print();
        // Some browsers do not fire afterprint reliably.
        setTimeout(cleanup, 5000);
    }, 150);
}

if (docDownloadPdfBtn) {
    docDownloadPdfBtn.addEventListener('click', function() {
        if (!currentDocId || !DOC_DATA[currentDocId]) return;
        openDocPdfWindow(DOC_DATA[currentDocId]);
    });
}

if (docZoomOutBtn) {
    docZoomOutBtn.addEventListener('click', function() {
        applyDocZoom(docZoom - DOC_ZOOM_STEP);
    });
}

if (docZoomInBtn) {
    docZoomInBtn.addEventListener('click', function() {
        applyDocZoom(docZoom + DOC_ZOOM_STEP);
    });
}

function stopDocPanning(pointerId) {
    isDocPanning = false;
    docOverlay.classList.remove('is-panning');
    if (pointerId !== undefined) {
        try {
            docOverlayBody.releasePointerCapture(pointerId);
        } catch (_) {
            // no-op
        }
    }
}

if (docOverlayBody) {
    docOverlayBody.addEventListener('pointerdown', function(e) {
        if (docZoom <= DOC_ZOOM_DEFAULT || docOverlay.style.display !== 'flex') return;
        if (e.pointerType === 'mouse' && e.button !== 0) return;

        isDocPanning = true;
        docPanStartX = e.clientX;
        docPanStartY = e.clientY;
        docPanScrollLeft = docOverlayBody.scrollLeft;
        docPanScrollTop = docOverlayBody.scrollTop;
        docOverlay.classList.add('is-panning');
        docOverlayBody.setPointerCapture(e.pointerId);
        e.preventDefault();
    });

    docOverlayBody.addEventListener('pointermove', function(e) {
        if (!isDocPanning) return;
        const dx = e.clientX - docPanStartX;
        const dy = e.clientY - docPanStartY;
        docOverlayBody.scrollLeft = docPanScrollLeft - dx;
        docOverlayBody.scrollTop = docPanScrollTop - dy;
    });

    docOverlayBody.addEventListener('pointerup', function(e) {
        if (!isDocPanning) return;
        stopDocPanning(e.pointerId);
    });

    docOverlayBody.addEventListener('pointercancel', function(e) {
        if (!isDocPanning) return;
        stopDocPanning(e.pointerId);
    });
}

docOverlayClose.addEventListener('click', function() {
    stopDocPanning();
    docOverlay.style.display = 'none';
    document.body.style.overflow = '';
    currentDocId = null;
});

docOverlay.addEventListener('click', function(e) {
    if (e.target === docOverlay) {
        stopDocPanning();
        docOverlay.style.display = 'none';
        document.body.style.overflow = '';
        currentDocId = null;
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && docOverlay.style.display === 'flex') {
        stopDocPanning();
        docOverlay.style.display = 'none';
        document.body.style.overflow = '';
        currentDocId = null;
    }
});

// ===== 이미지 드래그 방지 =====
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// ===== 참여 프로젝트 상세 오버레이 =====
const PROJECT_DETAILS = {
    'match-hexa-deck': {
        title: 'Match Hexa Deck',
        summary: 'Match Hexa Deck은 헥사 보드 기반의 캐주얼 퍼즐 프로젝트입니다. 기획자·디자이너·이펙터가 협업하며 바이브 코딩으로 인게임 코어 로직, 레벨 제작 구조, UI/UX 흐름을 빠르게 구현한 프로젝트입니다.',
        team: '기획/개발 협업',
        role: '인게임 기획/개발, 레벨 에디터 / 스테이지 기획/개발, UI/UX 기획/개발, 출시 준비',
        period: '2026. 04. ~ 2026. 05.',
        links: [],
        galleryLayout: 'row',
        gallery: [
            { src: 'IMG_Projects/Match Hexa Deck_1.webp', alt: 'Match Hexa Deck 스크린샷 1' },
            { src: 'IMG_Projects/Match Hexa Deck_2.webp', alt: 'Match Hexa Deck 스크린샷 2' },
            { src: 'IMG_Projects/Match Hexa Deck_3.webp', alt: 'Match Hexa Deck 스크린샷 3' },
            { src: 'IMG_Projects/Match Hexa Deck_4.webp', alt: 'Match Hexa Deck 스크린샷 4' },
            { src: 'IMG_Projects/Match Hexa Deck_5.webp', alt: 'Match Hexa Deck 스크린샷 5' }
        ],
        responsibilities: [
            { tag: '인게임 핵심 시스템 기획/개발', desc: '헥사 보드 기반 퍼즐의 조작, 매칭, 클리어/실패 조건을 기획하고 바이브 코딩으로 직접 구현' },
            { tag: '레벨 에디터 / 스테이지 기획/개발', desc: '스테이지 제작 효율을 높이기 위한 에디터와 레벨 구성 규칙을 설계하고, 난이도 흐름에 맞춘 스테이지를 제작' },
            { tag: 'UI/UX 기획/개발', desc: '인게임 UI, 팝업, 클리어/실패 흐름, 사운드/VFX/햅틱을 적용해 퍼즐 플레이 피드백을 강화' },
            { tag: '출시 준비', desc: '빌드 세팅, 로컬라이제이션, 성능 최적화 등 출시 준비 작업을 진행' }
        ],
        achievements: [
            '작성 예정'
        ],
        coreFeatures: [
            { title: '작성 예정', description: '작성 예정' }
        ],
        retrospective: '작성 예정'
    },
    'stud-pop': {
        title: 'Stud Pop: Match & Unbuild',
        summary: 'Stud Pop은 블록으로 만들어진 3D 구조물에서 상단에 활성화된 상자와 동일한 색상의 블록을 매칭하여 구조물을 해체하는 퍼즐 게임입니다. Dart Away에 이어 기획자·디자이너·이펙터 셋이서 진행한 두 번째 A.I. 바이브 코딩 프로젝트이며, 처음으로 3D 게임을 기획·개발한 프로젝트입니다. 이 과정에서 Unity 3D 환경에 대한 이해와 A.I.를 활용한 게임 개발 방식을 더 깊게 익힐 수 있었습니다.',
        team: '기획/개발 협업',
        role: '인게임 기획/개발, 부스터 시스템 기획/개발, 레벨 에디터 / 스테이지 기획/개발, UI/UX 기획/개발, 출시 준비',
        period: '2026. 03. ~ 2026. 04.',
        links: [],
        galleryLayout: 'row',
        gallery: [
            { src: 'IMG_Projects/studplay_gif_1.gif', alt: 'Stud Pop 플레이 GIF' },
            { src: 'IMG_Projects/stud_2.webp', alt: 'Stud Pop 스크린샷 2' },
            { src: 'IMG_Projects/stud_3.webp', alt: 'Stud Pop 스크린샷 3' },
            { src: 'IMG_Projects/stud_4.webp', alt: 'Stud Pop 스크린샷 4' },
            { src: 'IMG_Projects/stud_5.webp', alt: 'Stud Pop 스크린샷 5' }
        ],
        responsibilities: [
            { tag: '인게임 핵심 시스템 기획/개발', desc: '블록 탭/컬러 매칭 코어 로직, 기믹 시스템, 카메라 조작(줌/패닝/회전), 블록 투명화 기능을 기획하고 바이브 코딩으로 직접 구현' },
            { tag: '부스터 시스템 기획/개발', desc: '부스터 아이템 3종과 엑스트라 상자를 기획하고 구현. 부스터 해금 조건, 구매 팝업, 사용 연출까지 설계' },
            { tag: '레벨 에디터 / 스테이지 기획/개발', desc: 'FBX/OBJ Import, Solvable 검증, Color Dispersion 등 레벨 에디터를 기획·개발하고, 스테이지 100종을 직접 제작' },
            { tag: 'UI/UX 기획/개발', desc: '인게임 UI, 스테이지 클리어/실패/게임 오버 팝업, 로비 연출을 기획·구현. 사운드/VFX/햅틱을 적용하여 게임 몰입감 강화' },
            { tag: '출시 준비', desc: '로컬라이제이션, 튜토리얼 시스템, 광고 SDK 연동, 성능 최적화, AOS/iOS 빌드 세팅 및 스토어 배포 준비' }
        ],
        achievements: [
            '작성 예정'
        ],
        coreFeatures: [
            { title: '작성 예정', description: '작성 예정' }
        ],
        retrospective: '작성 예정'
    },
    'dart-away': {
        title: 'Dart Away : Balloon Pop Puzzle',
        summary: 'Dart Away는 다트를 올바른 순서로 선택하여 풍선을 터뜨리는 로직 기반 퍼즐 게임입니다. 프로그래머 없이 기획자·디자이너·이펙터 셋이서 기획부터 출시까지 4주 만에 완성한, 사내 최초의 A.I. 바이브 코딩 프로젝트입니다. 개발과 A.I. R&D를 병행하며 선봉대 역할을 수행했고, 기획자이면서 동시에 코더(Coder) 역할을 겸하여 기존 개발자의 역할을 대체하며 AI 기반 개발 워크플로우의 가능성을 체험한 프로젝트입니다.',
        team: '기획/개발 협업',
        role: '인게임 기획/개발, 레벨 에디터 / 스테이지 기획/개발, UI/UX 기획/개발, BM/상품 기획/개발, 출시 준비',
        period: '2026. 02. ~ 2026. 03.',
        links: [],
        galleryLayout: 'row',
        gallery: [
            { src: 'IMG_Projects/Dart_1.png', alt: 'Dart Away 스크린샷 1' },
            { src: 'IMG_Projects/Dart_2.png', alt: 'Dart Away 스크린샷 2' },
            { src: 'IMG_Projects/Dart_3.png', alt: 'Dart Away 스크린샷 3' },
            { src: 'IMG_Projects/Dart_4.png', alt: 'Dart Away 스크린샷 4' },
            { src: 'IMG_Projects/Dart_5.png', alt: 'Dart Away 스크린샷 5' }
        ],
        responsibilities: [
            { tag: '인게임 핵심 시스템 기획/개발', desc: '화살표 생성 규칙, 바스켓/버퍼 시스템, 하트 시스템 등 인게임 코어 로직을 기획하고 바이브 코딩으로 직접 구현. 충돌 판정, 실패 조건 등 핵심 규칙의 설계와 예외 처리를 담당' },
            { tag: '부스터 시스템 기획/개발', desc: 'Magnet·PlusBuffer·Brush·Wand 4종 부스터를 기획하고 구현. 해금 조건, 구매 팝업, 사용 연출까지 일관된 사용자 경험을 설계' },
            { tag: '레벨 에디터 기획/개발', desc: '스테이지 제작 효율을 위한 레벨 에디터를 기획·구현. 일괄 생성, 패턴 적용, 풀이 불가 스테이지 자동 감지 등 제작 도구를 지속적으로 고도화하여 대량 제작 파이프라인을 구축' },
            { tag: '스테이지 제작 및 밸런싱', desc: '레벨 에디터를 활용하여 스테이지 1,000종을 직접 제작하고 난이도 밸런싱을 진행. 버퍼 난이도 시스템과 색상 배정 규칙을 설계하여 단계적 난이도 곡선을 구축' },
            { tag: '인게임 비주얼 기획', desc: '색상 8종별 화살표·풍선·바구니 비주얼 체계를 기획하고, 이동·충돌·전환 이펙트를 적용하여 인게임 비주얼 완성도를 확보' },
            { tag: 'UI/UX 기획 및 연출', desc: '스테이지 클리어·게임 오버·실패 팝업, 코인 획득 연출, 버퍼 경고 표시 등 인게임 주요 UI 흐름을 기획하고 구현. BGM/효과음/햅틱을 적용하여 게임 몰입감 강화' },
            { tag: '상점/결제/광고 시스템', desc: '상점 UI, 광고 제거 상품, 번들 상품을 기획하고, 광고 플랫폼 연동으로 배너/전면 광고 시스템을 구축. 분석 툴 연동으로 유저 행동 데이터 수집 환경 마련' },
            { tag: '다국어 및 출시 준비', desc: '전체 UI 다국어 적용, 튜토리얼, 푸시 알림, 인앱 리뷰 등 출시에 필요한 전반적인 작업을 수행. AOS/iOS 빌드 세팅 및 스토어 배포 준비' },
            { tag: '성능 최적화', desc: '메모리 사용량 최적화, 레벨 생성 알고리즘 개선, 카메라 동작 개선 등 저사양 기기에서도 안정적인 플레이 환경을 확보' }
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
        summary: '글로벌 서비스를 하고 있는 슬라이딩 블록 퍼즐이며, 인게임·시스템·콘텐츠·BM까지 폭넓은 기획을 담당했던 프로젝트입니다. 기믹 32종을 기획·적용하여 플레이의 다양성과 BM 접점을 동시에 확대했으며, 스테이지 약 300종을 직접 제작·검증하여 리텐션 성장을 견인했습니다. 기획팀·개발팀·QA 간 협업 효율을 위해 기믹 상호작용 통합 가이드를 구축하여 단일 기준점 체계를 마련했습니다.',
        team: '기획/개발/QA/아트 협업',
        role: '인게임 기획, 시스템 기획, 콘텐츠 기획, BM/상품 기획, 지표 분석',
        period: '2024. 09. ~ 2026. 02.',
        links: [],
        galleryLayout: 'row',
        gallery: [
            { src: 'IMG_Projects/CSJ_1.png', alt: 'Color Slide Jam 스크린샷 1' },
            { src: 'IMG_Projects/CSJ_2.png', alt: 'Color Slide Jam 스크린샷 2' },
            { src: 'IMG_Projects/CSJ_3.png', alt: 'Color Slide Jam 스크린샷 3' },
            { src: 'IMG_Projects/CSJ_4.png', alt: 'Color Slide Jam 스크린샷 4' },
            { src: 'IMG_Projects/CSJ_5.png', alt: 'Color Slide Jam 스크린샷 5' }
        ],
        responsibilities: [
            { tag: '인게임 기획', desc: '플로우, 조작, 성공/실패 로직, 스테이지 진행 구조, 기믹 등의 인게임 기획 진행. 특히 유저가 플레이하면서 가장 먼저 체감하는 핵심 경험인 조작감 기획과, 새로운 플레이 경험과 도전적인 난이도를 제공하는 기믹에 집중.' },
            { tag: '시스템 기획', desc: '상점, 업데이트 노티 기능, 하트 충전 시스템, 계정 삭제 플로우, 평점 유도 팝업, 광고 노출 조건 및 관련 데이터 테이블 설계, 예외 케이스 정의.' },
            { tag: '콘텐츠 기획', desc: '유저의 효과적인 온보딩을 위해 튜토리얼 및 신규 사용자 미션을 기획. Play Time 및 Retention 개선을 위해 데일리 챌린지, 피냐타 파티 같은 LiveOps 콘텐츠/시스템을 기획하고 지속적인 레벨 업데이트 진행.' },
            { tag: 'UI/UX 기획', desc: '인게임 및 담당한 콘텐츠들의 실패·성공·종료 등 인게임 주요 UI 흐름과 사용자 경험을 기획.' },
            { tag: '밸런스 기획', desc: '재화 수급/소비 밸런스, 이벤트/시즌 패스 보상 구조 기획.' },
            { tag: 'BM / 상품 기획', desc: '패키지 상품 기획, 기믹 상황과 연계된 실패 오퍼 노출 조건 설계.' }
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
        summary: '글로벌 서비스를 목표로 개발한 실시간 소셜 빙고 게임으로, 가디언 스킬·하우징·상점·퀘스트 등 핵심 시스템의 기획을 전담한 프로젝트입니다. 실시간 대전에서 스킬 동기화 딜레이가 발생하는 문제를 비동기식 구조로 전환 설계하여 해결했으며, 전 시스템의 데이터를 테이블로 설계하여 콘텐츠 추가·밸런싱·운영을 기획팀 단독으로 수행할 수 있는 구조를 구축했습니다.',
        team: '기획/운영 협업',
        role: '인게임 기획, 시스템 기획, 콘텐츠 기획, BM/상품 기획',
        period: '2023. 03. ~ 2024. 08.',
        galleryLayout: 'grid',
        links: [],
        gallery: [
            { src: 'IMG_Projects/BingoHaven_Slides/BingoHaven_Slide_05.jpg', alt: 'Bingo Haven 스크린샷 5' },
            { src: 'IMG_Projects/BingoHaven_Slides/BingoHaven_Slide_02.jpg', alt: 'Bingo Haven 슬라이드 3 스크린샷 2' },
            { src: 'IMG_Projects/BingoHaven_Slides/BingoHaven_Slide_03.jpg', alt: 'Bingo Haven 슬라이드 3 스크린샷 3' },
            { src: 'IMG_Projects/BingoHaven_Slides/BingoHaven_Slide_04.jpg', alt: 'Bingo Haven 슬라이드 3 스크린샷 4' }
        ],
        responsibilities: [
            { tag: '캐릭터(가디언) 시스템 기획', desc: '인게임 스킬 발동 규칙 및 비동기식 스킬 시스템을 설계하고, 14종의 스킬을 기획. 시간 기반 재화 자동 생산 시스템을 추가 설계하여 캐릭터 수집 동기와 리텐션 강화. 신규 가디언 콘셉트·스킬·애니메이션을 기획하고 디자인·연출팀과 협업' },
            { tag: '콘텐츠 기획 (하우징)', desc: '챕터·시즌 테마에 맞춘 하우징 오브젝트를 기획하고, 디자인·연출팀과 협업해 업데이트 리스트를 관리' },
            { tag: '상점 / 멤버십 기획', desc: '데이터 테이블 기반으로 상품 등록·할인·프로모션을 관리할 수 있는 상점 시스템과, 구독자 대상 추가 혜택을 제공하는 멤버십 시스템을 기획' },
            { tag: '퀘스트 시스템 기획', desc: '메인 퀘스트의 진행 플로우와 완료 규칙을 정립하고, 캐릭터 전용 서브 퀘스트를 설계하여 수집 동기를 강화. 대사 스크립트·보상을 데이터 테이블로 관리할 수 있는 구조 설계' },
            { tag: '신규 유저 온보딩 기획', desc: '가이드 미션과 튜토리얼 시스템을 기획하여 신규 유저의 소프트랜딩과 리텐션을 개선. Inspector 기반 튜토리얼 개발 툴을 기획하여 기획팀의 수정·추가 효율 확보' },
            { tag: '미니 게임 기획', desc: '유저 플레이 타임 향상을 위해 패턴 빙고·장애물 빙고 2종 미니 게임을 기획. 이벤트 기간 및 보상을 데이터 테이블로 관리할 수 있도록 설계' },
            { tag: 'UI/UX 기획', desc: '상점·멤버십·퀘스트·가이드 미션·미니 게임 등 주요 시스템의 팝업 UI와 사용자 흐름을 기획' },
            { tag: '데이터 테이블 설계', desc: '캐릭터·스킬·하우징·상점·퀘스트·미니 게임 등 전 시스템의 데이터를 테이블로 설계하여, 콘텐츠 추가·밸런싱·운영을 기획팀 단독으로 수행할 수 있는 구조 구축' }
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
        summary: '타 본부의 기획·개발 인력 부족 상황에서 지원 요청을 받아, 동료 프로그래머·이펙터와 셋이서 약 4개월간 미니 게임의 아이디어 구체화부터 기획·개발까지 A부터 Z를 함께 만들어낸 프로젝트입니다. 정식 서비스 시 밸런스 조정의 효율성을 높이기 위해 모든 시스템과 콘텐츠를 데이터 테이블 및 Inspector 기반으로 관리할 수 있는 구조로 기획했습니다.',
        team: '본부 간 협업',
        role: '인게임 기획, 시스템 기획, 레벨 밸런스, 데이터 테이블 설계',
        period: '2023. 05. ~ 2023. 08.',
        links: [],
        gallery: [
            { src: 'IMG_Projects/AIWars_Modes/AIWars_1.png', alt: 'A.I Wars 스크린샷 1' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_2.png', alt: 'A.I Wars 스크린샷 2' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_3.png', alt: 'A.I Wars 스크린샷 3' },
            { src: 'IMG_Projects/AIWars_Modes/AIWars_4.png', alt: 'A.I Wars 스크린샷 4' }
        ],
        subGallery: {
            caption: '기획·개발한 미니 게임의 4종 플레이 모드 (클래식, 보스, 산성비, 하이 스코어)',
            images: [
                { src: 'IMG_Projects/AIWars_Modes/AIWars_Mode_01.png', alt: 'A.I Wars 클래식 모드' },
                { src: 'IMG_Projects/AIWars_Modes/AIWars_Mode_02.png', alt: 'A.I Wars 보스 모드' },
                { src: 'IMG_Projects/AIWars_Modes/AIWars_Mode_03.png', alt: 'A.I Wars 산성비 모드' },
                { src: 'IMG_Projects/AIWars_Modes/AIWars_Mode_04.png', alt: 'A.I Wars 하이 스코어 모드' }
            ]
        },
        responsibilities: [
            { tag: '인게임 기획', desc: '조작 방식(방향·속도·각도), 패링 시스템, 아이템 시스템 등 미니 게임의 공통 인게임 규칙을 설계. 클래식 벽돌 깨기에 타격감과 다양한 아이템 활용의 재미를 더하는 방향으로 기획' },
            { tag: '전투(보스) 시스템 기획', desc: '단조로운 벽돌 파괴에 긴장감을 더하기 위해 보스전 시스템을 설계. 전투 로직, 몬스터 콘셉트·투사체·히트박스 기획 및 플레이어-보스 간 밸런스 조정' },
            { tag: '스테이지 생성 툴 기획', desc: '동료 프로그래머와 협업하여 Inspector 기반 스테이지 생성 툴을 기획·개발. 이관 후에도 요청 본부가 효율적으로 콘텐츠를 생산·관리할 수 있는 구조 설계' },
            { tag: '데이터 테이블 설계', desc: '모든 시스템과 콘텐츠를 데이터 테이블 및 Inspector로 제어할 수 있도록 설계하여, 라이브 서비스 시 밸런스 조정 및 콘텐츠 관리의 효율성 확보' },
            { tag: '레벨 밸런스', desc: '클래식, 보스, 산성비, 하이 스코어 등 4종 모드별 난이도 곡선과 스테이지 밸런스를 설계·조정' },
            { tag: 'UI/UX 기획', desc: '실패·성공·게임 종료 팝업 등 인게임 주요 UI 흐름과 사용자 경험을 기획' },
            { tag: 'QA', desc: '기획 의도에 기반한 테스트 시나리오를 작성하고, 전 모드에 걸쳐 플레이 검증을 수행' },
            { tag: '연출 및 사운드 기획', desc: '이펙트·사운드 재생이 필요한 구간과 재생 시점을 리스트화하여 유관 부서에 제작 요청' }
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
        summary: '미국 지사 Double Down Interactive(DDI)와 공동 개발한 어드벤처 기반 소셜 카지노 게임으로, 기획자로서 첫 걸음을 뗀 프로젝트입니다. 데이터 테이블 설계부터 튜토리얼, 시스템 기획까지 폭넓은 실무를 경험했으며, 해외 팀과 소통하며 글로벌 환경에서 협업하는 값진 경험을 쌓았습니다.',
        team: '기획/개발 협업',
        role: '데이터 테이블 기획/관리, 튜토리얼 기획, 콘텐츠 / 시스템 기획, 해외 팀 커뮤니케이션',
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
            { tag: '데이터 테이블 설계', desc: '캐릭터 커스터마이징 시스템에 사용되는 의상·액세서리 데이터 테이블을 설계하고, 콘텐츠 업데이트에 맞춰 지속적으로 관리' },
            { tag: '튜토리얼 기획', desc: '신규 유저 온보딩을 위한 강제·동적 튜토리얼을 기획하고, 튜토리얼 흐름을 유연하게 제어할 수 있도록 전용 데이터 테이블을 설계' },
            { tag: '콘텐츠 / 시스템 기획', desc: '공지사항 팝업, 우편함, 카드 트레이딩 시스템, 데일리 보너스(출석부) 등 라이브 서비스 핵심 시스템을 기획하고 관련 데이터 테이블을 설계' },
            { tag: '해외 팀 커뮤니케이션', desc: '미국 Double Down Interactive(DDI) 팀과의 영문 메일 작성 및 기획 관련 커뮤니케이션을 담당. 전문 통역사 부재 시 기획 의도 확인, 시스템 문의 등 소통 창구 역할을 수행' }
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
        summary: 'PS·Xbox·Steam에서 글로벌 서비스 중인 3v3 스트리트 농구 게임으로, PM 직무로 게임 업계에 입문한 프로젝트입니다. 상품/BM 기획부터 콘텐츠·이벤트 설계, 지표 분석까지 라이브 서비스 운영의 전 과정을 경험했으며, SONY 글로벌 팀과의 직접 협업과 매출 구조 개편 등을 주도하며 데이터 기반 의사결정의 기초를 다졌습니다.',
        team: '사업/기획/운영 협업',
        role: '상품 / BM 기획, 콘텐츠 / 이벤트 기획, 지표 분석, 외부 협업, 커뮤니케이션',
        period: '2020. 10. ~ 2022. 04.',
        links: [],
        gallery: [
            { src: 'IMG_Projects/FS_1.jpg', alt: '3on3 FreeStyle 스크린샷 1' },
            { src: 'IMG_Projects/FS_2.jpg', alt: '3on3 FreeStyle 스크린샷 2' },
            { src: 'IMG_Projects/FS_3.jpg', alt: '3on3 FreeStyle 스크린샷 3' },
            { src: 'IMG_Projects/FS_4.jpg', alt: '3on3 FreeStyle 스크린샷 4' }
        ],
        responsibilities: [
            { tag: '지표 분석 및 KPI 관리', desc: 'DAU, 매출, PU(과금 유저) 등 핵심 지표를 일 단위로 모니터링하고, 주간·월간 KPI 리포트를 작성하여 의사결정 근거를 제공. 지표 이상 징후 발생 시 원인을 분석하고 대응 방안을 도출' },
            { tag: '상품 / BM 기획', desc: '지표 분석을 기반으로 DLC·인게임 상품의 가격 정책과 판매 전략을 수립. 유저 과금 데이터 분석을 통해 가격대를 재설정하고, 시즌별 프로모션 및 할인 구조를 설계' },
            { tag: '콘텐츠 / 이벤트 기획', desc: '시즌 이벤트, 챌린지 캠프 DLC, 운영 이벤트 등 라이브 서비스 콘텐츠를 기획하고 일정을 관리. 웹 이벤트 페이지를 기획하여 인게임 외부에서의 유저 참여 접점을 확대. YouTube 라이브 방송을 통한 유저 토너먼트를 운영하여 커뮤니티 활성화를 도모' },
            { tag: '외부 협업', desc: 'SONY 글로벌 프로모션 팀과 직접 협업하여 PS 스토어 메인 페이지 노출 및 PS+ 유료 구독자 대상 마케팅을 기획·실행' },
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
    const hasTaggedItems = items.some(item => typeof item !== 'string');

    if (hasTaggedItems) {
        const table = document.createElement('table');
        table.className = 'resp-table';
        const thead = document.createElement('thead');
        thead.innerHTML = '<tr><th class="resp-th-tag">업무</th><th class="resp-th-desc">세부 내용</th></tr>';
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        items.forEach(item => {
            if (typeof item === 'string') {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td colspan="2" class="resp-td-simple">${item}</td>`;
                tbody.appendChild(tr);
            } else {
                const tr = document.createElement('tr');
                const tdTag = document.createElement('td');
                tdTag.className = 'resp-td-tag';
                tdTag.textContent = item.tag;
                const tdDesc = document.createElement('td');
                tdDesc.className = 'resp-td-desc';
                tdDesc.textContent = item.desc;
                tr.appendChild(tdTag);
                tr.appendChild(tdDesc);
                tbody.appendChild(tr);
            }
        });
        table.appendChild(tbody);
        overlayResponsibilities.appendChild(table);
    } else {
        items.forEach(item => {
            const li = document.createElement('div');
            li.className = 'resp-item-simple';
            li.textContent = item;
            overlayResponsibilities.appendChild(li);
        });
    }
}

function renderSubGallery(data) {
    const section = document.getElementById('overlaySubGallerySection');
    const container = document.getElementById('overlaySubGalleryImages');
    const caption = document.getElementById('overlaySubGalleryCaption');
    if (!section || !container) return;

    container.innerHTML = '';
    if (caption) caption.textContent = '';

    if (!data || !data.images || data.images.length === 0) {
        section.style.display = 'none';
        return;
    }

    if (caption && data.caption) {
        caption.textContent = data.caption;
    }

    data.images.forEach(item => {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.className = 'proj-overlay-sub-gallery-img';
        container.appendChild(img);
    });
    section.style.display = '';
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
    overlayMeta.innerHTML = detail.role.split(',').map(r =>
        `<span class="overlay-role-badge">${r.trim()}</span>`
    ).join('');
    renderOverlayLinks(detail.links);
    renderOverlayGallery(detail.gallery, detail.galleryLayout || 'grid');
    renderResponsibilities(detail.responsibilities);
    renderSubGallery(detail.subGallery);

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

// ===== 이미지 라이트박스 =====
const lightbox = document.getElementById('imageLightbox');
const lightboxImg = document.getElementById('lightboxImage');
const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
}

// 업무 성과 페이지 이미지 클릭
document.querySelectorAll('.hl-card-img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

// 오버레이 갤러리 이미지 클릭 (동적 생성이므로 이벤트 위임)
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.proj-overlay-gallery-images') && target.tagName === 'IMG') {
        openLightbox(target.src, target.alt);
    }
    if (target.classList.contains('proj-overlay-sub-gallery-img')) {
        openLightbox(target.src, target.alt);
    }
});

// 라이트박스 닫기
if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
}
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target.matches('[data-close-lightbox]')) {
            closeLightbox();
        }
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
        closeLightbox();
    }
});

// ===== 푸터 연도 자동 갱신 =====
document.getElementById('year').textContent = new Date().getFullYear();
