const sorularSirali_T = [
    {
        yonerge: 'Bir taksi şirketi için aşağıdaki doğrusal fonksiyonları uygun durumlarla eşleştiriniz.',
        sorular: [
            { text: "f(x) = 3x + 12 &rarr; *** <span style='color: #ff0008ff;'>Başlangıç 12 TL, km başına 3 TL</style>" },
            { text: "f(x) = 2x + 10 &rarr; *** <span style='color: #ff0008ff;'>Başlangıç 10 TL, km başına 2 TL</style>" },
            { text: "f(x) = 5 + 4x &rarr; *** <span style='color: #ff0008ff;'>Başlangıç 5 TL, km başına 4 TL</style>" },
        ],
        tipi: "es",
        puan: 9,
        dogrular: ['Başlangıç 12 TL, km başına 3 TL', 'Başlangıç 10 TL, km başına 2 TL', 'Başlangıç 5 TL, km başına 4 TL'],
        secimler: ['Başlangıç 3 TL, km başına 12 TL', 'Başlangıç 2 TL, km başına 10 TL', 'Başlangıç 4 TL, km başına 5 TL'],
        aciklama: [
            ['FONKSİYONLAR', 'f(x) = 3x + 12 için başlangıç 12 TL ve km başına 3 TL ücret düşer.'],
            ['FONKSİYONLAR', 'f(x) = 2x + 10 için başlangıç 10 TL ve km başına 2 TL ücret düşer.'],
            ['FONKSİYONLAR', 'f(x) = 5 + 4x için başlangıç 5 TL ve km başına 4 TL ücret düşer.'],
        ]
    },
    {
        yonerge: 'Aşağıdaki ifadeleri uygun yorumlarla eşleştiriniz.',
        sorular: [
            { text: "Sabit ücret 12 TL &rarr; ***  <span style='color: #ff0008ff;'>y eksenini 12 noktasında keser</style>" },
            { text: "Her birimde 7 TL artış &rarr; *** <span style='color: #ff0008ff;'>Eğimi 7'dir</style>" },
        ],
        tipi: "es",
        puan: 10,
        dogrular: ["y eksenini 12 noktasında keser", "Eğimi 7'dir"],
        secimler: ["Eğimi 12'dir.", "y eksenini 7 noktasında keser"],
        aciklama: [
            ['FONKSİYONLAR', 'Sabiti 12 olan f(x) = mx + 12 şeklindeki fonksiyon y eksenini 12 noktasında keser.'],
            ['FONKSİYONLAR', 'Her birimde 7 TL artış olan f(x) = 7x + c şeklindeki fonksiyonun eğimi 7 dir.'],
        ]
    },
    {
        yonerge: 'Aşağıdaki boşluğu doldurunuz.',
        sorular: [
            { text: "2x² + 4x + 3 = 2(***)² + 1 <span style='color: #ff0008ff;'>x+1</style>" }
        ],
        tipi: "bd",
        puan: 6,
        dogrular: ['x + 1'],
        secimler: ['x - 1', 'x - 2'],
        aciklama: [
            ['FONKSİYONLAR', '2x² + 4x + 3 = 2(x²+2x+1) + 1 = 2(x+1)² + 1 olduğundan boşluğa gelecek ifade x + 1 dir.']
        ]
    },
    {
        yonerge: 'f(x) = 2x + 2 ve g(x) = x + 1 şeklinde tanımlanıyor. Buna göre aşağıdaki işlemleri uygun sonuçlarla eşleştiriniz.',
        sorular: [
            { text: "f + g = *** <span style='color: #ff0008ff;'>3x+3</style>" },
            { text: "f - g = *** <span style='color: #ff0008ff;'>x+1</style>" },
            { text: "f . g = *** <span style='color: #ff0008ff;'>2x²+4x+2</style>" },
            { text: "f / g = *** <span style='color: #ff0008ff;'>2</style>" },
        ],
        tipi: "es",
        puan: 12,
        dogrular: ['3x+3', 'x+1', '2x²+4x+2', '2'],
        secimler: ['3x+1', 'x-1', '2x²+2x+2', '4'],
        aciklama: [
            ['FONKSİYONLAR', 'f(x) + g(x) = (2x + 2) + (x + 1) = 3x + 3<br>f(x) - g(x) = (2x + 2) - (x + 1) = x + 1<br> f(x).g(x) = (2x + 2).(x + 1) = 2x² + 4x + 2<br>f(x)/g(x) = (2x + 2)/(x + 1) = 2 olur.']
        ]
    },
    {
        soru: '"Bir ücret fonksiyonu f(x) = 6x + 20 ise 20 sayısı başlangıç ücretini temsil eder." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 9,
        secenekler: [
            { text: 'Doğrudur. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Yanlıştır.', correct: false },
        ],
        aciklama: ['BAŞLANGIÇ ÜCRETI', 'x=0 için f(0) = 20 TL, başlangıç ücretini temsil eder. Bu nedenle verilen ifade doğrudur.'],
    },
    {
        soru: '"Bir kargo şirketinde başlangıç ücreti 20 TL ve kilogram başına 4 TL alınmaktadır. Bu doğrusal fonksiyonun eğimi 20&apos;dir." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 10,
        secenekler: [
            { text: 'Doğrudur.', correct: false },
            { text: 'Yanlıştır. <span style="color: #ff0008ff;">*</style>', correct: true },
        ],
        aciklama: ['EĞİM', 'Şirket x kilogram için f(x) = 20 + 4x fonksiyonunu kullanmaktadır. Bu doğrusal fonksiyonun eğimi 4&apos;tür. Bu nedenle verilen ifade yanlıştır.'],
    },
    {
        soru: '"x² + 4x + 1 = (x + 2)² − 3" ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 10,
        secenekler: [
            { text: 'Doğrudur. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Yanlıştır.', correct: false },
        ],
        aciklama: ['ÇARPANLARA AYIRMA', '(x + 2)² − 3 = x² + 4x + 4 − 3 = x² + 4x + 1 olduğundan verilen ifade doğrudur.'],
    },
    {
        soru: "Bir telefon tarifesinde aylık sabit ücret 50 TL ve kullanılan her GB için 2 TL ücret alınmaktadır.Toplam ödeme 74 TL olduğuna göre müşteri kaç GB internet kullanmıştır?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '10 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '12', correct: false },
            { text: '15', correct: false },
            { text: '18', correct: false },
            { text: '24', correct: false },
        ],
        aciklama: ['TARİFE', "Telefon ücreti = sabit ücret + (GB ücreti x GB) ile hesaplanır. Yani x GB'lık bir kullanımın ücreti y = f(x) = 50 + 2.x ile hesaplanır. Buradan y = 74 TL ücret ödemek için 74 = 50 + 2x = 12 GB internet kullanmak gerekir."]
    },
    {
        soru: "Bir kargo şirketi sabit olarak 15 TL ve kilogram başına 6 TL ücret almaktadır. Buna göre 4 kg'lık bir kargonun ücreti kaç TL olur?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '24', correct: false },
            { text: '39 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '45', correct: false },
            { text: '54', correct: false },
            { text: '60', correct: false },
        ],
        aciklama: ['KARGO ÜCRETİ', ' Kargo ücreti = sabit ücret + (kilogram başına ücret x kilogram) ile hesaplanır. Yani x kilogramlık bir paketin kargo ücreti f(x) = 15 + 6.x  ile hesaplanır. Buradan x = 4 kg için f(4) = 15 + 6.4 = 39 TL olur.']
    },
    {
        soru: 'f(x) = x² + 7x + 12 ifadesinin çarpanlarına ayrılmış biçimi aşağıdakilerden hangisidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '(x+3).(x+4) <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '(x+2).(x+6)', correct: false },
            { text: '(x+1).(x+12)', correct: false },
            { text: '(x+5).(x+2)', correct: false },
            { text: '(x-3).(x-4)', correct: false },
        ],
        aciklama: ['ÇARPANLARA AYIRMA', 'x² + 7x + 12 = (x+3).(x+4) olur.']
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

//document.addEventListener('contextmenu', event => event.preventDefault())

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