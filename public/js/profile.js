const newFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#blogpost-name').value.trim();
    console.log(name);
    const description = document.querySelector('#blogpost-desc').value.trim();
    console.log(description);
    const article = document.querySelector('#blogpost-article').value.trim();
    console.log(article);

    if (name && description && article) {
      const response = await fetch(`/api/blogpost`, {
        method: 'POST',
        body: JSON.stringify({ title:name, description, article }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create blogpost');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogpost/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete blogpost');
      }
    }
  };
  
  const deleteButtons = document.querySelectorAll('.delete-button'); 
  deleteButtons.forEach((button) => {
    button.addEventListener('click', delButtonHandler);
  });
 
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const form = document.querySelector('.new-blogpost-form');
    console.log(form);
    if (form) {
      form.addEventListener('submit', newFormHandler);
    }
  
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', logout);
    }
  });
  
