(function ($) {
    $.widget("ui.datecalendar", {
        defaults:{
                delimeter: '/',
                dateformat: 'yyyyddmm',
        },
        options:
            {
                delimeter: undefined,
                dateformat: undefined,
            },
        _create: function () {
            var self = this;
            var settings = $.extend(settings, self.defaults, self.options);
            
            checkValidDateFormat(settings.dateformat);
            checkValidDelimeter(settings.delimeter);
            var initialyear = 1956;
            var selectedMonthYear = {
                 Month: -1,
                 Year:-1
            };
           var tdArray = [];
           var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
            var clearTable = function () {
                 debugger;
                if (!tdArray) return;
                var j;
                var i;
                for (i = 0; i < tdArray.length; i++) {
                        $(tdArray[i]).removeClass('numbertd');
                        $(tdArray[i]).removeClass('selectedday');
                        $(tdArray[i]).html("");
                    }
            }
        
            if (self.element.is('input')) {
                /*if (!$(self.element).attr('id')) {
                    throw 'datecalendar widget is assigned only on inputs elements with assigned id property';
                }*/
                /*var inputid = $(self.element).attr('id');
                self.options._ids.mainDivId = "maindiv_" + inputid;
                self.options._ids.spanMonthYearDivId = "spanMonthYear_" + inputid;
                self.options._ids.leftButtonId = "leftButtonId_" + inputid;
                self.options._ids.rightButtonId = "rightButtonId_" + inputid;
                self.options._ids.tableOfDaysId = "tableOfDaysId_" + inputid;*/
                var maindiv = $('<div class="calendarmaindiv"></div>');
                var monthyearnameDiv =$('<div class="monthyearname"></div>');
                var buttonLeftInput = $('<input class="buttonleft" type="button" ></input>');
                var buttonRightInput = $('<input class="buttonright" type="button" ></input>');
                var spanDisplayingMonthName = $('<span class="monthname" ></span>');
                var tableOfDays = $('<table class="daysofweek"></table>');
                var i = 0;
                for (var i = 0; i < 7; i++) {
                    var j = 0;
                    var tr = $('<tr></tr>');
                    for (j = 0; j < 7; j++) {
                        var td;
                        if (i === 0) {
                            td = $('<th class="daysofweek"></th>');
                            td.html(days[j]);
                        } else {
                            td = $('<td></td>');
                            td.on('click',
                                function () {
                                    if (!td.html()) return;
                                    var value = "";
                                    var dateformat = settings.dateformat.toLowerCase();
                                    var delimeter = settings.delimeter;
                                    var day = td.html();
                                    day = day.length > 1 ? day : "0" + day;
                                    var month = selectedMonthYear.Month + 1;
                                    month = month > 9 ? month : "0" + month;
                                    var year = selectedMonthYear.Year;
                                    if (dateformat === "ddmmyyyy") {
                                        value = day + delimeter + month + delimeter + year;
                                    }
                                    if (dateformat === "mmddyyyy") {
                                        value = month + delimeter + day + delimeter + year;
                                    }
                                    if (dateformat === "yyyymmdd") {
                                        value = year + delimeter + month + delimeter + day;
                                    }
                                    if (dateformat === "yyyyddmm") {
                                        value = year + delimeter + day + delimeter + month;
                                    }
                                    self.element.val(value);
                                    maindiv.hide();
                                });
                                tdArray.push(td);
                        }
                        tr.append(td);
                        
                    }
                    tableOfDays.append(tr);
                }
                
                clearTable();
                monthyearnameDiv.append(buttonLeftInput);
                monthyearnameDiv.append(spanDisplayingMonthName);
                monthyearnameDiv.append(buttonRightInput);
                maindiv.append(monthyearnameDiv);
                maindiv.append(tableOfDays);
                maindiv.insertAfter(this.element);
               // self.options._arraytd = convertTableToArray(self);
                
                // position input element
                var inputPosition = this.element.position();
                debugger;
                // configure position div based on position input
                maindiv.css("top", inputPosition.top + this.element.outerHeight());
                maindiv.css("left", inputPosition.left - (maindiv.outerWidth() - this.element.outerWidth()));
                buttonRightInput
                    .on('click',
                    function () {
                        debugger;
                        var curDate = new Date(selectedMonthYear.Year, selectedMonthYear.Month, 1);
                        curDate.setMonth(curDate.getMonth() + 1);
                        setCurrentDate(initialyear, curDate);
                    });
                buttonLeftInput
                    .on('click',
                    function () {
                        debugger;
                        var curDate = new Date(selectedMonthYear.Year, selectedMonthYear.Month, 1);
                        curDate.setMonth(curDate.getMonth() - 1);
                        setCurrentDate(initialyear, curDate);
                    });

                // initially div hidde
                maindiv.hide();

                this.element.on('click',
                    function (event) {
                        maindiv.show();
                        var input = event.target;
                        debugger;
                        var neededDate;
                        if (input.value) {
                            try {
                                debugger;
                                var datearr = input.value.split(settings.delimeter);
                                if (datearr.length !== 3) throw 'exception';
                                var year="";
                                var month="";
                                var day="";

                                if (settings.dateformat.toLowerCase() === "ddmmyyyy") {
                                    day = +datearr[0];
                                    month=+datearr[1];
                                    year = +datearr[2];
                                }
                                if (settings.dateformat.toLowerCase() === "mmddyyyy") {
                                    day = +datearr[1];
                                    month = +datearr[0];
                                    year = +datearr[2];
                                }
                                if (settings.dateformat.toLowerCase() === "yyyymmdd") {
                                    day = +datearr[2];
                                    month = +datearr[1];
                                    year = +datearr[0];
                                }
                                if (settings.dateformat.toLowerCase() === "yyyyddmm") {
                                    day = +datearr[1];
                                    month = +datearr[2];
                                    year = +datearr[0];
                                }

                                if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
                                    throw 'exception';
                                }
                                if (year < 1900 || year > 2100) {
                                    throw 'exception';
                                }
                                if (month < 1 || month > 12) {
                                    throw 'exception';
                                }
                                if (day<1 || day > daysInMonth(month - 1, year)) {
                                    throw 'exception';
                                }
                                neededDate = new Date(year,month - 1, day);//Date.parseExact(input.value, [getDateMask(dateformat, delimeter)]);
                            } catch (ex) {

                                neededDate = new Date();
                            }
                        } else {
                            neededDate = new Date();
                        }
                        setCurrentDate(initialyear, neededDate);
                    });
            } else {
                throw 'datecalendar widget only works on input elements';
            }
            // Calculates reminder to determine which day calendar must be start show
            // Case when initialyear < curyear
            var getCountLeapYearsCurYearGreatest = function (initialyear, curyear, curmonth, difyear) {
                debugger;
                var countLeapYears=0;
                var i=0;
                for (i = initialyear; i < curyear; i = i + 4) {
                    countLeapYears++;
                }
                var daysInDiffer = (difyear - countLeapYears) * 365 + countLeapYears * 366;
                var daysInCurYearUntilMonth = getSumDaysTillMonth(curyear, curmonth);
                var totalDays = daysInDiffer + daysInCurYearUntilMonth;
                return totalDays % 7;
            };  
            // Calculates reminder to determine which day calendar must be start show
            // Case when initialyear > curyear
            var getCountLeapYearsCurYearLeatest = function (initialyear, curyear, curmonth, difyear) {
                debugger;
                var countLeapYears=0;
                if (initialyear - curyear < 4) {
                    countLeapYears = 0;
                } else {
                    countLeapYears = Math.floor((initialyear - curyear) / 4);
                }
                var daysInDiffer = (difyear - countLeapYears) * 365 + countLeapYears * 366;
                var daysInCurYearUntilMonth = getSumDaysTillMonth(curyear, curmonth);
                var totalDays = daysInDiffer - daysInCurYearUntilMonth;
                return totalDays % 7;
            };  

            var setCurrentDate = function (initialyear, neededDate) {

                var curday = neededDate.getDate();
                var curmonth = neededDate.getMonth();
                var curyear = neededDate.getFullYear();
                selectedMonthYear.Year = curyear;
                selectedMonthYear.Month = curmonth;
               
                // leap year one in 4 year
                var countLeapYears = 0;
                var dayofweek=0;
                debugger;
                // 
                if ((curyear === initialyear)) {
                    countLeapYears = 1;
                    dayofweek = getSumDaysTillMonth(curyear, curmonth) % 7;
                } else {
                    if (initialyear < curyear) {
                         var difyear = curyear - initialyear;
                        dayofweek = getCountLeapYearsCurYearGreatest(initialyear, curyear, curmonth, difyear);
                    } else {
                        debugger
                         var difyear = initialyear - curyear;
                        dayofweek = getCountLeapYearsCurYearLeatest(initialyear, curyear, curmonth, difyear);
                    }
                }

                // var daysInDiffer = (difyear - countLeapYears) * 365 + countLeapYears * 366;
                // var daysInCurYearUntilMonth = getSumDaysTillMonth(curyear, curmonth);
                // var totalDays = daysInDiffer + daysInCurYearUntilMonth;
                var k = 0;
                var daysInCurMonth = daysInMonth(curmonth, curyear);
                spanDisplayingMonthName.html(convertNumMonthToText(curmonth) + " " + curyear);
                clearTable(tdArray);
                for (i = dayofweek; i < tdArray.length; i++) {
                        k++;
                        $(tdArray[i]).html(k);
                        $(tdArray[i]).addClass('numbertd');
                        if (k === curday) {
                            $(tdArray[i]).addClass('selectedday');
                        }
                        if (k >= daysInCurMonth) return;
                    }
            }; 

       
        },
        // Contained in jquery.qs.tagger.js
        destroy: function () {

            // if using jQuery UI 1.8.x
            $.Widget.prototype.destroy.call(this);
            // if using jQuery UI 1.9.x
            //this._destroy();
        }


    });

    var convertNumMonthToText= function (monthnum)
    {
        switch (monthnum)
        {
            case 0: return "January";
            case 1: return "Febrary";
            case 2: return "March";
            case 3: return "April";
            case 4: return "May";
            case 5: return "June";
            case 6: return "July";
            case 7: return "August";
            case 8: return "September";
            case 9: return "October";
            case 10: return "November";
            case 11: return "December";
            default: throw 'datecalendar: month with number ' + monthnum+ ' does not exists';
        }
    }

    var checkValidDateFormat= function(dateformat)
    {
        if (dateformat.toLowerCase() !== "ddmmyyyy" && dateformat.toLowerCase() !== "mmddyyyy" && dateformat.toLowerCase() !== "yyyymmdd" && dateformat.toLowerCase() !== "yyyyddmm")
        {
            throw 'datecalendar: dateformat ' + dateformat + ' are not supported';
        }

    }

    var checkValidDelimeter = function (delimeter) {
        if (delimeter !== "." && delimeter !== "/" && delimeter !== "|" && delimeter !== ":")
        {
          throw 'datecalendar: delimeter ' + delimeter + ' are not supported';
        }
    }

    var getDateMask = function(dateformat, dlimeter) {
        if (dateformat.toLowerCase() === "ddmmyyyy") {
            return "dd" + dlimeter + "mm" + dlimeter + "yyyy";
        }
        if (dateformat.toLowerCase() === "mmddyyyy") {
            return "mm" + dlimeter + "dd" + dlimeter + "yyyy";
        }
        if (dateformat.toLowerCase() === "yyyymmdd") {
            return "yyyy" + dlimeter + "mm" + dlimeter + "dd";
        }
        if (dateformat.toLowerCase() === "yyyyddmm") {
            return "yyyy" + dlimeter + "dd" + dlimeter + "mm";
        }
    }


    function daysInMonth(month, year) {
        return new Date(year, month+1, 0).getDate();
    }

    var getSumDaysTillMonth = function (year, tillmonth) {
        debugger;
        var totalday = 0;
        var month;
        for (month = 0; month < tillmonth; month++) {
            totalday += daysInMonth(month, year);
        }
        return totalday;
    }




}(jQuery));
