firstTimeFocus = true
conditions = []
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
            conditions = getColAsArray(myJ,"Condition");
            conditions.pop()
            conditions = Array.from(new Set(conditions))

            // for (i=0;i<conditions.length-1;i++)
            // {
            //     console.log(i,conditions[i]);
            // }
        }
    })
    $( ".input" ).keyup(function(data) {
        
        $('.searchOpt').off('click');
        let searchOptions = []
        
        searchOptions = conditions.filter(condition => condition.toLowerCase().includes(data.target.value.toLowerCase()));
        if(data.target.value == '')
        {
            searchOptions =[]
        }

        searchOptions = searchOptions.map(searchOption => `<li class=searchOpt value=${searchOption}>${searchOption}</li>`)
        $(".searchList").html(!searchOptions ? '' : searchOptions.join(''));
        // console.log(searchOptions);
        
        $('.searchOpt').on('click', function(){
            console.log("hii")
            $(".input").val($(this).text())
            $('.searchOpt').off('click');
            $(".searchList").html('');
            $(".input").on('focusout', function(){
                $(".searchList").html('');
                $(".input").off('focusout')
            })
        });
        
    });
    
});



