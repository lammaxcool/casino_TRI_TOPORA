function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
function rand(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
var pts_value = document.getElementsByClassName("pts");
var pts = 0;
function change_pts(a)
{
    pts += a;
    pts_value[0].innerText = pts;
}
change_pts(100);
var add = document.getElementsByClassName("add");
add[0].addEventListener("click", ()=>{change_pts(100)});


async function rotate(i, _number)
{ 
    let hidden_top = document.getElementsByClassName("hidden_top");
    let hidden3 = document.getElementsByClassName("hidden3");
    let hidden2 = document.getElementsByClassName("hidden2");
    let hidden1 = document.getElementsByClassName("hidden1");
    let hidden_bottom = document.getElementsByClassName("hidden_bottom");
    let violet_bottom = document.getElementsByClassName("violet_bottom");
    let active = document.getElementsByClassName("active");
    let violet_top = document.getElementsByClassName("violet_top");
    for(let j = 0; j < _number; j++)
    {
        temp = violet_bottom[i];
        
        active[i].className = active[i].className.replace("active","violet_bottom");
       
        violet_top[i].className = violet_top[i].className.replace("violet_top","active");
       
        hidden_top[i].className = hidden_top[i].className.replace("hidden_top","violet_top");
       
        hidden3[i].className = hidden3[i].className.replace("hidden3","hidden_top");
       
        hidden2[i].className = hidden2[i].className.replace("hidden2","hidden3");
       
        hidden1[i].className = hidden1[i].className.replace("hidden1","hidden2");
       
        hidden_bottom[i].className = hidden_bottom[i].className.replace("hidden_bottom","hidden1");
        
        temp.className = violet_bottom[i].className.replace("violet_bottom","hidden_bottom");
        await sleep(200);
    }
}

var isOnClick = false;
function rotate_all()
{
    if(pts >= 20)
    {
        change_pts(-20);
        for(let i = 0; i < 8; i++)
        {
            rotate(i, rand(10, 20));
        }
    }
    else
    {
        alert("Not enough pts");
        return;
    }
}
var start = document.getElementsByClassName("start");
start[0].addEventListener("click", async ()=>
{
    start[0].style.backgroundColor = "red"; 
    if(!isOnClick)
    {
        isOnClick = true;
        rotate_all();
        await sleep(4000);
        check_wins();
        isOnClick = false; 
        start[0].style.backgroundColor = "rgb(14, 165, 19)"; 
    }
});

var BAN = 2;
var BELL = 2;
var CHER = 3;
var JOK = 3;
var BAG = 4;
var ORG = 4;
var CRD = 5;
var RCT = 6;
var ANY;
var PTS_5 = [50, 70, 90, 110, 130, 150, 170, 250];
var PTS_4 = [16, 16, 36, 36, 64, 64, 100, 144];
var PTS = [2, 2, 3, 3, 4, 4, 5, 6];

function check_wins()
{
    let array_img = document.getElementsByClassName("active");
    let array_alt = [];

    console.log(array_img);

    for(let i = 0; i < 5; i++)
    {
        array_alt[i] = array_img[i].getAttribute("alt");
    }

    console.log(array_alt);

    let array_num = [0, 0, 0, 0, 0, 0, 0, 0];

    for(let i = 0; i < 5; i++)
    {
        if(array_alt[i] == "BAN")
            array_num[0] += 1;
        if(array_alt[i] == "BELL")
            array_num[1] += 1;
        if(array_alt[i] == "CHER")
            array_num[2] += 1;
        if(array_alt[i] == "JOK")
            array_num[3] += 1;
        if(array_alt[i] == "BAG")
            array_num[4] += 1;
        if(array_alt[i] == "ORG")
            array_num[5] += 1;
        if(array_alt[i] == "CRD")
            array_num[6] += 1;
        if(array_alt[i] == "RCT")
            array_num[7] += 1;   
    }

    console.log(array_num);
        
    for(let i = 0; i < 8; i++)
    {
        if(array_num[i] == 5)
        {
            change_pts(PTS_5[i]);
            return;
        }
        if(array_num[i] == 4)
        {
            change_pts(PTS_4[i]);
            return;
        }
        if(array_num[i] == 3)
        {
            let j;
            for(j = 0; j < 8; j++)
            {
                if(array_num[j] == 2)
                    break;
            }
            if(j < 8)
            {
                change_pts(3 * (PTS[i] + 1) + 2 * PTS[j]);
                return;
            }
            else 
                change_pts(2 * PTS[i]);
        }
        if(array_num[i] == 2)
        {
            let j;
            for(j = 0; j < 8; j++)
            {
                if(j == i)
                    continue;
                if(array_num[j] == 3)
                    break;
            }
            if(j < 8)
            {
                change_pts(3 * (PTS[i] + 1) + 2 * PTS[j]);
                return;
            }
            for(j = 0; j < 8; j++)
            {
                if(j == i)
                    continue;
                if(array_num[j] == 2)
                    break;
            }
            if(j < 8)
            {
                change_pts(2 * PTS[i] + 2 * PTS[j]);
                return;
            }
            change_pts(2 * PTS[i]);
        }
    }
}