const sorularSirali_T = [
    {
        soru: 'Aşağıdakilerden hangisi kategorik veridir?',
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: 'Yaş', correct: false },
            { text: 'Gelir', correct: false },
            { text: 'Cinsiyet <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Boy', correct: false },
            { text: 'Rakım', correct: false }
        ],
        aciklama: ['KATEGORİK VERİ', 'Yaş, gelir, boy ve rakım sayısal veridir. Cinsiyet ise kategorik veridir. Bu nedenle doğru cevap <b>Cinsiyet</b> olmalıdır.']
    },
    {
        soru: 'Ortalama, hangi durumda yanıltıcı olabilir?',
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: 'Tüm veriler eşitse', correct: false },
            { text: 'Uç değerler varsa <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Veri azsa', correct: false },
            { text: 'Grafik varsa', correct: false },
            { text: 'Tepe değer yoksa', correct: false }
        ],
        aciklama: ['UÇ DEĞERLER', 'Ortalama, uç değerler varsa yanıltıcı olabilir. Bu nedenle doğru cevap <b>Uç değerler varsa</b> olmalıdır.']
    },
    {
        soru: 'Aşağıdakilerden hangisi nicel veridir?',
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: 'Göz rengi', correct: false },
            { text: 'Meslek', correct: false },
            { text: 'Boy uzunluğu <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Şehir', correct: false },
            { text: 'Cinsiyet', correct: false }
        ],
        aciklama: ['NICEL VERİ', 'Boy uzunluğu, sayısal bir veri olduğu için nicel veridir. Bu nedenle doğru cevap <b>Boy uzunluğu</b> olmalıdır.']
    },
    {
        soru: '"İki değişken arasında ilişki varsa mutlaka neden-sonuç vardır." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 15,
        secenekler: [
            { text: 'Doğrudur.', correct: false },
            { text: 'Yanlıştır. <span style="color: #ff0008ff;">*</style>', correct: true },
        ],
        aciklama: ['NEDEN-SONUÇ İLİŞKİSİ', 'İki değişken arasında ilişki varsa, bu ilişki neden-sonuç ilişkisi olmak zorunda değildir. Bu nedenle doğru cevap <b>"Yanlıştır."</b> olmalıdır.']
    },
    {
        soru: '"Serpme grafiği iki nicel değişken için kullanılır." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 15,
        secenekler: [
            { text: 'Doğrudur. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Yanlıştır.', correct: false },
        ],
        aciklama: ['SERPİLME GRAFİĞİ', 'Serpme grafiği, iki nicel değişken arasındaki ilişkiyi göstermek için kullanılır. Bu nedenle doğru cevap <b>"Doğrudur."</b> olmalıdır.']
    },
    {
        yonerge: 'Aşağıda verilen boşlukları doldurunuz.',
        sorular: [
            { text: 'Bir veri setindeki en büyük ve en küçük değer arasındaki farka *** denir. <span style="color: #ff0008ff;">açıklık</style>' },
            { text: 'Aynı nesneye ait iki değişkenin birlikte incelenmesine *** veri denir <span style="color: #ff0008ff;">iki değişkenli</style>' }
        ],
        tipi: "bd",
        puan: 20,
        dogrular: ['açıklık', 'iki değişkenli'],
        secimler: ['tepe değer', 'tek değişkenli', 'ortanca'],
        aciklama: [
            ['AÇIKLIK', 'Bir veri setindeki en büyük ve en küçük değer arasındaki farka <b>açıklık</b> denir. Bu nedenle doğru cevap <b>açıklık</b> olmalıdır.'],
            ['İKİ DEĞİŞKENLİ VERİ', 'Aynı nesneye ait iki değişkenin birlikte incelenmesine <b>iki değişkenli</b> veri denir. Bu nedenle doğru cevap <b>iki değişkenli</b> olmalıdır.']
        ]
    },
    {
        yonerge: 'Aşağıda verilen kavramları uygun açıklamalar ile eşleştiriniz.',
        sorular: [
            { text: 'Ortalama &#8658; *** <span style="color: #ff0008ff;">Tüm Değerlerin Toplamı / Sayı</style>' },
            { text: 'Medyan&#8658; *** <span style="color: #ff0008ff;">Ortadaki Değer</style>' },
            { text: 'Açıklık &#8658; *** <span style="color: #ff0008ff;">En Büyük Değer - En Küçük Değer</style>' },
            { text: 'Grafik &#8658; *** <span style="color: #ff0008ff;">Veri Görselleştirme</style>' }
        ],
        tipi: "es",
        puan: 20,
        dogrular: ['Tüm Değerlerin Toplamı / Sayı', 'Ortadaki Değer', 'En Büyük Değer - En Küçük Değer', 'Veri Görselleştirme'],
        secimler: ['Veri Analizi', 'Tepe Değer'],
        aciklama: [
            ['ORTALAMA', 'Bir veri setinin ortalaması, tüm değerlerin toplamının veri sayısına bölünmesiyle elde edilir. Bu nedenle doğru cevap <b>Tüm Değerlerin Toplamı / Sayı</b> olmalıdır.'],
            ['MEDYAN', 'Bir veri setinin medyanı, verilerin küçükten büyüğe sıralandıktan sonra ortadaki değeridir. Bu nedenle doğru cevap <b>Ortadaki Değer</b> olmalıdır.'],
            ['AÇIKLIK', 'Bir veri setinin açıklığı, en büyük ve en küçük değerleri arasındaki farktır. Bu nedenle doğru cevap <b>En Büyük Değer - En Küçük Değer</b> olmalıdır.'],
            ['GRAFİK', 'Bir veri setini görselleştirme araçları olarak grafikler kullanılır. Bu nedenle doğru cevap <b>Veri Görselleştirme</b> olmalıdır.'],
        ]
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