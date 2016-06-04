var Music = avalon.define({
    $id: 'Music',
    totalCount: 0,
    pages: [1],
    activePage: 1,
    totalPages: 1,
    size: 20,
    singer: '',
    song: '',
    list: [],
    auditions: [],
    playing: false
});

function getData(page) {
    var query = Music.singer + ' ' + Music.song;
    $.ajax({
            url: 'http://search.dongting.com/song/search',
            type: 'GET',
            dataType: 'jsonp',   
            data: {
                q: query,
                page: page,
                size: Music.size
            },
        })
        .done(function(res) {
            Music.activePage = page;
            Music.totalCount = res.totalCount;
            Music.totalPages = res.pageCount;
            Music.pages = [];
            if (Music.totalPages <= 5) {
                for (var i = 1; i <= Music.totalPages; i++) {
                    Music.pages.push(i);
                }
            } else {
                if (page < 4) {
                    Music.pages = [1, 2, 3, 4, 5];
                } else if (page > 3 && page < Music.totalPages - 1) {
                    for (var i = page; i < page + 5; i++) {
                        Music.pages.push(i - 2);
                    }
                } else {
                    Music.pages = [Music.totalPages - 4, Music.totalPages - 3, Music.totalPages - 2, Music.totalPages - 1, Music.totalPages];
                }
            }
            Music.list = res.data;
        })
        .fail(function() {
            console.log("error");
            alert('请求错误，刷新再试。');
        });
}

function selectSong(auditions) {
    Music.auditions = auditions;
}

function play(src) {
    Music.playing = true;
    var audio = player[0];
    audio.load(src);
    audio.play();
}

var player = audiojs.createAll();
