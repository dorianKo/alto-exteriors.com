(function () {

    const API_KEY = 'AIzaSyCwOp3MZs0vZToj3NnYBy_jOBrfjjXhtcA';
    const PLAYLIST_ID = 'UUUk87fJPBeclCDwcyOYLuug';
    const LIST_SIZE = 6;
    const FILLER_ITEM = {
        snippet: {
            title: 'New Videos Coming Soon!',
            description: 'New Videos Coming Soon',
            thumbnails: {
                high: {
                    url: 'http://www.grandrapidsroofing.com/wp-content/uploads/2015/04/520x340_project_Grysen_5.jpg',
                    width: 320,
                    height: 180
                }
            },
            channelTitle: 'Corporate Hooligans',
            resourceId: {
                videoId: 'HgEOzn-L_c8'
            }
        }
    };

    const YouTubeComponent = {

        init() {
            const videoContainer1 = document.getElementById('video-items-1');
            const videoContainer2 = document.getElementById('video-items-2');
            this.requestVideos()
                .then(response => {
                    const items = this.fillItems(response.items, LIST_SIZE);
                    const [itemListOne, itemListTwo] = this.splitList(items, LIST_SIZE);
                    this.render(videoContainer1, itemListOne);
                    this.render(videoContainer2, itemListTwo);
                    // render with first 6 elements
                    // render with next 6 elements
                });


        },

        fillItems(items, size) {

            const listRemainder = items.length % size;
            if (listRemainder === 0) {
                return items;
            }

            const fillLength = size - listRemainder;
            for (let i = 0; i < fillLength; i++) {
                items.push(FILLER_ITEM);
            }

            return items;
        },

        splitList(items, size) {
            const numberOfList = items.length / size;

            const result = []
            for (let i = 0; i < numberOfList; i++) {
                result.push(items.slice(i * size, size * (i + 1)));
            }

            return result;

        },

        template(snippet) {

            return `
            <div class="container-fluid mt-4 mt-lg-0">
                <a href="https://www.youtube.com/watch?v=${snippet.resourceId.videoId}">
                    <div class="video-thumbnail">
                        <img src="${snippet.thumbnails.high.url}">
                    </div>
                    <div class="col-10 text-center mx-auto">
                        <h4>${snippet.title}</h4>
                    </div>
                </a>
            </div>
            `;
        },

        render(container, videoList) {
            const [itemsListOne, itemListTwo] = this.splitList(videoList, 3);
            const [rowContainerOne, rowContainerTwo] = container.getElementsByClassName('video-row');
            this.renderRow(rowContainerOne, itemsListOne);
            this.renderRow(rowContainerTwo, itemListTwo);
        },

        renderRow(rowContainer, items) {
            items.forEach(item => {
                const videoElement = document.createElement('div');
                videoElement.innerHTML = this.template(item.snippet);
                rowContainer.appendChild(videoElement);
            });
        },

        requestVideos() {
            const request = fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=24&playlistId=${PLAYLIST_ID}&key=${API_KEY}`);
            return request.then(response => response.json());
        }

    };

    YouTubeComponent.init();




})();