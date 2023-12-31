document.addEventListener('DOMContentLoaded', () => {
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
      form.addEventListener('submit', async event => {
        event.preventDefault();
        const postId = form.getAttribute('data-post-id');
        const commentTextarea = form.querySelector('.comment-textarea');
        const commentText = commentTextarea.value.trim();

        if (commentText) {
          try {
            const response = await fetch(`/api/blogpost/${postId}/comments`, {
              method: 'POST',
              body: JSON.stringify({ text: commentText }),
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
        
            } else {
              console.error('Failed to submit comment');
            }
          } catch (error) {
            console.error('Error submitting comment:', error);
          }
        }
      });
    });
  });