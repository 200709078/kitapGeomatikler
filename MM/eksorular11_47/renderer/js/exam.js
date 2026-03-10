const sorularSirali_T = [
    {
        soru: '<p style="text-align:center"><img src="img/fan.png" style="width:350px"></p>Grafiği verilen f fonksiyonu ve \\( (a_n) \\) dizisine göre aşağıdakilerden hangisi doğrudur?',
        tipi: 'cs',
        puan: 6,
        secenekler: [
            { text: 'Her yerde artandır.', correct: false },
            { text: '\\( (a_n) \\) azalan dizidir.', correct: false },
            { text: 'f fonksiyonunun artan olduğu aralıkta \\( (a_n) \\) artandır.', correct: false },
            { text: '\\( (a_n) \\) sabit dizidir.', correct: false },
            { text: 'f(aₙ₊₁) < f(aₙ) <span style="color: #ff0008ff;">*</style>', correct: true }
        ],
        aciklama: ['DİZİLER', 'Çözüm: Bu nedenle doğru cevap <b>f(aₙ₊₁) < f(aₙ)</b> dir.']
    },
    {
        soru: '\\( f(n)=\\left(\\frac{3}{2}\\right)^n \\) için aşağıdakilerden hangisi doğrudur?',
        tipi: 'cs',
        puan: 6,
        secenekler: [
            { text: 'Aritmetik dizidir.', correct: false },
            { text: 'Sabit artışlıdır.', correct: false },
            { text: 'Ardışık terimlerin oranı sabittir. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Azalan fonksiyondur.', correct: false },
            { text: 'Artan fonksiyondur.', correct: false }
        ],
        aciklama: ['DİZİLER', 'f bir geometrik dizi olduğundan ardışık terimlerinin oranı sabit olur. Bu nedenle doğru cevap "Ardışık terimlerin oranı sabittir." olmalıdır.']
    },
    {
        soru: 'İlk terimi pozitif olan bir aritmetik dizinin ilk 20 teriminin toplamı sıfırdır. Buna göre ortak fark için aşağıdakilerden hangisi doğrudur?',
        tipi: 'cs',
        puan: 6,
        secenekler: [
            { text: 'Pozitiftir.', correct: false },
            { text: 'Negatiftir. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Sıfırdır.', correct: false },
            { text: 'Belirlenemez.', correct: false },
            { text: 'Tanımsızdır.', correct: false }
        ],
        aciklama: ['ORTAK FARK', 'İlk terimi pozitif ve ilk 20 teriminin toplamının 0 olabilmesi için sonraki bazı terimleri negatif olmalıdır. Yani dizinin terimlerinin azalarak ilerlemesi gerekir. Bu nedenle doğru cevap "negatiftir." olmalıdır.']
    },
    {
        soru: 'İlk terimi 45 olan bir aritmetik dizide \\( a_6 + a_{12} = 390 \\) ise ortak fark kaçtır?',
        tipi: 'cs',
        puan: 6,
        secenekler: [
            { text: '10', correct: false },
            { text: '15 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '20', correct: false },
            { text: '25', correct: false },
            { text: '30', correct: false }
        ],
        aciklama: ['ORTAK FARK', "ÇÖZÜM: Bu nedenle doğru cevap 15'tir."]
    },
    {
        soru: '4 ile 1024 arasına bu sayılarla birlikte geometrik dizi oluşturacak şekilde m tane terim yerleştiriliyor. Buna göre m kaç farklı değer alır?',
        tipi: 'cs',
        puan: 6,
        secenekler: [
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '4 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false }
        ],
        aciklama: ['GEOMETRİK DİZİ', "1024/4=256=2⁸ → m+1 bölenleri: 1,2,4,8 → m=0,1,3,7 → 4 değer alır. Bu nedenle doğru cevap 4'tür."]
    },
    {
        soru: 'Bir aritmetik dizide a₂·a₃·a₄ = 20 ve a₃·a₄·a₅ = 60 olduğuna göre a₁·a₂·a₃ kaçtır?',
        tipi: 'cs',
        puan: 6,
        secenekler: [
            { text: '4', correct: false },
            { text: '6 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '8', correct: false },
            { text: '10', correct: false },
            { text: '12', correct: false }
        ],
        aciklama: ['ARİTMETİK DİZİ', "ÇÖZÜM: Bu nedenle doğru cevap 6'dır."]
    },
    {
        soru: 'x³ − 21x² + 146x − d = 0 denkleminin kökleri aritmetik dizi ve tam sayı ise d kaçtır?',
        tipi: 'cs',
        puan: 6,
        secenekler: [
            { text: '720', correct: false },
            { text: '840 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '960', correct: false },
            { text: '1008', correct: false },
            { text: '1200', correct: false }
        ],
        aciklama: ['ARİTMETİK DİZİ', "Ortak Kök = 21/3 = 7 → Kökler: 6,7,8<br>d = 6·7·8 = 336 → Katsayı Uyumu → 840 olur. Bu nedenle doğru cevap <b>840</b>'tır."]
    },
    {
        soru: 'Genel terimi aₙ = 1/(n(n+1)) olan dizinin ilk 10 teriminin toplamı kaçtır?',
        tipi: 'cs',
        puan: 6,
        secenekler: [
            { text: '9/10', correct: false },
            { text: '10/11 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '11/12', correct: false },
            { text: '1', correct: false },
            { text: '2', correct: false }
        ],
        aciklama: ['TERİMLER TOPLAMI', "aₙ = 1/n − 1/(n+1)<br>S₁₀ = 1 − 1/11 = 10/11 olur. Bu nedenle doğru cevap <b>10/11</b>'dir."]
    },
    {
        yonerge: 'Aşağıda verilen ifadeleri uygun kavramlarla eşleştiriniz.',
        sorular: [
            { text: 'x &lt; y iken f(x) &lt; f(y) &#8658; *** <span style="color: #ff0008ff;">Artan fonksiyon</style>' },
            { text: 'aₙ₊₁ &gt; aₙ &#8658; *** <span style="color: #ff0008ff;">Monoton artan dizi</style>' },
            { text: 'Noktasal Grafik &#8658; *** <span style="color: #ff0008ff;">Dizi grafiği</style>' }
        ],
        tipi: "es",
        puan: 6,
        dogrular: ['Artan fonksiyon', 'Monoton artan dizi', 'Dizi grafiği'],
        secimler: ['Azalan fonksiyon', 'Fonksiyon grafiği'],
        aciklama: [
            ['ARTAN FONKSİYON', 'Çözüm: Bu nedenle doğru cevap <b>Artan fonksiyon</b> olmalıdır.'],
            ['ARTAN DİZİ', 'Çözüm: Bu nedenle doğru cevap <b>Monoton artan dizi</b> olmalıdır.'],
            ['DİZİ GRAFİĞİ', 'Çözüm: Bu nedenle doğru cevap <b>Dizi grafiği</b> olmalıdır.'],
        ]
    },
    {
        soru: '"Bir fonksiyonun artan olduğu aralıkta tanımlanan bir dizinin terimleri de artmak zorundadır." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 4,
        secenekler: [
            { text: 'Doğrudur. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Yanlıştır.', correct: false },
        ],
        aciklama: ['ARTAN DİZİLER', 'Fonksiyon artan olduğundan f(aₙ₊₁) > f(aₙ) iken aₙ₊₁ > aₙ olacaktır. Bu nedenle doğru cevap <b>"Doğrudur."</b> olmalıdır.']
    },
    {
        soru: '"İki sayı arasına yerleştirilen terim sayısı, ortak farkın pozitif bölen sayısına bağlıdır." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 4,
        secenekler: [
            { text: 'Doğrudur. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Yanlıştır.', correct: false },
        ],
        aciklama: ['ORTAK FARK', 'Çözüm: Bu nedenle doğru cevap <b>"Doğrudur."</b> olmalıdır.']
    },
    {
        soru: "'İlk gün 12 soru çözülen ve her gün 4 soru artan bir çalışmada 15. günde çözülen soru sayısı 68'dir.' ifadesine göre seçim yapınız.",
        tipi: "dy",
        puan: 4,
        secenekler: [
            { text: 'Doğrudur. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Yanlıştır.', correct: false },
        ],
        aciklama: ['ARİTMETİK DİZİ', 'Çözüm: Bu nedenle doğru cevap <b>"Doğrudur."</b> olmalıdır.']
    },
    {
        soru: '"Bir aritmetik dizide aₙ − aₙ₋₁ = aₙ₊₁ − aₙ her n için sabittir." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 4,
        secenekler: [
            { text: 'Doğrudur. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Yanlıştır.', correct: false },
        ],
        aciklama: ['ARİTMETİK DİZİ', 'Çözüm: Bu nedenle doğru cevap <b>"Doğrudur."</b> olmalıdır.']
    },
    {
        soru: '"f(n)=2^n fonksiyonunda f(3) − f(2) = f(2) − f(1) dir." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 4,
        secenekler: [
            { text: 'Doğrudur.', correct: false },
            { text: 'Yanlıştır. <span style="color: #ff0008ff;">*</style>', correct: true },
        ],
        aciklama: ['DİZİLER', 'Çözüm: Bu nedenle doğru cevap <b>"Yanlıştır."</b> olmalıdır.']
    },
    {
        yonerge: 'Aşağıda verilen boşlukları doldurunuz.',
        sorular: [
            { text: 'Bir top her zıplayışta önceki yüksekliğinin r katına çıkıyorsa, ulaşılan maksimum yükseklikler *** dizi oluşturur. <span style="color: #ff0008ff;">geometrik</style>' },
            { text: 'Soru *** eklenecek. <span style="color: #ff0008ff;">ortak fark</style>' }
        ],
        tipi: "bd",
        puan: 10,
        dogrular: ['geometrik', 'ortak fark'],
        secimler: ['aritmetik', 'fonksiyon'],
        aciklama: [
            ['MAKSİMUM YÜKSEKLİK', 'Çözüm: Bu nedenle doğru cevap <b>geometrik dizi</b> olması gerekir.'],
            ['MAKSİMUM YÜKSEKLİK', 'Çözüm: Bu nedenle doğru cevap <b>ortak fark</b> olması gerekir.']
        ]
    },
    {
        yonerge: 'Aşağıda verilen boşlukları doldurunuz.',
        sorular: [
            { text: 'İlk gün 12 fidan dikilen ve her gün 4 fidan fazla dikilen bir çalışmada n. gün dikilen fidan sayısını veren genel terim *** şeklindedir. <span style="color: #ff0008ff;">aₙ = 12+4.(n−1)</style>' },
            { text: 'Soru *** eklenecek. <span style="color: #ff0008ff;">aₙ = 12-4n</style>' }
        ],
        tipi: "bd",
        puan: 4,
        dogrular: ['aₙ = 12+4.(n−1)', 'aₙ = 12-4n'],
        secimler: ['aₙ = 2+2(n−1)', 'aₙ = 4(n−1)'],
        aciklama: [
            ['GENEL TERİM', 'Çözüm: Bu nedenle doğru cevap <b>aₙ = 12+4.(n−1)</b> olmalıdır.'],
            ['GENEL TERİM', 'Çözüm: Bu nedenle doğru cevap <b>aₙ = 12-4n</b> olmalıdır.']
        ]
    },
    {
        yonerge: 'Aşağıda verilen boşlukları doldurunuz.</b>',
        sorular: [
            { text: 'Her adımda 3 katına çıkan bir bakteri sayısını gösteren fonksiyon *** şeklindedir. <span style="color: #ff0008ff;">f(n)=3^n</style>' },
            { text: 'Soru *** eklenecek. <span style="color: #ff0008ff;">f(n)=2^n-1</style>' }
        ],
        tipi: "bd",
        puan: 4,
        dogrular: ['f(n)=3^n', 'f(n)=2^n-1'],
        secimler: ['f(n)=3^n-1', 'f(n)=4^n'],
        aciklama: [
            ['GEOMETRİK DİZİ', 'Çözüm: Bu nedenle doğru cevap <b>f(n)=3^n</b> olmalıdır.'],
            ['GEOMETRİK DİZİ', 'Çözüm: Bu nedenle doğru cevap <b>f(n)=2^n-1</b> olmalıdır.']
        ]
    },
    {
        yonerge: 'Aşağıda verilen boşluklara uygun seçim yapınız.',
        sorular: [
            { text: 'Fonksiyonların grafiği *** yapıdadır. <span style="color: #ff0008ff;">sürekli</style>' },
            { text: 'Dizilerin grafiği *** yapıdadır. <span style="color: #ff0008ff;">noktasal</style>' },
            { text: 'Artanlıkta *** arttıkça *** de artar. <span style="color: #ff0008ff;">x,y</style>' }
        ],
        tipi: "es",
        puan: 8,
        dogrular: ['sürekli', 'noktasal', 'x', 'y'],
        secimler: ['artan', 'azalan'],
        aciklama: [
            ['FONKSİYONLARIN GRAFİĞİ', 'Fonksiyonların grafiği sürekli bir yapıdadır.'],
            ['DİZİLERİN GRAFİĞİ', 'Dizilerin tanım kümesi doğal sayılar olduğundan kesikli bir yapıdadır.'],
            ['ARTANLIK', 'Artanlıkta x arttıkça y de artar.'],
        ]
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
    MathJax.typesetPromise()
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