/* 1. TEMA - GERÇEK SAYI DİZİLERİ, ARİTMETİK ve GEOMETRİK DİZİLER */
const sorularSirali_T = [
    {
        yonerge: '(3, 9, 27, ...) şeklinde verilen örüntüye göre aşağıdaki verilen boşlukları doldurunuz.',
        sorular: [
            { text: "Örüntünün 5. elemanına karşılık gelen sayıdır. &#8594 ***" },
            { text: "Eleman sayısı n olmak üzere örüntünün n. elemanını veren kuraldır. &#8594 ***" },
        ],
        tipi: "es",
        puan: 20,
        dogrular: ['343', '3<sup>n</sup>'],
        secimler: ['81', '3n', '125', '2<sup>n</sup>'],
        aciklama: [
            ['Örüntünün 5. Elemanına Karşılık Gelen Sayı', 'Her adım 3 ün kuvveti olduğundan 5. adımda 3<sup>5</sup>=343 olması gerekir.'],
            ['Örüntünün n. Elemanının Kuralı', 'Ardışık terimlerden büyük olanın küçük olana oranı daima 3 olduğundan örüntünün n. elemanı 3<sup>n</sup> kuralı ile bulunur.']
        ]
    },
    {
        yonerge: 'Aşağıda çubuklar kullanılarak oluşturulan bir örüntünün ilk 4 adımı verilmiştir.<br><img src="img/soruFotolar/cubuklar.png"><br><b>Buna göre aşağıda verilen boşlukları doldurunuz.</b>',
        sorular: [
            { text: "Örüntünün 6. adımında *** adet çubuk kullanılmıştır." },
            { text: "Adım sayısı n olmak üzere örüntünün n. adımında kullanılan çubuk sayısı *** kuralı ile bulunur." },
        ],
        tipi: "bd",
        puan: 20,
        dogrular: ['19', '3n+1'],
        secimler: ['22', '2n+2', '25', '3n-2'],
        aciklama: [
            ['6. Adımdaki Çubuk Sayısı', 'Her adımda kullanılan çubuk sayısı, adım sayısının 3 katından 1 fazladır. Bu nedenle örüntünün 6. adımında 3.6+1=19 adet çubuk kullanılması gerekir.'],
            ['n. Adımdaki Çubuk Sayısı', 'Ardışık adımlarda kullanılan çubuk sayıları arasındaki fark 3 olduğu için kural içerisinde 3n terimi olmalıdır. Örüntünün 1. adımında 4 adet çubuk kullanıldığı için kuralda n yerine 1 yazıldığında 4 elde edilmelidir. Bu nedenle kural 3n+1 olması gerekir.']
        ]
    },

    {
        yonerge: 'Sevgi’nin bulunduğu şehir genelinde yapılan son 10 deneme sınavındaki il içi sıralaması aşağıdaki gibidir.<p style="text-align:center">20, 23, 21, 6, 14, 23, 19, 23, 21, 20</p><br><b>Buna göre aşağıdaki cümlelede verilen boşluğu doldurunuz.</b>',
        sorular: [
            { text: "Sevgi’nin il içi sıralamasını en iyi temsil eden merkezi eğilim ölçüsü *** olur." }
        ],
        tipi: "es",
        puan: 10,
        dogrular: ['ortanca'],
        secimler: ['tepe değer', 'standart sapma', 'aritmetik ortalama'],
        aciklama: [['ORTANCA', 'Ortanca açıklaması']]
    },
    {
        soru: 'Bir giyim mağazasında satılan son 10 ürünün fiyatları aşağıdaki tabloda verilmiştir.<br><br><p><table><tr><td>1. Ürün<br>770 TL</td><td>2. Ürün<br>550 TL</td><td>3. Ürün<br>570 TL</td><td>4. Ürün<br>650 TL</td><td>5. Ürün<br>820 TL</td></tr><tr><td>6. Ürün<br>590 TL</td><td>7. Ürün<br>670 TL</td><td>8. Ürün<br>550 TL</td><td>9. Ürün<br>770 TL</td><td>10. Ürün<br>620 TL</td></tr></table></p><br><b>Satılan 2 ve 3. ürünler geri iade edilmiştir. Aynı ürünlerin her birinin 600 TL’ye tekrar satılması durumunda satılan son 10 ürünün ortancasındaki değişim aşağıdakilerden hangisi olur?</b>',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "10 artar", correct: false },
            { text: "20 artar", correct: false },
            { text: "Değişmez", correct: true },
            { text: "20 azalır", correct: false },
            { text: "10 azalır", correct: false },
        ],
        aciklama: ['GİYİM MAĞAZASI', 'Bir giyim mağazası açıklaması']
    },
    {
        soru: '"Aritmetik ortalama, aykırı değerlerden ortancaya göre daha fazla etkilenmektedir." ifadesine göre aşağıdan seçim yapınız.',
        tipi: "dy",
        puan: 10,
        secenekler: [
            { text: "Doğrudur.", correct: true },
            { text: "Yanlıştır", correct: false },
        ],
        aciklama: ['ARİTMETİK ORTALANA', 'Aritmetik ortalama açıklaması']
    }
]


/* const urlParams = new URLSearchParams(window.location.search)
const gelenDeger = urlParams.get('degisken')

 const outputElement = document.getElementById("output")
if (gelenDeger) {
    outputElement.textContent = `Gelen değer: ${gelenDeger}`
} else {
    outputElement.textContent = "URL'de herhangi bir değer bulunamadı."
} */








/* const openModalButtons = document.querySelectorAll('[data-modal-target]') */
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal')

/* openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
}) */

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