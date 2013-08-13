(function ($) {
    $.fn.cascadeselect = function (url, defatulText, parentSelectId, paramName) {
        var _addSelectOption = function (select, text, value) {
            var option = document.createElement("option"); //Cria uma option
            option.text = text; //seta o atributo text
            option.value = value; //seta o atributo value
            $(select).append(option); //adiciona ao select
        }
        var _getSelectOptions = function (select, url) {
            $(select)
                .after('<img id="img-loading" src="/Images/loading.gif" />'); //coloca o loading
            _resetSelect(select);

            $.ajax({
                type: 'GET',
                dataType: "json", //tipo de retorno esperado
                url: url,
                success: function (data) {
                    // Itera pelo JSON recebido e adiciona as opções
                    $(data).each(function (i, e) {
                        _addSelectOption(select, e.text, e.value);
                    });

                    $(select).removeAttr('disabled'); //habilita o select qdo estiver populado
                    $('#img-loading').remove(); //remove o loading
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                $('#img-loading').remove(); //remove o loading
                alert('Error: ' + textStatus + "-" + errorThrown);
                console.log('Error: ' + textStatus + "-" + errorThrown);
            });

            return false;
        }
        var _populateSelect = function (select) {
            $("select[data-cas-parentselect='" + $(select).attr('id') + "']").each(function (i, e) {
                var value = $(select).val();
                if (value != null && value > 0 && value !== 'undefined') {
                    var url = $(e).attr("data-cas-url") + "?" + $(e).attr("data-cas-param") + "=" + value;
                    //var selectId = $(e).attr("id");
                    //_getSelectOptions(e, url, selectId);
                    _getSelectOptions(e, url);
                    _populateSelect(e);
                }
                else {
                    _resetSelect(e);
                }
            });
        }
        var _resetSelect = function (select) {
            $(select).children().remove(); //remove todos os itens do select
            $(select).attr('disabled', 'disabled'); //desabilita o select
            _addSelectOption(select, defatulText, "-1"); //adiciona a opção padrão
            //Resete every child
            $("select[data-cas-parentselect='" + $(select).attr('id') + "']").each(function (i, e) {
                _resetSelect(e);
            });
        }
        var _init = function (select) {
            $(select).attr("data-cas-url", url); //criad data- com a url para consulta
            $(select).attr("data-cas-param", paramName); //criad data- com o parametro
            $(select).attr('disabled', 'disabled'); //desabilita o select

            _addSelectOption(select, defatulText, "-1");

            if (parentSelectId != null && parentSelectId !== 'undefined') {
                $(select).attr("data-cas-parentselect", parentSelectId);
            }
            else {
                //_getSelectOptions(select, url, $(select).attr("id"));
                _getSelectOptions(select, url);
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