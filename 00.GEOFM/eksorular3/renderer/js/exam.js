const sorularSirali_T = [
    {
        soru: 'Bir yatırımcı ana parasının bir kısmını yıllık %20 basit faizle, kalan kısmını yıllık %30 basit faizle bankaya yatırıyor. Yıl sonunda her iki miktardan elde edilen faiz gelirleri eşit olduğuna göre %20 ile yatırılan paranın toplam paraya oranı nedir?',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '2/3', correct: false },
            { text: "3/5 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '4/5', correct: false },
            { text: '1/2 ', correct: false },
            { text: '1/3', correct: false }
        ],
        aciklama: ['FAİZ', 'Birinci para P1, ikinci para P2 olsun.<br>P1 * 0,20 * 1 = P2 * 0,30 * 1. <br>Buradan 2P1 = 3P2 bulunur. <br>P1 = 3k, P2 = 2k olur. <br>Toplam para 5k. Oran: 3k/5k = 3/5 olur.']
    },
    {
        soru: 'Yıllık %40 basit faiz oranıyla bankaya yatırılan bir miktar para, kaçıncı ayın sonunda kendisinin yarısı kadar faiz geliri getirir?',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '12', correct: false },
            { text: "15 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '18', correct: false },
            { text: '20', correct: false },
            { text: '24', correct: false }
        ],
        aciklama: ['FAİZ', 'Faiz (F) = P * (40/100) * (t/12). F = P/2 olması isteniyor.<br>P/2 = P * 0,40 * t/12. 0,5 = 0,40 * t / 12. 6 = 0,40 * t. t = 6 / 0,40 = 15. ayın sonunda.']
    },
    {
        soru: 'Basit faizle yatırılan bir para 5 yılda kendisinin 3 katına çıkmaktadır. Aynı para, aynı faiz oranıyla kaç yılda kendisinin 5 katına çıkar? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '8', correct: false },
            { text: "10 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '12', correct: false },
            { text: '15', correct: false },
            { text: '20', correct: false }
        ],
        aciklama: ['BASİT FAİZ', '3 katına çıkması demek, 2 kat faiz getirmesi demektir (P ana para + 2P faiz). 5 yılda 2P faiz gelirse 5 katına çıkması (yani 4P faiz gelmesi) için 10 yıl gerekir.']
    },
    {
        soru: 'Yıllık %X bileşik faiz oranıyla bankaya yatırılan bir miktar para 2 yıl sonunda 1440 TL, 3 yıl sonunda ise 1728 TL olmaktadır. Buna göre yıllık faiz oranı %X kaçtır?',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '10', correct: false },
            { text: '15', correct: false },
            { text: "20 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '25', correct: false },
            { text: '30', correct: false }
        ],
        aciklama: ['BİLEŞİK FAİZ', '3. yılın sonundaki paranın 2. yılın sonundaki paraya oranı (1 + r) verir. 1728 / 1440 = 1,2. r = 0,2 yani %20’dir.']
    },
    {
        soru: '10 000 TL tutarındaki bir ana para, yıllık %20 faiz oranıyla bileşik faize yatırılıyor. Faiz 6 ayda bir (yarı yıllık) hesaplandığına göre 1. yıl sonundaki toplam miktar kaç TL olur? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '12 000', correct: false },
            { text: "12 100 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '12 200', correct: false },
            { text: '12 400', correct: false },
            { text: '14 400', correct: false }
        ],
        aciklama: ['BİLEŞİK FAİZ', "6 ayda bir faiz işliyorsa yıllık oran %20 ise 6 aylık oran %10'dur. 1 yılda 2 dönem vardır Miktar = 10 000 * (1 + 0,10)^2 = 10 000 * 1,21 = 12 100 TL olur"]
    },
    {
        soru: 'Sürekli bileşik faiz formülü olan A = P * e^(r*t) ifadesinde; r yıllık faiz oranını, t ise yılı temsil eder. Yıllık %100 sürekli bileşik faiz oranıyla yatırılan bir para, yaklaşık kaç yıl sonra başlangıçtaki değerinin e^2 katına ulaşır? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '1', correct: false },
            { text: '2 <span style="color: #ff0008ff;"">*</style>', correct: true },
            { text: 'e', correct: false },
            { text: "0,5", correct: false },
            { text: '4', correct: false }
        ],
        aciklama: ['SÜREKLİ BİLEŞİK FAİZ', 'A = P * e^(rt). P * e^2 = P * e^(1t). Tabanlar aynı olduğundan t = 2 olur.']
    },
    {
        soru: 'Bir banka, mevduatlara yıllık %60 basit faiz uygulamaktadır. Başka bir banka ise yıllık %50 bileşik faiz uygulamaktadır. Parasını 2 yıllığına yatıracak bir müşteri için bileşik faizi seçmenin getirisi, basit faize göre ana paranın yüzde kaçı kadar daha fazladır? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: "5 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '10', correct: false },
            { text: '15', correct: false },
            { text: '20', correct: false },
            { text: '25', correct: false }
        ],
        aciklama: ['BASİT FAİZ', 'Basit faiz: P * (1 + 0,60 * 2) = 2,2P. Bileşik faiz: P * (1 + 0,50)^2 = 2,25P Fark: 2,25 - 2,2 = 0,05P (Yani %5) daha fazladır.']
    },
    {
        soru: "Bir miktar para yıllık %10 bileşik faizle 2 yıllığına bankaya yatırılıyor. Eğer bu para aynı süre ve aynı oranla basit faize yatırılsaydı, 100 TL daha az faiz alınacaktı. Buna göre başlangıçtaki ana para kaç TL'dir?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '5000', correct: false },
            { text: '7500', correct: false },
            { text: "10 000 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '15 000', correct: false },
            { text: '20 000', correct: false }
        ],
        aciklama: ["BİLEŞİK FAİZ", "Bileşik faiz: P * (1,1^2 - 1) = 0,21P. Basit faiz: P * 0,10 * 2 = 0,20P Fark: 0,01P = 100 TL. P = 10 000 TL'dir."]
    },
    {
        soru: 'e sayısı, (1 + 1/n)^n ifadesinin sonsuzdaki değeridir. Bu tanıma göre bir bankanın faiz hesaplama sıklığını (n) artırması aşağıdakilerden hangisine neden olur? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Toplam faiz geliri azalır', correct: false },
            { text: "Toplam faiz geliri sabit bir sınıra (e tabanlı) yaklaşarak artar <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: 'Faiz geliri sonsuza gider', correct: false },
            { text: 'Ana para zamanla erir', correct: false },
            { text: 'Basit faiz ile bileşik faiz eşitlenir', correct: false }
        ],
        aciklama: ['E SAYISI', 'e sayısının tanımı gereği faiz ekleme sıklığı arttıkça getiri artar ancak bu artış e tabanlı bir limitle sınırlıdır. Bu nedenle doğru cevap <b>Toplam faiz geliri sabit bir sınıra (e tabanlı) yaklaşarak artar</b> olmalıdır.']
    },
    {
        soru: 'Yıllık %24 faiz oranı uygulayan bir banka, faizi aylık olarak ana paraya eklemektedir (bileşik faiz). Bu bankaya yatırılan paranın 2 ay sonundaki toplam faiz oranı (efektif oran) yüzde kaçtır? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '4,00', correct: false },
            { text: "4,04 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '4,40', correct: false },
            { text: '4,80', correct: false },
            { text: '5,00', correct: false }
        ],
        aciklama: ['FAİZ', "Yıllık %24 ise aylık %2'dir. 2 ay sonunda: (1,02)^2 - 1 = 1,0404 - 1 = 0,0404 yani %4,04'tür."]
    },
    {
        soru: "Bir borç, yıllık %50 basit faizle 3 yıllığına alınmıştır. Vade sonunda ödenen toplam tutar (ana para + faiz) 25 000 TL olduğuna göre alınan borcun ana parası kaç TL'dir? ",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: "10 000 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '12 000', correct: false },
            { text: '12 500', correct: false },
            { text: '15 000', correct: false },
            { text: '16 000', correct: false }
        ],
        aciklama: ['BORÇLAR', 'Toplam = P * (1 + r * t). 25 000 = P * (1 + 0,50 * 3) = P * 2,5 P = 10 000 TL’dir.']
    },
    {
        soru: 'Bileşik faizle yatırılan bir para 4. yılın sonunda 2000 TL, 8. yılın sonunda 8000 TL olmuştur. Bu para 12. yılın sonunda kaç TL olur? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '14 000', correct: false },
            { text: '16 000', correct: false },
            { text: '24 000', correct: false },
            { text: "32 000 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '64 000', correct: false }
        ],
        aciklama: ['BİLEŞİK FAİZ', 'Bileşik faizde para belirli aralıklarla aynı kat sayı ile büyür. 4 yılda 4 katına çıkmıştır (8000 / 2000 = 4). Bir 4 yıl daha geçince yine 4 katına çıkar. 8000 * 4 = 32 000 TL olur.']
    },
    {
        soru: 'Sürekli bileşik faiz modelinde (A = P * e^(r*t)), yıllık %50 (r=0,50) faiz oranıyla yatırılan bir paranın 4 yıl sonraki değeri, başlangıçtaki paranın kaç katıdır? (e yaklaşık 2,71)',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'e', correct: false },
            { text: "e^2 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: 'e^4', correct: false },
            { text: '2e', correct: false },
            { text: 'e/2', correct: false }
        ],
        aciklama: ['SÜREKLİ BİLEŞİK FAİZ', 'A = P * e^(0,50 * 4) = P * e^2 Kat sayısı e^2 olur.']
    },
    {
        soru: "Basit faizde 'Faiz = Ana Para * Faiz Oranı * Zaman' formülü kullanılır. Bir miktar para yıllık %25 faiz oranıyla yatırılıyor. Kaç gün sonra (1 yıl = 360 gün) faiz miktarı ana paranın 1/8'i kadar olur?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '120', correct: false },
            { text: '150', correct: false },
            { text: "180 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '200', correct: false },
            { text: '210', correct: false }
        ],
        aciklama: ['BASİT FAİZ', 'Faiz = P * 0,25 * t / 360. P/8 = P * 0,25 * t / 360. 0,125 = 0,25 * t / 360. 0,5 = t / 360 t = 180 gün.']
    },
    {
        soru: "Yıllık %20 bileşik faizle yatırılan bir paranın, basit faizle yatırılan aynı miktardaki paradan (yıllık %20 oranla) 3 yıl sonunda ana paranın %7,2'si kadar daha fazla kazandırması için ana para ne olmalıdır? (Not: Bu soru oranlar arasındaki farkın doğasını ölçer.)",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '1000', correct: false },
            { text: '10 000', correct: false },
            { text: "Herhangi bir tutar (oran ana paraya bağlı değildir) yoktur. <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '5000', correct: false },
            { text: '7200', correct: false }
        ],
        aciklama: ['BİLEŞİK FAİZ', 'Faiz oranları ve süre verildiğinde aradaki farkın ana paraya oranı (yüzdesi) sabittir. Bu yüzden her ana para için bu geçerlidir.']
    },
    {
        soru: "Bir yatırımcı 100 000 TL'sini yıllık sürekli bileşik faiz veren bir hesaba yatırıyor. 10 yıl sonra parası 100 000 * e^0,8 TL olduğuna göre yıllık sürekli faiz oranı (r) yüzde kaçtır?",
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '4', correct: false },
            { text: "8 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '10', correct: false },
            { text: '12', correct: false },
            { text: '16', correct: false }
        ],
        aciklama: ['SÜREKLİ BİLEŞİK FAİZ', 'P * e^(r * 10) = P * e^0,8. 10r = 0,8. r = 0,08 yani %8’dir.']
    },
    {
        soru: 'Yıllık %10 basit faizle yatırılan 5000 TL ile yıllık %10 bileşik faizle yatırılan 5000 TL arasındaki fark 10 yıl sonunda yaklaşık ne kadar olur? (1,1^10 yaklaşık 2,59) ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '500', correct: false },
            { text: '1500', correct: false },
            { text: "2950 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '3500', correct: false },
            { text: '5000', correct: false }
        ],
        aciklama: ['BASİT FAİZ', 'Basit faiz sonu para: 5000 + (5000 * 0,1 * 10) = 10 000 TL Bileşik faiz: 5000 * 2,59 = 12 950 TL Fark: 2950 TL olur.']
    },
    {
        soru: 'Aşağıdaki durumlardan hangisinde e sayısı finansal bir hesaplamanın doğrudan parçasıdır? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: 'Yılda bir kez faiz ödemeli tahvillerde ', correct: false },
            { text: 'Basit faizli tüketici kredilerinde ', correct: false },
            { text: "Faiz hesaplama aralığı anlık (sürekli) olan işlemlerde <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: 'Sadece döviz kurları arasındaki paritede ', correct: false },
            { text: 'Vadesiz mevduatların vergilendirilmesinde', correct: false }
        ],
        aciklama: ['EULER SAYISI', 'e sayısı sürekli (anlık) değişim ve büyüme modellerinin matematiksel temelidir.']
    },
    {
        soru: 'Bir miktar ana para (P), yıllık %r bileşik faizle t yıl süreyle yatırılıyor. t=2 için toplam para 1,21P ise r kaçtır? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '5', correct: false },
            { text: "10 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '15', correct: false },
            { text: '20', correct: false },
            { text: '21', correct: false }
        ],
        aciklama: ['BİLEŞİK FAİZ', 'P * (1 + r)^2 = 1,21P. (1 + r)^2 = (1,1)^2. 1 + r = 1,1 r = 0,10 yani %10’dur.']
    },
    {
        soru: 'Bankaya yatırılan bir miktar para basit faizle 20 ayda kendisinin 2 katına çıkıyorsa yıllık faiz oranı yüzde kaçtır? ',
        tipi: 'cs',
        puan: 5,
        secenekler: [
            { text: '40', correct: false },
            { text: '50', correct: false },
            { text: "60 <span style='color: #ff0008ff;'>*</style>", correct: true },
            { text: '72', correct: false },
            { text: '80', correct: false }
        ],
        aciklama: ['BASİT FAİZ', '2 katına çıkması için faizin ana paraya eşit olması gerekir (F=P). P = P * r * (20/12). 1 = r * 5/3. r = 3/5 = 0,60 yani %60 olur.']
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