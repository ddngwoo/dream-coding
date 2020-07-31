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

// 해당 section scroll 하기

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

// 2.2 scroll을 하게 되면 해당 section에 .active 추가 하는 로직

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

sections.forEach((section, index) => {
  // 방법 1 긱 섹션의 height를 계산해서 window.scrollY와 비교한다.
  // 1-1 각 섹션은 body에서의 정적인 위치를 구한다.
  // let sectionHeight = 0;
  // for (let i = 0; i < Array.from(sections).indexOf(sections[index]); i++) {
  //   sectionHeight += sections[i].getBoundingClientRect().height;
  // }

  document.addEventListener('scroll', () => {
    // 1-2 각 섹션은 자신의 위치와 window.scrollY가 같거나 작다면  link에 active를 추가한다.
    //   if (sectionHeight <= window.scrollY) {
    //     const activeLink = document.querySelector('.header .active');
    //     const headerLinks = document.querySelectorAll('.header__item span');
    //     if (activeLink) {
    //       activeLink.classList.remove('active');
    //     }
    //     headerLinks.forEach((headerLink) => {
    //       const link = headerLink.dataset.link.replace('#', '');
    //       if (link === section.id) {
    //         headerLink.classList.add("active");
    //       }
    //     })
    //   }
    // })

    // 방법 2 dom 탐색기를 사용하여 로직을 짠다.
    const activeLink = document.querySelector('.header .active');
    const headerLinks = document.querySelectorAll('.header__item span');
    if (index > 0) {
      if (section.previousElementSibling.getBoundingClientRect().y < 0) {
        isActive(activeLink, headerLinks, section);
      }
    } else {
      if (section.nextElementSibling.getBoundingClientRect().y > 0) {
        isActive(activeLink, headerLinks, section)
      }
    }
  })

})



