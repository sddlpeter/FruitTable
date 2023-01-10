function $(id) {
    return document.getElementById(id);
}

window.onload=function(){
    updateZJ();
    var fruitTbl = $("tbl_fruit");
    var rows = fruitTbl.rows;

    for (var i = 0; i < rows.length - 1; i++) {
        var tr = rows[i];
        trBindEvent(tr);
    }

    $("addBtn").onclick=addFruit;
}


function trBindEvent(tr) {
    tr.onmouseover = showBGColor;
    tr.onmouseout = clearBGColor;
    var cells = tr.cells;
    var priceTD = cells[1];
    priceTD.onmouseover = showHand;
    priceTD.onclick = editPrice;

    var img = cells[4].firstChild;
    if (img && img.tagName == "IMG") {
        img.onclick = delFruit;
    }
}

function addFruit() {
    var fname = $("fname").value;
    var price = parseInt($("price").value);
    var fcount = parseInt($("fcount").value);
    var xj = price * fcount;

    var fruitTbl = $("tbl_fruit");
    var tr = fruitTbl.insertRow(fruitTbl.rows.length - 1);
    var fnameTD = tr.insertCell();
    fnameTD.innerText = fname;
    var priceTD = tr.insertCell();
    priceTD.innerText = price;
    var fcountTD = tr.insertCell();
    fcountTD.innerText = fcount;
    var xjTD = tr.insertCell();
    xjTD.innerText = xj;
    var imgTD = tr.insertCell();
    imgTD.innerHTML = "<img src = 'img/delete.png' class='delImg'/>";

    
    updateZJ();
    trBindEvent(tr);
}

function delFruit() {
    if (event && event.srcElement && event.srcElement.tagName == "IMG") {
        if (window.confirm("是否确认删除当前库存记录")) {
            var img = event.srcElement;
            var tr = img.parentElement.parentElement;
            var fruitTbl = $("tbl_fruit");
            fruitTbl.deleteRow(tr.rowIndex);
            updateZJ();
        }
    }
}

function editPrice() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var priceTD = event.srcElement;
        if (priceTD.firstChild && priceTD.firstChild.nodeType == 3) {
            var oldPrice = priceTD.innerText;
            priceTD.innerHTML = "<input type='text' size='4'/>";
            var input = priceTD.firstChild;
            if (input.tagName == "INPUT") {
                input.value = oldPrice;
                input.select();
                input.onblur = updatePrice;

                input.onkeydown = ckInput;
            }
        }
    }
}

function ckInput() {
    var kc = event.keyCode;
    // console.log(kc);
    if (!((kc >= 48 && kc <= 57) || kc == 8 || kc == 13)) {
        event.returnValue=false;
    }

    if (kc == 13) {
        event.srcElement.blur();
    }
}

function updatePrice() {
    if (event && event.srcElement && event.srcElement.tagName == "INPUT") {
        var input = event.srcElement;
        var newPrice = input.value;
        var priceTD = input.parentElement;
        priceTD.innerText = newPrice;
        updateXJ(priceTD.parentElement);
    }
}

function updateXJ(tr) {
    if (tr && tr.tagName == "TR") {
        var tds =  tr.cells;
        var price = tds[1].innerText;
        var count = tds[2].innerText;
        var xj = parseInt(price) * parseInt(count);
        tds[3].innerText = xj;
        updateZJ();
    }
}

function updateZJ() {
    var fruitTbl = $("tbl_fruit");
    var rows = fruitTbl.rows;
    var sum = 0;
    for (var i = 1; i < rows.length - 1; i++) {
        var tr = rows[i];
        var xj = parseInt(tr.cells[3].innerText);
        sum = sum + xj;
    }
    rows[rows.length - 1].cells[1].innerText = sum;
}

function showBGColor(){
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        var tr = td.parentElement;
        tr.style.backgroundColor = "navy";

        var tds = tr.cells;
        for (var i = 0; i < tds.length; i++) {
            tds[i].style.color = "white";
        }
    }
}

function clearBGColor(){
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        var tr = td.parentElement;
        tr.style.backgroundColor = "transparent";

        var tds = tr.cells;
        for (var i = 0; i < tds.length; i++) {
            tds[i].style.color = "black";
        }
    }
}

function showHand(){
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        td.style.cursor = "hand";
    }
}