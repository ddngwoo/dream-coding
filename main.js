/* scroll 시 header 변경 */

const header = document.querySelector(".header");

// 컨텐트 너비, 스크롤바, 패딩 포함
console.log(header.offsetHeight);

// offsetHeight + 실제 랜더링된 크기 표시
console.log(header.getBoundingClientRect());

// 패딩만 포함
console.log(header.clientWidth, header.clientHeight);

// 컨텐트의 실제 크기, 스크롤바가 있어도 포함된 영역 크기 알려줌
console.log(header.scrollWidth, header.scrollHeight);

// header의 높이만큼 스크롤이 되었을 경우 header 배경색 && 패딩을 바꿔준다.
document.addEventListener("scroll", () => {
  if (window.scrollY > header.getBoundingClientRect().height) {
    header.classList.add("header--dark");
  } else {
    header.classList.remove("header--dark");
  }
});

/* 해당 section scroll 하기 */

// 방법 1 - 그냥 scrollIntoView 기본 사용법 익힐려고 만듬
// const sections = document.querySelectorAll("section");
// const headerLinks = document.querySelectorAll(".header__item span");
// const headerLogo = document.querySelector('.header__logo i');
// const contactBtn = document.querySelector('.home__contact');

// // behavior : 부드럽게 내려갈지 아닐지.
// // block : 수직정렬, 수직위치에서 어디 위치로 갈지.
// // inline : 수평정렬, 수평위치에서 어디 위치로 갈지
// headerLogo.addEventListener('click', () => {
//   home.scrollIntoView({
//     behavior: "smooth",
//   })
// })

// headerLinks.forEach((headerLink, index) => {
//   headerLink.addEventListener("click", () => {
//     sections[index].scrollIntoView({
//       behavior: "smooth",
//     })
//   });
// })

// contactBtn.addEventListener('click', () => {
//   sections[sections.length - 1].scrollIntoView({
//     behavior: 'smooth'
//   })
// })

// 방법 2 코드가 훨씬 줄어둠, 메뉴 클릭 시 해당 section 이동, scroll을 하게 되면 해당 section에 .active 추가 

//  2-1. 메뉴 클릭 시 해당 section으로 이동 및 .active 삭제
const headerMenu = document.querySelector(".header");
const contactBtn = document.querySelector('.home__contact');

headerMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link === undefined) {
    return;
  }
  const activeLink = document.querySelector('.header .active');
  if (activeLink) {
    activeLink.classList.remove('active');
  }
  // target.classList.add('active');
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({
    behavior: 'smooth'
  })
})

contactBtn.addEventListener('click', () => {
  document.body.scrollIntoView({
    behavior: "smooth",
    block: "end"
  });
})

// 2.2 scroll을 하게 되면 해당 section에 .active 추가 하는 로직. 2가지 방법으로 구현.

const sections = document.querySelectorAll('.section');

const isActive = (activeLink, headerLinks, section) => {
  if (activeLink) {
    activeLink.classList.remove('active');
  }
  headerLinks.forEach((headerLink) => {
    const link = headerLink.dataset.link.replace('#', '');
    if (link === section.id) {
      headerLink.classList.add("active");
    }
  })
}

let previousScrollY = 0;

sections.forEach((section, index) => {
  // 방법 1 긱 섹션의 height를 계산해서 window.scrollY와 비교한다.
  // 1-1 각 섹션은 body에서의 정적인 위치를 구한다.
  let sectionHeight = 0;
  for (let i = 0; i < Array.from(sections).indexOf(sections[index]); i++) {
    sectionHeight += sections[i].getBoundingClientRect().height;
  }

  document.addEventListener('scroll', () => {
    const activeLink = document.querySelector('.header .active');
    const headerLinks = document.querySelectorAll('.header__item span');
    // scroll 방향 체크 로직, 1이면 아래로, 0아면 위로
    const direction = window.scrollY - previousScrollY >= 0 ? 1 : 0;
    previousScrollY = window.scrollY;

    // 1-2 스크롤 방향에 따라 로직 생성
    if (direction) { // 스크롤이 아래 방향일 시
      if (sectionHeight <= window.scrollY) {
        isActive(activeLink, headerLinks, section)
      }
    } else { // 스크롤이 위 방향일 시
      if ((sectionHeight + section.getBoundingClientRect().height) <= window.scrollY) {
        isActive(activeLink, headerLinks, section)
      }
    }

    // scrollY가 0일 시에는 무조건 Home 메뉴에 .active 추가
    if (window.scrollY === 0) {
      if (activeLink) {
        activeLink.classList.remove('active');
      }
      const homeLink = document.querySelector('.header__menu span');
      homeLink.classList.add('active');
    }

    // scroll 마지막 부분애는 무조건 Contact 메뉴에 .active 추가
    console.log(document.body.scrollHeight, window.innerHeight, window.scrollY);
    if (document.body.scrollHeight === window.innerHeight + window.scrollY) {
      if (activeLink) {
        activeLink.classList.remove('active');
      }
      const contactLink = document.querySelector('.header__item:last-child span');
      contactLink.classList.add('active');
    }

    // 방법 2 dom 탐색기를 사용하여 로직을 짠다. 아직 완성 x
    // if (index > 0) {
    //   if (section.previousElementSibling.getBoundingClientRect().y < 0) {
    //     isActive(activeLink, headerLinks, section);
    //   }
    // } else {
    //   if (section.nextElementSibling.getBoundingClientRect().y > 0) {
    //     isActive(activeLink, headerLinks, section)
    //   }
    // }
  })

})
