const log = console.log.bind(console)
let sum = ['11', '阿牛 - 桃花朵朵开', '即使喝醉也不会再打你的电话', '记念', '楼顶上的小斑鸠', '你曾是少年 (男声版)', '夜行', '原来你', '周杰伦 - 给我一首歌的时间 + 我不配 + 安静 + 轨迹 (Live)']
let ord = ['顺序播放', '随机播放', '列表循环', '单曲循环']

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return null
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return []
    } else {
        return elements
    }
}

// const interlist = () => {
//     let list = e('.player__list')
//     for (let i = 0; i < sum.length; i++) {
//         let t = `
//     <div class="list" data-id=${i}>${sum[i]}</div>
//     `
//         list.insertAdjacentHTML('beforeend', t)
//     }
// }

const click_list = () => {
    let list = e('.player__list')
    list.addEventListener('click', function(event) {
        let self = event.target
        log("点击到列表", self)
    })
}

const click_volume = () => {
    let volume = e('.player__volume')
    volume.addEventListener('click', function(event) {
        let self = event.target
        log("点击到列表", self)
    })
}

const bindplay = (audio) => {
    let play = e(".player__play")
    let first = 0
    let icon = e('.icon-play')
    play.addEventListener('click', function(event) {
        let self = event.target
        first += 1
        // if (first === 1) {
        //     if (audio.play()) {
        //         return audio.play()
        //     }
        // }

        if (self.classList.contains('pause')) {
            audio.pause()
            icon.classList.add('icon-play')
            let pause = e('.fa-pause')
            pause.remove()
            self.classList.remove('pause')
        } else if (!self.classList.contains('pause')){
            audio.play()
            icon.classList.remove('icon-play')
            icon.innerHTML = '<i class="player__icon player__icon-play fa fa-pause fa-1.5x"></i>'
            self.classList.add('pause')
        }
    })
}

const Previous = (audio) => {
    let prev = e(".player__prev")
    let len = sum.length
    let meta = e('.player__meta')
    prev.addEventListener('click', function(event) {
        let self = event.target
        let s = parseInt(audio.dataset.current, 10)
        let tot = (len - 1 + s) % len
        audio.dataset.current = tot
        audio.dataset.name = sum[tot]
        let address = 'audio/' + sum[tot] + '.mp3'
        audio.src = address
        let t = `
            <div class="player__song" data-id=${tot}>${audio.dataset.name}</div>
        `
        meta.innerHTML = t
    })
}

const next_ = (audio) => {
    let next = e(".player__next")
    let len = sum.length
    let meta = e('.player__meta')
    next.addEventListener('click', function(event) {
        let self = event.target
        let curr = audio.dataset.current
        let s = parseInt(curr, 10)
        let tot = (len + 1 + s) % len
        audio.dataset.current = tot
        audio.dataset.name = sum[tot]
        let address = 'audio/' + sum[tot] + '.mp3'
        audio.src = address

        let t = `
            <div class="player__song" data-id=${tot}>${audio.dataset.name}</div>
        `
        meta.innerHTML = t
    })
}

const mouse = () => {
    let list = e('.player__list')
    list.addEventListener('mouseover', function(event) {
        let self = event.target
        self.classList.add('highlight')
    })
    list.addEventListener('mouseout', function(event) {
        let self = event.target
        self.classList.remove('highlight')
    })
}

const Click_list = (audio) => {
    let list = e('.player__list')
    list.addEventListener('click', function(event) {
        let self = event.target
        let curr = self.dataset.id
        audio.dataset.current = curr
        audio.dataset.name = sum[tot]
        let address = 'audio/' + sum[curr] + '.mp3'
        audio.src = address
    })
}


const actionorder_ = () => {
    let button = e(".button")
    let order = e('.order')
    button.addEventListener('click', function(event) {
        let self = event.target
        let curr = e('.button')
        if (self.classList.contains('order')) {
            let len = ord.length
            let index = button.dataset.index
            log("点击到")
            let inde = parseInt(index, 10)
            let i = (len + 1 + inde) % len
            let t = `
        <div class="order" data-index="${i}" data-curr="${ord[i]}">${ord[i]}</div>
        `
            button.dataset.index = i
            button.dataset.curr = ord[i]
            order.innerHTML = t
            log("curr", curr)
        }
    })
}

const Play_order = (audio) => {
    audio.addEventListener('ended', function() {
        let button = e(".button")
        let meta = e('.player__meta')
        let curr = button.dataset.curr
        if (curr === '顺序播放') {
            let s = audio.dataset.current
            let current = parseInt(s, 10)
            let len = sum.length
            let index = (current + len + 1) % len
            if (index === 0) {
                audio.pause()
            } else {
                audio.dataset.current = index
                audio.dataset.name = sum[index]
                audio.src = 'audio/' + sum[index] + '.mp3'
                let t = `
            <div class="player__song" data-id=${index}>${audio.dataset.name}</div>
        `
                meta.innerHTML = t
            }
        }
    })
}

const Random = () => {
    let len = Math.random() * sum.length
    return Math.floor(len)
}

const Random_play = (audio) => {
    let meta = e('.player__meta')

    audio.addEventListener('ended', function() {
        let button = e(".button")
        let curr = button.dataset.curr
        log("随机播放", curr === '随机播放')
        if (curr === '随机播放') {
            let index = Random()
            audio.dataset.current = index
            audio.dataset.name = sum[index]
            audio.src = 'audio/' + sum[index] + '.mp3'
            let t = `
            <div class="player__song" data-id=${index}>${audio.dataset.name}</div>
        `
            meta.innerHTML = t
        }
    })
}

const list_loop = (audio) => {
    audio.addEventListener('ended', function() {
        let button = e(".button")
        let meta = e('.player__meta')
        let curr = button.dataset.curr
        if (curr === '列表循环') {
            let current = parseInt(s, 10)
            let len = sum.length
            let index = (current + len + 1) % len
            audio.dataset.current = index
            audio.dataset.name = sum[index]
            audio.src = 'audio/' + sum[index] + '.mp3'
            let t = `
            <div class="player__song" data-id=${index}>${audio.dataset.name}</div>
        `
            meta.innerHTML = t
        }
    })
}

const Single = (audio) => {
    let meta = e('.player__meta')
    audio.addEventListener('ended', function() {
        let button = e(".button")
        let curr = button.dataset.curr
        if (curr === '单曲循环') {
            audio.play()
            let t = `
            <div class="player__song" data-id=${index}>${audio.dataset.name}</div>
        `
            meta.innerHTML = t
        }
    })
}

const play_ = (audio) => {
    audio.addEventListener('canplay', function() {
        audio.play()
    })
}

const _main = () => {
    let audio = document.querySelector('#id-audio-player')
    bindplay(audio)
    Previous(audio)
    next_(audio)
    play_(audio)
    // interlist()
    mouse()
    actionorder_()
    Click_list(audio)
    // end(audio)
    Play_order(audio)
    Random_play(audio)
    list_loop(audio)
    Single(audio)
    click_list()
    click_volume()
}
_main()