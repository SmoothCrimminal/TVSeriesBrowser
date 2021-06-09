

window.onload = function() {
    showsApp.init();
}

let showsApp = {

    data: null,
    searchInput: null,
    seriesDataSection: null,

    init: function() {
        console.log("app started");

        this.searchInput = document.getElementById("search-input");
        this.searchInput.addEventListener("keyup", e => {
            if (e.keyCode == 13) {
                console.log("Enter clicked");
                this.loadData(this.searchInput.value);
            }
        });
        this.seriesDataSection = document.querySelector(".series-data-section");
        this.loadData("friends");
    },
    
    loadData: function(str) {
        fetch("http://api.tvmaze.com/search/shows?q=" + str.trim())
        .then(respone => respone.json())
        .then(data => this.dataReady(data));
    },

    dataReady: function(showData) {
        this.data = showData;

        let allBoxesHTML = "";

        for (let i = 0; i < showData.length; i++){
            let show = showData[i];
            let score = show.score;
            show = show.show;

            let genres = show.genres.join(", ");
            
            let imgSrc = null;
            if (show.image) {
                imgSrc = show.image.medium;
            } else {
                imgSrc = "https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png";
            }

            let showTitle = null
            if (!show.name) {
                continue;
            }

            showTitle = show.name;

            let network = "-";
            if (show.network) network = show.network.name;

            let officialSite = "-";   
            if (show.officialSite) officialSite = show.officialSite;

            let showPremiered = "-"
            if (show.premiered) showPremiered = show.premiered;

            let summary = show.summary;
            summary = `
                <p>Show: ${showTitle} </p>
                <p>Date: ${showPremiered} </p>
                <p>Network: ${network} </p>
                <br>
            ` + summary;

            allBoxesHTML += this.getShowBoxByTemplate(imgSrc, showTitle, genres, summary);
        }

        this.seriesDataSection.innerHTML = allBoxesHTML;
    },

    getShowBoxByTemplate: function(imgSrc, title, genres, description) {
        return `
        <div class="series-box">
            <img src="${imgSrc}" alt="">
            <div class="series-title">${title}</div>
            <div class="series-genres">${genres}</div>
            <div class="series-description">${description}</div>
        </div>
        `;
    }
}