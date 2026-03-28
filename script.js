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

// ===== 푸터 연도 자동 갱신 =====
document.getElementById('year').textContent = new Date().getFullYear();
