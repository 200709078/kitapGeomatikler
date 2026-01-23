document.addEventListener('DOMContentLoaded', () => {
  const isPortait = document.querySelector('#isPotrait')
  const alert = document.querySelector('#alert')

  window.addEventListener("load", checkPotrait);
  window.addEventListener("resize", checkPotrait);

  document.addEventListener('contextmenu', event => event.preventDefault())

  function checkPotrait() {
    if (screen.width < screen.height) {
      alert.style.display = 'block'
      isPortait.style.display = 'none'
    } else {
      isPortait.style.display = 'block'
      alert.style.display = 'none'
    }
  }

  const userGrid = document.querySelector('.grid-user')
  const computerGrid = document.querySelector('.grid-computer')
  const infoDisplay = document.querySelector('#info')
  const btnCont = document.querySelector('#cont-btn')
  const startButton = document.querySelector('#btn-start')
  const queueContainer = document.querySelector('#queue')

  const pcTitle = document.querySelector('.you-title')
  const youTitle = document.querySelector('.computer-title')
  const timerContainer = document.querySelector('#timer-container')
  const timer = document.querySelector('#timer')

  const width = 10
  let userSquares = []
  let computerSquares = []
  let isGameOver = false
  let currentPlayer = null
  let playCount = 0
  let youCount = 0
  let pcCount = 0
  let shotFired = -1
  let userPlay = true
  let time = 0
  let myTime

  let destroyerCount = 0
  let submarineCount = 0
  let cruiserCount = 0
  let battleshipCount = 0
  let carrierCount = 0

  let cpuDestroyerCount = 0
  let cpuSubmarineCount = 0
  let cpuCruiserCount = 0
  let cpuBattleshipCount = 0
  let cpuCarrierCount = 0

  const shipArray = [
    {
      name: 'destroyer',
      directions: [
        [0, 1],
        [0, width]
      ]
    },
    {
      name: 'submarine',
      directions: [
        [0, 1, 2],
        [0, width, width * 2]
      ]
    },
    {
      name: 'cruiser',
      directions: [
        [0, 1, 2],
        [0, width, width * 2]
      ]
    },
    {
      name: 'battleship',
      directions: [
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3]
      ]
    },
    {
      name: 'carrier',
      directions: [
        [0, 1, 2, 3, 4],
        [0, width, width * 2, width * 3, width * 4]
      ]
    },
  ]
  const upGridUser = document.querySelector('.up-user')
  createUp(upGridUser)
  const upGridComputer = document.querySelector('.up-computer')
  createUp(upGridComputer)
  const leftGridUser = document.querySelector('.left-user')
  createLeft(leftGridUser)
  const leftGridComputer = document.querySelector('.left-computer')
  createLeft(leftGridComputer)

  createBoard(userGrid, userSquares)
  createBoard(computerGrid, computerSquares)

  queueContainer.style.display = 'none'
  timerContainer.style.display = 'none'

  startButton.addEventListener('click', () => {
    if (startButton.innerHTML == 'Yeni Oyun') {
      timerContainer.style.display = 'none'
      timer.innerHTML = '0 s'
      infoDisplay.innerHTML = "Oyun henüz deneme aşamasındadır."
      btnCont.style.visibilty = false
      startButton.innerHTML = 'Başlat'

      userSquares.forEach(square => {
        square.removeAttribute("class")
      })
      computerSquares.forEach(square => {
        square.removeAttribute("class")
      })

      isGameOver = false
      shotFired = -1
      userPlay = false;

      destroyerCount = 0
      submarineCount = 0
      cruiserCount = 0
      battleshipCount = 0
      carrierCount = 0

      cpuDestroyerCount = 0
      cpuSubmarineCount = 0
      cpuCruiserCount = 0
      cpuBattleshipCount = 0
      cpuCarrierCount = 0

    } else {
      myTime = setInterval(setSecond, 1000)
      if (playCount % 2 == 0) {
        currentPlayer = 'user'
        userPlay = true
      } else {
        currentPlayer = 'enemy'
      }
      playCount++

      infoDisplay.innerHTML = ''
      btnCont.style.display = 'none'
      queueContainer.style.display = 'block'
      timerContainer.style.display = 'block'

      generate(shipArray[0], computerSquares)
      generate(shipArray[1], computerSquares)
      generate(shipArray[2], computerSquares)
      generate(shipArray[3], computerSquares)
      generate(shipArray[4], computerSquares)

      generate(shipArray[0], userSquares)
      generate(shipArray[1], userSquares)
      generate(shipArray[2], userSquares)
      generate(shipArray[3], userSquares)
      generate(shipArray[4], userSquares)

      playGame()
    }

  })

  function createUp(grid) {
    for (let i = 0; i < 11; i++) {
      const upSquare = document.createElement('div')
      if (i == 0) {
        upSquare.innerHTML = ''
      } else {
        upSquare.innerHTML = String.fromCharCode(i + 64)
      }
      grid.appendChild(upSquare)
    }
  }

  function createLeft(grid) {
    for (let i = 1; i < 11; i++) {
      const leftSquare = document.createElement('div')
      leftSquare.innerHTML = i
      grid.appendChild(leftSquare)
    }
  }


  function createBoard(grid, squares) {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.dataset.id = i
      grid.appendChild(square)
      squares.push(square)
    }
  }

  function generate(ship, squares) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) direction = 1
    if (randomDirection === 1) direction = 10
    let randomStart = Math.abs(Math.floor(Math.random() * squares.length - (ship.directions[0].length * direction)))

    const isTaken = current.some(index => squares[randomStart + index].classList.contains('taken'))
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)
    let directionis = null
    let startendis = null

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {

      if (squares === userSquares) {
        if (current[current.length - 1] < 10) {
          directionis = 'horizontal'
        } else {
          directionis = 'vertical'
        }
      }

      current.forEach(index => {
        if (squares === userSquares) {
          if (index == 0) {
            startendis = 'start'
          } else if (index == current[current.length - 1]) {
            startendis = 'end'
          } else {
            startendis = 'undefined'
          }
        }

        squares[randomStart + index].classList.add('taken', directionis, startendis, ship.name)
      })
    }
    else {
      generate(ship, squares)
    }
  }

  function playGame() {
    if (isGameOver) return
    if (currentPlayer === 'user') {
      queueContainer.innerHTML = '<span>SİZ </span><img width="50px" src="img/rightarrow.svg" draggable="false">'
      computerSquares.forEach(square => square.addEventListener('click', function (e) {
        shotFired = square.dataset.id
        revealSquare(square.classList)
      }))
    }
    if (currentPlayer === 'enemy') {
      queueContainer.innerHTML = '<img width="50px" src="img/leftarrow.svg" draggable="false"><span> BİLGİSAYAR</span>'
      userPlay = false
      let rnd = Math.floor(Math.random() * 2) * 500 + 500
      setTimeout(enemyPlay, rnd)
    }
  }

  function revealSquare(classList) {
    if (!userPlay) return
    if (isGameOver) return
    const enemySquare = computerGrid.querySelector(`div[data-id='${shotFired}']`)
    const obj = Object.values(classList)
    if (!enemySquare.classList.contains('boom') && currentPlayer === 'user' && !isGameOver) {
      if (obj.includes('destroyer')) destroyerCount++
      if (obj.includes('submarine')) submarineCount++
      if (obj.includes('cruiser')) cruiserCount++
      if (obj.includes('battleship')) battleshipCount++
      if (obj.includes('carrier')) carrierCount++
    }
    if (obj.includes('taken')) {
      enemySquare.classList.add('boom')
    } else {
      enemySquare.classList.add('miss')
    }
    checkForWins(shotFired)
    currentPlayer = 'enemy'
    playGame()
  }

  let hitList = []
  function enemyPlay(square) {
    if (userPlay) return
    if (isGameOver) return
    square = Math.floor(Math.random() * userSquares.length)
    console.log(square + ' bazen hata veriyor.')
    if (hitList.includes(square)) {
      enemyPlay()
    } else {
      hitList.push(square)
      if (!userSquares[square].classList.contains('boom')) {
        const hit = userSquares[square].classList.contains('taken')
        userSquares[square].classList.add(hit ? 'boom' : 'miss')
        if (userSquares[square].classList.contains('destroyer')) cpuDestroyerCount++
        if (userSquares[square].classList.contains('submarine')) cpuSubmarineCount++
        if (userSquares[square].classList.contains('cruiser')) cpuCruiserCount++
        if (userSquares[square].classList.contains('battleship')) cpuBattleshipCount++
        if (userSquares[square].classList.contains('carrier')) cpuCarrierCount++
        checkForWins(square)
      } else enemyPlay()
      currentPlayer = 'user'
      queueContainer.innerHTML = '<span>SİZ </span><img width="50px" src="img/rightarrow.svg" draggable="false">'
    }
    userPlay = true
  }

  let say = 0
  function checkForWins(square) {
    say++
    let enemy = 'Bilgisayar'
    if (currentPlayer == 'enemy' && userSquares[square].classList.contains('boom')) {
      let shipName = userSquares[square].classList[userSquares[square].classList.length - 2]
      let shipNameTR
      switch (shipName) {
        case 'destroyer':
          shipNameTR = "muhrip gemini";
          break;
        case 'submarine':
          shipNameTR = "denizaltı gemini";
          break;
        case 'cruiser':
          shipNameTR = "kruvazörünü";
          break;
        case 'battleship':
          shipNameTR = "savaş gemini";
          break;
        case 'carrier':
          shipNameTR = "amiral gemini";
          break;
      }
      infoDisplay.innerHTML = enemy + " " + shipNameTR + " vurdu."
    }
    if (currentPlayer == 'user' && computerSquares[square].classList.contains('boom')) {
      let shipName = computerSquares[square].classList[computerSquares[square].classList.length - 2]
      let shipNameTR
      switch (shipName) {
        case 'destroyer':
          shipNameTR = "muhrip gemisini";
          break;
        case 'submarine':
          shipNameTR = "denizaltı gemisini";
          break;
        case 'cruiser':
          shipNameTR = "kruvazörünü";
          break;
        case 'battleship':
          shipNameTR = "savaş gemisini";
          break;
        case 'carrier':
          shipNameTR = "amiral gemisini";
          break;
      }
      infoDisplay.innerHTML = enemy + "ın " + shipNameTR + " vurdun."
    }
    if (destroyerCount === 2) {
      infoDisplay.innerHTML = enemy + "ın muhrip gemisini batırdın."
      destroyerCount++
    }
    if (submarineCount === 3) {
      infoDisplay.innerHTML = enemy + "ın denizaltı gemisini batırdın."
      submarineCount++
    }
    if (cruiserCount === 3) {
      infoDisplay.innerHTML = enemy + "ın kruvazörünü batırdın."
      cruiserCount++
    }
    if (battleshipCount === 4) {
      infoDisplay.innerHTML = enemy + "ın savaş gemisini batırdın."
      battleshipCount++
    }
    if (carrierCount === 5) {
      infoDisplay.innerHTML = enemy + "ın amiral gemisini batırdın."
      carrierCount++
    }
    if (cpuDestroyerCount === 2) {
      infoDisplay.innerHTML = enemy + " muhrip gemini batırdı."
      cpuDestroyerCount++
    }
    if (cpuSubmarineCount === 3) {
      infoDisplay.innerHTML = enemy + " denizaltı gemini batırdı."
      cpuSubmarineCount++
    }
    if (cpuCruiserCount === 3) {
      infoDisplay.innerHTML = enemy + " kruvazörünü batırdı."
      cpuCruiserCount++
    }
    if (cpuBattleshipCount === 4) {
      infoDisplay.innerHTML = enemy + " savaş gemini batırdı."
      cpuBattleshipCount++
    }
    if (cpuCarrierCount === 5) {
      infoDisplay.innerHTML = enemy + " amiral gemini batırdı."
      cpuCarrierCount++
    }
    if ((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 22) {
      infoDisplay.innerHTML = "SİZ KAZANDINIZ!"
      btnCont.style.display = 'block'
      youCount++
      youTitle.innerHTML = 'SİZ (' + youCount + ')'
      gameOver()
    }
    if ((cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount) === 22) {
      infoDisplay.innerHTML = "BİLGİSAYAR KAZANDI!"
      btnCont.style.display = 'block'
      pcCount++
      pcTitle.innerHTML = 'BİLGİSAYAR (' + pcCount + ')'
      gameOver()
    }
  }

  function gameOver() {
    isGameOver = true
    currentPlayer = null
    queueContainer.style.display = 'none'
    btnCont.style.visibilty = true
    startButton.style.visibilty = true
    startButton.innerHTML = 'Yeni Oyun'
    clearInterval(myTime)
    time = 0
  }

  function setSecond() {
    time++
    timer.innerHTML = time + ' s'
  }
})