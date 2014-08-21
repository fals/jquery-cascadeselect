(function ($) {
    $.fn.cascadeselect = function (options) {
        var defaultOptions = {
           source: '',
           selectText: "Select Something",
           loadingText: 'Loading...',
           noneResultText: 'No items found!',
           parentSelectId: null,
           param: '',
           cache: false
        }

        var _addSelectOption = function (select, text, value) {
            var option = document.createElement("option");
            option.text = text; 
            option.value = value;
            $(select).append(option); 
        }
        var _getSelectOptions = function (select, url) {
            _resetSelect(select, defaultOptions.loadingText);

            $.ajax({
                type: 'GET',
                dataType: "json", //tipo de retorno esperado
                url: url,
                success: function (data) {
                    if (data.length > 0) {
                        _resetSelect(select, defaultOptions.selectText);

                        // add every option to the select
                        $(data).each(function (i, e) {
                            _addSelectOption(select, e.text, e.value);
                        });

                        $(select).removeAttr('disabled');
                    }
                    else {
                        _resetSelect(select, defaultOptions.noneResultText);
                    }
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                _resetSelect(select, defaultOptions.noneResultText);
                console.log('Error: ' + textStatus + "-" + errorThrown);
            });

            return false;
        }
        var _populateSelect = function (select) {
            $("select[data-cas-parentselect='" + $(select).attr('id') + "']").each(function (i, e) {
                var value = $(select).val();
                if (value != null && value > 0 && value !== 'undefined') {
                    var url = $(e).attr("data-cas-source") + "?" + $(e).attr("data-cas-param") + "=" + value;
                    _getSelectOptions(e, url);
                    _populateSelect(e);
                }
                else {
                    _resetSelect(e, defaultOptions.selectText);
                }
            });
        }
        var _resetSelect = function (select, text) {
            $(select).children().remove(); //remove every option
            $(select).attr('disabled', 'disabled'); //disable unselected select
            _addSelectOption(select, text, "-1"); //add the default option
            
            //Resete every child
            $("select[data-cas-parentselect='" + $(select).attr('id') + "']").each(function (i, e) {
                _resetSelect(e, defaultOptions.selectText);
            });
        }
        var _init = function (select) {
            defaultOptions = $.extend(defaultOptions, options);

            $(select).attr("data-cas-source", defaultOptions.source); //create the data- with the source url for data
            $(select).attr("data-cas-param", defaultOptions.paramName); //create the data- with the expected param name
            $(select).attr('disabled', 'disabled'); //disable the select

            _addSelectOption(select, defaultOptions.selectText, "-1");

            if (defaultOptions.parentSelectId != null && defaultOptions.parentSelectId !== 'undefined') {
                $(select).attr("data-cas-parentselect", defaultOptions.parentSelectId);
            }
            else {
                _getSelectOptions(select, defaultOptions.source);
            }

            $(select).change(function () {
                _populateSelect(select);
            });

            return false;
        }

        _init(this);

        return this;
    };
}(jQuery));