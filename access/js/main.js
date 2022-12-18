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
			singer: 'MOLO',
			path: './access/music_KL/OldLove.mp3',
			image: './access/image/1.jpg',
			backgroundImage: './access/image/1.jpg'
		},
		{
			name: 'In the name of love',
			singer: 'MARTIN GARIX X BEBE REXHA',
			path: 'https://audio.jukehost.co.uk/Ww2CXsanXtQsUZfNvE8pxbuHIvQwwgjq',
			image: './access/image/2.jpg',
			backgroundImage: './access/image/2.jpg'

		},
		{
			name: 'Santa tell me',
			singer: 'TATUM',
			path: 'https://audio.jukehost.co.uk/JkiUDSPcEw6onVRI6rozH9mKkBB0HKJU',
			image: './access/image/3.jpg',
			backgroundImage: './access/image/3.jpg'

		},
		{
			name: 'Độ Tộc 2',
			singer: 'ĐỘ MIXI x Phúc Du x Pháo x Masew',
			path: 'https://audio.jukehost.co.uk/gWgIRaivqAUqsztPAhFu9xFZIpLWN0zX',
			image: './access/image/4.jpg',
			backgroundImage: './access/image/4.jpg'

		},
		{
			name: 'Stream đến bao giờ',
			singer: 'ĐỘ MIXI',
			path: 'https://audio.jukehost.co.uk/FOZUkSfMH1LyfTdcE1kmiHPM2hAtfwdJ',
			image: './access/image/5.jpg',
			backgroundImage: './access/image/5.jpg'

		},
		// {
		// 	name: 'Đạo lý tình yêu',
		// 	singer: 'Độ Lý',
		// 	path: 'https://audio.jukehost.co.uk/81zcK2ZhYSykveiAxDpsZdaw1qBTvRFl',
		// 	image: './access/image/6.jpg',
		// 	backgroundImage: './access/image/6.jpg'

		// },
		// {
		// 	name: 'Cách tán CRUSH',
		// 	singer: 'MIXI tán gái',
		// 	path: 'https://audio.jukehost.co.uk/ern540dlzO4IjpL0WPYuZ70f8sv2BLNA',
		// 	image: './access/image/7.jpg',
		// 	backgroundImage: './access/image/7.jpg'

		// },
		{
			name: 'Bên trên tầng lầu',
			singer: 'Giấu tên',
			path: 'https://audio.jukehost.co.uk/voPD8l4y2MtgXMEaTQLjuNGKfd6fScST',
			image: './access/image/8.jpg',
			backgroundImage: './access/image/8.jpg'

		},
		// {
		// 	name: 'Phải có người yêu',
		// 	singer: 'Độ người yêu',
		// 	path: 'https://audio.jukehost.co.uk/w0T6Qm0Wa5Exbckw0NBYPzLRVdoC0XaW',
		// 	image: './access/image/9.jpg',
		// 	backgroundImage: './access/image/9.jpg'

		// },
		{
			name: 'REMIX',
			singer: 'DATTO SAN',
			path: 'https://audio.jukehost.co.uk/UJQC1L2VtxB1VJUXrirPV2nd0esR3TTq',
			image: './access/image/10.jpg',
			backgroundImage: './access/image/10.jpg'

		},
		{
			name: 'THE ONE THAT GOT AWAY REMIX ',
			singer: '( TRUNG HOÀNG MIX ) HOT TIK TOK 2022',
			path: 'https://audio.jukehost.co.uk/aqyXf57JMOuOiL1UYxdSVIyaVKwEiJhV',
			image: './access/image/12.jpg',
			backgroundImage: './access/image/12.jpg'

		},
		{
			name: 'HOUSE LAK - DON\'T STOP - MIXSET',
			singer: 'TeA DEEP',
			path: 'https://audio.jukehost.co.uk/GpiaGGM4glp7dI5ik7o6TyREMAeqAgtw',
			image: './access/image/13.png',
			backgroundImage: './access/image/13.png'

		},
		{
			name: 'HOUSE LAK 2022 - LAK WITH SOI DOLCE IN DA HEY Vol.2',
			singer: 'TeA DEEP',
			path: 'https://audio.jukehost.co.uk/9Gx7683oWxXsYKCB35CIbWvnti7EOcun',
			image: './access/image/14.png',
			backgroundImage: './access/image/14.png'

		},
		{
			name: 'Deep House 2021 - Việt Mix Chuyện Tình Willzi | Deep Chill',
			singer: 'TeA DEEP',
			path: 'https://audio.jukehost.co.uk/1eGwSkq9cg8B2CuMunrjDwM4PSY394Xp',
			image: './access/image/15.png',
			backgroundImage: './access/image/15.png'

		},
		{
			name: 'Mắt Em Nhòa Đi Mascara ( DJ Long Nhật ) - Đạt Con Mix',
			singer: 'PHÚ THỌ BAY',
			path: 'https://audio.jukehost.co.uk/GU34oKgF1ldD7L9xvRxC2Dh6v7m80ObZ',
			image: './access/image/16.png',
			backgroundImage: './access/image/16.png'

		},
		{
			name: 'HOUSE LAK - THANH NIÊN | ANNIVERSARY - NBC',
			singer: 'TeA DEEP',
			path: 'https://audio.jukehost.co.uk/1IxR784CThbI21lbLigVCYg945TpMrOB',
			image: './access/image/17.png',
			backgroundImage: './access/image/17.png'

		},
		{
			name: 'MIXTAPE - VIET DEEP CHỈ CÒN MỘT ĐÊM CUỐI',
			singer: 'Trinh Minh Phuc',
			path: 'https://audio.jukehost.co.uk/YsZ6qDhKWVUYXByklPOjFdhceQFzzhfN',
			image: './access/image/18.png',
			backgroundImage: './access/image/18.png'

		},
		{
			name: 'MIXTAPE - VIET DEEP XA ANH CHẬM CHẬM THÔI',
			singer: 'Trinh Minh Phuc',
			path: 'https://audio.jukehost.co.uk/wzw3GdzFGe9QQRs0cNi7ZrU4Tx7xI0jZ',
			image: './access/image/19.png',
			backgroundImage: './access/image/19.png'

		},
		{
			name: 'VIET DEEP 2022 - RẰNG EM MÃI Ở BÊN X NHƯ ANH ĐÃ THẤY EM',
			singer: 'Deluxe Music',
			path: 'https://audio.jukehost.co.uk/8Bpq95lmEuiJUBBNMTpmlIHmmzq3INSe',
			image: './access/image/20.png',
			backgroundImage: './access/image/20.png'

		},
		{
			name: 'VIET DEEP 2022 - THỜI GIAN SẼ TRẢ LỜI X CHIẾC KHĂN GIÓ ẤM',
			singer: 'Deluxe Music',
			path: 'https://audio.jukehost.co.uk/Rs1wxf0XeVYACUirLHp4QJmzvpTIR2GU',
			image: './access/image/21.png',
			backgroundImage: './access/image/21.png'

		},
		{
			name: 'HOUSE LAK 2022 - Thăng Trầm | Slow Down',
			singer: 'TeA DEEP',
			path: 'https://audio.jukehost.co.uk/AgdgaCvSRoNAFOA5t81sQYEGZwMs2xPB',
			image: './access/image/22.png',
			backgroundImage: './access/image/22.png'

		},
		{
			name: 'MIXTAPE - HOUSE LAK | SO FAR AWAY - 1500 STROKES',
			singer: 'Trinh Minh Phuc',
			path: 'https://audio.jukehost.co.uk/FBKoedI9QpLrVeVzMUeBG7XMYsSbdsRw',
			image: './access/image/23.png',
			backgroundImage: './access/image/23.png'

		},
		{
			name: 'VIET DEEP 2022 - RẰNG EM MÃI Ở BÊN REMIX',
			singer: 'Deluxe Music',
			path: 'https://audio.jukehost.co.uk/1HhhLRJvUFADFKcbsMIIby2HpLOsQm0d',
			image: './access/image/24.png',
			backgroundImage: './access/image/24.png'

		},
		{
			name: 'Viet Deep #20',
			singer: 'MEDIA_MusicPro',
			path: 'https://audio.jukehost.co.uk/b851eO6JbcqB3iL32XlkMd0eOwqdB6HS',
			image: './access/image/11.png',
			backgroundImage: './access/image/11.png'

		},
		{
			name: 'House Lak Nhà Làm - Thương em đến già By HoangMP Mix (ND Team)',
			singer: 'MEDIA_MusicPro',
			path: 'https://audio.jukehost.co.uk/vDzz9Y1mpRLBolq2twF3daWDfl782w90',
			image: './access/image/25.png',
			backgroundImage: './access/image/25.png'

		},
		{
			name: 'NONSTOP 2022 BAY PHÒNG BASS CỰC MẠNH | Nonstop Vinahouse 2022',
			singer: 'MEDIA_MusicPro',
			path: 'https://audio.jukehost.co.uk/zD2zAAX9odnUp54lys7dORn1gDnUv4FH',
			image: './access/image/26.png',
			backgroundImage: './access/image/26.png'

		},
		{
			name: 'Mixset HouseLak - Boc Dau 1.0 | Hdung x Dat Kon',
			singer: 'MEDIA_MusicPro',
			path: 'https://audio.jukehost.co.uk/rJxJ2SDBm3SFlNIblap1ckOaexZovoSi',
			image: './access/image/27.png',
			backgroundImage: './access/image/27.png'

		},
		
	],

	render: function() {
		const htmls = this.songs.map(function(song, index) {
			// style="background: url(${song.backgroundImage}) center / cover no-repeat">
			return `
			<div class="song" id="song-${index}" data-index="${index}">
				<div class="thumb" 
					style="background-image: url('${song.image}')">
				</div>
				<div class="body">
					<h3 class="title">${song.name}</h3>
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
