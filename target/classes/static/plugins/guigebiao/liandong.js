/**
 * Created by Administrator on 14-12-01.
 * 模拟淘宝SKU添加组合
 * 页面注意事项：
 *      1、 .div_contentlist   这个类变化这里的js单击事件类名也要改
 *      2、 .Father_Title      这个类作用是取到所有标题的值，赋给表格，如有改变JS也应相应改动
 *      3、 .Father_Item       这个类作用是取类型组数，有多少类型就添加相应的类名：如: Father_Item1、Father_Item2、Father_Item3 ...
 */
var pubjss = (function(){
	$(".div_contentlist label").bind("change", function () {
		//SKU信息
		Creat_Table();
	});
	
	//SKU信息组合
	var Creat_Table = function(){

		step.hebingFunction();
		var SKUObj = $(".Father_Title_add");
		//var skuCount = SKUObj.length;//
		var arrayTile = new Array();//标题组数
		var arrayInfor = new Array();//盛放每组选中的CheckBox值的对象
		var arrayColumn = new Array();//指定列，用来合并哪些列
		var bCheck = true;//是否全选
		var columnIndex = 0;
		$.each(SKUObj, function (i, item){
			arrayColumn.push(columnIndex);
			columnIndex++;
			arrayTile.push(SKUObj.find("li").eq(i).html().replace("：", ""));
			var itemName = "Father_Item_add" + i;
			//选中的CHeckBox取值
			var order = new Array();
			// 选中的checkbox取id
			var orderId = new Array();
			$("." + itemName + " input[type=checkbox]:checked").each(function (){
				order.push($(this).val());
			});	
			arrayInfor.push(order);

			if (order.join() == ""){
				bCheck = false;
			}
			//var skuValue = SKUObj.find("li").eq(index).html();
		});
		//开始创建Table表

		if (bCheck == true) {
			var RowsCount = 0;
			$("#createTable").html("");
			var table = $("<table id=\"process\" border=\"1\" cellpadding=\"1\" cellspacing=\"0\" style=\"width:100%;padding:5px;\"></table>");
			table.appendTo($("#createTable"));
			var thead = $("<thead></thead>");
			thead.appendTo(table);
			var trHead = $("<tr></tr>");
			trHead.appendTo(thead);
			//创建表头
			$.each(arrayTile, function (index, item) {
				var did="Father_Item_add"+index;

				item = item.replace("<input type=\"button\" value=\"删除\" onclick=\"deleteSku('Father_Item_add"+index+"')\">","");

				var td = $("<th>" + item + "</th>");
				td.appendTo(trHead);
			});
			var itemColumHead = $("<th  style=\"width:40px;\">价格</th><th style=\"width:40px;\">库存</th> ");
			itemColumHead.appendTo(trHead);
			var itemColumHead2 = $("<th style=\"width:40px;\">商家编码</th><th style=\"width:40px;\">商品条形码</th>");
			itemColumHead2.appendTo(trHead);
			var tbody = $("<tbody></tbody>");
			tbody.appendTo(table);
			//生成组合
			var zuheDate = step.doExchange(arrayInfor);
			
			if (zuheDate.length > 0) {
				//创建行
				$.each(zuheDate, function (index, item) {
					var td_array = item.split(",");
					var tr = $("<tr></tr>");
					tr.appendTo(tbody);
					
					var tbName=index;
					var tbId='';// 存放checkbox的id
					$.each(td_array, function (i, values) {
						tbName = tbName+'_'+values;
						var vns = values.split('-');
						
						tbId = tbId+'_'+vns[1]+'-'+vns[3];
						
						var td = $("<td>" + vns[2] + "</td>");
						td.appendTo(tr);
					});
					var pice =  $('#cuxiaoPrice1').val();
					var store_add = $('#store_add').val();
					var td1 = $("<td ><input id=\""+tbId+"_price\" name=\""+tbName+"_price\" class=\"l-text\" type=\"text\" value=\"\"></td>");
					td1.appendTo(tr);
					var td2 = $("<td ><input id=\""+tbId+"_store\" name=\""+tbName+"_store\" class=\"l-text\" type=\"text\" value=\"\"></td>");
					td2.appendTo(tr);
					var td3 = $("<td ><input id=\""+tbId+"_code\" name=\""+tbName+"_code\" class=\"l-text\" type=\"text\" value=\"\"></td>");
					td3.appendTo(tr);
					var td4 = $("<td ><input id=\""+tbId+"_bn\" name=\""+tbName+"_bn\" class=\"l-text\" type=\"text\" value=\"\"><input id=\""+tbId+"_id\" name=\""+tbName+"_id\" class=\"l-text\" type=\"hidden\" value=\"\"></td>");
					td4.appendTo(tr);
				});
			}
			//结束创建Table表
			arrayColumn.pop();//删除数组中最后一项
			//合并单元格
			$(table).mergeCell({
				// 目前只有cols这么一个配置项, 用数组表示列的索引,从0开始
				cols: arrayColumn
			});
		} else{
			//未全选中,清除表格
			document.getElementById('createTable').innerHTML="";
		}
	};
    var step = {
		//合并行
        hebingFunction: function () {
            $.fn.mergeCell = function (options) {
                return this.each(function () {
                    var cols = options.cols;
                    for (var i = cols.length - 1; cols[i] != undefined; i--) {
                        // fixbug console调试
                        // console.debug(cols[i]);
                        mergeCell($(this), cols[i]);
                    }
                    dispose($(this));
                });
            };
            function mergeCell($table, colIndex) {
                $table.data('col-content', ''); // 存放单元格内容
                $table.data('col-rowspan', 1); // 存放计算的rowspan值 默认为1
                $table.data('col-td', $()); // 存放发现的第一个与前一行比较结果不同td(jQuery封装过的), 默认一个"空"的jquery对象
                $table.data('trNum', $('tbody tr', $table).length); // 要处理表格的总行数, 用于最后一行做特殊处理时进行判断之用
                // 进行"扫面"处理 关键是定位col-td, 和其对应的rowspan
                $('tbody tr', $table).each(function (index) {
                    // td:eq中的colIndex即列索引
                    var $td = $('td:eq(' + colIndex + ')', this);
                    // 取出单元格的当前内容
                    var currentContent = $td.html();
                    // 第一次时走此分支
                    if ($table.data('col-content') == '') {
                        $table.data('col-content', currentContent);
                        $table.data('col-td', $td);
                    } else {
                        // 上一行与当前行内容相同
                        if ($table.data('col-content') == currentContent) {
                            // 上一行与当前行内容相同则col-rowspan累加, 保存新值
                            var rowspan = $table.data('col-rowspan') + 1;
                            $table.data('col-rowspan', rowspan);
                            // 值得注意的是 如果用了$td.remove()就会对其他列的处理造成影响
                            $td.hide();
                            // 最后一行的情况比较特殊一点
                            // 比如最后2行 td中的内容是一样的, 那么到最后一行就应该把此时的col-td里保存的td设置rowspan
                            if (++index == $table.data('trNum'))
                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
                        } else { // 上一行与当前行内容不同
                            // col-rowspan默认为1, 如果统计出的col-rowspan没有变化, 不处理
                            if ($table.data('col-rowspan') != 1) {
                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
                            }
                            // 保存第一次出现不同内容的td, 和其内容, 重置col-rowspan
                            $table.data('col-td', $td);
                            $table.data('col-content', $td.html());
                            $table.data('col-rowspan', 1);
                        }
                    }
                });
            }
            // 同样是个private函数 清理内存之用
            function dispose($table) {
                $table.removeData();
            }
        },
        //组合数组
        doExchange: function (doubleArrays) {
            var len = doubleArrays.length;
            if (len >= 2) {
                var arr1 = doubleArrays[0];
                var arr2 = doubleArrays[1];
                var len1 = doubleArrays[0].length;
                var len2 = doubleArrays[1].length;
                var newlen = len1 * len2;
                var temp = new Array(newlen);
                var index = 0;
                for (var i = 0; i < len1; i++) {
                    for (var j = 0; j < len2; j++) {
                        temp[index] = arr1[i] + "," + arr2[j];
                        index++;
                    }
                }
                var newArray = new Array(len - 1);
                newArray[0] = temp;
                if (len > 2) {
                    var _count = 1;
                    for (var i = 2; i < len; i++) {
                        newArray[_count] = doubleArrays[i];
                        _count++;
                    }
                }
                //console.log(newArray);
                return step.doExchange(newArray);
            }
            else {
                return doubleArrays[0];
            }
        }
    }
	
	return {
		step : step,
		Creat_Table : Creat_Table
	};
}());

	function SkuJSON(attrSKU){
		var items =  new Array();
		var tbs = '';
		var tou = -1;
		var jsonAll = new Array();
		var vsjonArray = '';
		var vsjonhzArray = '';
		var vsjon='';
		var vsjonhz='';
		var j =0;
		var z = 0;
		for(var i = 0;i < attrSKU.length; i++) {
			var tbstr = attrSKU[i].split('_');
			if(tbstr[0] == tou){
				j++;
				jsonAll = _puJSon(attrSKU[i],'0');			
			}else {
				if(i != 0){
					if(z==0){
						vsjonArray = vsjonArray +'{"'+vsjon+'}';
						vsjonhzArray = vsjonhzArray +'{"'+vsjonhz+'}';
						z++;
					}else {
						vsjonArray = vsjonArray +'-{"'+vsjon+'}';
						vsjonhzArray = vsjonhzArray +'-{"'+vsjonhz+'}';
					}
					vsjon = '';
					vsjonhz = '';
				}
				
				tou = tbstr[0];
				j = 0;
				jsonAll = _puJSon(attrSKU[i],'1');	
			}
			if(i == 0 || j==0){
				vsjon =jsonAll[0];
				vsjonhz =jsonAll[1];
			}else {
				vsjon =vsjon+',' +jsonAll[0];
				vsjonhz =vsjonhz+',' +jsonAll[1];
			}
			
		}
		if(vsjonArray == null || vsjonArray == ''){
			vsjonArray = '{"'+vsjon+'}';
			vsjonhzArray = '{"'+vsjonhz+'}';
		}else {
			vsjonArray = vsjonArray +'-{"'+vsjon+'}';
			vsjonhzArray = vsjonhzArray +'-{"'+vsjonhz+'}';
		}
		//vsjonArray = vsjonArray +'-{"'+vsjon+'}';
		//vsjonhzArray = vsjonhzArray +'-{"'+vsjonhz+'}';
		$('#productItemjson').val(vsjonArray);
		$('#productItemjsonhz').val(vsjonhzArray);
		//到这里已经封装完毕
		console.info(vsjonArray);
		console.info(vsjonhzArray);
	};
	
	function _puJSon(s,tou){
		var _retrunJson ='';
		var _retrunJsonHz ='';
		var sattr = s.split('_');
		var max = sattr.length;
		var attr ='';
		var _returnJsonArrtr = new Array();
		//第一次
		if(tou==1){
			for(var i =1;i<max;i++){
				attr = sattr[i].split('-');
				if(attr.length==4){
					if(i == 1){
						_retrunJson = attr[1]+'":"'+attr[3]+'"';
						_retrunJsonHz =  attr[0]+'":"'+attr[2]+'"';
					}else{
						_retrunJson = _retrunJson +',"'+attr[1]+'":"'+attr[3]+'"';
						_retrunJsonHz = _retrunJsonHz +',"'+attr[0]+'":"'+attr[2]+'"';
					}
					
				}else {
					if(i == 1){
						_retrunJson = '"'+attr[0]+'":"'+attr[1]+'"';
						_retrunJsonHz = '"'+attr[0]+'":"'+attr[1]+'"';
					}else{
						_retrunJson = _retrunJson +',"'+attr[0]+'":"'+attr[1]+'"';
						_retrunJsonHz = _retrunJsonHz +',"'+attr[0]+'":"'+attr[1]+'"';
					}
				}
			}
		}else {
			attr = sattr[max-1].split('-');
			_retrunJson = '"'+attr[0]+'":"'+attr[1]+'"';
			_retrunJsonHz = '"'+attr[0]+'":"'+attr[1]+'"';
		}
		_returnJsonArrtr.push(_retrunJson);
		_returnJsonArrtr.push(_retrunJsonHz);
		
		return _returnJsonArrtr;
	};