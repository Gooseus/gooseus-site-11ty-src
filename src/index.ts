// Simple site functionality - smooth scrolling for anchor links and basic interactions

// Add smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Handle footnote interactions if present
  document.querySelectorAll("sup.note").forEach(el => {
    el.addEventListener("click", () => {
      // Basic footnote interaction placeholder
    });
  });
});
