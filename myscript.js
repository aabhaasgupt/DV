firstTimeFocus = true
conditions = []
searchTags = []
searchTop = 0
function updateSearchTags() {
    // tempTags = searchTags.map(searchTag => `<div class=aSearchTag><div class="searchText">${searchTag}</div><div class="tagCross"><i class="fas fa-times crossFas"></i></div></div>`)
    tempTags = searchTags.map(searchTag => `<div class=aSearchTag>${searchTag}</div>`)
    $(".searchTags").html(!tempTags ? '' : tempTags.join(''));
    $('.aSearchTag').on('click', function () {
        console.log($(this).text());
        searchTags = searchTags.filter(searchTag => searchTag != $(this).text());
        $(".searchTags").html('');
        updateSearchTags()
    });
}

function firstTimeSearchFocus() {
    if (firstTimeFocus) {
        firstTimeFocus = false;
    }
    else {
        return;
    }
    $(".searchContent").css({ "animation-name": "searchMoveUp", "animation-duration": "1s" }).css({ "top": "20%" });
    $(".dashboard").css({ "animation-name": "dashboardMoveUp", "animation-duration": "1s" }).css({ "top": "60%", "opacity":"1" });
    
}

function csvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split("~");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split("~");
  
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

function toDict(json,key,value){
    var dict = {};
    for (i=0;i<json.length;i++)
    {   //console.log(i, json[i])
        if (dict[json[i][key]]==null){
            dict[json[i][key]] = []
        }
        if (dict[json[i][key]]){
            dict[json[i][key]].push(json[i][value]);
            dict[json[i][key]] = Array.from(new Set(dict[json[i][key]]))
        }
        
    }
    
    return dict;
}

function getColAsArray(Json, key) {

    arr = [];
    for (i = 0; i < myJ.length; i++) {
        // console.log(i,myJ[i][key])
        arr.push(myJ[i][key]);
    }
    return arr;
}

function removeSelected(my_conditions, my_searchTags) {

    return my_conditions.filter(x => !my_searchTags.includes(x));
}

$(document).ready(function () {
    $.ajax({
        url: "data/webMD_part3.csv",
        dataType: "text",
        success: function (data) {
            myJ = csvJSON(data)
            conditions = getColAsArray(myJ,"Condition");
            conditions.pop()
            conditions = Array.from(new Set(conditions))
            drugIdDict = toDict(myJ, "DrugId", "Drug")
            drugsConditionDict = toDict(myJ, "Condition", "DrugId")
            // console.log(drugIdDict)
            // console.log(drugsConditionDict)

            // for (i=0;i<conditions.length-1;i++)
            // {
            //     console.log(i,conditions[i]);
            // }
        }
    })
    $(".input").keyup(function (data) {
        let searchOptions = []
        updatedConditions = removeSelected(conditions, searchTags)
        //updatedConditions = theOtherFunction(conditions, searchTags)

        searchOptions = updatedConditions.filter(condition => condition.toLowerCase().includes(data.target.value.toLowerCase()));
        if (data.target.value == '') {
            searchOptions = []
        }
        
        searchOptions = searchOptions.map(searchOption => `<li class=searchOpt value=${searchOption}>${searchOption}</li>`)
        $(".searchList").html(!searchOptions ? '' : searchOptions.join(''));

        $('.searchOpt').on('click', function () {
            $(".input").val($(this).text())
            $('.searchOpt').off('click');
            $(".searchList").html('');
            searchTags.push($(this).text())
            updateSearchTags()
        });

    });
    $('.searchbtn').on('click', function(){
        currVal = $(".input").val()
        updatedConditions = removeSelected(conditions, searchTags)
        //updatedConditions = theOtherFunction(conditions, searchTags)

        searchOptions = updatedConditions.filter(condition => condition.toLowerCase() == currVal.toLowerCase());
        if (searchOptions.length != 0) {
            searchTags.push(currVal)
            updateSearchTags()
            $('.searchOpt').off('click');
            $(".searchList").html('');
        }
    });

});



