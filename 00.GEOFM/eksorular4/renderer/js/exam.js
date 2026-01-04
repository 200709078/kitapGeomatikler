const sorularSirali_T = [
    {
        soru: 'Bir ekonomide Gayrisafi Yurt İçi Hasıla (GSYH) hesaplanırken kullanılan harcama yöntemi formülü GSYH = C + I + G + (X - M) şeklindedir. Bir ülkede tüketim (C) 500 birim, yatırım (I) 200 birim, kamu harcamaları (G) 300 birim, ihracat (X) 150 birim ve ithalat (M) 200 birimdir. Bu ülkenin GSYH değeri kaç birimdir? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '850', correct: false },
            { text: '950 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '1000', correct: false },
            { text: '1150', correct: false },
            { text: '1350', correct: false }
        ],
        aciklama: ['GAYRİSAFİ YURT İÇİ HASILA', '500 + 200 + 300 + (150 - 200) = 1000 - 50 = 950 birimdir.']
    },
    {
        soru: "Nominal GSYH, cari fiyatlarla hesaplanan gelirdir. Reel GSYH ise enflasyondan arındırılmış gelirdir. 2024 yılında Nominal GSYH %40 artmış, aynı dönemde GSYH deflatörü (enflasyon) %25 olmuştur. Bu durumda ekonominin 'Reel Büyüme Oranı' yüzde kaçtır?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '12 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '15', correct: false },
            { text: '20', correct: false },
            { text: '25', correct: false },
            { text: '65', correct: false }
        ],
        aciklama: ['REEL BÜYÜME', 'Reel Büyüme = [(1 + Nom. Artış) / (1 + Enflasyon)] - 1 => (1,40 / 1,25) - 1 = 1,12 - 1 = 0,12 (%12) olur.']
    },
    {
        soru: 'Bir ekonomide toplam arzın toplam talepten çok daha hızlı artması ve nakit para sıkışıklığı yaşanması sonucu fiyatlar genel düzeyinin sürekli düşmesi durumuna ne ad verilir? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Enflasyon', correct: false },
            { text: 'Stagflasyon', correct: false },
            { text: 'Deflasyon <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Devalüasyon', correct: false },
            { text: 'Revalüasyon', correct: false }
        ],
        aciklama: ['DEFLASYON', 'Fiyatlar genel düzeyinin sürekli düşmesi <b>deflasyon</b>dur.']
    },
    {
        soru: 'Bir ülkede işsizlik oranları artarken aynı zamanda yüksek enflasyon yaşanıyorsa (ekonomik durgunluk + fiyat artışı) bu makroekonomik durum aşağıdakilerden hangisidir? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Hiperenflasyon', correct: false },
            { text: 'Stagflasyon <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Deflasyon', correct: false },
            { text: 'Resesyon', correct: false },
            { text: 'Ekonomik patlama', correct: false }
        ],
        aciklama: ['STAGFLASYON', 'Stagflasyon=İşsizlik (durgunluk) + Enflasyon ile bulunur. Bu nedenle doğru cevap <b>stagflasyon</b>dur.']
    },
    {
        soru: "Merkez Bankası'nın piyasadaki para arzını kısmak ve enflasyonu düşürmek amacıyla faiz oranlarını artırması hangi politika türüne girer?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Genişlemeci maliye politikası', correct: false },
            { text: 'Sıkı para politikası <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Genişlemeci para politikası', correct: false },
            { text: 'Sıkı maliye politikası', correct: false },
            { text: 'Gelirler politikası', correct: false }
        ],
        aciklama: ['PARA POLİTİKALARI', 'Faiz artışı piyasadaki parayı çeker. Bu nedenle doğru cevap <b>Sıkı para politikası</b>dır.']
    },
    {
        soru: "Millî gelir bileşenlerinden net ihracatı (X - M) negatif değerde olan bir ülke için aşağıdakilerden hangisi kesinlikle doğrudur?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: "Ülkenin GSYH'si her yıl azalmaktadır", correct: false },
            { text: 'Ülke, dış ticaret açığı vermektedir <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Ülkede enflasyon çok yüksektir', correct: false },
            { text: 'Yatırımlar tüketimden fazladır', correct: false },
            { text: 'Döviz rezervleri sürekli artmaktadır', correct: false }
        ],
        aciklama: ['TİCARET AÇIĞI', 'İhracat < İthalat durumu dış ticaret açığıdır. Bu nedenle doğru cevap <b>Ülke, dış ticaret açığı vermektedir</b> olmalıdır.']
    },
    {
        soru: "Okun Yasası'na göre bir ekonomide büyüme oranı düştüğünde işsizlik oranı artar. Bir ülkede büyüme oranının %2 azalması durumunda işsizliğin %1 arttığı gözlemlenmiştir. Başlangıçta işsizlik %10 ve büyüme %4 iken büyüme %0'a gerilerse yeni işsizlik oranı yüzde kaç olur?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '11', correct: false },
            { text: '12 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '13', correct: false },
            { text: '14', correct: false },
            { text: '15', correct: false }
        ],
        aciklama: ['OKUN YASASI', "Büyüme %4'ten %0'a düşerse %4 azalmış olur. Her %2 azalış işsizliği %1 artırıyorsa %4 azalış %2 artırır. %10 + %2 = %12 olur."]
    },
    {
        soru: "Bir ekonomide 'Marjinal Tüketim Eğilimi' (c) 0,80'dir. (Formül: Çarpan = 1 / (1 - c)). Hükûmet kamu harcamalarını 100 milyon TL artırırsa bu durum millî geliri toplamda kaç milyon TL artırır?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '100', correct: false },
            { text: '200', correct: false },
            { text: '400', correct: false },
            { text: '500 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '800', correct: false }
        ],
        aciklama: ['MARJİNAL TÜKETİM EĞİLİMİ', 'Çarpan = 1 / (1 - 0,80) = 5. Etki = 100 * 5 = 500 milyon TL artırır.']
    },
    {
        soru: 'Türkiye ekonomisinin geçmiş dönemleri incelendiğinde 1929 Dünya Ekonomik Buhranı sırasında yaşanan durum aşağıdakilerden hangisidir?',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Hiperenflasyon', correct: false },
            { text: 'Deflasyon ve ekonomik daralma <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Stagflasyon', correct: false },
            { text: 'Aşırı büyüme', correct: false },
            { text: 'Para arzı patlaması', correct: false }
        ],
        aciklama: ['DEFLASYON', '1929 krizinde tüm dünyada talep çökmüş ve fiyatlar düşmüştür (Deflasyon). Bu nedenle doğru cevap <b>Deflasyon ve ekonomik daralma</b> olmalıdır.']
    },
    {
        soru: 'Aşağıdakilerden hangisi makroekonomik istikrarın temel kriterlerinden biri değildir? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Düşük ve istikrarlı enflasyon oranı', correct: false },
            { text: 'Sürdürülebilir büyüme oranı', correct: false },
            { text: 'Düşük işsizlik oranı', correct: false },
            { text: 'Bireysel kredi kartı limitlerinin yüksekliği <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Dış ticaret dengesi', correct: false }
        ],
        aciklama: ['BİREYSEL KREDİ LİMİTLERİ', 'Bireysel kredi/kredi kartı limitleri makroekonomik bir istikrar kriteri değildir.']
    },
    {
        soru: 'Stagflasyon döneminde bir merkez bankasının sadece enflasyona odaklanarak faizleri aşırı artırması hangi sorunun daha da derinleşmesine yol açabilir? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Fiyat artışlarının', correct: false },
            { text: 'Para bolluğunun', correct: false },
            { text: 'İşsizliğin ve durgunluğun <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Dış ticaret fazlasının', correct: false },
            { text: 'Bütçe fazlasının', correct: false }
        ],
        aciklama: ['STAGFLASYON DÖNEMİ', 'Stagflasyonda ekonomi zaten durgundur, faiz artışı üretimi daha da zorlaştırır ve işsizliği artırır. Bu nedenle doğru cevap <b>İşsizliğin ve durgunluğun</b> daha da derinleşmesine yol açar olmalıdır.']
    },
    {
        soru: "Bir ülkenin GSYH'si 1000 milyar dolar, nüfusu ise 50 milyondur. Kişi başı millî gelirin 25 000 dolara yükselmesi için GSYH'nin (nüfus sabitken) yüzde kaç büyümesi gerekir?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '10', correct: false },
            { text: '20', correct: false },
            { text: '25 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '40', correct: false },
            { text: '50', correct: false }
        ],
        aciklama: ['GAYRİ SAFİ YURTİÇİ HASILA', 'Mevcut kişi başı: 1000 milyar / 50 milyon = 20 000$. 25 000$ olması için %25 artış gerekir.']
    },
    {
        soru: 'Tüketicilerin gelecekte fiyatların düşeceğini bekleyerek tüketimlerini ertelemeleri, hangi ekonomik olgunun daha da şiddetlenmesine neden olur? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Enflasyon', correct: false },
            { text: 'Deflasyon <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Stagflasyon', correct: false },
            { text: 'Büyüme', correct: false },
            { text: 'İhracat patlaması', correct: false }
        ],
        aciklama: ['ENFLASYON', 'Fiyatların düşeceği beklentisi talebi durdurur, bu da deflasyon sarmalını derinleştirir. Bu nedenle doğru cevap <b>Deflasyon</b>dur.']
    },
    {
        soru: "Maliye politikası araçlarından biri olan 'vergilerin artırılması', makroekonomik olarak neyi amaçlar?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Piyasayı canlandırmayı', correct: false },
            { text: 'Toplam talebi kısarak enflasyonu dizginlemeyi <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'İşsizliği azaltmayı', correct: false },
            { text: 'İthalatı artırmayı', correct: false },
            { text: 'Para arzını artırmayı', correct: false }
        ],
        aciklama: ['VERGİLER', 'Vergi artışı halkın elindeki parayı azaltır, talebi kısar ve enflasyonu düşürmeyi hedefler. Bu nedenle doğru cevap <b>Toplam talebi kısarak enflasyonu dizginlemeyi</b> amaçlar olmalıdır.']
    },
    {
        soru: 'Arz eğrisinin (AS) sola kayması (maliyet artışları nedeniyle) sonucunda fiyatların artması ve üretimin azalması durumu aşağıdakilerden hangisini tetikler? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Talep enflasyonu', correct: false },
            { text: 'Maliyet enflasyonu ve stagflasyon <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Deflasyonist boşluk', correct: false },
            { text: 'Tam istihdam dengesi', correct: false },
            { text: 'Bütçe dengesi', correct: false }
        ],
        aciklama: ['ARZ', 'Arzın azalması maliyet enflasyonuna ve durgunluğa (stagflasyon) yol açar. Bu nedenle doğru cevap <b>Maliyet enflasyonu ve stagflasyon</b>u tetikler olmalıdır.']
    },
    {
        soru: "Bir makalede 'Ekonomide ısınma emareleri görülüyor.' ifadesi geçiyorsa bu durum aşağıdakilerden hangisine işaret eder?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Fiyatların hızla düşeceğine', correct: false },
            { text: 'Ekonominin küçüldüğüne', correct: false },
            { text: 'Toplam talebin arzı aşarak enflasyonist baskı yarattığına <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'İşsizliğin rekor seviyeye ulaştığına', correct: false },
            { text: 'İhracatın durduğuna', correct: false }
        ],
        aciklama: ['EKONOMİK ISINMA', 'Ekonominin ısınması, talebin üretim kapasitesini zorlaması ve enflasyon riskidir. Bu nedenle doğru cevap <b>Toplam talebin arzı aşarak enflasyonist baskı yarattığına</b> işaret eder olmalıdır.']
    },
    {
        soru: "'Lorenz Eğrisi' ve 'Gini Katsayısı' makroekonomide neyi ölçmek için kullanılır?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Enflasyon oranını', correct: false },
            { text: 'Dış ticaret açığını', correct: false },
            { text: 'Gelir dağılımındaki adaleti <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Vergi yükünü', correct: false },
            { text: 'Para arzını', correct: false }
        ],
        aciklama: ['GELİR DAĞILIMI', 'Bu iki araç gelir eşitsizliğini ölçer. Bu nedenle doğru cevap <b>Gelir dağılımındaki adaleti</b> ölçmek için kullanılır olmalıdır.']
    },
    {
        soru: "Bir ülkenin nominal faiz oranı %15, beklenen enflasyon oranı %10 ise 'Fisher denklemine' göre reel faiz oranı yüzde kaçtır?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '25', correct: false },
            { text: '15', correct: false },
            { text: '10', correct: false },
            { text: '5 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: '1,5', correct: false }
        ],
        aciklama: ['REEL FAİZ', 'Reel Faiz = Nominal - Enflasyon = 15 - 10 = 5 olur.']
    },
    {
        soru: "Aşağıdakilerden hangisi 'Otomatik İstikrar Sağlayıcılar'dan biridir?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: "Merkez Bankası'nın faiz kararı", correct: false },
            { text: 'Artan oranlı gelir vergisi <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Yeni bir köprü yapım kararı', correct: false },
            { text: 'Asgari ücret tespiti', correct: false },
            { text: 'Döviz müdahalesi', correct: false }
        ],
        aciklama: ['GELİR VERGİSİ', 'Gelir arttıkça vergi oranı otomatik artar, piyasayı soğutur; azaldıkça vergi düşer, piyasayı canlandırır. Bu nedenle doğru cevap <b>Artan oranlı gelir vergisi</b>dir.']
    },
    {
        soru: 'Millî geliri (Y) tüketim (C), yatırım (I), kamu harcaması (G) ve net ihracatın (NX) toplamı olarak kabul ettiğimizde; kamu harcamalarının bütçe açığı verilerek artırılması (G > Vergi) kısa vadede millî geliri nasıl etkiler?',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Azaltır', correct: false },
            { text: 'Değiştirmez', correct: false },
            { text: 'Artırır (genişlemeci etki) <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'Sadece ithalatı düşürür', correct: false },
            { text: 'Sadece tasarrufları artırır', correct: false }
        ],
        aciklama: ['KAMU HARCAMALARI', 'Kamu harcamalarındaki artış (G), formül gereği toplam geliri (Y) artırır. Bu nedenle doğru cevap <b>Artırır (genişlemeci etki)</b> olmalıdır.']
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