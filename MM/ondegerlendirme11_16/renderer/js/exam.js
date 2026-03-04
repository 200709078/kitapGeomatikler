const sorularSirali_T = [
    {
        yonerge: 'Bir cam parçası, içinden geçen ışığın %2’sini soğurmaktadır. Art arda dizilmiş x adet cam parçasından geçen ışığın yüzdesini gösteren fonksiyon f olduğuna göre aşağıdaki boşlukları doldurunuz.</b>',
        sorular: [
            { text: "f fonksiyonunun kuralı ***'dır. <span style='color: #ff0008ff;'>f(x)=(0,98)<sup>x</sup></style>" },
            { text: "10 adet cam parçası ışığın yaklaşık olarak ***'sini geçirir. <span style='color: #ff0008ff;'>%82</style>" },
        ],
        tipi: "es",
        puan: 6,
        dogrular: ['f(x)=(0,98)<sup>x</sup>', '%82'],
        secimler: ['f(x)=(0,02)<sup>x</sup>', '%18'],
        aciklama: [
            ['ÜSTEL FONKSİYONLAR', 'Bu nedenle doğru cevap...']
        ]
    },
    {
        soru: 'Aşağıdakilerden hangileri artan fonksiyondur?<br><b>I.</b> f:ℝ&#8594;ℝ<sup>+</sup>, f(x)=4<sup>-2x</sup><br><b>II.</b> g:ℝ&#8594;ℝ<sup>+</sup>, g(x)=(2/3)<sup>x-4</sup><br><b>III.</b> h:ℝ&#8594;ℝ<sup>+</sup>, h(x)=(5/2)<sup>3x</sup><br><b>IV.</b> m:ℝ&#8594;ℝ<sup>+</sup>, m(x)=(3<sup>x+2</sup>)/(27<sup>1-x</sup>)<br><b>V.</b> n:ℝ&#8594;ℝ<sup>+</sup>, n(x)=(0,01)<sup>1-x</sup>',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: 'III ve IV <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'II, III ve IV', correct: false },
            { text: 'Hepsi', correct: false },
            { text: 'Yalnız I', correct: false },
            { text: 'II ve IV', correct: false },
        ],
        aciklama: ['ÜSTEL FONKSİYONLAR', 'Bu nedenle doğru cevap...']
    },
    {
        yonerge: 'f(x) = 3<sup>2-x</sup> kuralı ile verilen f fonksiyonuna göre aşağıdaki boşlukları doldurunuz.',
        sorular: [
            { text: "f fonksiyonunun tanım kümesi ***'dır. <span style='color: #ff0008ff;'>ℝ</style>" },
            { text: "f fonksiyonunun değer kümesi ***'dır. <span style='color: #ff0008ff;'>(0, ∞)</style>" },
            { text: "f fonksiyonunun grafiğinin y eksenini kestiği nokta *** noktasıdır. <span style='color: #ff0008ff;'>(0, 9)</style>" },
        ],
        tipi: "bd",
        puan: 6,
        dogrular: ['ℝ', '(0, ∞)', '(0, 9)'],
        secimler: ['ℕ', '(-∞,0)', '(-9, 0)'],
        aciklama: [
            ['ÜSTEL FONKSİYONLAR', 'Bu nedenle doğru cevap...']
        ]
    },
    {
        soru: 'f(x)=2<sup>x</sup> olmak üzere f(x+3)-f(x+2)=16 eşitliğini sağlayan x değerini bulunuz.',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '1', correct: false },
            { text: '2 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '3', correct: false },
            { text: '4', correct: false },
            { text: '5', correct: false },
        ],
        aciklama: ['ÜSTEL FONKSİYONLAR', 'Bu nedenle doğru cevap...']
    },
    {
        yonerge: 'Aşağıdaki tabloya f(x)=2<sup>x</sup> ve g(x)=(1/2)<sup>x</sup> şeklinde tanımlı fonksiyonların verilen özellikleri sağlayıp sağlamadığını işaretleyiniz.',
        sorular: [
            { text: '<p><table class="my-table" border="1"><tr><td width="80">Özellik</td><td>Bire Bir</td><td>Örten</td><td>Artan</td><td>Azalan</td><td>Pozitif Değerli</td><td>Negatif Değerli</td></tr><tr><td>f(x)=2<sup>x</sup></td><td>***</td><td>***</td><td>***</td><td>***</td><td>***</td><td>***</td></tr><tr><td>g(x)=(1/2)<sup>x</sup></td><td>***</td><td>***</td><td>***</td><td>***</td><td>***</td><td>***</td></tr></table></p>' }
        ],
        tipi: "es",
        puan: 12,
        dogrular: ['✓', 'X', '✓', 'X', '✓', 'X', '✓', 'X', 'X', '✓', '✓', 'X'],
        secimler: ['✓', 'X'],
        aciklama: [
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-1'],
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-2'],
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-3'],
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-4'],
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-5'],
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-6'],
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-7'],
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-8'],
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-9'],
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-10'],
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-11'],
            ['ÜSTEL FONKSİYONLAR', 'Açıklama-12'],
        ]
    },
    {
        soru: 'Aşağıdaki fonksiyonlardan hangileri üstel fonksiyondur?<br><b>I.</b> f:ℝ&#8594;ℝ<sup>+</sup>, f(x)=3<sup>x+1</sup><br><b>II.</b> g:ℝ&#8594;ℝ<sup>+</sup>, g(x)=1<sup>x</sup><br><b>III.</b> h:ℤ&#8594;ℝ<sup>+</sup>, h(x)=5<sup>2x</sup><br><b>IV.</b> k:ℝ&#8594;ℝ<sup>+</sup>, k(x)=1/2<sup>2-x</sup><br><b>V.</b> r:ℝ&#8594;ℝ<sup>+</sup>, r(x)=3<sup>-2x</sup><br><b>VI.</b> m:ℝ&#8594;ℝ<sup>+</sup>, m(x)=(0,01)<sup>x</sup>',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: 'I, III, IV, V ve VI <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'III ve IV', correct: false },
            { text: 'Hepsi', correct: false },
            { text: 'Yalnız III', correct: false },
            { text: 'II, III ve IV', correct: false },
        ],
        aciklama: ['ÜSTEL FONKSİYONLAR', 'Bu nedenle doğru cevap...']
    },
    {
        yonerge: 'Aşağıda çubuklar kullanılarak oluşturulan bir örüntünün ilk 4 adımı verilmiştir.<br><img src="img/cubuklar.png"><br><b>Buna göre aşağıda verilen boşlukları doldurunuz.</b>',
        sorular: [
            { text: 'Örüntünün 6. adımında *** adet çubuk kullanılmıştır. <span style="color: #ff0008ff;">19</style>' },
            { text: 'Adım sayısı n olmak üzere örüntünün n. adımında kullanılan çubuk sayısı *** kuralı ile bulunur. <span style="color: #ff0008ff;">3n+1</style>' },
        ],
        tipi: "bd",
        puan: 6,
        dogrular: ['19', '3n+1'],
        secimler: ['22', '2n+2', '25', '3n-2'],
        aciklama: [
            ['ÇUBUKLAR', 'Her adımda kullanılan çubuk sayısı, adım sayısının 3 katından 1 fazladır. Bu nedenle örüntünün 6. adımında 3.6+1=19 adet çubuk kullanılması gerekir.'],
            ['ÇUBUKLAR', 'Ardışık adımlarda kullanılan çubuk sayıları arasındaki fark 3 olduğu için kural içerisinde 3n terimi olmalıdır. Örüntünün 1. adımında 4 adet çubuk kullanıldığı için kuralda n yerine 1 yazıldığında 4 elde edilmelidir. Bu nedenle kural 3n+1 olması gerekir.']
        ]
    },
    {
        yonerge: '(3, 9, 27, ...) şeklinde verilen örüntüye göre aşağıdaki verilen boşlukları doldurunuz.',
        sorular: [
            { text: 'Örüntünün 5. elemanına karşılık gelen sayıdır. &#8594 *** <span style="color: #ff0008ff;">343</style>' },
            { text: 'Eleman sayısı n olmak üzere örüntünün n. elemanını veren kuraldır. &#8594 *** <span style="color: #ff0008ff;">3<sup>n</sup></style>' },
        ],
        tipi: "es",
        puan: 10,
        dogrular: ['343', '3<sup>n</sup>'],
        secimler: ['81', '3n', '125', '2<sup>n</sup>'],
        aciklama: [
            ['ÖRÜNTÜ', 'Her adım 3 ün kuvveti olduğundan 5. adımda 3<sup>5</sup>=343 olması gerekir.'],
            ['ÖRÜNTÜ', 'Ardışık terimlerden büyük olanın küçük olana oranı daima 3 olduğundan örüntünün n. elemanı 3<sup>n</sup> kuralı ile bulunur.']
        ]
    },
    {
        soru: 'Aşağıda verilen grafiklerden hangisi üstel fonksiyon grafiğidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '<br><img src="img/ga.png" style="width:200px">', correct: false },
            { text: '<br><img src="img/gb.png" style="width:200px"><span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '<br><img src="img/gc.png" style="width:200px">', correct: false },
            { text: '<br><img src="img/gd.png" style="width:200px">', correct: false },
            { text: '<br><img src="img/ge.png" style="width:200px">', correct: false },
        ],
        aciklama: ['ÜSTEL FONKSİYONLAR', 'Bu nedenle doğru cevap...']
    },
    {
        soru: 'Aşağıdaki grafiklerden hangisi f(x)=2<sup>x</sup> kuralı ile verilen üstel fonksiyonun grafiğidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '<br><img src="img/gaa.png" style="width:200px">', correct: false },
            { text: '<br><img src="img/gbb.png" style="width:200px"><span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '<br><img src="img/gcc.png" style="width:200px">', correct: false },
            { text: '<br><img src="img/gdd.png" style="width:200px">', correct: false },
            { text: '<br><img src="img/gee.png" style="width:200px">', correct: false },
        ],
        aciklama: ['ÜSTEL FONKSİYONLAR', 'Bu nedenle doğru cevap...']
    },
    {
        soru: 'Aşağıdaki grafiklerden hangisi f(x)=1/2<sup>x</sup> kuralı ile verilen üstel fonksiyonun grafiğidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: '<br><img src="img/gaa.png" style="width:200px">', correct: false },
            { text: '<br><img src="img/gbb.png" style="width:200px">', correct: false },
            { text: '<br><img src="img/gcc.png" style="width:200px"><span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '<br><img src="img/gdd.png" style="width:200px">', correct: false },
            { text: '<br><img src="img/gee.png" style="width:200px">', correct: false },
        ],
        aciklama: ['ÜSTEL FONKSİYONLAR', 'Bu nedenle doğru cevap...']
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
    MathJax.typesetPromise();
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
    console.log(bSay)
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