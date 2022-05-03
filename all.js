let data = [];
let condition = "全部";


const txt = document.querySelector(".input_text");
const addContent = document.querySelector(".btn_add");
const tab = document.querySelector(".tab");
const list = document.querySelector(".list");
const delCompletedTask = document.querySelector(".deleteList");
const taskNum = document.querySelector(".taskNum")


// 增加待辦項目
addContent.addEventListener("click", e => {

    if(txt.value != ""){
        let toDo = {
            content: txt.value,
            done: false,
            index: data.length
        };
    
        data.push(toDo);
        renderData(condition);
    }

})


// 當點擊全部、待完成、已完成  使之為active
tab.addEventListener("click", e => {

    if (e.target.nodeName == "LI") {
        let tableSelect = document.querySelectorAll(".tableSelect");
        tableSelect.forEach(item => {
            item.className = "tableSelect";
        })
        e.target.className = "tableSelect active";

        condition = e.target.textContent;
        renderData(condition);
    }
})


// 刪除項目 + 完成項目
list.addEventListener("click", e => {

    if (e.target.className == "delete") {
        let index = e.target.getAttributeNode("data-deleteNum").value;
        data.splice(index, 1);
        renderData(condition);
    }

    else {
        let index = e.target.getAttributeNode("data-Num").value;
        let checked = e.target.checked;

        if (checked == true) {
            data[index].done = true;
        }
        else {
            data[index].done = false;
        }

    }

})



// 刪除已完成項目
delCompletedTask.addEventListener("click", e => {

    data = data.filter((item) => {
        return item.done == false;
    })
    renderData(condition);
})



let resetOrder = () => {
    data.forEach((item, index) => {
        item.index = index;
        console.log("有數值");
    })
}


let renderData = (condition) => {

    let str = "";
    let taskCount = 0;
    resetOrder();

    if (condition == "全部") {
        data.forEach((item, index) => {
            if (item.done == true) {
                str += `<li><label class="checkbox" for=""><input type="checkbox" data-Num=${index} checked><span>${item.content}</span></label><a href="#" class="delete" data-deleteNum=${index}></a></li>`;
            }
            else {
                str += `<li><label class="checkbox" for=""><input type="checkbox" data-Num=${index}><span>${item.content}</span></label><a href="#" class="delete" data-deleteNum=${index}></a></li>`;
            }
        })
        taskCount = data.length;

    }
    else if (condition == "待完成") {
        data.forEach((item, index) => {
            if (item.done == false) {
                str += `<li><label class="checkbox" for=""><input type="checkbox" data-Num=${index}><span>${item.content}</span></label><a href="#" class="delete" data-deleteNum=${index}></a></li>`;
                taskCount += 1;
            }
        })

    }

    else {
        data.forEach((item, index) => {
            if (item.done == true) {
                str += `<li><label class="checkbox" for=""><input type="checkbox" data-Num=${index} checked><span>${item.content}</span></label><a href="#" class="delete" data-deleteNum=${index} ></a></li>`;
                taskCount += 1;
            }
        })
    }

    list.innerHTML = str;

    if (condition == "全部") {
        taskNum.textContent = `${taskCount}個項目`;
    }
    else {
        taskNum.textContent = `${taskCount}個${condition}項目`;
    }
}

