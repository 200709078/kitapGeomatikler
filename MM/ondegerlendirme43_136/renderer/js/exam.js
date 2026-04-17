const sorularSirali_T = [
    {
        yonerge: 'Aşağıda verilen fonksiyonları türevleri ile eşleştiriniz.',
        sorular: [
            { text: '\\(2x^3\\) &#8594 *** <span style="color: #ff0008ff;">6x²</style>' },
            { text: '\\(-x^4+4x-3\\) &#8594 *** <span style="color: #ff0008ff;">-4x³+4</style>' },
            { text: '\\((2x+1)^2+2\\) &#8594 *** <span style="color: #ff0008ff;">4x+4</style>' },
        ],
        tipi: "es",
        puan: 6,
        dogrular: ['6x²', '-4x³+4', '4x+4'],
        secimler: ['6x', '-4x²+4', '4x-4'],
        aciklama: [
            ['TÜREV', "\\(2x^3\\) fonksiyonunun türevi 6x²'dir."],
            ['TÜREV', "\\(-x^4+4x-3\\) fonksiyonunun türevi -4x³+4'tür."],
            ['TÜREV', "\\((2x+1)^2+2\\) fonksiyonunun türevi 4x+4'tür."],
        ]
    },
    {
        soru: '"Bir fonksiyonun bir noktada limitinin olması için fonksiyonun o noktada tanımlı olması gerekir." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 4,
        secenekler: [
            { text: 'Doğrudur.', correct: false },
            { text: 'Yanlıştır. <span style="color: #ff0008ff;">*</style>', correct: true },
        ],
        aciklama: ['LİMİT', 'Bir fonksiyonun bir noktada limitinin olması için fonksiyonun o noktada tanımlı olması gerekmez. O noktadaki sağdan ve soldan limitlerin eşit olması yeterlidir. Bu nedenle verilen ifade yanlıştır.'],
    },
    {
        soru: '"Bir deponun dolum fonksiyonunun türevi deponun dolum hızını verir." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 4,
        secenekler: [
            { text: 'Doğrudur. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Yanlıştır.', correct: false },
        ],
        aciklama: ['HIZ', 'Dolum fonksiyonunun türevi, deponun dolum hızını verir. Bu nedenle verilen ifade doğrudur.'],
    },
    {
        yonerge: 'Aşağıdaki boşlukları doldurunuz.',
        sorular: [
            { text: "Bir fonksiyonun türevi pozitif ise fonksiyon ***'dır. <span style='color: #ff0008ff;'>artan</style>" },
            { text: "Bir fonksiyonun türevinin sıfır olduğu noktalar *** noktalardır. <span style='color: #ff0008ff;'>kritik</style>" },
            { text: "Ekonomide maliyet fonksiyonunun türevi *** maliyeti verir. <span style='color: #ff0008ff;'>marjinal</style>" },
        ],
        tipi: "bd",
        puan: 6,
        dogrular: ['artan', 'kritik', 'marjinal'],
        secimler: ['azalan', 'sürekli', 'yüksek'],
        aciklama: [
            ['TÜREV', 'Açıklama 1 eklenecek...'],
            ['TÜREV', 'Açıklama 2 eklenecek...'],
            ['TÜREV', 'Açıklama 3 eklenecek...'],
        ]
    },
    {
        yonerge: 'Aşağıdaki boşluğu doldurunuz.',
        sorular: [
            { text: "\\(3x^2-12\\ge 0\\) eşitsizliğinin çözüm kümesi ***'dır. <span style='color: #ff0008ff;'>(-∞,-2] ∪ [2,∞)</style>" }
        ],
        tipi: "bd",
        puan: 10,
        dogrular: ['(-∞,-2] ∪ [2,∞)'],
        secimler: ['[-2,2]', '(-4,-2] ∪ [2,∞)'],
        aciklama: [
            ['EŞİTSİZLİKLER', 'Açıklama eklenecek...']
        ]
    },
    {
        soru: '-4x + 1 > 0 eşitsizliğinin çözüm kümesi aşağıdakilerden hangisidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '\\( \\left( -\\frac{1}{4} , \\frac{1}{4} \\right) \\) <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '\\( \\left( -\\frac{1}{4} , +\\infty \\right) \\)', correct: false },
            { text: '\\( \\left( -\\infty , \\frac{1}{4} \\right) \\)', correct: false },
            { text: '\\( \\left( -\\infty , \\frac{1}{4} \\right] \\)', correct: false },
            { text: '\\( \\left( \\frac{1}{4} , +\\infty \\right) \\)', correct: false }
        ],
        aciklama: ['EŞİTSİZLİKLER', 'Bu nedenle doğru cevap...']
    },
    {
        soru: "f(x) = x³ - x - 1 ve g(x) = x² - 4x + 5 fonksiyonları verilmiştir. Buna göre (fog)'(1) değeri hangisidir?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '-24 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '-23', correct: false },
            { text: '-22', correct: false },
            { text: '-21', correct: false },
            { text: '-20', correct: false }
        ],
        aciklama: ['TÜREVİN YORUMU', 'Bu nedenle doğru cevap...']
    },
    {
        soru: 'Bir aracın hız/zaman grafiği verildiğinde türev kavramı neyi temsil eder?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: 'Aracın ivmesini gösterir. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Aracın hızını gösterir.', correct: false },
            { text: 'Aracın yolunu gösterir.', correct: false },
            { text: 'Aracın ivmesini gösterir.', correct: false },
            { text: 'Aracın hızını gösterir.', correct: false }
        ],
        aciklama: ['TÜREVİN YORUMU', 'Bu nedenle doğru cevap...']
    },
    {
        soru: 'Tankta suyun hacmi: H(t) = t³ - 6t² + 9t litredir. Buna göre bu tankın 2. saatteki dolum hızı nedir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '-2 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '-1', correct: false },
            { text: '0', correct: false },
            { text: '1', correct: false },
            { text: '2', correct: false }
        ],
        aciklama: ['TANK', 'Bu nedenle doğru cevap...']
    },
    {
        soru: 'f(x) = 2x³ - 2x² + 2 fonksiyonu için \\(\\lim_{x \\to 1} \\frac{f(x) - f(1)}{x - 1}\\) değeri aşağıdakilerden hangisidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '-2 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '-1', correct: false },
            { text: '0', correct: false },
            { text: '1', correct: false },
            { text: '2', correct: false }
        ],
        aciklama: ['TÜREV TANIMI', 'Bu nedenle doğru cevap...']
    },
    {
        soru: 'Topun yükseklik fonksiyonu h(t) = -5t² + 20t + 15 metre olarak verilmiştir. Buna göre bu top Mmaksimum yüksekliğe ne zaman ulaşır?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '4 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false },
            { text: '7', correct: false },
            { text: '8', correct: false }
        ],
        aciklama: ['MAKSİMUM', 'Bu nedenle doğru cevap...']
    },
    {
        soru: 'Tanesi x TL olan kalemlerden 3x - 44 tane alınarak 15 TL ödeme yapılıyor. Buna göre bir kalemin fiyatı kaç TL olur?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '5 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '10', correct: false },
            { text: '12', correct: false },
            { text: '15', correct: false },
            { text: '20', correct: false }
        ],
        aciklama: ['KALEMLER', 'Bu nedenle doğru cevap...']
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
    MathJax.typesetPromise();
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
    MathJax.typesetPromise();
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