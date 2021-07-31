let fs = require("fs");
let path = require("path");
let inputArr = process.argv.slice(2);
let optionArr=[];
let filesArr=[];
for(let i=0;i<inputArr.length;i++){
    let firstChar=inputArr[i].charAt(0);
    if(firstChar=="-"){
        optionArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}

for(let i=0;i<filesArr.length;i++){
    let ans=fs.existsSync(filesArr[i]);
    if(ans==false){
        console.log("file does't exist");
        return;
    }
}

let content="";
for(let i=0;i<filesArr.length;i++){
    let currentfilecontent=fs.readFileSync(filesArr[i]);
    content=content+currentfilecontent+"\r\n";
}

let singularpresent=optionArr.includes("-s");
if(singularpresent==true){
    let contentArr=content.split("\r\n");
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i-1]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    let tempArr=[];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr=tempArr;
    content=contentArr.join("\n");
}
for(let a=0;a<optionArr.length;a++){
    if(optionArr[a]=='-n'){
    let contentArr=content.split("\n");//if -s not present break by \r\n and join by \r\n
    let idx=1;
    for(let i=0;i<contentArr.length;i++){
            contentArr[i]=idx+contentArr[i];
            idx++;
    }
    content=contentArr.join("\n");
    }
    else if(optionArr[a]=='-b'){
    let contentArr=content.split("\n");
    let idx=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i].length!=0){
            contentArr[i]=idx+contentArr[i];
            idx++;
        }
    }
    content=contentArr.join("\n");
    }
}
console.log(content)
console.log(optionArr);