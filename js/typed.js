const queryId = (id) => document.getElementById(id);

queryId("switch").addEventListener('click', () => {
    document.body.classList.toggle('dark');
    queryId("switch").classList.toggle('active');
})

