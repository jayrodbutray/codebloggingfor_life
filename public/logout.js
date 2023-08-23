const logout = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/logout-success');
    } else {
        alert(response.statusText);
    }
};

const logoutButton = document.getElementById('logout');

if (logoutButton) { logoutButton.addEventListener('click', logout) };