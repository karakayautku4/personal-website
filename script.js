const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

document.querySelectorAll('a[target="_blank"]').forEach(a => {
a.setAttribute('rel', 'noreferrer noopener');
});