const sorularSirali_T = [
    {
        soru: "Bir yatırımcı 10 000 TL'sini ikiye bölmüştür. Yarısını yıllık %40 faiz veren bankaya, diğer yarısını ise yıllık %60 değer kazanan altına yatırmıştır. Bir yılın sonunda yatırımcının toplam parası kaç TL olur?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "14 000 TL", correct: false },
            { text: "14 500 TL", correct: false },
            { text: "15 000 TL", correct: true },
            { text: "15 500 TL", correct: false },
            { text: "16 000 TL", correct: false },
        ],
        aciklama: ["YATIRIMCI", "İkiye bölünmüş portföyün toplam getirisi<br>Bankadaki 5000 TL: 5000 * 1,40 = 7000 TL olur.<br>Altındaki 5000 TL: 5000 * 1,60 = 8000 TL olur.<br>Toplam para: 7000 + 8000 = 15 000 TL olur."]
    },
    {
        soru: "Bir bütçede 'Öncelikli İhtiyaçlar' (gıda, kira) %60, 'İstekler' (sinema, lüks tüketim) %30 ve 'Tasarruf' %10 paya sahiptir. Geliri 20 000 TL olan bir kişi, 'İstekler' kategorisinden %20 oranında kısıntı yapıp bu miktarı 'Tasarruf' kategorisine aktarırsa yeni tasarruf miktarı kaç TL olur?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "2000 TL", correct: false },
            { text: "2600 TL", correct: false },
            { text: "3200 TL", correct: true },
            { text: "4000 TL", correct: false },
            { text: "4500 TL", correct: false },
        ],
        aciklama: ["BÜTÇE", "Bütçe kalemleri arası transfer hesabı<br>Mevcut tasarruf: 20 000 * 0,10 = 2000 TL<br>'İstekler' bütçesi: 20 000 * 0,30 = 6000 TL<br>İsteklerden kısılan tutar (%20): 6000 * 0,20 = 1200 TL<br>Yeni toplam tasarruf: 2000 + 1200 = 3200 TL olur."]
    },
    {
        soru: "Bir ailenin aylık elektrik faturası 500 TL'dir. Aile, enerji tasarrufu yaparak bu faturayı %15 oranında azaltmıştır. Tasarruf edilen bu tutar her ay düzenli olarak bir kumbaraya atılmaktadır. 1 yılın sonunda kumbarada biriken para ile 1000 TL'lik bir mutfak robotu alınırsa geriye kaç TL kalır?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Geriye para kalmaz 100 TL borç oluşur.", correct: true },
            { text: "100 TL kalır.", correct: false },
            { text: "200 TL kalır.", correct: false },
            { text: "350 TL kalır.", correct: false },
            { text: "900 TL kalır.", correct: false },
        ],
        aciklama: ["TASARRUF", "Aylık enerji tasarrufu: 500 * 0,15 = 75 TL<br>1 yıllık (12 ay) toplam tasarruf: 75 * 12 = 900 TL<br>Hedeflenen harcama (robot): 1000 TL<br>Sonuç: 900 - 1000 = -100 TL (Yani 100 TL borç oluşur)."]
    },
    {
        soru: "'Fırsat Maliyeti' analizi yapan bir genç, 2000 TL'si ile ya bir yabancı dil kursuna gidecek ya da yeni bir oyun konsolu alacaktır. Dil kursuna giderse 6 ay sonra iş bulma ihtimalinin artacağını ve aylık gelirinin 500 TL yükseleceğini öngörmektedir. Gencin dil kursuna gitmeyi seçmesinin 'ekonomik geri dönüş süresi' (amortisman) kaç aydır?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "2 ay", correct: false },
            { text: "4 ay", correct: true },
            { text: "6 ay", correct: false },
            { text: "8 ay", correct: false },
            { text: "10 ay", correct: false },
        ],
        aciklama: ["AMORTİSMAN", "Amortisman süresi maliyetin ek gelire bölünmesiyle bulunur.<br>Yatırım maliyeti: 2000 TL<br>Aylık sağlanan ek gelir: 500 TL<br>Geri dönüş süresi: 2000/500 = 4 aydır."]
    },
    {
        soru: "Bir tabletin fiyatı 6000 TL'dir. Bir öğrenci bu tableti almak için her ay 600 TL biriktirmektedir. Ancak 4. ayın sonunda tabletin fiyatına %25 zam gelmiştir. Öğrencinin başlangıçta planladığı gibi 10. ayın sonunda bu tableti alabilmesi için kalan 6 ay boyunca aylık tasarrufunu kaç TL artırması gerekir?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "150 TL", correct: false },
            { text: "250 TL", correct: true },
            { text: "300 TL", correct: false },
            { text: "450 TL", correct: false },
            { text: "600 TL", correct: false },
        ],
        aciklama: ["TASARRUF", "4 ay sonunda biriken: 4 * 600 = 2400 TL<br>Tabletin zamlı fiyatı: 6000 * 1, 25 = 7500 TL<br>Kalan ödeme: 7500 - 2400 = 5100 TL<br>Kalan süre: 10 ay - 4 ay = 6 ay<br>Gereken aylık tasarruf: 5.100 / 6 = 850 TL<br>Ek tasarruf artışı: 850 - 600 = 250 TL olur."]
    },
    {
        soru: "Yıllık enflasyon oranının %50 olduğu bir ekonomide bir kişi parasını bir yıl boyunca %20 getiri sağlayan bir yatırım aracında değerlendirmiştir. Bu kişinin yıl sonundaki 'reel (gerçek) alım gücü' değişimi yüzde kaçtır?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "%30 artmıştır.", correct: false },
            { text: "%30 azalmıştır.", correct: false },
            { text: "%25 azalmıştır.", correct: false },
            { text: "%20 azalmıştır.", correct: true },
            { text: "%10 artmıştır.", correct: false },
        ],
        aciklama: ["REEL GETİRİ", "Reel getiri enflasyon oranına göre düzeltilmiş alım gücüdür.Formül: [(1 + Nominal Getiri) / (1 + Enflasyon Oranı)] - 1<br>Hesap: (1,20 / 1,50) - 1<br>Sonuç: 0,80 - 1 = -0,20 olur. Alım gücü %20 azalmıştır."]
    },
    {
        soru: "'Bütçe Dengesi = Gelir - Gider' formülüyle hesaplanır. Bir öğrencinin aylık geliri 1000 TL, gideri ise 800 TL'dir. Bu öğrencinin geliri %20 artarken giderleri de %40 artarsa yeni bütçe durumu hakkında ne söylenebilir?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "80 TL bütçe fazlası verir.", correct: true },
            { text: "120 TL bütçe fazlası verir.", correct: false },
            { text: "Bütçe tam dengededir (0).", correct: false },
            { text: "40 TL bütçe açığı verir.", correct: false },
            { text: "100 TL bütçe açığı verir.", correct: false },
        ],
        aciklama: ["BÜTÇE DENGESİ", "Gelir ve giderlerdeki değişimlerin analizi<br>Eski bütçe: 1000 (Gelir) - 800 (Gider) = 200 TL fazla<br>Yeni gelir: 1000 * 1,20 = 1200 TL<br>Yeni gider: 800 * 1,40 = 1120 TL<br>Yeni durum: 1200 - 1120 = 80 TL bütçe fazlası olur."]
    },
    {
        soru: "Bir birey, her ay gelirinin sabit bir kısmını tasarruf etmektedir. 1. ayda 500 TL biriktiren bu birey, tasarruf miktarını her ay bir önceki aya göre %10 oranında artırmayı hedeflemektedir. 3. ayın sonuna gelindiğinde bu bireyin toplam (kümülatif) birikimi kaç TL olur?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "1500 TL", correct: false },
            { text: "1650 TL", correct: false },
            { text: "1655 TL", correct: true },
            { text: "1700 TL", correct: false },
            { text: "1815 TL", correct: false },
        ],
        aciklama: ["KÜMÜLATİF BİRİKİM", "Tasarruflar her ay %10 artırılarak toplanır.<br>1. ay: 500 TL<br>2. ay: 500 * 1,10 = 550 TL<br>3. ay: 550 * 1,10 = 605 TL<br>Toplam birikim: 500 + 550 + 605 = 1655 TL olur."]
    },
    {
        soru: "Bir aile, aylık 30 000 TL olan toplam gelirinin %40'ını barınma ve gıda masrafları için ayırmaktadır. Geriye kalan tutarın ¼’nü çocukların eğitim masrafları için harcayan aile, son durumda elinde kalan paranın %10'u ile birikim yapmaktadır. Bu ailenin aylık birikim miktarı kaç TL'dir?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "1200 TL", correct: false },
            { text: "1350 TL", correct: true },
            { text: "1500 TL", correct: false },
            { text: "1800 TL", correct: false },
            { text: "2250 TL", correct: false },
        ],
        aciklama: ["BİRİKİM", "30000 TL toplam gelir üzerinden hesaplama<br>Temel giderler (%40): 30 000 * 0,40 = 12 000 TL<br>Kalan para: 30 000 – 12 000 = 18 000 TL<br>Eğitim gideri (1/4): 18 000 / 4 = 4500 TL<br>Son kalan: 18 000 - 4500 = 13 500 TL<br>Birikim (%10): 13.500 * 0,10 = 1350 TL olur."]
    },
    {
        soru: "Bir öğrencinin aylık harçlığı x TL'dir. Bu öğrenci harçlığının 1/3’ünü temel ihtiyaçlarına, kalan paranın %20'sini ise eğlenceye harcamaktadır. En son kalan paranın yarısını bir hayır kurumuna bağışlayan bu öğrencinin elinde 400 TL kaldığına göre bu öğrencinin toplam aylık harçlığı (x) kaç TL'dir",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "1200 TL", correct: false },
            { text: "1500 TL", correct: true },
            { text: "1800 TL", correct: false },
            { text: "2000 TL", correct: false },
            { text: "2400 TL", correct: false },
        ],
        aciklama: ["HARÇLIK", "Harçlık miktarına 'x' diyelim.<br>İhtiyaçlar için harcanan: x / 3<br>Kalan para: x - (x / 3) = 2x / 3<br>Eğlence masrafı (%20): (2x / 3) * (20 / 100) = 2x / 15<br>Eğlence sonrası kalan: (2x / 3) - (2x / 15) = 8x / 15 (Payda eşitleyerek: 10x/15 - 2x/15)<br>Bu paranın yarısı bağışlanmış ve elde 400 TL kalmış ise<br> (8x / 15) / 2 = 400<br>4x / 15 = 400 ise 4x = 6000 ve buradan x = 1500 TL bulunur."]
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