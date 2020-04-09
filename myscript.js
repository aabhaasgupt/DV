firstTimeFocus = true

function firstTimeSearchFocus() {
    if(firstTimeFocus)
    {
        firstTimeFocus = false;
    }
    else{
        return;
    }
    $(".searchbox").css({"animation-name":"searchMoveUp", "animation-duration":"1s"}).css({"top":"10%"});
}
function csvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            // if(currentline[j] == "")
            // {
            //     obj[headers[j]] = lines[i-1].split(",")[j];
            // }
            obj[headers[j]] = currentline[j];
            if(headers[j]=="Condition")
            {
                console.log(i, currentline[j]);
            }
        }
  
        result.push(obj);
  
    }
    return result; //JSON
  }
function getColAsArray(Json, key){
    
    arr = [];
    for (i=0;i<myJ.length;i++)
    {
        // console.log(i,myJ[i][key])
        arr.push(myJ[i][key]);
    }
    return arr;
}
$(document).ready(function(){
    $.ajax({
        url:"data/webMD_part3.csv",
        dataType:"text",
        success:function(data)
        {
            myJ = csvJSON(data)
            arr = getColAsArray(myJ,"Condition");
            // for (i=0;i<arr.length;i++)
            // {
            //     console.log(arr[i]);
            // }
        }
    })
});
