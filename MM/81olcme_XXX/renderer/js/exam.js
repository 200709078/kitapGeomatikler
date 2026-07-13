const sorularSirali_T = [
    {
        soru: 'Aşağıdaki araçlardan hangisi iki nicel değişken arasındaki ilişkiyi incelemek için en uygun görselleştirme aracıdır?',
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: 'Pasta grafiği', correct: false },
            { text: 'Çizgi grafiği', correct: false },
            { text: 'Sütun grafiği', correct: false },
            { text: 'Saçılım grafiği <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Kutu grafiği', correct: false }
        ],
        aciklama: ['VERİ GÖRSELLEŞTİRME', 'İki nicel değişken arasındaki ilişkiyi incelemek için en uygun görselleştirme aracı saçılım grafiğidir. Bu nedenle doğru cevap <b>Saçılım grafiği</b> olmalıdır.']
    },
    {
        soru: 'Aşağıdaki durumlardan hangisinde iki nicel değişken arasındaki ilişki araştırılmaktadır?',
        tipi: 'cs',
        puan: 10,
        secenekler: [
            { text: "Türkiye'de en fazla yağış alan bölge hangisidir?", correct: false },
            { text: 'Yıllara göre turist sayısı nasıl değişmiştir?', correct: false },
            { text: 'Elektrik tüketimi ile nüfus arasında ilişki var mıdır? <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Matematik sınavına giren iki sınıf arasında hangisi daha başarılıdır?', correct: false },
            { text: 'İllere göre nüfus yoğunlukları nasıl farklılık göstermektedir?', correct: false }
        ],
        aciklama: ['POLİNOMLAR', 'P(P(x))=0 → P(x)=−1 veya 2<br>Uygun seçenek: 0']
    },
    {
        soru: '"Aynı veri seti için yalnızca tek bir görselleştirme aracı kullanılabilir." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 5,
        secenekler: [
            { text: 'Doğrudur.', correct: false },
            { text: 'Yanlıştır. <span style="color: #ff0008ff;">*</style>', correct: true },
        ],
        aciklama: ['GÖRSELLEŞTİRME', 'Aynı veri seti için birden fazla görselleştirme aracı kullanılabilir. Bu nedenle doğru cevap <b>"Yanlıştır."</b> olmalıdır.']
    },
    {
        soru: '"Araştırma sonucunda ulaşılan çıkarımlar yalnızca kullanılan veriler kapsamında değerlendirilmelidir." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 5,
        secenekler: [
            { text: 'Doğrudur. <span style="color: #ff0008ff;">*</style>', correct: true },
            { text: 'Yanlıştır.', correct: false },
        ],
        aciklama: ['VERİ KULLANIMI', 'Araştırma sonucunda ulaşılan çıkarımlar yalnızca kullanılan veriler kapsamında değerlendirilmelidir. Bu nedenle doğru cevap <b>"Doğrudur."</b> olmalıdır.']
    },
    {
        soru: '"Hazır veriler kullanılarak yapılan araştırmalarda verilerin nasıl toplandığını incelemeye gerek yoktur." ifadesine göre seçim yapınız.',
        tipi: "dy",
        puan: 5,
        secenekler: [
            { text: 'Doğrudur.', correct: false },
            { text: 'Yanlıştır. <span style="color: #ff0008ff;">*</style>', correct: true },
        ],
        aciklama: ['VERİ KULLANIMI', 'Hazır veriler kullanılarak yapılan araştırmalarda verilerin nasıl toplandığı çok önemlidir. Bu nedenle doğru cevap <b>"Yanlıştır."</b> olmalıdır.']
    },
    {
        yonerge: 'Aşağıda verilen boşlukları doldurunuz.',
        sorular: [
            { text: 'Araştırmacının doğrudan toplamadığı, resmî kurumlar tarafından yayımlanan verilere *** denir. <span style="color: #ff0008ff;">hazır veri</style>' },
            { text: 'Hazır veriler analiz edilmeden önce araştırma sorusuna uygun olacak biçimde düzenlenir. Bu işlem verileri *** olarak ifade edilir. <span style="color: #ff0008ff;">analize hazırlama</style>' }
        ],
        tipi: "bd",
        puan: 8,
        dogrular: ['hazır veri', 'analize hazırlama'],
        secimler: ['görselleştirme', 'yorumlama'],
        aciklama: [
            ['HAZIR VERİ', 'Araştırmacının doğrudan toplamadığı, resmî kurumlar tarafından yayımlanan verilere <b>hazır veri</b> denir. Bu nedenle doğru cevap <b>hazır veri</b> olmalıdır.'],
            ['ANALİZE HAZIRLAMA', 'Hazır veriler analiz edilmeden önce araştırma sorusuna uygun olacak biçimde analize hazır hâle getirilir. Bu nedenle doğru cevap <b>analize hazırlama</b> olmalıdır.']
        ]
    },
    {
        yonerge: 'Aşağıda verilen boşlukları doldurunuz.',
        sorular: [
            { text: 'İstatistiksel araştırmanın ilk aşamalarından biri, araştırmayı gerektiren *** belirlemektir. <span style="color: #ff0008ff;">toplumsal ve/veya bilimsel durumu</style>' },
            { text: 'Araştırma sorusuna cevap verebilmek için hangi verilerin nereden ve nasıl elde edileceğinin belirlenmesi veri elde etmeye yönelik *** olarak adlandırılır. <span style="color: #ff0008ff;">plan yapma</style>' },
            { text: 'Verilerin analiz edilmesi sonucunda elde edilen bulgular kullanılarak *** sorusuna cevap verilir. <span style="color: #ff0008ff;">araştırma</style>' }
        ],
        tipi: "bd",
        puan: 12,
        dogrular: ['toplumsal ve/veya bilimsel durumu', 'plan yapma', 'araştırma'],
        secimler: ['görselleştirme', 'yorumlama', 'inceleme'],
        aciklama: [
            ['GÜNLÜK YAŞAM', 'İstatistiksel araştırmaya başlamadan önce, araştırmayı gerektiren toplumsal ve/veya bilimsel durumu belirlemek gerekir. Bu nedenle doğru cevap <b>toplumsal ve/veya bilimsel durumu</b> olmalıdır.'],
            ['PLANLAMA', 'Araştırma sorusuna cevap verebilmek için hangi verilerin nereden ve nasıl elde edileceğinin belirlenmesi veri elde etmeye yönelik plan yapma olarak adlandırılır. Bu nedenle doğru cevap <b>plan yapma</b> olmalıdır.'],
            ['İSTATİSTİKSEL ARAŞTIRMA', 'Verilerin analiz edilmesi sonucunda elde edilen bulgular kullanılarak istatistiksel araştırma sorusuna cevap verilir. Bu nedenle doğru cevap <b>araştırma</b> olmalıdır.']
        ]
    },
    {
        yonerge: 'Aşağıda görselleştirme araçlarını uygun kullanım amaçlarıyla eşleştiriniz.',
        sorular: [
            { text: 'Çizgi Grafiği &#8658; *** <span style="color: #ff0008ff;">Yıllara göre değişimi gösterme</style>' },
            { text: 'Sütun Grafiği &#8658; *** <span style="color: #ff0008ff;">Kategorilere ait değerleri karşılaştırma</style>' },
            { text: 'Saçılım Grafiği &#8658; *** <span style="color: #ff0008ff;">İki nicel değişken arasındaki ilişkiyi inceleme</style>' },
        ],
        tipi: "es",
        puan: 15,
        dogrular: ['Yıllara göre değişimi gösterme', 'Kategorilere ait değerleri karşılaştırma', 'iki nicel değişken arasındaki ilişkiyi inceleme'],
        secimler: ['', ''],
        aciklama: [
            ['ÇİZGİ GRAFİĞİ', 'Yıllara göre değişimi göstermek için en uygun grafik türü çizgi grafiğidir. Bu nedenle doğru cevap <b>Yıllara göre değişimi gösterme</b> olmalıdır.'],
            ['SÜTUN GRAFİĞİ', 'Kategorilere ait değerleri karşılaştırmak için en uygun grafik türü sütun grafiğidir. Bu nedenle doğru cevap <b>Kategorilere ait değerleri karşılaştırma</b> olmalıdır.'],
            ['SAÇILIM GRAFİĞİ', 'İki nicel değişken arasındaki ilişkiyi incelemek için en uygun grafik türü saçılım grafiğidir. Bu nedenle doğru cevap <b>İki nicel değişken arasındaki ilişkiyi inceleme</b> olmalıdır.'],
        ]
    },
    {
        yonerge: 'Aşağıdaki araştırma işlemlerini istatistiksel araştırma sürecindeki uygun aşamalarla eşleştiriniz.',
        sorular: [
            { text: 'TÜİK veri portalından gerekli verileri indirme &#8658; *** <span style="color: #ff0008ff;">Verileri elde ederek analize hazırlama</style>' },
            { text: 'Saçılım grafiği oluşturma &#8658; *** <span style="color: #ff0008ff;">Verileri analiz etme</style>' },
            { text: 'Araştırma sonucunu yorumlama &#8658; *** <span style="color: #ff0008ff;">Sonuçları değerlendirme</style>' },
        ],
        tipi: "es",
        puan: 15,
        dogrular: ['Veri elde ederek analize hazırlama', 'Verileri analiz etme', 'Sonuçları değerlendirme'],
        secimler: ['', ''],
        aciklama: [
            ['ANALİZE HAZIRLAMA', 'Verileri elde ederek analize hazırlama işlemi için TÜİK veri portalı kullanılabilir. Bu nedenle doğru cevap <b>Veri elde ederek analize hazırlama</b> olmalıdır.'],
            ['GÖRSELLEŞTİRME', 'Verileri analiz etmek için en veri uygun bir grafik türü ile görselleştirilir. Bu nedenle doğru cevap <b>Verileri analiz etme</b> olmalıdır.'],
            ['DEĞERLENDİRME', 'Araştırma sonucununda elde edilen sonuçlar değerlendirilmelidir. Bu nedenle doğru cevap <b>Sonuçları değerlendirme</b> olmalıdır.'],
        ]
    },
    {
        yonerge: 'Aşağıdaki araştırma sorularını uygun araştırma türüyle eşleştiriniz.',
        sorular: [
            { text: "Türki̇ye'de yıllara göre doğum sayısı nasıl değişmiştir? &#8658; *** <span style='color: #ff0008ff;'>Betimsel</style>" },
            { text: 'Bölgelere göre kişi başına düşen gelir nasıl farklılık göstermektedir? &#8658; *** <span style="color: #ff0008ff;">Karşılaştırma</style>' },
            { text: 'Hekim sayısı ile nüfus arasında ilişki var mıdır? &#8658; *** <span style="color: #ff0008ff;">İlişkililik</style>' },
        ],
        tipi: "es",
        puan: 15,
        dogrular: ['Betimsel', 'Karşılaştırma', 'İlişkililik'],
        secimler: ['', ''],
        aciklama: [
            ['BETİMSEL', 'Betimleme içeren araştırma soruları, olayların nasıl değiştiğini incelemektedir. Bu nedenle doğru cevap <b>Betimsel</b> olmalıdır.'],
            ['KARŞILAŞTIRMA', 'Karşılaştırma içeren araştırma soruları, farklı gruplar arasında farkları incelemektedir. Bu nedenle doğru cevap <b>Karşılaştırma</b> olmalıdır.'],
            ['İLİŞKİLİK', 'İlişkililik içeren araştırma, iki veya daha fazla değişken arasındaki ilişkiyi incelemektedir. Bu nedenle doğru cevap <b>İlişkililik</b> olmalıdır.'],
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