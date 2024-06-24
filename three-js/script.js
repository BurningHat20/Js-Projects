document.addEventListener("DOMContentLoaded", (event) => {
  const menuToggle = document.getElementById("menu-toggle");
  const closeMenu = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
  });

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
  });

  // Close mobile menu when clicking outside
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    }
  });
});
