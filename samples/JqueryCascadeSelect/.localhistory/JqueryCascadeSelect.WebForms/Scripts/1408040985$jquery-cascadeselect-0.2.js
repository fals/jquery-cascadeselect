(function ($) {
    $.fn.cascadeselect = function (options) {
        var defaultOptions = {
           source: '',
           selectText: "Select Something",
           loadingText: 'Loading...',
           noneResultText: 'No items found!',
           parentSelectId: null,
           paramName: '',
           cache: false
        }

        var _addSelectOption = function (select, text, value) {
            var option = document.createElement("option");
            option.text = text; 
            option.value = value;
            $(select).append(option); 
        }
        var _getSelectOptions = function (select, value) {
            _resetSelect(select, defaultOptions.loadingText);
            var data = {};
            data[$(select).attr("data-cas-param")] = value;
            $.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                dataType: "json", //tipo de retorno esperado
                url: $(select).attr("data-cas-source"),
                data: value,
                success: function (data) {
                  data = data.hasOwnProperty("d") ? JSON.parse(data.d) : JSON.parse(data);
                    if (data.length > 0) {
                      _resetSelect(select, $(select).attr("data-cas-select"));

                        // add every option to the select
                        $(data).each(function (i, e) {
                            _addSelectOption(select, e.text, e.value);
                        });

                        $(select).removeAttr('disabled');
                    }
                    else {
                      _resetSelect(select, $(select).attr("data-cas-noneresult"));
                    }
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
              _resetSelect(select, $(select).attr("data-cas-noneresult"));
                console.log('Error: ' + textStatus + "-" + errorThrown);
            });

            return false;
        }
        var _populateSelect = function (select) {
            $("select[data-cas-parentselect='" + $(select).attr('id') + "']").each(function (i, e) {
                var value = $(select).val();
                if (value != null && value > 0 && value !== 'undefined') {
                    _getSelectOptions(e, value);
                    _populateSelect(e);
                }
                else {
                  _resetSelect(e, $(e).attr("data-cas-select"));
                }
            });
        }
        var _resetSelect = function (select, text) {
            $(select).children().remove(); //remove every option
            $(select).attr('disabled', 'disabled'); //disable unselected select
            _addSelectOption(select, text, "-1"); //add the default option
            
            //Resete every child
            $("select[data-cas-parentselect='" + $(select).attr('id') + "']").each(function (i, e) {
              _resetSelect(e, $(e).attr("data-cas-select"));
            });
        }
        var _init = function (select) {
            defaultOptions = $.extend(defaultOptions, options);

            $(select).attr("data-cas-source", defaultOptions.source); //create the data- with the source url for data
            $(select).attr("data-cas-param", defaultOptions.paramName); //create the data- with the expected param name
            $(select).attr("data-cas-select", defaultOptions.selectText);
            $(select).attr("data-cas-loading", defaultOptions.loadingText);
            $(select).attr("data-cas-noneresult", defaultOptions.noneResultText);
            $(select).attr('disabled', 'disabled'); //disable the select

            _addSelectOption(select, defaultOptions.selectText, "-1");

            if (defaultOptions.parentSelectId != null && defaultOptions.parentSelectId !== 'undefined') {
                $(select).attr("data-cas-parentselect", defaultOptions.parentSelectId);
            }
            else {
                _getSelectOptions(select);
            }

            $(select).change(function () {
              _populateSelect(select);
              alert();
            });

            return false;
        }

        _init(this);

        return this;
    };
}(jQuery));