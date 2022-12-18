/**
 * 1. Render songs -> OK
 * 2. Scroll top -> OK
 * 3. Play / pause / seek -> OK
 * 4. CD rotate -> OK
 * 5. Next / previous -> OK
 * 6. Random -> OK
 * 7. Next / Repeat when ended -> OK
 * 8. Active song -> OK
 * 9. Scroll active song into view
 * 10. Play song when click -> OK
 */


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'Dat'

const html = $('html')
const allSong = $$('.song')

const totalAudio = $('.time-audio')
const cd = $('.cd')
const heading = $('marquee h2')
const cdThumb = $('.cd .cd-thumb')
const audio = $('#audio')
const video = $('#video')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const dashboard = $('.dashboard')
const playlist = $('.playlist')

const app = {
	currentIndex: 0,
	isPlaying: false,
	isRandom: false,
	isRepeat: false,

	config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

	setConfig: function(key, value) {
		this.config[key] = value
		localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
	},

	songs: [
		{
			name: 'Old Love',
			singer: 'Yuji',
			path: './access/music_KL/OldLove.mp3',
			image: './access/image/1.png'
		},
		{
			name: 'Overdose',
			singer: 'SMTOWN',
			path: './access/music_KL/Overdose.mp3',
			image: './access/image/2.png'
		},
		{
			name: 'Bad Habit',
			singer: 'Kuliet',
			path: './access/music_KL/BadHabit.mp3',
			image: './access/image/3.png'
		},
		{
			name: 'Boy\'s a linar',
			singer: 'Pinkpantheress',
			path: './access/music_KL/Boysaliar.mp3',
			image: './access/image/4.png'
		},
		{
			name: 'Training Wheels',
			singer: 'Melanie Martinez',
			path: './access/music_KL/TrainingWheels.mp3',
			image: './access/image/5.png'
		},
		{
			name: 'Pacify Her',
			singer: 'Melanie Martinez',
			path: './access/music_KL/TheRiver.mp3',
			image: './access/image/6.png'
		},
		{
			name: 'The river',
			singer: 'Axel Johansson',
			path: './access/music_KL/PacifyHer.mp3',
			image: './access/image/7.png'
		},
		{
			name: 'Outrunning',
			singer: 'Alec Benjamin',
			path: './access/music_KL/OutrunningKarma.mp3',
			image: './access/image/8.png'
		},
		{
			name: 'We only go north',
			singer: 'HAARPER',
			path: './access/music_KL/WEONLYGONORTH.mp3',
			image: './access/image/9.png'
		},
		{
			name: 'Demons',
			singer: 'Alec Benjamin',
			path: './access/music_KL/Demons.mp3',
			image: './access/image/10.png'
		},
		{
			name: 'State of Wonder',
			singer: 'Inverness Official',
			path: './access/music_KL/StateofWonder.mp3',
			image: './access/image/11.png'
		},
		{
			name: 'Speed up playlist for attractive ppl',
			singer: 'Almeda',
			path: './access/music_KL/Speedupplaylistforattractive.mp3',
			image: './access/image/12.png'
		},	


		{
			name: 'Sunroof',
			singer: 'Nicky Youre',
			path: './access/music_KL/Sunroof.mp3',
			image: './access/image/13.png'
		},
		{
			name: 'ROXANNE',
			singer: 'Arizona Zervas',
			path: './access/music_KL/ROXANNE.mp3',
			image: './access/image/14.png'
		},
		{
			name: 'The Best For You',
			singer: '歐陽娜娜Nana OuYang ',
			path: './access/music_KL/TheBestForYou.mp3',
			image: './access/image/15.png'
		},
		{
			name: 'Astronomy',
			singer: 'Conan Gray',
			path: './access/music_KL/Astronomy.mp3',
			image: './access/image/16.png'
		},
		{
			name: 'Cheating on You',
			singer: 'Charlie Puth',
			path: './access/music_KL/CheatingonYou.mp3',
			image: './access/image/17.png'
		},
		{
			name: 'Double take',
			singer: 'dhruv',
			path: './access/music_KL/doubletake.mp3',
			image: './access/image/18.png'
		},
		{
			name: 'You Are The Reason',
			singer: 'Calum Scott',
			path: './access/music_KL/YouAreTheReason.mp3',
			image: './access/image/19.png'
		},
		{
			name: 'TOMBOY',
			singer: '여자)아이들((G)I-DLE',
			path: './access/music_KL/TOMBOY.mp3',
			image: './access/image/20.png'
		},
		{
			name: 'Apple Tree',
			singer: 'AURORA',
			path: './access/music_KL/AppleTree.mp3',
			image: './access/image/21.png'
		},
		{
			name: 'Heather',
			singer: 'Conan Gray',
			path: './access/music_KL/Heather.mp3',
			image: './access/image/22.png'
		},
		{
			name: 'Instagram',
			singer: 'DEANTRBL',
			path: './access/music_KL/instagram.mp3',
			image: './access/image/23.png'
		},
		{
			name: 'YOUTH',
			singer: 'Troye Sivan',
			path: './access/music_KL/YOUTH.mp3',
			image: './access/image/24.png'
		},

		{
			name: 'Moonlight',
			singer: 'Yuji',
			path: './access/music_KL/Moonlight.mp3',
			image: './access/image/25.png'
		},
		{
			name: 'My Dear Friend',
			singer: 'Limshaira',
			path: './access/music_KL/MyDearFriend.mp3',
			image: './access/image/26.png'
		},
		{
			name: ' If We Have Each Other',
			singer: 'Alec Benjamin',
			path: './access/music_KL/IfWeHaveEachOther.mp3',
			image: './access/image/27.png'
		},
		{
			name: 'Why Do You Love Me',
			singer: 'Charlotte Lawrence',
			path: './access/music_KL/WhyDoYouLoveMe.mp3',
			image: './access/image/28.png'
		},
		{
			name: 'Still with you',
			singer: 'Jaeguchi',
			path: './access/music_KL/StillWithYou.mp3',
			image: './access/image/29.png'
		},
		{
			name: 'Heat waves',
			singer: 'Glass Animals',
			path: './access/music_KL/HeatWaves.mp3',
			image: './access/image/30.png'
		},
		{
			name: 'Everywhere I go',
			singer: 'Spinnin\' Records',
			path: './access/music_KL/AnywhereIGo.mp3',
			image: './access/image/31.png'
		},
		{
			name: 'On my mind',
			singer: 'Elliegoulding',
			path: './access/music_KL/OnMyMind.mp3',
			image: './access/image/32.png'
		},
		{
			name: 'This is what you came for',
			singer: 'Calvin Harris',
			path: './access/music_KL/ThisIsWhatYouCameFor.mp3',
			image: './access/image/33.png'
		},
		
	],

	render: function() {
		const htmls = this.songs.map(function(song, index) {
			return	 `
			<div class="song" id="song-${index}" data-index="${index}">
				<div class="thumb" 
					style="background-image: url('${song.image}')">
				</div>
				<div class="body">
					<h3 class="title">${index + 1}. ${song.name}</h3>
					<p class="author">${song.singer}</p>
				</div>
				<div class="option">
					<i class="fas fa-ellipsis-h"></i>
				</div>
			</div>
			`
		})
		playlist.innerHTML = htmls.join('')

	},
	defineProperties: function() {
		Object.defineProperty(this, 'currentSong', {
			get: function() {
				return this.songs[this.currentIndex]
			}
		})
	},

	// Thanh thời gian Audio	
	loadTimeAudio: 
		function() {
			setInterval(function() {
				{ // Thủ công
				let totalHour = Math.floor(audio.duration / 3600)
				let totalMinute = Math.floor((audio.duration - totalHour*3600) / 60)
				let totalSecond = Math.floor(audio.duration - totalHour*3600 - totalMinute * 60)
				
				let currentHour = Math.floor(audio.currentTime / 3600)
				let currentMin = Math.floor((audio.currentTime - currentHour*3600) / 60)
				let currentSec = Math.floor(audio.currentTime - currentHour*3600 - currentMin * 60)
				
				totalSecond = totalSecond < 10 ? ('0' + totalSecond) : totalSecond
				currentSec = currentSec < 10 ? ('0' + currentSec) : currentSec
				totalMinute = totalMinute < 10 ? ('0' + totalMinute) : totalMinute
				currentMin = currentMin < 10 ? ('0' + currentMin) : currentMin
				let totalTime = ``
				if (totalHour != 0 ) {
					if(currentHour != 0)
					totalTime = `${currentHour}:${currentMin}:${currentSec} / ${totalHour}:${totalMinute}:${totalSecond}`
					else {
					totalTime = `${currentMin}:${currentSec} / ${totalHour}:${totalMinute}:${totalSecond}`
					}
				}
				
				else totalTime = `${currentMin}:${currentSec} / ${totalMinute}:${totalSecond}`
				if(!isNaN(totalSecond))
				totalAudio.textContent = totalTime
				else totalAudio.textContent = 'Loading...'
				}

				// Định dạng HH:MM:SS
				// if(audio.duration > 3600) {
				// 	const totalTime = new Date(audio.duration * 1000).toISOString().substr(12, 7);
				// 	const currentTime = new Date(audio.currentTime * 1000).toISOString().substr(12, 7);
				// } else { // MM:SS
				// 	const totalTime = new Date(audio.duration * 1000).toISOString().substr(14, 5);
				// 	const currentTime = new Date(audio.currentTime * 1000).toISOString().substr(14, 5);
				// }
				// console.log(totalTime)
				// totalAudio.textContent = `${currentTime} / ${totalTime}`	
			}, 1000)			
			
		},
	
	handleEvents: function() {
		const _this = this


		// CD quay / stop
		const cdThumbAnimate = cdThumb.animate([
			{
				transform: 'rotate(360deg)'
			}
		], {
			duration: 10000,
			iterations: Infinity
		})
		cdThumbAnimate.pause()


		// Scroll top
		const cdWidth = cd.offsetWidth
		document.onscroll= function() {
			const scrollTop = window.scrollY || document.documentElement.scrollTop
			const newCdWidth = cdWidth - scrollTop

			cd.style.width = newCdWidth >=0 ? newCdWidth + 'px' : 0
			cd.style.opacity = newCdWidth / cdWidth 
		}
		audio.onplay = function() {
			_this.isPlaying = true
			player.classList.add('playing')
			cdThumbAnimate.play()
		}
		audio.onpause = function() {
			_this.isPlaying = false
			player.classList.remove('playing')
			cdThumbAnimate.pause()

		}
		// Play / Pause 
		playBtn.onclick = function() {
			
			if (_this.isPlaying) {
				audio.pause()
			} else {
				audio.play()
			}
			audio.onplay()
			audio.onpause()

		}

		// Tua bai hat
		audio.onloadedmetadata = function() {
			audio.ontimeupdate = function() {
				let value = 0
				if(!isNaN( audio.currentTime / audio.duration) ) {
					value = audio.currentTime / audio.duration *100
				}
				progress.value = value;
				_this.setConfig('currentIndex', _this.currentIndex)
				_this.setConfig('currentTime', audio.currentTime)
			}

		}

		// Tua bai hat
		progress.oninput = function() {
			let seekTime = progress.value / 100 * audio.duration
			audio.currentTime = seekTime
		}			

		// NEXT song
		nextBtn.onclick = function() {
			if(_this.isRandom) {
				_this.playRandomSong()
			} else {
				_this.nextSong()
			}
			audio.onplay()
			audio.play()
			_this.scrollIntoView()
		}
		//PREVIOUS SONG
		prevBtn.onclick = function() {
			if(_this.isRandom) {
				_this.playRandomSong()
			} else {
				_this.prevSong()
			}
			audio.onplay()
			audio.play()
			_this.scrollIntoView()
		}

		// Xử lý Bật/Tắt RANDOM song
		randomBtn.onclick = function() {
			_this.isRandom = !_this.isRandom
			randomBtn.classList.toggle('active', _this.isRandom)
			_this.setConfig('isRandom', _this.isRandom)
		}

		// Xử lý Bật/Tắt REPEAT song
		repeatBtn.onclick = function() {
			_this.isRepeat = !_this.isRepeat
			repeatBtn.classList.toggle('active', _this.isRepeat)
			_this.setConfig('isRepeat', _this.isRepeat)
		}
		
		//Repet Song when ended
		audio.onended = function() {
			if(_this.isRepeat) {
				audio.play()
			} else {
				nextBtn.onclick()
			}
		}

		//Play Song when click
		playlist.onclick = function(e) {
			const songNode = e.target.closest('.song:not(.active)')
			if (songNode || e.target.closest('.option')) {
				// Xử lý khi click vào option
				if(e.target.closest('.option')) return 

				// Xử lý khi click vào song
				if(songNode) {
					_this.changeActiveSong(false)
					_this.currentIndex = Number(songNode.getAttribute('data-index'))
					_this.loadCurrentSong()
					audio.play()
				}
				
			}
		}

		// Lắng nghe click phím
		let isMuted = false
		html.addEventListener("keydown", function(e) {
			if(e.key === ' ') {
				e.preventDefault()
				playBtn.onclick()
			}
			if(e.key === 'ArrowRight') {
				audio.currentTime += 15
			}
			if(e.key === 'ArrowLeft') {
				audio.currentTime -= 15
			}
			if(e.key === 'm') {
				isMuted = !isMuted
				audio.muted = isMuted
			}
			if(e.key === 'l') {
				nextBtn.onclick()
			}
			if(e.key === 'k') {
				prevBtn.onclick()
			}
		 })

	},

	loadCurrentSong: function() {
		heading.textContent = this.currentSong.name
		cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
		audio.src = this.currentSong.path
		this.changeActiveSong(true)
		this.loadTimeAudio()
		this.scrollIntoView()


	},

	// Active song 
	changeActiveSong: function(active) {
		const idSongString = `#song-${this.currentIndex}`
		const idSong = $(idSongString)
		if(active)
		idSong.classList.add('active')
		else
		idSong.classList.remove('active')

	},
	
	//Scroll Into View
	scrollIntoView : function() {
		setTimeout(function() {
			const songActive = $('.song.active')
			if(songActive) {
				songActive.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				})
			}
		}, 200)
	},

	// Load cấu hình đã lưu
	loadConfig: function() {
		if(!isNaN(this.config.currentIndex)) {
			this.currentIndex = this.config.currentIndex
		}	
		if(!isNaN(this.config.currentTime)) {
			audio.currentTime = this.config.currentTime
		} 
		if(this.config.isRandom)
		this.isRandom = this.config.isRandom
		if(this.config.isRepeat)
		this.isRepeat = this.config.isRepeat
	},

	
	nextSong: function() {
		this.changeActiveSong(false)
		this.currentIndex++
		if(this.currentIndex >= this.songs.length) this.currentIndex = 0
		
		this.loadCurrentSong()
	},
	
	prevSong: function() {
		this.changeActiveSong(false)
		this.currentIndex--
		if(this.currentIndex == -1) this.currentIndex = this.songs.length - 1
			this.loadCurrentSong()
	},

	playRandomSong: function() {
		this.changeActiveSong(false)
		let newCurrentIndex 
		do {
			newCurrentIndex = Math.floor(Math.random() * this.songs.length)
		} while (this.currentIndex == newCurrentIndex)

		this.currentIndex = newCurrentIndex
		this.loadCurrentSong()
	},
	
	start: function() {
		// Gán cấu hình từ config vào app
		this.loadConfig()

		//Định nghĩa các thuộc tính cho Object
		this.defineProperties()
		

		// Render playlist
		this.render()

		// Tải bài hát đầu tiên vào UI
		this.loadCurrentSong()
		
		// Lắng nghe/ Xử lý các event
		this.handleEvents()
		
		
		// Khôi phục trạng thái của nút Random, Repeat
		randomBtn.classList.toggle('active', this.isRandom)
		repeatBtn.classList.toggle('active', this.isRepeat)
	},

}

app.start()
