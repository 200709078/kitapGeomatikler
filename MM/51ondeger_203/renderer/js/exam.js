const sorularSirali_T = [
    {
        yonerge: 'Aşağıda verilen fonksiyonları tanımsız yapan değerlere göre seçim yapınız.',
        sorular: [
            { text: "\\(\\frac{x^2 - 4}{2x-4}\\) fonksiyonu ***'de tanımsızdır. <span style='color: #ff0008ff;'>x=2</style>" },
            { text: "\\(\\frac{x^2 - 1}{x+1}\\) fonksiyonu ***'de tanımsızdır. <span style='color: #ff0008ff;'>x=-1</style>" },
            { text: "\\(\\frac{x^2 - 9}{3x-9}\\) fonksiyonu ***'de tanımsızdır. <span style='color: #ff0008ff;'>x=3</style>" },
        ],
        tipi: "es",
        puan: 9,
        dogrular: ['x=2', 'x=-1', 'x=3'],
        secimler: ['x=1', 'x=-2', 'x=-3'],
        aciklama: [
            ['FONKSİYONLAR', 'Payda x=2 için 0 olduğundan fonksiyon x=2 de tanımsız olur.'],
            ['FONKSİYONLAR', 'Payda x=-1 için 0 olduğundan fonksiyon x=-1 de tanımsız olur.'],
            ['FONKSİYONLAR', 'Payda x=3 için 0 olduğundan fonksiyon x=3 de tanımsız olur.'],
        ]
    },
    {
        yonerge: 'Aşağıda verilen fonksiyonlara uygun özelliklere göre seçim yapınız.',
        sorular: [
            { text: "\\(y=(x-1)^2\\) fonksiyonunun *** noktası vardır. <span style='color: #ff0008ff;'>minimum</style>" },
            { text: "\\(y=(x+2)^3\\) fonksiyonu *** fonksiyondur. <span style='color: #ff0008ff;'>birebir</style>" },
            { text: '\\(y=(x-4)^4\\) fonksiyonu *** fonksiyondur. <span style="color: #ff0008ff;">çift</style>' }
        ],
        tipi: "es",
        puan: 9,
        dogrular: ['minimum', 'birebir', 'çift'],
        secimler: ['örten', 'maksimum', 'tek'],
        aciklama: [
            ['FONKSİYONLAR', 'Başkatsayısı pozitif olduğu için kolları yukarı doğru ve minimum noktası vardır.'],
            ['FONKSİYONLAR', 'Tanım kümesindeki her bir elemana karşılık değer kümesinde yalnız bir eleman bulunduğu için birebir fonksiyondur.'],
            ['FONKSİYONLAR', 'Derecesi çift olduğu için çift fonksiyondur.'],
        ]
    },
    {
        soru: '"Bir parabolün tepe noktasının ordinatı maksimum değerini verir." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 8,
        secenekler: [
            { text: 'Doğrudur.', correct: false },
            { text: 'Yanlıştır. <span style="color: #ff0008ff;">*</style>', correct: true },
        ],
        aciklama: ['PARABOL', 'Bir parabolün kolları aşağı doğru ise tepe noktası maksimum değeri, yukarı doğru ise minimum değeri verir.']
    },
    {
        soru: '"\\(h(x) = -5x^2 + 10x-2\\) parabolü daima artandır." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 8,
        secenekler: [
            { text: 'Doğrudur.', correct: false },
            { text: 'Yanlıştır. <span style="color: #ff0008ff;">*</style>', correct: true },
        ],
        aciklama: ['PARABOL', 'Paraboller daima artan veya daima azalan değildir.']
    },
    {
        soru: '"Bir parabolün kolları aşağı doğru ise maksimum noktası vardır." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 6,
        secenekler: [
            { text: 'Doğrudur. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Yanlıştır.', correct: false },
        ],
        aciklama: ['PARABOL', 'Kolları aşağı yönde olan paraboller maksimum değere sahiptir.']
    },
    {
        yonerge: '\\(h(t)=-5t^2+40t+10\\) polinomu ile modellenen bir roket yerden 10 metre yükseklikten fırlatılıyor. Buna göre aşağıda verilen boşlukları doldurunuz.',
        sorular: [
            { text: "Maksimum yüksekliğe *** saniyede ulaşır. <span style='color: #ff0008ff;'>4</style>" },
            { text: "Ulaşabileceği maksimum yükseklik *** metredir. <span style='color: #ff0008ff;'>90</style>" },
        ],
        tipi: "bd",
        puan: 8,
        dogrular: ['4', '90'],
        secimler: ['9', '40'],
        aciklama: [
            ['ROKET', "Roket maksimum yüksekliğe 4 saniyede ulaşır."],
            ['ROKET', "4 saniye sonunda ulaşacağı maksimum yükseklik 90 metredir."],
        ]
    },
    {
        yonerge: '\\(P(x) =\\frac{3x^2 - 27}{2x^2 - 6x}\\) polinomu veriliyor. Buna göre aşağıda verilen boşlukları doldurunuz.',
        sorular: [
            { text: "Sadeleşmiş hali ***'dır. <span style='color: #ff0008ff;'>3(x+3)/2x</style>" },
            { text: "Tanımsız olduğu değerler ***'tür. <span style='color: #ff0008ff;'>x=0 ve x=3</style>" },
        ],
        tipi: "bd",
        puan: 10,
        dogrular: ['3(x+3)/2x', 'x=0 ve x=3'],
        secimler: ['x=-3 ve x=3', '(x+2)/2x'],
        aciklama: [
            ['POLİNOMLAR', "\\(P(x) =\\frac{3x^2 - 27}{2x^2 - 6x}\\) polinomunun sadeleşmiş hâli \\(\\frac{3(x+3)}{2x}\\)'tir."],
            ['POLİNOMLAR', "\\(P(x) =\\frac{3x^2 - 27}{2x^2 - 6x}\\) polinomunun tanımsız olduğu değerler paydayı sıfır yapan x=0 ve x=3'tür."],
        ]
    },
    {
        yonerge: '\\(P(x) =7(x-5)^3\\) polinomu veriliyor. Buna göre aşağıda verilen boşlukları doldurunuz.',
        sorular: [
            { text: "Derecesi ***'tür. <span style='color: #ff0008ff;'>3</style>" },
            { text: "Başkatsayısı ***'dir. <span style='color: #ff0008ff;'>7</style>" },
            { text: "Sıfırı ***'dır. <span style='color: #ff0008ff;'>5</style>" },
        ],
        tipi: "bd",
        puan: 12,
        dogrular: ['3', '7', '5'],
        secimler: ['4', '2'],
        aciklama: [
            ['POLİNOMLAR', "\\(P(x) =7(x-5)^3\\) polinomunun derecesi 3'tür."],
            ['POLİNOMLAR', "\\(P(x) =7(x-5)^3\\) polinomunun başkatsayısı 7'dir."],
            ['POLİNOMLAR', "\\(P(x) =7(x-5)^3\\) polinomunun sıfırı <br> \\(7(x-5)^3=0\\)<br>\\(x-5=0\\)<br>\\(x=5\\) olur."],
        ]
    },
    {
        yonerge: 'Bir top yerden 3 metre yükseklikten fırlatılıyor. Yükseklik fonksiyonu \\(h(t) = -5t^2 + 20t + 3\\) olduğuna göre aşağıda verilen boşlukları doldurunuz.',
        sorular: [
            { text: 'En yüksek noktaya ulaşma süresi *** saniyedir. <span style="color: #ff0008ff;">2</style>' },
            { text: 'Topun maksimum yüksekliği *** metredir. <span style="color: #ff0008ff;">23</style>' }
        ],
        tipi: "bd",
        puan: 10,
        dogrular: ['2', '23'],
        secimler: ['4', '28'],
        aciklama: [
            ['MAKSİMUM YÜKSEKLİK', '\\(h(t) = -5t^2 + 20t + 3\\) fonksiyonunun tepe noktasının apsisi \\( t=\\frac{-b}{2a}=\\frac{-20}{-10}=2 saniye \\) olur.'],
            ['MAKSİMUM YÜKSEKLİK', '\\(h(t) = -5t^2 + 20t + 3\\) fonksiyonunun tepe noktasının apsisi <br>t=\\( \\frac{-b}{2a}=\\frac{-20}{-10}=2 \\) saniye olur. Bu değer fonksiyonda t yerine yazıldığında<br>t=2 için \\(h(2) = -5.2^2 + 20.2 + 3\\)<br>\\( h(2)=23\\;metre\\) elde edilir.'],
        ]
    },
    {
        soru: 'Bir pastanede bir dilim pasta 60 TL’ye satılmaktadır. Günlük satılan pasta sayısı x’tir. Buna göre günlük geliri veren fonksiyon aşağıdakilerden hangisidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '\\(f(x)=60+x\\)', correct: false },
            { text: '\\(f(x)=60x\\) <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '\\(f(x)=\\frac{x}{60}\\)', correct: false },
            { text: '\\(f(x)=60-2x\\)', correct: false },
            { text: '\\(f(x)=60x+30\\)', correct: false },
        ],
        aciklama: ['PASTANE', 'Gelir = Fiyat . Adet = 60x olur.']
    },
    {
        soru: 'Bir parkın kenarı x metre olan kare şeklindedir. Üç köşesinden 10 m kenarlı kare çıkarılıyor. Kalan alan 789 m² ise x kaçtır?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '31', correct: false },
            { text: '32', correct: false },
            { text: '33 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '34', correct: false },
            { text: '35', correct: false },
        ],
        aciklama: ['PARK', 'x² -3. 100 = 789<br>x² = 1089<br>x =33 olur.']
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
        soru.innerHTML = "<p style='color:red; font-size:30px; text-align:center;'>TEBRİKLER!</p><p style='color:red; font-size:25px; text-align:center;'>Yeni konuya geçebilirsiniz.</p>"
    } else {
        kaldiSound.play()
        soru.innerHTML = "<p style='color:red; font-size:25px; text-align:center;'>Soruların çözümlerini araştırarak tekrar deneyiniz</p>"
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