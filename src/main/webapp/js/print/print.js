// strPrintName 打印任务名
// printDatagrid 要打印的datagrid
function CreateFormPage(strPrintName, printDatagrid, path) {
    var beginDate= $("#searchBeginTime").val();
    var endDate= $("#searchEndTime").val();
    var getMonth= $("#searchMonth").val();
    var listTitle = $("#tablePanel").prev().text();
    listTitle = listTitle.replace("列表","");
    var companyName = "";
    //加载公司信息
    $.ajax({
        type:"get",
        url: path + "/systemConfig/findBy.action",
        dataType: "json",
        async: false,
        success: function (res) {
            if(res && res.rows) {
                var array = res.rows;
                for(var i=0; i<array.length; i++){
                    var name = array[i].name;
                    if(name === "company_name") {
                        companyName = array[i].value;
                    }
                }
            }
        },
        //此处添加错误处理
        error:function() {
            $.messager.alert('查询失败','查询系统配置信息异常，请稍后再试！','error');
            return;
        }
    });

    var tableString = '<div class="div-title">' + companyName + "-" + listTitle + '\n</div>';
        if(beginDate && endDate) {
            tableString+='\n<div class="div-time">日期：' + beginDate + ' 至 ' + endDate + ' \n</div>';
        }
        if(getMonth) {
            tableString += '\n<div class="div-time">月份：' + getMonth + ' \n</div>';
        }
        tableString+='\n<table cellspacing="0" class="pb">';
    var frozenColumns = printDatagrid.datagrid("options").frozenColumns;  // 得到frozenColumns对象
    var columns = printDatagrid.datagrid("options").columns;    // 得到columns对象
    var nameList = '';

    // 载入title
    if (typeof columns != 'undefined' && columns != '') {
        $(columns).each(function (index) {
            tableString += '\n<tr>';
            if (typeof frozenColumns != 'undefined' && typeof frozenColumns[index] != 'undefined') {
                for (var i = 0; i < frozenColumns[index].length; ++i) {
                    if (!frozenColumns[index][i].hidden) {
                        tableString += '\n<th width="' + frozenColumns[index][i].width + '"';
                        if (typeof frozenColumns[index][i].rowspan != 'undefined' && frozenColumns[index][i].rowspan > 1) {
                            tableString += ' rowspan="' + frozenColumns[index][i].rowspan + '"';
                        }
                        if (typeof frozenColumns[index][i].colspan != 'undefined' && frozenColumns[index][i].colspan > 1) {
                            tableString += ' colspan="' + frozenColumns[index][i].colspan + '"';
                        }
                        if (typeof frozenColumns[index][i].field != 'undefined' && frozenColumns[index][i].field != '') {
                            nameList += ',{"f":"' + frozenColumns[index][i].field + '", "a":"' + frozenColumns[index][i].align + '"}';
                        }
                        tableString += '>' + frozenColumns[0][i].title + '</th>';
                    }
                }
            }
            for (var i = 0; i < columns[index].length; ++i) {
                if (!columns[index][i].hidden) {
                    tableString += '\n<th width="' + columns[index][i].width + '"';
                    if (typeof columns[index][i].rowspan != 'undefined' && columns[index][i].rowspan > 1) {
                        tableString += ' rowspan="' + columns[index][i].rowspan + '"';
                    }
                    if (typeof columns[index][i].colspan != 'undefined' && columns[index][i].colspan > 1) {
                        tableString += ' colspan="' + columns[index][i].colspan + '"';
                    }
                    if (typeof columns[index][i].field != 'undefined' && columns[index][i].field != '') {
                        nameList += ',{"f":"' + columns[index][i].field + '", "a":"' + columns[index][i].align + '"}';
                    }
                    tableString += '>' + columns[index][i].title + '</th>';
                }
            }
            tableString += '\n</tr>';
        });
    }
    // 载入内容
    var rows = printDatagrid.datagrid("getRows"); // 这段代码是获取当前页的所有行
    var nl = eval('([' + nameList.substring(1) + '])');
    for (var i = 0; i < rows.length; ++i) {
        tableString += '\n<tr>';
        $(nl).each(function (j) {
            var e = nl[j].f.lastIndexOf('_0');

            tableString += '\n<td';
            if (nl[j].a != 'undefined' && nl[j].a != '') {
                tableString += ' style="text-align:' + nl[j].a + ';"';
            }
            tableString += '>';
            if (e + 2 == nl[j].f.length) {
                tableString += rows[i][nl[j].f.substring(0, e)];
            }
            else
                tableString += rows[i][nl[j].f];
            tableString += '</td>';
        });
        tableString += '\n</tr>';
    }
    tableString += '\n</table>';

    localStorage.setItem("tableString",tableString);

    window.open("../../js/print/print.html","location:No;status:No;help:No;dialogWidth:800px;dialogHeight:600px;scroll:auto;");
}

//新的订单答应
function CreateNewFormPage(strPrintName, printDatagrid, path) {
    var companyName = "";
    var faxNum = "";
    //加载公司信息
    $.ajax({
        type:"get",
        url: path + "/systemConfig/findBy.action",
        dataType: "json",
        async: false,
        success: function (res) {
            if(res && res.rows) {
                var array = res.rows;
                for(var i=0; i<array.length; i++){
                    var name = array[i].name;
                    if(name === "company_name") {
                        companyName = array[i].value;
                    }
                    if(name === "company_fax") {
                        faxNum = array[i].value;
                    }
                }
            }
        },
        //此处添加错误处理
        error:function() {
            $.messager.alert('查询失败','查询系统配置信息异常，请稍后再试！','error');
            return;
        }
    });
    // 载入内容
    var rows = printDatagrid.datagrid("getChecked"); // 这段代码是获取当前选中的行
    var Number = rows[0].Number;

    var font = 'font-family:"宋体"';
    var tableString = '<div align="center"><table style="border-collapse:separate; border-spacing:0px 0px;"><tr><td colspan="4" rowspan="3"><img src="../../upload/images/logo.png" width="308" height="60"></td>' +
        '<td colspan="5">'+companyName+'</td></tr>' +
        '<tr><td colspan="5"><strong>SILEY DECORATIVE MATERIAL(SHANGHAI) LIMITED</strong></td></tr>' +
        '<tr><td colspan="2">FAX : '+faxNum+'</td><td></td><td colspan="">www.siley.uk</td></tr>' +
        '<tr><td colspan="9" ><div align="center" style="font-size:32px;'+font+'">Kasich&amp;Raatz订货单</div></td></tr>' +
        '<tr><td width="100">订单号 ：</td><td colspan="8">'+Number+'</td></tr>' +
        '</table></div>';

    localStorage.setItem("tableString",tableString);

    window.open("../../js/print/print.html","location:No;status:No;help:No;dialogWidth:800px;dialogHeight:600px;scroll:auto;");
}