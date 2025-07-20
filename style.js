const VALUES = [
    {id: "scissors", value: "✌🏽"}, //0
    {id: "rock", value: "✊🏽"}, //1
    {id: "paper", value: "🖐🏽"}, //2
];

// phân tích theo logic
// khi nào người dùng thắng
// 0 - 2 = -2
// 2 - 1 = 1
// 1 - 0 = 1

// indexPlayer - indexComputer = 1 || -2 là thắng return 1
// indexPlayer - indexComputer = 0       là hòa   return 0
// còn lại                               là thua  return -1

let i = 0;
const hanldeChange = () => {
    let computer = document.querySelector("#computer");
    computer.textContent = VALUES[i].value;
    computer.setAttribute("data-id", VALUES[i].id);

    i = i === VALUES.length - 1 ? 0 : ++i;
};

let interval = setInterval(hanldeChange, 50);

// làm hàm so sánh 2 hình người chơi và máy 1 | 0 | -1
let compare = (valuePlayer, valueComputer) => {
    let indexPlayer = VALUES.findIndex((item) => item.id == valuePlayer);
    let indexComputer = VALUES.findIndex((item) => item.id == valueComputer);
    let result = indexPlayer - indexComputer;
    // kết luận
    if(result == 1 || result == -2) {
      return 1;  
    }else if(result == 0) {
        return 0;
    }else {
        return -1;
    }
};

// DOM tới 3 nút nhấn của người dùng
let playerItem = document.querySelectorAll(".user");

// duyệt qua từng nút 
playerItem.forEach((item) => {
    // nếu có 1 nút bị nhấn thì
    item.addEventListener("click", (event) => {
        // dừng con máy lại
        clearInterval(interval);
        // lấy giá trị của mình và máy lúc đó và so sánh
        let valuePlayer = event.target.id;
        let computer = document.querySelector("#computer");
        let valueComputer = computer.dataset.id; //getAttribute("data-id")
        let result = compare(valuePlayer, valueComputer);
        console.log(result);
        // xóa các actived của các nút
        playerItem.forEach((_item) => {
            _item.classList.remove("actived");
            _item.style.pointerEvents = "none";
        });
        // thêm actived cho nút vừa nhấn
        event.target.classList.add("actived");
        // thêm thông báo
        let alertDiv = document.createElement("div");
        alertDiv.classList.add("alert");
        let msg = "";

        if(result == 1){
            msg = "Bạn đã thắng máy";
            alertDiv.classList.add("alert-success");
        }else if(result == 0){
            msg = "Bạn đã hòa với máy"
            alertDiv.classList.add("alert-warning");
        }else{
            msg = "Bạn đã thua máy";
            alertDiv.classList.add("alert-danger");
        }
        alertDiv.textContent = msg;

        document.querySelector(".notification").appendChild(alertDiv);
        // hiện nút chơi lại
        document.querySelector("#play-again").classList.remove("d-none");
    });
});

document.querySelector("#play-again").addEventListener("click", () => {
    // cho bot chạy lại
    clearInterval(interval);
    interval = setInterval(hanldeChange, 50);
    // xóa thong báo
    document.querySelector(".notification").innerHTML = "";
    //  **text contetn sửa chữ, innerHTML truy cập vào thẻ
    // xóa nút chơi lại
    document.querySelector("#play-again").classList.add("d-none");   
    // xóa actived trên các nút và cho nút được bấm lại
    playerItem.forEach((item) => {
        item.classList.remove("actived");
        item.style.pointerEvents = ""; //khôi phục khả năng click
    });
});