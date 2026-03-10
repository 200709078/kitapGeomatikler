const sorularSirali_T = [
    {
        soru: '\\(f(x)=\\begin{cases}x, & x<2 \\\\3, & x\\ge 2\\end{cases}\\) için aşağıdakilerden hangisi doğrudur?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: 'x = 2’de süreklidir. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'x = 2’de süreksizdir.', correct: false },
            { text: 'x = 2’de tepe noktası vardır.', correct: false },
            { text: 'Grafik paraboliktir.', correct: false },
            { text: 'Çift fonksiyondur.', correct: false },
        ],
        aciklama: ['PARÇALI FONKSİYON', 'x = -1 için f(-1) = -1 + 1 = 0 olur.']
    },
    {
        soru: '\\(f(x)=\\begin{cases}x+1, & x<0 \\\\x^2, & x\\ge 0\\end{cases}\\) şeklinde tanımlı f fonksiyonu veriliyor. Buna göre f(-1) değeri aşağıdakilerden hangisidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '-1', correct: false },
            { text: '0 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '1', correct: false },
            { text: '2', correct: false },
            { text: '3', correct: false },
        ],
        aciklama: ['PARÇALI FONKSİYON', 'x = -1 için f(-1) = -1 + 1 = 0 olur.']
    },
    {
        soru: 'x² - (2a+1)x - 2a - 2 = 0 denkleminin köklerinden biri 4 olduğuna göre a kaçtır?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '-2', correct: false },
            { text: '-1', correct: false },
            { text: '0', correct: false },
            { text: '1 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '2', correct: false },
        ],
        aciklama: ['İKİNCİ DERECEDEN DENKLEMLER', 'Denklemin köklerinden biri 4 olduğuna göre <br>x = 4 için 4² - (2a+1).4 - 2a - 2 = 0<br>16 - 8a - 4 - 2a - 2 = 0<br>10 - 10a = 0<br>a = 1 olur.']
    },
    {
        soru: '(a - 3)x³ +(a - 2)x² - 2x -(a + 5) = 0 ikinci derece denkleminin çözüm kümesi hangisidir.',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '{2, 4}', correct: false },
            { text: '{-2, 4} <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '{-2, -4}', correct: false },
            { text: '{2, -4}', correct: false },
            { text: '{-2, 0}', correct: false },
        ],
        aciklama: ['İKİNCİ DERECEDEN DENKLEMLER', 'Denklemin ikinci dereceden olması için a-3 = 0, yani a = 3 olmalıdır. Bu durumda denklem x² - 2x - 8 = 0 olur. Bu denklem (x-4).(x+2) = 0 şeklinde çarpanlara ayrılır. Bu nedenle x = 4 veya x = -2 olur. Buradan çözüm kümesi {-2, 4} olur.']
    },
    {
        soru: 'Bir şirket, ürettiği ürün sayısına göre kârını K(x) =-x² + 40x - 300 (bin TL) ile modelliyor. Şirketin zarar etmemesi için üretim miktarının hangi aralıkta olması gerekir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '[5, 25]', correct: false },
            { text: '[10, 30] <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '[15, 25]', correct: false },
            { text: '[10, 20]', correct: false },
            { text: '[25, 30]', correct: false },
        ],
        aciklama: ['KÂR', 'K(x) = -x² + 40x - 300 = 0 için x² - 40x + 300 = 0 olur. Bu denklem (x-10)(x-30) = 0 şeklinde çarpanlara ayrılır. Bu nedenle x = 10 veya x = 30 olur. Şirketin zarar etmemesi için üretim miktarı [10,30] nda olmalıdır.']
    },
    {
        soru: 'Bir mühendis, köprü ayağının yüksekliğini hesaplamak için aşağıdaki gibi modelleme yapmıştır. Ayak yüksekliği h(x) = 2x + 5 fonksiyonu ile verilmiştir. Burada x kullanılan çelik kolon sayısını göstermektedir. Köprü ayağının 35 metre olması için kaç çelik kolon gerekir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '10', correct: false },
            { text: '15 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '20', correct: false },
            { text: '25', correct: false },
            { text: '30', correct: false },
        ],
        aciklama: ['KOLONLAR', '2x + 5 = 35 ise 2x = 30 ve x = 15 olur. Bu nedenle köprü ayağının 35 metre olması için 15 çelik kolon gerekir.']
    },
    {
        soru: 'Bir fabrikanın üretim maliyeti f(x) = x² - 6x + 10 fonksiyonu ile modelleniyor. En düşük maliyet kaç birimdir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '1', correct: false },
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '4', correct: false },
            { text: '5 <span style="color: #ff0008ff;">*</style>', correct: true },
        ],
        aciklama: ['TEPE NOKTASI', 'En düşük maliyet tepe noktasındadır. r =  -b/2a = 3 için k = 3² - 18 + 10 = 1 olur. Bu nedenle en düşük maliyet 1 birimdir.']
    },
    {
        soru: 'Bir öğrencinin konumunu temsil eden nokta A(3,-2), okulun konumunu temsil eden B(-1, 1) noktası ile aynı koordinat düzleminde gösteriliyor. Bu öğrencinin evinden okula olan kuş uçuşu uzaklık kaç birimdir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '1', correct: false },
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '4', correct: false },
            { text: '5 <span style="color: #ff0008ff;">*</style>', correct: true },
        ],
        aciklama: ['UZAKLIK', '\\(\\sqrt{(3-(-1))^2 + (-2-1)^2} = 5\\) olur.']
    },
    {
        soru: 'P(x) = x² + 3x + 2 polinomunun kökleri nelerdir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '-1 ve -2 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '1 ve 2', correct: false },
            { text: '-1 ve 2', correct: false },
            { text: '1 ve -2', correct: false },
            { text: '1 ve 3', correct: false },
        ],
        aciklama: ['PARÇALI FONKSİYON', 'x² + 3x + 2 = (x+1).(x+2) = 0 ise x = -1 veya x = -2 olur.']
    },
    {
        soru: 'f(x) = x² - 4 fonksiyonunun tepe noktasının koordinatı aşağıdakilerden hangisidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '(0, -4) <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '(2, 0)', correct: false },
            { text: '(0, 0)', correct: false },
            { text: '(-4, 0)', correct: false },
            { text: '(-2, 0)', correct: false },
        ],
        aciklama: ["TEPE NOKTASI', 'Simetri ekseni x = 0'dır. Buradan x = 0 için f(0) = 0² - 4 = -4 olduğundan tepe noktası (0, -4) noktasıdır."]
    },
    {
        soru: 'f(x) = 2x + 3 fonksiyonunun grafiği aşağıdaki noktalardan hangisinden geçer?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '(0, 3) <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '(2, 3)', correct: false },
            { text: '(-3, 0)', correct: false },
            { text: '(3, 0)', correct: false },
            { text: '(2, 0)', correct: false },
        ],
        aciklama: ['DOĞRU GRAFİĞİ', 'x = 0 için f(0) = 2.3 + 3 = 3 olduğundan (0, 3) noktasından geçer.']
    }
]

const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal')

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

const soru = document.getElementById("soru")
const secenekButtons = document.getElementById("secenek-buttons")
const sonrakiButton = document.getElementById("sonraki-btn")
let answerDropDown

let aktifSoruIndex
let aktifSecimIndex
let topPuan
let sorular
let bSay

const dogruSound = new Audio("sound/dogru.mp3")
const yanlisSound = new Audio("sound/yanlis.mp3")
const bittiSound = new Audio("sound/gecti.mp3")
const kaldiSound = new Audio("sound/kaldi.mp3")
const secSound = new Audio("sound/sec.mp3")

document.addEventListener('contextmenu', event => event.preventDefault())

function denemeBaslat() {
    sorular = sorularSirali_T //arrayKaristir(sorularSirali_T)
    aktifSoruIndex = 0
    aktifSecimIndex = -1
    topPuan = 0
    bSay = 0
    sonrakiButton.innerHTML = "SONRAKİ"
    soruGoster()
}

function soruGoster() {
    bSay = 0
    secenekButtons.innerHTML = null
    sonrakiButton.style.display = "none";
    let aktifSoru = sorular[aktifSoruIndex]
    let soruNo = aktifSoruIndex

    // BOŞLUK DOLDURMA - EŞLEŞTİRME
    if (aktifSoru.tipi == 'bd' || aktifSoru.tipi == 'es') {
        let secimler = arrayKaristir([...new Set([...aktifSoru.dogrular, ...aktifSoru.secimler])])

        answerDropDown = document.createElement('div')
        answerDropDown.id = 'app-text-answer-dropdown'
        answerDropDown.setAttribute('onmouseleave', 'onAnswerDropDownMouseLeave(event)')
        document.getElementById('app').appendChild(answerDropDown)

        let i = 0
        secimler.forEach(s => {
            let ansDiv = document.createElement('div')
            ansDiv.id = "answer-dropdown-item" + i
            ansDiv.classList.add("app-text-answer-dropdown-item")
            ansDiv.innerHTML = s
            ansDiv.setAttribute("onclick", "onAnswerDropDownItemClicked(event)")
            answerDropDown.appendChild(ansDiv)
            i++
        })

        soru.innerHTML = "<b>" + (soruNo + 1) + ")</b> " + aktifSoru.yonerge + "<br>(" + aktifSoru.puan + " puan)"
        let say = 97
        let idSay = 0
        let max_blank = 0
        secimler.forEach(s => {
            if (s.length > max_blank) max_blank = s.length + 2
        })

        let blank = ''
        for (let i = 0; i < max_blank; i++) {
            blank += '_'
        }
        aktifSoru.sorular.forEach(secenek => {
            let withSelectText = secenek.text
            const re = /\*+/g
            const myArray = secenek.text.match(re)
            for (let i = 0; i < myArray.length; i++) {
                let blankDiv = document.createElement('span')
                blankDiv.id = idSay
                blankDiv.innerHTML = blank
                blankDiv.classList.add('answer')
                blankDiv.setAttribute("onclick", "onAnswerClicked(event)")
                withSelectText = withSelectText.replace('***', blankDiv.outerHTML)
                idSay++
            }

            const div = document.createElement("div")
            div.innerHTML = '<b>' + String.fromCharCode(say) + ')</b> ' + withSelectText
            if (aktifSoru.sorular.length == 1) div.innerHTML = withSelectText
            div.classList.add("div_bd_es")
            secenekButtons.appendChild(div)
            say++
        })
    }

    // ÇOKTAN SEÇMELİ - DOĞRU YANLIŞ
    if (aktifSoru.tipi == 'cs' || aktifSoru.tipi == 'dy') {
        soru.innerHTML = "<b>" + (soruNo + 1) + ")</b> " + aktifSoru.soru + "<br>(" + aktifSoru.puan + " puan)"
        let say = 65
        arrayKaristir(aktifSoru.secenekler).forEach(secenek => {
            const button = document.createElement("button")
            if (aktifSoru.tipi == "dy") {
                button.innerHTML = secenek.text
            } else {
                button.innerHTML = "<b>" + String.fromCharCode(say) + ")</b> " + secenek.text
            }
            button.classList.add("btn")
            secenekButtons.appendChild(button)
            if (secenek.correct) {
                button.dataset.correct = secenek.correct
            }
            button.addEventListener("click", secenekSec)
            say++
        })
    }

    if (aktifSoruIndex + 1 == sorular.length) {
        sonrakiButton.innerHTML = "SINAVI BİTİR"
    } else {
        sonrakiButton.innerHTML = "SONRAKİ"
    }
}

function onAnswerDropDownItemClicked(e) {
    bSay++
    document.getElementById(aktifSecimIndex).innerHTML = e.target.innerHTML
    document.getElementById(aktifSecimIndex).style.pointerEvents = 'none'
    if (sorular[aktifSoruIndex].dogrular[aktifSecimIndex] == e.target.innerHTML) {
        document.getElementById(aktifSecimIndex).style.backgroundColor = '#9aeabc'
        dogruSound.play()
        topPuan += sorular[aktifSoruIndex].puan / sorular[aktifSoruIndex].dogrular.length
    } else {
        document.getElementById(aktifSecimIndex).style.backgroundColor = '#ff9393'
        yanlisSound.play()
        modal.children[0].children[0].innerHTML = sorular[aktifSoruIndex].aciklama[aktifSecimIndex][0]
        modal.children[1].innerHTML = sorular[aktifSoruIndex].aciklama[aktifSecimIndex][1]
        openModal(modal)
    }
    answerDropDown.style.display = 'none'
    if (bSay == sorular[aktifSoruIndex].dogrular.length) sonrakiButton.style.display = 'block'
}

function onAnswerClicked(e) {
    secSound.play()
    aktifSecimIndex = e.target.id
    answerDropDown.style.left = e.target.getBoundingClientRect().left + 'px'
    answerDropDown.style.top = e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().height + 2 + 'px'
    answerDropDown.style.display = 'block'
}

function onAnswerDropDownMouseLeave(e) {
    answerDropDown.style.display = 'none'
}

function secenekSec(e) {
    const seciliButon = e.target
    const dogrumu = seciliButon.dataset.correct === "true"
    if (dogrumu) {
        seciliButon.classList.add("dogrusecenek")
        dogruSound.play()
        topPuan += sorular[aktifSoruIndex].puan
    } else {
        seciliButon.classList.add("yanlissecenek")
        yanlisSound.play()
        modal.children[0].children[0].innerHTML = sorular[aktifSoruIndex].aciklama[0]
        modal.children[1].innerHTML = sorular[aktifSoruIndex].aciklama[1]
        openModal(modal)
    }
    Array.from(secenekButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("dogrusecenek")
        }
        button.disabled = true
    })
    sonrakiButton.style.display = "block";
}

function puanGoster() {
    secenekButtons.innerHTML = null
    if (topPuan > 49) {
        bittiSound.play()
        soru.innerHTML = "<p style='color:red; font-size:30px; text-align:center;'>TEBRİKLER!</p><p style='color:red; font-size:25px; text-align:center;'>Toplam " + sorular.length + " adet sorudan " + topPuan + " puan aldınız.</p>"
    } else {
        kaldiSound.play()
        soru.innerHTML = "<p style='color:red; font-size:25px; text-align:center;'>Toplam " + sorular.length + " adet sorudan " + topPuan + " puan aldınız.</p>"
    }
    sonrakiButton.innerHTML = "TEKRAR BAŞLAT"
    sonrakiButton.style.display = "block";
}

function degistirSonraki() {
    aktifSoruIndex++
    if (aktifSoruIndex < sorular.length) {
        soruGoster()
    } else {
        puanGoster()
    }
}

sonrakiButton.addEventListener("click", () => {
    if (sonrakiButton.innerHTML == 'SONRAKİ' && (sorular[aktifSoruIndex].tipi == 'bd' || sorular[aktifSoruIndex].tipi == 'es')) {
        document.getElementById('app').removeChild(answerDropDown)
    }
    if (aktifSoruIndex < sorular.length) {
        degistirSonraki()
    } else {
        denemeBaslat()
    }
})

function arrayKaristir(arr) {
    karisik = arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    return karisik
}
window.addEventListener('resize', () => {
    answerDropDown.style.display = 'none'
})

denemeBaslat()