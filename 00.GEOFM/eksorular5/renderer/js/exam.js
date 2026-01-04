const sorularSirali_T = [
    {
        soru: "Bir ürünün talep fonksiyonu Q = 120 - 2P ve arz fonksiyonu Q = -20 + 3P olarak verilmiştir. Bu piyasadaki denge fiyatı (P) kaç TL'dir?",
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: '20', correct: false },
            { text: '24', correct: false },
            { text: '28 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '32', correct: false },
            { text: '40', correct: false }
        ],
        aciklama: ['TALEP FONKSİYONU', '120 - 2P = -20 + 3P => 140 = 5P => P = 28 TL’dir.']
    },
    {
        soru: "Bir firmanın toplam maliyet fonksiyonu C = 5x + 1000 ve her bir ürünün satış fiyatı 15 TL'dir. Bu firmanın 'Başa baş noktası'na (kârın sıfır olduğu üretim miktarı) ulaşması için kaç adet ürün satması gerekir?",
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: '50', correct: false },
            { text: '100 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '150', correct: false },
            { text: '200', correct: false },
            { text: '250', correct: false }
        ],
        aciklama: ['TOPLAM MALİYET FONKSİYONU', '15x = 5x + 1000 => 10x = 1000 => x = 100 adet.']
    },
    {
        soru: 'Arz fonksiyonunun grafiği üzerinde (10, 50) ve (20, 80) noktaları bulunmaktadır (Burada koordinatlar (fiyat, miktar) şeklindedir). Bu ürünün doğrusal arz fonksiyonu aşağıdakilerden hangisidir?',
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: 'Q = 3P + 20 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Q = 2P + 30', correct: false },
            { text: 'Q = 3P - 20', correct: false },
            { text: 'Q = 5P + 10', correct: false },
            { text: 'Q = 3P + 10', correct: false }
        ],
        aciklama: ['ARZ FONKSİYONU', 'Eğim (m) = (80-50)/(20-10) = 3. Denklem: Q - 50 = 3(P - 10) => Q = 3P + 20']
    },
    {
        soru: "Bir ürünün birim satış fiyatı 40 TL'dir. Sabit maliyetleri 2400 TL olan bir işletme, 200 adet ürün sattığında 1600 TL kâr elde etmektedir. Bu işletmenin birim değişken maliyeti kaç TL'dir?",
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: '10', correct: false },
            { text: '15', correct: false },
            { text: '20 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '25', correct: false },
            { text: '30', correct: false }
        ],
        aciklama: ['BİRİM SATIŞ FİYATI', 'Kâr = Gelir - Maliyet. 1600 = (40 * 200) - (v * 200 + 2400). 1600 = 8000 - 200v – 2400 200v = 4000 => v = 20 TL’dir.']
    },
    {
        soru: "Talep doğrusunun eğimi -4 ve piyasa fiyatı 10 TL iken talep edilen miktar 60 birimdir. Bu ürünün fiyatı 12 TL'ye çıkarsa talep edilen yeni miktar kaç birim olur?",
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: '52 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '54', correct: false },
            { text: '56', correct: false },
            { text: '58', correct: false },
            { text: '60', correct: false }
        ],
        aciklama: ['TALEP DOĞRUSUNUN EĞİMİ', 'm = -4  Değişim: (12-10) * (-4) = -8   Yeni miktar: 60 - 8 = 52 olur.']
    },
    {
        soru: 'R = 50x (Gelir) ve C = 30x + 2000 (maliyet) fonksiyonlarına sahip bir işletme, 250 adet üretim yaptığında elde edeceği toplam kâr kaç TL olur?',
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: '1000', correct: false },
            { text: '2000', correct: false },
            { text: '3000 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '4000', correct: false },
            { text: '5000', correct: false }
        ],
        aciklama: ['GELİR - GİDER', 'Kâr = (50 * 250) - (30 * 250 + 2000) = 12500 - 9500 = 3000 TL olur.']
    },
    {
        soru: "Arz fonksiyonu Q = 4P - 40 olan bir üründe üreticinin piyasaya ürün sunmaya başladığı 'Eşik Fiyat' (miktarın sıfır olduğu fiyat) kaç TL'dir?",
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: '0', correct: false },
            { text: '5', correct: false },
            { text: '10 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '15', correct: false },
            { text: '20', correct: false }
        ],
        aciklama: ['EŞİK FİYAT', 'Q = 0 için 0 = 4P - 40 => P = 10 TL’dir.']
    },
    {
        soru: "Bir piyasada denge fiyatı 15 TL'dir. Eğer hükûmet bu ürün için 20 TL 'taban fiyat' belirlerse piyasada nasıl bir durum oluşur?",
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: 'Arz fazlası oluşur <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Talep fazlası oluşur', correct: false },
            { text: 'Piyasa dengede kalır', correct: false },
            { text: "Fiyatlar 10 TL'ye düşer", correct: false },
            { text: 'Satışlar durur', correct: false }
        ],
        aciklama: ['DENGE', 'Fiyat denge üzerindeyse üretici çok satmak ister, tüketici ise az almak ister. Bu nedenle doğru cevap <b>Arz fazlası oluşur</b> olmalıdır.']
    },
    {
        soru: 'Birim değişken maliyeti 8 TL, satış fiyatı 12 TL ve sabit maliyetleri 4000 TL olan bir firmanın 2000 TL kâr edebilmesi için kaç adet üretim yapması gerekir?',
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: '500', correct: false },
            { text: '1000', correct: false },
            { text: '1500 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '2000', correct: false },
            { text: '2500', correct: false }
        ],
        aciklama: ['MALİYETLER', '(12 - 8)x - 4000 = 2000 => 4x = 6000 => x = 1500 adet.']
    },
    {
        soru: 'Toplam gelir fonksiyonunun eğimi aşağıdakilerden hangisini temsil eder?',
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: 'Sabit maliyet', correct: false },
            { text: 'Birim satış fiyatı <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Toplam kâr', correct: false },
            { text: 'Birim değişken maliyet', correct: false },
            { text: 'Toplam arz', correct: false }
        ],
        aciklama: ['TOPLAM GELİR FONKSİYONU', 'TR = P * x fonksiyonunda türev veya eğim birim fiyat (P) değeridir.']
    },
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
        let secimler = aktifSoru.secimler.slice()
        aktifSoru.dogrular.forEach(d => {
            secimler.push(d)
        })

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
        //arrayKaristir(aktifSoru.secenekler).forEach(secenek => {
        aktifSoru.secenekler.forEach(secenek => {
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