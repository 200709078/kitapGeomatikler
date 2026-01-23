const sorularSirali_T = [
    {
        soru: 'Tüketici fiyat endeksinin (TÜFE) 2022, 2023, 2024 yıllarında aylık değişimlerini gösteren grafik aşağıda verilmiştir.  <p style="text-align:center"><img src="img/soruFotolar/tufe.png" width="550px"></p><b>Buna göre 2022 ve 2023 yıllarının son 6 aylarındaki veriler ile 2024 yılının ilk 6 ayındaki veriler incelendiğinde hangi yılda tüketici fiyatlarının daha durağan olduğu söylenebilir? </b>',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "2024", correct: true },
            { text: "2023", correct: false },
            { text: "2022", correct: false }
        ]
    },
    {
        yonerge: 'Boncuk ve Pamuk adında iki inekten 10 hafta boyunca elde edilen süt miktarları (kg) aşağıdaki tabloda verilmiştir. <br><br><p><table><tr><td width="50">Boncuk</td><td>140</td><td>126</td><td>132</td><td>135</td><td>142</td><td>125</td><td>130</td><td>110</td><td>127</td><td>135</td></tr><tr><td>Pamuk</td><td>119</td><td>140</td><td>134</td><td>146</td><td>120</td><td>128</td><td>125</td><td>114</td><td>139</td><td>137</td></tr></table></p><br><b>Buna göre aşağıdaki cümlelerde verilen boşlukları doldurunuz.</b>',
        sorular: [
            { text: "10 hafta boyunca Boncuk ve Pamuk’tan elde edilen süt miktarı verilerini istatistiksel yöntemlerle karşılaştırabilmek için *** kullanılmalıdır." },
            { text: "Pamuk’tan elde edilen süt miktarını temsil eden değerin bulunması işleminde *** kullanılması daha uygun olur." },
        ],
        tipi: "bd",
        puan: 10,
        dogrular: ['açıklık', 'aritmetik ortalama'],
        secimler: ['ortanca', 'tepe değer','maksimum değer', 'minimum değer']
    },

    {
        yonerge: 'Sevgi’nin bulunduğu şehir genelinde yapılan son 10 deneme sınavındaki il içi sıralaması aşağıdaki gibidir.<p style="text-align:center">20, 23, 21, 6, 14, 23, 19, 23, 21, 20</p><br><b>Buna göre aşağıdaki cümlede verilen boşluğu doldurunuz.</b>',
        sorular: [
            { text: "Sevgi’nin il içi sıralamasını en iyi temsil eden merkezi eğilim ölçüsü *** olur." }
        ],
        tipi: "es",
        puan: 10,
        dogrular: ['ortanca'],
        secimler: ['tepe değer', 'standart sapma', 'aritmetik ortalama']
    },
    {
        soru: 'Bir giyim mağazasında satılan son 10 ürünün fiyatları aşağıdaki tabloda verilmiştir.<br><br><p><table><tr><td>1. Ürün<br>770 TL</td><td>2. Ürün<br>550 TL</td><td>3. Ürün<br>570 TL</td><td>4. Ürün<br>650 TL</td><td>5. Ürün<br>820 TL</td></tr><tr><td>6. Ürün<br>590 TL</td><td>7. Ürün<br>670 TL</td><td>8. Ürün<br>550 TL</td><td>9. Ürün<br>770 TL</td><td>10. Ürün<br>620 TL</td></tr></table></p><br><b>Satılan 2 ve 3. ürünler iade edilmiştir. Aynı ürünlerin her birinin 600 TL’ye tekrar satılması durumunda satılan son 10 ürünün ortancasındaki değişim aşağıdakilerden hangisi olur?</b>',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "10 artar", correct: false },
            { text: "20 artar", correct: false },
            { text: "Değişmez", correct: true },
            { text: "20 azalır", correct: false },
            { text: "10 azalır", correct: false },
        ]
    },
    {
        soru: 'Bir giyim mağazasında satılan son 10 ürünün fiyatları aşağıdaki tabloda verilmiştir.<br><br><p><table><tr><td>1. Ürün<br>770 TL</td><td>2. Ürün<br>550 TL</td><td>3. Ürün<br>570 TL</td><td>4. Ürün<br>650 TL</td><td>5. Ürün<br>820 TL</td></tr><tr><td>6. Ürün<br>590 TL</td><td>7. Ürün<br>670 TL</td><td>8. Ürün<br>550 TL</td><td>9. Ürün<br>770 TL</td><td>10. Ürün<br>620 TL</td></tr></table></p><br><b>Bu ürünlerden hangisi iade edilirse aritmetik ortalama en az etkilenir?</b>',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "3. Ürün", correct: false },
            { text: "4. Ürün", correct: true },
            { text: "6. Ürün", correct: false },
            { text: "7. Ürün", correct: false },
            { text: "10. Ürün", correct: false },
        ]
    },
    {
        soru: "Bir okulda öğle yemeğinde verilecek 3 çeşit menüyü belirlemek için öğrencilere anket uygulanmıştır. Anket sonuçlarını değerlendirmek için aşağıdaki ölçülerden hangisini kullanmak daha uygun olur?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Aritmetik Ortalama", correct: false },
            { text: "Ortanca", correct: false },
            { text: "Tepe Değer", correct: true },
            { text: "Açıklık", correct: false },
            { text: "Standart Sapma", correct: false },
        ]
    },
    {
        yonerge: 'Aşağıdaki tabloda Ali’nin bir hafta boyunca günlük kitap okuma süreleri (dakika) verilmiştir.<br><br><p><table><tr><td>Pazartesi</td><td>Salı</td><td>Çarşamba</td><td>Perşembe</td><td>Cuma</td><td>Cumartesi</td><td>Pazar</td></tr><tr><td>50</td><td>53</td><td>40</td><td>52</td><td>43</td><td>56</td><td>42</td></tr></table></p><br><b>Buna göre aşağıdaki cümlelerde verilen boşlukları doldurunuz.</b>',
        sorular: [
            { text: "Ali bir hafta boyunca günde ortalama *** dakika kitap okumuştur." },
            { text: "Ali’nin bir hafta boyunca günlük kitap okuma sürelerinin ortancası *** olur." },
        ],
        tipi: "bd",
        puan: 10,
        dogrular: ['48', '50'],
        secimler: ['32', '60']
    },
    {
        yonerge: "Aşağıdaki cümlelerde verilen boşlukları doldurunuz.",
        sorular: [
            { text: "Bir veri grubundaki veriler birbirine ne kadar yakınsa o veri grubunu en iyi temsil eden merkezi eğilim ölçüsü ***" },
            { text: "Veri grubundaki verilerin birbirinden farklı olması veya veri grubunda aykırı değerlerin bulunması durumunda verilerin yığılma eğilimi gösterdiği yeri belirlemede en uygun merkezi eğilim ölçüsü ***" }
        ],
        tipi: "bd",
        puan: 10,
        dogrular: ['aritmetik ortalamadır.', 'ortancadır.'],
        secimler: ['standart sapmadır.', 'tepe değerdir.']
    },
    {
        yonerge: 'Aşağıdaki cümlede verilen boşluğu doldurunuz.',
        sorular: [
            { text: "Merkezi eğilim ölçüleri *** olmak üzere üç tanedir." },
        ],
        tipi: "bd",
        puan: 10,
        dogrular: ['aritmetik ortalama, ortanca ve tepe değer'],
        secimler: ['mutlak standart sapma, ortanca ve minimum değer', 'tepe değer, açıklık ve maksimum değer','aritmetik ortalama, ortalama mutlak sapma ve maksimum değer']
    },
    {
        soru: '"Aritmetik ortalama, aykırı değerlerden ortancaya göre daha fazla etkilenmektedir." ifadesine göre aşağıdan seçim yapınız.',
        tipi: "dy",
        puan: 5,
        secenekler: [
            { text: "Doğrudur.", correct: true },
            { text: "Yanlıştır", correct: false },
        ]
    },
    {
        soru: '"Merkezi eğilim ölçülerinin her biri verilerin birbirlerinden ne kadar uzak olduklarının ölçüsü iken merkezi yayılım ölçülerinin her biri verilerin hangi değer etrafında toplandığını göstermektedir." ifadesine göre aşağıdan seçim yapınız.',
        tipi: "dy",
        puan: 5,
        secenekler: [
            { text: "Doğrudur.", correct: false },
            { text: "Yanlıştır", correct: true },
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
        // if (button.dataset.correct === "true") {
        //     button.classList.add("dogrusecenek")
        // }
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
    if (aktifSoruIndex == undefined) {
        denemeBaslat()
    } else {
        if (sonrakiButton.innerHTML == 'SONRAKİ' && (sorular[aktifSoruIndex].tipi == 'bd' || sorular[aktifSoruIndex].tipi == 'es')) {
            document.getElementById('app').removeChild(answerDropDown)
        }
        if (aktifSoruIndex < sorular.length) {
            degistirSonraki()
        } else {
            denemeBaslat()
        }
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

//denemeBaslat()