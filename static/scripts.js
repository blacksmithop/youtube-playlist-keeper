const playlistUrl = "https://raw.githubusercontent.com/blacksmithop/youtube-playlist-keeper/main/static/playlist_data.json";
const itemsPerPage = 10;
let currentPage = 1;
let playlist = [];

fetch(playlistUrl)
    .then(response => response.json())
    .then(data => {
        playlist = data.items;
        displayPage(currentPage);
        updatePaginationButtons();
    })
    .catch(error => console.error('Error fetching playlist:', error));

function displayPage(page) {
    const playlistContainer = document.querySelector('.playlist');
    playlistContainer.innerHTML = '';
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, playlist.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const song = playlist[i].snippet;
        const songElement = document.createElement('div');
        songElement.classList.add('song');

        songElement.innerHTML = `
            <img src="${song.thumbnails.medium.url}" alt="${song.title}">
            <div class="song-details">
                <h2><a href="https://www.youtube.com/watch?v=${song.resourceId.videoId}" target="_blank">${song.title}</a></h2>
            </div>
        `;

        playlistContainer.appendChild(songElement);
    }
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(playlist.length / itemsPerPage);
    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = currentPage === totalPages;
}

document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updatePaginationButtons();
    }
});

document.getElementById('next').addEventListener('click', () => {
    const totalPages = Math.ceil(playlist.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
        updatePaginationButtons();
    }
});
