const sorularSirali_T = [
    {
        soru: "Hazine ve Maliye Bakanlığı'nın bütçe politikaları ve vergi düzenlemeleri, paranın dolaşımını ve ekonomideki canlılığı etkiler. Bu durum paranın en çok hangi yönüyle ilişkilidir?",
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Paranın tarihsel kökeni", correct: false },
            { text: "Paranın fiziksel tasarımı", correct: false },
            { text: "Paranın değişim aracı olma işlevinin sürdürülebilirliği <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: "Paranın sadece madenî olması", correct: false },
            { text: "Takas usulünün yasaklanması", correct: false },
        ],
        aciklama: ["BÜTÇE POLİTİKALARI", "Bakanlığın politikaları paranın piyasadaki miktarını ve akışını belirleyerek alışverişlerin (değişim aracı işlevinin) devamlılığını sağlar. Bu nedenle doğru cevap <strong>Paranın değişim aracı olma işlevinin sürdürülebilirliği</strong>dir."]
    },
    {
        soru: 'Ekonomi ve finans arasındaki farkları analiz eden bir öğrenci, aşağıdaki eşleştirmelerden hangisini "Finans" kategorisine dahil etmelidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Buğday üretim miktarının artırılması", correct: false },
            { text: "Bir fabrikanın yıllık enerji tüketimi", correct: false },
            { text: "Şirketin yatırım projeleri için kredi çekmesi ve faiz yönetimi <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: "Tüketicilerin meyve fiyatlarına olan talebi", correct: false },
            { text: "İşsizlik oranlarının ülke genelindeki dağılımı", correct: false },
        ],
        aciklama: ["FAİZ YÖNETİMİ", "Yatırım, kredi ve faiz yönetimi finansın; üretim, tüketim, arz ve talep ise genel ekonominin temel konularıdır. Bu nedenle doğru cevap <strong>Şirketin yatırım projeleri için kredi çekmesi ve faiz yönetimi</strong>dir."]
    },
    {
        soru: 'Aşağıdakilerden hangisi "finansal okuryazar" bir bireyin toplumsal ekonomik kararlara olan etkilerinden biri olabilir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Sadece kendi tüketimini düşünerek aşırı stok yapmak", correct: false },
            { text: "Bilinçli tasarruf ve yatırım kararlarıyla ekonomik istikrara katkı sağlamak <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: "Ödeme ve değişim aracı", correct: false },
            { text: "Kayıt dışı ekonomiyi desteklemek", correct: false },
            { text: "Bütçe planlaması yapmadan kredi kullanmak", correct: false },
        ],
        aciklama: ["FİNANSAL OKURYAZARLIK", "Finansal okuryazarlık, bireyin sadece kendisi için değil bilinçli kararlarıyla toplam ekonomi için de olumlu sonuçlar yaratmasını sağlar. Bu nedenle doğru cevap <strong>Bilinçli tasarruf ve yatırım kararlarıyla ekonomik istikrara katkı sağlamak</strong>tır."]
    },
    {
        soru: 'Temassız ödeme sistemlerinin ve e-para uygulamalarının hızla yaygınlaşması, paranın hangi işlevinin teknolojik dönüşümle sürdürüldüğünü kanıtlar?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Değer saklama aracı", correct: false },
            { text: "Değer ölçüsü", correct: false },
            { text: "Ödeme ve değişim aracı <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: "Servet biriktirme aracı ", correct: false },
            { text: "Fiyat belirleme gücü", correct: false },
        ],
        aciklama: ["TEMASSIZ ÖDEME", "Dijital ve mobil ödemeler, fiziksel para yerine dijital verilerin el değiştirmesiyle 'ödeme ve değişim' işlemini gerçekleştirir. Bu nedenle doğru cevap <strong>Ödeme ve değişim aracı</strong>dır."]
    },
    {
        soru: 'Türkiye Cumhuriyet Merkez Bankası’nın (TCMB) temel görevlerinden biri olan "faiz oranlarını ayarlayarak fiyat istikrarını sağlamaya çalışması" doğrudan paranın hangi özelliğiyle ilgilidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Paranın fiziksel dayanıklılığını artırmak", correct: false },
            { text: "Paranın değerini korumak ve güvenilirliğini sağlamak <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: "Kâğıt para basım maliyetini düşürmek", correct: false },
            { text: "Takas ekonomisine geri dönüşü sağlamak", correct: false },
            { text: "Sadece dijital ödemeleri zorunlu kılmak", correct: false },
        ],
        aciklama: ["TCMB", "Merkez Bankası'nın faiz ve para politikası, paranın satın alma gücünü (değerini) korumayı hedefler. Bu nedenle doğru cevap <strong>Paranın değerini korumak ve güvenilirliğini sağlamak</strong>tır."]
    },
    {
        soru: 'Bir mağazaya giren Elif, bir ayakkabının etiketinde "2500 TL" yazdığını görüyor. Paranın bu etiketteki rolü aşağıdakilerden hangisidir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Değişim aracı", correct: false },
            { text: "Ödeme aracı", correct: false },
            { text: "Değer ölçüsü (hesap birimi) aracı <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: "Değer saklama aracı", correct: false },
            { text: "Yatırım aracı", correct: false },
        ],
        aciklama: ["ETİKET FİYATI", "Etiket fiyatı, malın değerini ortak bir birimle (TL) ölçmeye yarar. Bu, 'değer ölçüsü' işlevidir. Bu nedenle doğru cevap <strong>Değer ölçüsü (hesap birimi) aracı</strong>dır."]
    },
    {
        soru: 'Paranın tarihsel gelişim süreciyle ilgili bir araştırma yapan grubun, zaman çizelgesinde kronolojik olarak en son sıraya aşağıdakilerden hangisini koyması beklenir? ',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Lidyalıların bastığı metal paralar", correct: false },
            { text: "Değerli metallere endeksli kâğıt banknotlar", correct: false },
            { text: "Takas yöntemiyle yapılan ticaret", correct: false },
            { text: "Dijital paralar ve kripto varlıklar <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: "Temsili paralar (altın sertifikaları)", correct: false },
        ],
        aciklama: ["ENFLASYON", "Tarihsel süreç: Takas -> metal para -> kâğıt para -> dijital para şeklinde ilerlemiştir. Bu nedenle doğru cevap <strong>Dijital paralar ve kripto varlıklar</strong>dır."]
    },
    {
        soru: 'Ekonomik kriz veya yüksek enflasyon dönemlerinde paranın satın alma gücü düştüğü için bireyler tasarruflarını döviz veya altına yönlendirirler." Bu durum paranın hangi işlevinin zayıfladığını gösterir?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Değişim aracı", correct: false },
            { text: "Ödeme aracı", correct: false },
            { text: "Değer ölçüsü", correct: false },
            { text: "Değer saklama aracı <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: "Hesap birimi", correct: false },
        ],
        aciklama: ["ENFLASYON", "Enflasyon paranın değerini eritir. Eğer para gelecekteki satın alma gücünü koruyamıyorsa 'değer saklama' işlevi bozulmuş demektir. Bu nedenle doğru cevap <strong>Değer saklama aracı</strong>dır."]
    },
    {
        soru: 'Bir öğrenci elindeki harçlığın bir kısmıyla kantinden tost alıyor. Harçlığın kalan kısmını ise kumbarasına atıyor. Bu örnekte paranın hangi iki işlevi sırasıyla kullanılmıştır?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Değer ölçüsü – Ödeme aracı", correct: false },
            { text: "Değişim aracı – Değer saklama aracı <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: "Ödeme aracı – Değer ölçüsü", correct: false },
            { text: "Değer saklama aracı – Değişim aracı", correct: false },
            { text: "Değer ölçüsü – Değişim aracı", correct: false },
        ],
        aciklama: ["ALIŞVERİŞ", "Tost almak bir değişim/alışveriş işlemidir (değişim aracı). Parayı biriktirmek ise gelecekte kullanmak üzere değerini korumaktır (değer saklama). Bu nedenle doğru cevap <strong>Değişim aracı – Değer saklama aracı</strong>dır"]
    },
    {
        soru: 'Ekonomi ve finans kavramları arasındaki ilişki düşünüldüğünde aşağıdakilerden hangisi finansın temel uğraş alanlarından biri olan "bütçe" kavramını en iyi açıklar?',
        tipi: "cs",
        puan: 10,
        secenekler: [
            { text: "Toplumun sınırsız ihtiyaçlarını karşılama süreci", correct: false },
            { text: "Mal ve hizmetlerin üretim aşamalarının planlaması", correct: false },
            { text: "Belirli bir dönem için gelir ve giderlerin tahmin edilmesi ve dengelenmesi <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: "Piyasadaki arz ve talep dengesinin kendiliğinden oluşması", correct: false },
            { text: "Ham maddelerin işlenerek tüketiciye ulaştırılması süreci", correct: false },
        ],
        aciklama: ["EKONOMİ VE FİNANS", "Ekonomi, kaynakların yönetimiyle ilgilenirken finans, paranın yönetimiyle ilgilenir. Bütçe, paranın (gelir-gider) planlanması sürecidir. Bu nedenle doğru cevap <strong>Belirli bir dönem için gelir ve giderlerin tahmin edilmesi ve dengelenmesi</strong>dir"]
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