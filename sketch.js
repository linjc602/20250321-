let buttons = []; // 選項按鈕
let nextButton; // 下一題按鈕
let result = ""; // 顯示結果的文字
let questionData; // 儲存從 CSV 讀取的題目資料
let currentQuestion = 0; // 當前題目的索引
let correctCount = 0; // 答對的題數
let incorrectCount = 0; // 答錯的題數

function preload() {
  // 載入 CSV 檔案
  questionData = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  // 產生一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);
  background("#bde0fe");

  // 建立選項按鈕
  for (let i = 0; i < 4; i++) {
    let button = createButton('');
    button.style('font-size', '20px');
    button.position(width / 2 - 100, height / 2 - 50 + i * 50);
    button.mousePressed(() => checkAnswer(i + 1)); // 按下按鈕時檢查答案
    buttons.push(button);
  }

  // 建立下一題按鈕
  nextButton = createButton('下一題');
  nextButton.style('font-size', '20px');
  nextButton.position(width / 2 - 50, height / 2 + 150);
  nextButton.mousePressed(nextQuestion);
  nextButton.hide(); // 初始隱藏

  // 顯示第一題
  displayQuestion();
}

function draw() {
  // 清除背景並重新繪製結果文字
  background("#bde0fe");
  textSize(35);
  textAlign(CENTER, CENTER);
  fill(0);

  if (currentQuestion < questionData.getRowCount()) {
    // 顯示題目
    let question = questionData.getString(currentQuestion, 'question');
    text(question, width / 2, height / 2 - 150);
  } else {
    // 測驗結束，清除畫布並顯示結果
    background("#bde0fe"); // 清除畫布
    text(`答對題數：${correctCount}`, width / 2, height / 2 - 50);
    text(`答錯題數：${incorrectCount}`, width / 2, height / 2);
  }

  // 顯示結果
  text(result, width / 2, height / 2 + 100);
}

function displayQuestion() {
  // 如果還有題目，顯示題目和選項
  if (currentQuestion < questionData.getRowCount()) {
    let question = questionData.getString(currentQuestion, 'question');
    let options = [
      questionData.getString(currentQuestion, 'option1'),
      questionData.getString(currentQuestion, 'option2'),
      questionData.getString(currentQuestion, 'option3'),
      questionData.getString(currentQuestion, 'option4'),
    ];

    // 顯示題目
    text(question, width / 2, height / 2 - 150);

    // 更新按鈕文字
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].html(options[i]);
      buttons[i].style('background-color', '#ffffff'); // 重置按鈕顏色
      buttons[i].show(); // 顯示按鈕
    }

    // 隱藏下一題按鈕
    nextButton.hide();
  }
}

function checkAnswer(selectedOption) {
  if (currentQuestion < questionData.getRowCount()) {
    let correctAnswer = parseInt(questionData.getString(currentQuestion, 'answer'));

    if (selectedOption === correctAnswer) {
      result = "答對了！";
      correctCount++;
    } else {
      result = "答錯了！";
      incorrectCount++;
    }

    // 隱藏選項按鈕，顯示下一題按鈕
    for (let button of buttons) {
      button.hide();
    }
    nextButton.show();
  }
}

function nextQuestion() {
  currentQuestion++;
  result = ""; // 清除「答對了」或「答錯了」的文字
  if (currentQuestion >= questionData.getRowCount()) {
    // 如果已經是最後一題，隱藏按鈕
    nextButton.hide();
  } else {
    displayQuestion(); // 顯示下一題
  }
}

// 當視窗大小改變時，調整畫布大小和按鈕位置
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].position(width / 2 - 100, height / 2 - 50 + i * 50);
  }
  nextButton.position(width / 2 - 50, height / 2 + 150);
}
