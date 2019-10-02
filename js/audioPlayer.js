// Mythium Archive: https://archive.org/details/mythium/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = '',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Enundodee",
                "duration": "4:00",
                "file": "https://malayalammp3.a2z3gp.com/down.php?file=load/Malayalam%20mp3/Malayalam%202013%20MP3%20Songs/Celluloid%20-%20%20(2013)/Enundodi"
            }, {
                "track": 2,
                "name": "O Ponthoovalaayi",
                "duration": "8:30",
                "file": "audio/Ee%20adutha%20kaalathu-O%20Ponthoovalai%28Sithara%29"
            },  {
                "track": 3,
                "name": "Kangal Neeye",
                "duration": "5:01",
                "file": "audio/Muppoluthum%20un%20karpanaigal-Kangal%20Neeyae%28Sithara%29"
            }, {
                "track": 4,
                "name": "Azhake Azhake Minal",
                "duration": "8:31",
                "file": "audio/Azhake%20Azhake"
            }, {
                "track": 5,
                "name": "Panchara Chiri Kondu",
                "duration": "5:05",
                "file": "audio/Marykkundoru%20kujaadu-Pancharachiri%20Kondu%28Sithara%2C%20Franco%29"
            }, {
                "track": 6,
                "name": "Hoyyuthuthe",
                "duration": "2:48",
                "file": "audio/Aidhu%20ondla%20aidu-Hoyyuthuthe%20malai%28Sithara%29"
            }, {
                "track": 7,
                "name": "Hath Le Le",
                "duration": "5:44",
                "file": "audio/Mayamohini-Haath%20lele%28Sithara%29"
            }, {
                "track": 8,
                "name": "Aathadi",
                "duration": "5:26",
                "file": "audio/Krishnaveni%20Panjalai%20-%20Aathaadi%28Sithara%2CHarish%20raghavendra%29"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});
