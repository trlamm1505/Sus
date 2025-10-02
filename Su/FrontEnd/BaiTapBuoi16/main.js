let integerArray = [];
let realArray = [];

function processArray() {
    const input = document.getElementById('arrayInput').value;
    integerArray = input.split(',').map(item => parseInt(item.trim()));
    document.getElementById('arrayOutput').innerHTML = `Mảng đã nhập: [${integerArray.join(', ')}]`;
}

// 1. Tổng các số dương trong mảng.
function sumPositiveNumbers() {
    if (integerArray.length === 0) {
        document.getElementById('result').innerText = 'Mảng không có phần tử!';
        return;
    }
    let sum = 0;
    for (let i = 0; i < integerArray.length; i++) {
        if (integerArray[i] > 0) {
            sum += integerArray[i];
        }
    }
    document.getElementById('result').innerText = `Tổng các số dương là: ${sum}`;
}


// 2. Đếm có bao nhiêu số dương trong mảng.
function countPositiveNumbers() {
    if (integerArray.length === 0) {
        document.getElementById('result').innerText = 'Mảng không có phần tử!';
        return;
    }
    let count=0;
    for (let i = 0; i < integerArray.length; i++) {
        if (integerArray[i] > 0) {
            count++;
        }
    }
    document.getElementById('result').innerText = `Có ${count} số dương trong mảng`;
}

// 3. Tìm số nhỏ nhất trong mảng.
function findMinNumber() {
    if (integerArray.length === 0) {
        document.getElementById('result').innerText = 'Mảng không có phần tử!';
        return;
    }else{
    let min = integerArray[0]; 
    for (let i = 1; i < integerArray.length; i++) {
        if (integerArray[i] < min) {
            min = integerArray[i]; 
        }
    }
    document.getElementById('result').innerText = `Số nhỏ nhất trong mảng là: ${min}`;
}
}


// 4. Tìm số dương nhỏ nhất trong mảng.
function findMinPositiveNumber() {
    if (integerArray.length === 0) {
        document.getElementById('result').innerText = 'Mảng không có phần tử!';
        return;
    }


    let positiveNumbers = [];
    for (let i = 0; i < integerArray.length; i++) {
        if (integerArray[i] > 0) {
            positiveNumbers.push(integerArray[i]);
        }
    }


    if (positiveNumbers.length === 0) {
        document.getElementById('result').innerText = 'Mảng không có số dương!';
        return;
    }

   
    let min = positiveNumbers[0]; 
    for (let i = 1; i < positiveNumbers.length; i++) {
        if (positiveNumbers[i] < min) {
            min = positiveNumbers[i]; 
        }
    }

    document.getElementById('result').innerText = `Số dương nhỏ nhất trong mảng là: ${min}`;
}


// 5. Tìm số chẵn cuối cùng trong mảng.
function findLastEven() {
    if (integerArray.length === 0) {
        document.getElementById('result').innerText = 'Mảng không có phần tử!';
        return;
    }
    let positiveNumbers = [];
    for (let i = 0; i < integerArray.length; i++) {
        if (integerArray[i] % 2 ===0) {
            positiveNumbers.push(integerArray[i]);
        }
    }
    if (positiveNumbers.length === 0) {
        document.getElementById('result').innerText = '-1';
        return;
    } else {
        let number=positiveNumbers[positiveNumbers.length-1];
        document.getElementById('result').innerText = `Số chẵn cuối cùng trong mảng là : ${number}`;
    }
}

// 6. Đổi chỗ 2 giá trị trong mảng.
function swapElements() {
    if (integerArray.length === 0) {
        document.getElementById('result').innerText = 'Mảng không có phần tử!';
        return;
    }
    const index1 = parseInt(prompt('Nhập vị trí 1 (index bắt đầu từ 0):'));
    const index2 = parseInt(prompt('Nhập vị trí 2 (index bắt đầu từ 0):'));
    if (!index1 || !index2) {
        document.getElementById('result').innerText = 'Vui lòng nhập giá trị.';
        return;
    }
    
    if (index1 >= 0 && index2 >= 0 && index1 < integerArray.length && index2 < integerArray.length) {
       
        let temp = integerArray[index1];  
        integerArray[index1] = integerArray[index2];  
        integerArray[index2] = temp; 

        document.getElementById('result').innerText = `Mảng sau khi đổi chỗ: [${integerArray.join(', ')}]`;
    } else {
        document.getElementById('result').innerText = 'Vị trí không hợp lệ';
    }
}


// 7. Sắp xếp mảng theo thứ tự tăng dần.
function sortArray() {
    if (integerArray.length === 0) {
        document.getElementById('result').innerText = 'Mảng không có phần tử!';
        return;
    }
    integerArray.sort((a, b) => a - b);
    document.getElementById('result').innerText = `Mảng sau khi sắp xếp: [${integerArray.join(', ')}]`;
}

// 8. Tìm số nguyên tố đầu tiên trong mảng.
function findFirstPrime() {
    if (integerArray.length === 0) {
        document.getElementById('result').innerText = 'Mảng không có phần tử!';
        return;
    }

    let primeNumbers = [];  

    for (let i = 0; i < integerArray.length; i++) {
        let num = integerArray[i];  
        let isPrime = true;  

       
        if (num <= 1) {
            isPrime = false;  
        }

       
        for (let j = 2; j < num; j++) {
            if (num % j === 0) {  
                isPrime = false;
                break;  
            }
        }

       
        if (isPrime) {
            primeNumbers.push(num);
        }
    }

    if(primeNumbers.length===0){
        document.getElementById('result').innerText = '-1';
        return;
    }else{
        let number=primeNumbers[primeNumbers.length-1];
        document.getElementById('result').innerText = `Số nguyên tố đầu tiên của mảng là : ${number}`;
    }
    
}


// 9. Đếm số nguyên trong mảng số thực.
function countIntegersInRealArray() {
    const input = prompt('Nhập mảng số thực, các số cách nhau bằng dấu phẩy (VD:1.5,2.5,...');
    
    if (!input) {
        document.getElementById('result').innerText = 'Vui lòng nhập giá trị.';
        return;
    }

    realArray = input.split(',').map(item => parseFloat(item.trim()));

    let count = 0;
    
    for (let i = 0; i < realArray.length; i++) {
        if (realArray[i] % 1 === 0) {
            count++;
        }
    }
    
    document.getElementById('result').innerText = `Có ${count} số nguyên trong mảng`;
}

// 10. So sánh số lượng số dương và số lượng số âm.
function comparePosNeg() {
    let positiveCount=0;
    for (let i = 0; i < integerArray.length; i++) {
        if (integerArray[i] > 0) {
            positiveCount++;
        }
    }
    let negativeCount=0;
    for (let i = 0; i < integerArray.length; i++) {
        if (integerArray[i] < 0) {
            negativeCount++;
        }
    }

    if (positiveCount > negativeCount) {
        document.getElementById('result').innerText = `Số lượng số dương nhiều hơn số lượng số âm.`;
    } else if (positiveCount < negativeCount) {
        document.getElementById('result').innerText = `Số lượng số âm nhiều hơn số lượng số dương.`;
    } else {
        document.getElementById('result').innerText = `Số lượng số dương và số âm bằng nhau.`;
    }
}
