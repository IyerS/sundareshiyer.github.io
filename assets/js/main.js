document.addEventListener('DOMContentLoaded', function() {
  const showMoreButtons = document.querySelectorAll('.show-more');
  
  showMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const subsection = this.dataset.subsection;
      const hiddenPosts = document.getElementById(`${subsection}-hidden`);
      const showMoreContainer = this.closest('.show-more-container');
      
      if (hiddenPosts.style.display === 'none' || hiddenPosts.style.display === '') {
        hiddenPosts.style.display = 'grid';
        this.textContent = 'Show Less';
        
        // Move the button to the bottom of the hidden posts
        hiddenPosts.appendChild(showMoreContainer);
      } else {
        hiddenPosts.style.display = 'none';
        this.textContent = 'Show More';
        
        // Move the button back to its original position
        const parentElement = hiddenPosts.parentNode; // Adjusted line
        parentElement.insertBefore(showMoreContainer, hiddenPosts);
      }
    });
  });
});

