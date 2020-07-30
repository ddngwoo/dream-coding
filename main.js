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
