const sorularSirali_T = [
    {
        soru: 'Bir su deposu modeli V(t) = (a − bt) / (t + c) şeklindedir. Bu model için aşağıdakilerden hangisi kesinlikle doğrudur?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: 'Depo her zaman doludur.', correct: false },
            { text: 'Depo asla boşalmaz.', correct: false },
            { text: 'Depo payın sıfır olduğu anda boşalır. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Depo yalnızca t = 0 anında boşalır.', correct: false },
            { text: 'Su miktarı artan bir fonksiyondur.', correct: false }
        ],
        aciklama: ['SU DEPOSU', 'V(t)=0 → a−bt=0 → Pay sıfır']
    },
    {
        soru: 'Bir rasyonel fonksiyonun tanım kümesi belirlenirken aşağıdakilerden hangisine dikkat edilir?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: 'Payın sıfır olmamasına', correct: false },
            { text: 'Katsayıların işaretine', correct: false },
            { text: 'Paydanın sıfır olmamasına <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Fonksiyonun derecesine', correct: false },
            { text: 'Grafiğin simetrisine', correct: false }
        ],
        aciklama: ['RASYONEL FONKSİYONLAR', 'Tanımsızlık paydada olur.']
    },
    {
        soru: 'Bir depoda dolum hızı f(t) = t², tahliye hızı g(t) = 4t ise hızların eşit olduğu zaman kaçtır?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '4 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false }
        ],
        aciklama: ['DEPO', 't² = 4t → t = 4']
    },
    {
        soru: 'G(t) = −t² + 4t + 6 fonksiyonu ile modellenen glikoz seviyesi en yüksek değerine kaçıncı saatte ulaşır?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: '1', correct: false },
            { text: '2 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '3', correct: false },
            { text: '4', correct: false },
            { text: '5', correct: false }
        ],
        aciklama: ['GLİKOZ SEVİYESİ', 't = −b / 2a = −4 / (2 · −1) = 2']
    },
    {
        soru: 'Bir işletmenin kâr fonksiyonu K(x) = −2x² + 16x − 20 şeklindedir. Kârın maksimum olduğu üretim miktarı kaçtır?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: '2', correct: false },
            { text: '4 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '6', correct: false },
            { text: '8', correct: false },
            { text: '10', correct: false }
        ],
        aciklama: ['TEPE NOKTASI', ' x = −b / 2a = −16 / (2 · −2) = 4']
    },
    {
        soru: 'Gerçek sayılarda tanımlı f(x) = −(x + 1)² ve g(x) = (x − 4)² polinom fonksiyonları veriliyor. Buna göre f ve g fonksiyonlarının görüntü kümeleri aşağıdakilerden hangisidir?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: 'f(x): ℝ , g(x): ℝ', correct: false },
            { text: 'f(x): (−∞, 0] , g(x): [0, ∞) <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'f(x): [0, ∞) , g(x): (−∞, 0]', correct: false },
            { text: 'f(x): (−∞, −1] , g(x): [4, ∞)', correct: false },
            { text: 'f(x): ℝ⁺ , g(x): ℝ⁻', correct: false }
        ],
        aciklama: ['GÖRÜNTÜ KÜMELERİ', 'Bu nedenle doğru cevap "f(x): (−∞, 0] , g(x): [0, ∞)" dir.']
    },
    {
        soru: 'Başkatsayısı sabit olan dördüncü dereceden bir P(x) polinomu için P(a)=m ve P(a+2)=n olduğu biliniyor.<br>Aşağıdakilerden hangisi kesinlikle doğrudur?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: 'P(a−2)+P(a+4)=m+n', correct: false },
            { text: 'P(a−1)=P(a+3)', correct: false },
            { text: 'P(a−2)+P(a+4)=P(a)+P(a+2) <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'P(a)=P(a+4)', correct: false },
            { text: 'P(a+1)=P(a+3)', correct: false }
        ],
        aciklama: ['POLİNOMLAR', 'Simetriye göre orta nokta a+1’dir.<br>Eşit uzaklıktaki noktaların toplamı eşittir.']
    },
    {
        soru: 'a,b ∈ ℤ olmak üzere<br>P(x)=x³+ax²+bx+2 polinomunun yalnız bir gerçek kökü vardır.<br>P(−1)=0 olduğuna göre a+b kaçtır?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: '-3', correct: false },
            { text: '-2', correct: false },
            { text: '-1', correct: false },
            { text: '0', correct: false },
            { text: '1 <span style="color: #ff0008ff;">*</style>', correct: true }
        ],
        aciklama: ['TEK KATLI KÖK', 'P(−1)=−1+a−b+2=0 ⇒ a−b=−1<br>Tek kök için ikinci derecenin ayırt edicisi <0 sağlanır.<br>Uygun çözüm a=0, b=1 ⇒ a+b=1']
    },
    {
        soru: 'Başkatsayısı 5 olan üçüncü dereceden P(x) polinomu için P(2) = P(4) olduğu bilinmektedir.<br>Buna göre aşağıdakilerden hangisi P(3) olabilir?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: '-10', correct: false },
            { text: '-5', correct: false },
            { text: '0', correct: false },
            { text: '5 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '10', correct: false }
        ],
        aciklama: ['POLİNOMLAR', 'P(x)−P(2)=5(x−2)(x−4)(x−a)<br>P(3)−P(2)=5(1)(−1)(3−a)=−5(3−a)<br>Uygun seçeneklerden biri: 5']
    },
    {
        soru: 'Başkatsayısı 1 olan üçüncü dereceden P(x) ve Q(x) polinomları için P(x) + Q(x) = 2x³ + 4<br>P(x) polinomunun kökleri 1, 2 ve 3 olduğuna göre Q(0) kaçtır?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: '2', correct: false },
            { text: '4', correct: false },
            { text: '6', correct: false },
            { text: '8', correct: false },
            { text: '10 <span style="color: #ff0008ff;">*</style>', correct: true }
        ],
        aciklama: ['POLİNOMLAR', 'P(0) = (−1)(−2)(−3) = −6<br>P(0) + Q(0) = 4<br>−6 + Q(0) = 4 ⇒ Q(0)=10']
    },
    {
        soru: 'P(x) = Q(x + 3) biçiminde verilen iki polinom için aşağıdakilerden hangisi doğrudur?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: 'Sabit terimleri eşittir.', correct: false },
            { text: 'P(x) ve Q(x) aynı polinomdur.', correct: false },
            { text: 'P(x) grafiği, Q(x) grafiğinin 3 birim sola ötelenmiş hâlidir. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'D) P(x) grafiği, Q(x) grafiğinin 3 birim sağa ötelenmiş hâlidir.', correct: false },
            { text: 'P(x) doğrusal polinomdur.', correct: false }
        ],
        aciklama: ['', 'Q(x+3) olduğuna göre grafik 3 birim sola ötelenmelidir.']
    },
    {
        soru: 'P(x)=x²−1 ve R(x)=P(P(x)) veriliyor.<br>Aşağıdakilerden hangisi R(x) polinomunun bir köküdür?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: '-2', correct: false },
            { text: '-1', correct: false },
            { text: '0 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '1', correct: false },
            { text: '2', correct: false }
        ],
        aciklama: ['POLİNOMLAR', 'R(x)=0 ⇒ P(x)=±1<br>x²−1=1 ⇒ x=±√2 (yok)<br>x²−1=−1 ⇒ x=0']
    },
    {
        soru: 'Başkatsayısı 1 olan ikinci dereceden P(x) polinomunun kökleri P(a) ve P(b) (a≠b) biçimindedir. <br>Aşağıdakilerden hangisi her zaman doğrudur?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: 'a+b = 0', correct: false },
            { text: 'P(a)+P(b)=0', correct: false },
            { text: 'P(x)=(x−P(a)(x−P(b)) <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'P(0)=0', correct: false },
            { text: 'Kökler eşittir.', correct: false }
        ],
        aciklama: ['', 'Kökler biliniyorsa polinom bu şekilde yazılır.']
    },
    {
        soru: 'Gerçek katsayılı dördüncü dereceden bir polinom için P(x) ≥ 0 her x ∈ ℝ ise aşağıdakilerden hangisi kesinlikle doğrudur?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: 'Çift fonksiyondur', correct: false },
            { text: 'En az bir reel kökü vardır.', correct: false },
            { text: 'Tam kare biçiminde yazılabilir. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Tüm katsayıları pozitiftir.', correct: false },
            { text: 'Sabit terimi sıfırdır.', correct: false }
        ],
        aciklama: ['POLİNOMLAR', 'Her yerde ≥0 olan 4. derece polinom → tam kare']
    },
    {
        soru: 'Gerçek katsayılı, başkatsayısı 1 olan 4. dereceden bir polinomun P(x)=P(−x) koşulunu sağlaması aşağıdakilerden hangisini zorunlu kılar?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: 'Tek fonksiyon olmasını', correct: false },
            { text: 'Sabit terimin sıfır olmasını', correct: false },
            { text: 'Yalnızca çift dereceli terimler içermesini <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Köklerinin simetrik olmasını', correct: false },
            { text: 'Grafiğinin x eksenine göre simetrik olmasını', correct: false }
        ],
        aciklama: ['POLİNOMLAR', 'P(x)=P(−x) → Çift fonksiyon → yalnızca çift dereceli terimler']
    },
    {
        soru: 'Başkatsayısı 1 olan üçüncü dereceden bir polinomun P(a) = P(b) = P(c) = P(d) (a, b, c, d farklı) olması aşağıdakilerden hangisini gösterir?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: 'Sabit polinomdur.', correct: false },
            { text: 'Doğrusal polinom olabilir.', correct: false },
            { text: 'İkinci derecedendir.', correct: false },
            { text: 'Böyle bir polinom yoktur. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Polinom çift fonksiyondur.', correct: false }
        ],
        aciklama: ['POLİNOMLAR', 'Üçüncü dereceden bir polinom en fazla 3 farklı noktada aynı değeri alabilir. 4 farklı noktada eşitlik mümkün değildir.']
    },
    {
        soru: '3)T(x) = (x + a)² + (x − a)³ polinomunda x’li terimin katsayısı 5 ise a kaçtır?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: '1 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '4', correct: false },
            { text: '5', correct: false }
        ],
        aciklama: ['', '(x + a)² → x’li terim: 2ax<br>(x − a)³ → x’li terim: 3a²x<br>Toplam katsayı: 2a + 3a² = 5<br>3a² + 2a − 5 = 0 → a = 1']
    },
    {
        soru: 'R(x) = 3(x − 2)³ − (x + 1)² polinomunda sabit terim kaçtır?',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: '−25 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '−21', correct: false },
            { text: '−19', correct: false },
            { text: '−17', correct: false },
            { text: '−15', correct: false }
        ],
        aciklama: ['POLİNOMLAR', '(x − 2)³ sabit terim: (−2)³ = −8 → 3·(−8)=−24<br>(x + 1)² sabit terim: 1<br>Toplam: -24-1 = -25']
    },
    {
        soru: 'P(x) bir polinom olmak üzere kökleri −1 ve 2’dir. R(x) = P(P(x)) tanımlanıyor.',
        tipi: 'cs',
        puan: 4,
        secenekler: [
            { text: '-1', correct: false },
            { text: '0 <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: '1', correct: false },
            { text: '2', correct: false },
            { text: '3', correct: false }
        ],
        aciklama: ['POLİNOMLAR', 'P(P(x))=0 → P(x)=−1 veya 2<br>Uygun seçenek: 0']
    },
    {
        yonerge: 'Aşağıda verilen boşlukları doldurunuz.',
        sorular: [
            { text: 'f(x)=(x−2)² polinom fonksiyonunun görüntü kümesi ***’dır. <span style="color: #ff0008ff;">ℝ</style>' },
            { text: 'g(x)=−(x+1)³ polinom fonksiyonunun görüntü kümesi ***’dır. <span style="color: #ff0008ff;">[0, ∞)</style>' },
            { text: 'h(x)=(x−3)(x+1) polinom fonksiyonunun sıfırlarının oluşturduğu küme ***’dır. <span style="color: #ff0008ff;">{-1, 3}</style>' }
        ],
        tipi: "bd",
        puan: 12,
        dogrular: ['ℝ', '[0, ∞)', '{-1, 3}'],
        secimler: ['ℕ', '(-∞, 0]', '{-3, 1}'],
        aciklama: [
            ['GÖRÜNTÜ KÜMESİ', 'Çözüm: Bu nedenle doğru cevap <b>ℝ</b> olması gerekir.'],
            ['GÖRÜNTÜ KÜMESİ', 'Çözüm: Bu nedenle doğru cevap <b>[0, ∞)</b> olması gerekir.'],
            ['SIFIRLAR', 'Çözüm: Bu nedenle doğru cevap <b>{-1, 3}</b> olması gerekir.'],
        ]
    },
    {
        yonerge: 'Aşağıda verilen boşlukları doldurunuz.',
        sorular: [
            { text: 'f(x)=−(x−4)² polinom fonksiyonunun görüntü kümesi ***’dır. <span style="color: #ff0008ff;">(−∞, 0] </style>' },
            { text: 'g(x)=(x+2)³ polinom fonksiyonunun görüntü kümesi ***’dır. <span style="color: #ff0008ff;">ℝ</style>' },
            { text: 'h(x)=(x−1)(x+5) polinom fonksiyonunun sıfırlarının oluşturduğu küme ***’dır. <span style="color: #ff0008ff;">{-5, 1}</style>' }
        ],
        tipi: "bd",
        puan: 12,
        dogrular: ['(−∞, 0]', 'ℝ', '{-5, 1}'],
        secimler: ['ℕ', '[0, ∞)', '{-1, 5}'],
        aciklama: [
            ['GÖRÜNTÜ KÜMESİ', 'Çözüm: Bu nedenle doğru cevap <b>(−∞, 0]</b> olması gerekir.'],
            ['GÖRÜNTÜ KÜMESİ', 'Çözüm: Bu nedenle doğru cevap <b>ℝ</b> olması gerekir.'],
            ['SIFIRLAR', 'Çözüm: Bu nedenle doğru cevap <b>{-5, 1}</b> olması gerekir.'],
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