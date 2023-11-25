document.addEventListener('DOMContentLoaded', function () {
    const iconContainer = document.getElementById('icon-container');
    const nav = document.querySelector('nav');

    iconContainer.addEventListener('click', function () {
        // Alternar a visibilidade da barra de navegação ao clicar no ícone
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        } else {
            nav.classList.add('active');
        }
    });

    // Fechar a barra de navegação ao clicar em um item
    nav.addEventListener('click', function () {
        nav.classList.remove('active');
    });
});
