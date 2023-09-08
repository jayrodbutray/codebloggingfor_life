const newFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#blogpost-name').value.trim();
    const article = document.querySelector('#blogpost-article').value.trim();

    if (name && article) {
      const response = await fetch(`/api/blogpost`, {
        method: 'POST',
        body: JSON.stringify({ title:name, article }),
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
  

  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const form = document.querySelector('.new-blogpost-form');
    console.log(form);
    if (form) {
      form.addEventListener('submit', newFormHandler);
    }

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
 
   const logoutButton = document.getElementById('logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', logout);
    }
  });
  
