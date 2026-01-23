const sorularSirali_T = [
    {
        yonerge: 'Aşağıdaki cümlelerde verilen boşlukları doldurunuz.',
        sorular: [
            { text: "y = 2x-1 doğrusunun üzerindeki bir nokta *** noktasıdır." },
            { text: "*** noktası (0,-2) ve (2,0) noktalarından geçen doğrunun üzerindedir." },
        ],
        tipi: "bd",
        puan: 30,
        dogrular: ['(3,5)', '(5,3)'],
        secimler: ['(3,4)', '(4,3)']
    },
    {
        yonerge: 'Aşağıdaki cümlede verilen boşlukları doldurunuz.',
        sorular: [
            { text: "Bir doğrunun ***, denklemindeki *** değişkenin katsayısıdır." }
        ],
        tipi: "bd",
        puan: 10,
        dogrular: ['eğimi', 'bağımsız'],
        secimler: ['sıfırı', 'bağımlı']
    },
    {
        yonerge: 'A ve B bitkilerinin zamana (ay) bağlı olarak boy uzunluklarının (cm) değişimi aşağıdaki grafikte gösterilmiştir.<p style="text-align:center"><img src="img/bitkiler.png" width="220px"></p><b>Buna göre aşağıdaki cümlelerde verilen boşlukları doldurunuz.</b>',
        sorular: [
            { text: "5. ayın sonunda bitkilerin boy farkı *** santimetredir." },
            { text: "*** ayın sonunda bitkilerin boy uzunluklarının toplamı 112 santimetredir." },
            { text: "A bitkisi 1 ayda *** santimetre uzamaktadır." },
            { text: "20. ayın sonunda bitkilerin boy uzunlukları farkı *** santimetre olur." }
        ],
        tipi: "bd",
        puan: 20,
        dogrular: ['10', '4', '5', '20'],
        secimler: ['14', '8', '15']
    },
    {
        soru: "Çalışanlarına moral yemeği verecek olan Ayşen Hanım, bir restoran ile görüşür. Restoranın teklifi doğrultusunda 70 kişilik bir yemeğin maliyeti 15 000 TL, 120 kişilik bir yemeğin maliyeti 22 000 TL olacak şekilde anlaşırlar.<br><br><b>Doğrusal ilişkili bu duruma göre 150 kişilik yemeğin maliyeti aşağıdakilerden hangisidir?</b>",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "26 200 TL", correct: true },
            { text: "32 000 TL", correct: false },
            { text: "28 300 TL", correct: false },
            { text: "38 000 TL", correct: false },
            { text: "24 400 TL", correct: false },
        ]
    },
    {
        soru: "Üniversitede okuyan Betül, yarı zamanlı olarak bir kafede çalışmakta ve çalıştığı her saat için 200 TL ücret almaktadır.<br><br><b>Buna göre Betül’ün bir aylık sürenin 20 gününde ve günde 6 saat çalışması karşılığında alacağı toplam ücret aşağıdakilerden hangisidir?</b>",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "14 000 TL", correct: false },
            { text: "24 000 TL", correct: true },
            { text: "15 000 TL", correct: false },
            { text: "25 000 TL", correct: false },
            { text: "11 000 TL", correct: false },
        ]
    },
    {
        soru: '"a, b &#8712; &#8477; olmak üzere y = ax + b doğrusunun eğimi a&apos;dır." ifadesine göre aşağıdan seçim yapınız.',
        tipi: "dy",
        puan: 10,
        secenekler: [
            { text: "Doğrudur.", correct: true },
            { text: "Yanlıştır.", correct: false },
        ]
    },
    {
        soru: "12 cm uzunluğundaki bir mum, yakıldıktan 18 dakika sonra tamamen yanıp bitmektedir. <br><br><b>Buna göre mumun yakılmasından itibaren geçen süre (dk.) ile mumun boyunun uzunluğu (cm) arasındaki zamana bağlı doğrusal ilişkiye ait denklem aşağıdakilerden hangisidir?</b>",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "y = (36-2x)/3", correct: true },
            { text: "y = 3-2x", correct: false },
            { text: "y = (3-24x)/3", correct: false },
            { text: "y = 6-3x", correct: false },
            { text: "y = 2x+3", correct: false },
        ]
    }
]

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
    sorular = arrayKaristir(sorularSirali_T)
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