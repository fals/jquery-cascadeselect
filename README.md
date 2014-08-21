jquery-cascadeselect
====================

Jquery extesion to allow developers to easily create cascade dependents html selects, that can be populated via restful services.
Enjoy the simplicity when creating n-select dependency and no need of management of those.

Using
====================

Add the script reference for JQuery Cascade solution to your page after the JQuery. This plugin needs jquery (>= 1.10.2).

 <script src="~/Scripts/jquery-cascadeselect-x.x.js"></script>

Call the script for every select you need:

 	$("#selectid").cascadeselect({
      source: '/myserviceurl',
      selectText: "Select Something",
      loadingText: 'Loading...',
      noneResultText: 'No items found!'
    });

Server Side
====================

The plugin expects as result a JSON array like [{'value': 'myvalue1', 'text': 'text1'}, {'value': 'myvalue2', 'text': 'text2'}], then you should implement your service returning JSON in this format. This plugin suport Restfull service as WebServices.

Dependent Selects
====================

To make a cascade select composition in your application, you should use something like this:

	$("#country").cascadeselect({
      source: '/api/GetCountries',
      selectText: "Select Something",
      loadingText: 'Loading...',
      noneResultText: 'No items found!'
    });

    $("#state").cascadeselect({
      source: '/api/GetStates',
      selectText: "Select the State",
      loadingText: 'Loading States...',
      noneResultText: 'No States Found!',
      parentSelectId: 'country',
      paramName: 'countyId'
    });

Above you can see the configuration for two dependent selects. The first one "contry", has no parent select, It will come populate with the data from the server by default. The second one "states" has dependency from "contry". It will be populated when you select something in "contry", an then call the server using the param named 'countyId' to filter Its results based on the parent select value.

Options
====================

Below you can see every option that can be used to manage your selects:

* source: the service URL that will return the JSON data
* selectText: the default text when the select has no item selected
* loadingText: the text that will be displayed when the selection changes
* noneResultText: the text that will appear in the select when no items came from the server
* parentSelectId: the HTML select element Id that will change the items
* paramName: the name of the parameter that your service/api expects

Samples
====================

You will find samples using JQuery Cascade Select with ASP.NET MVC and ASP.NET WebForms at the folder samples.

Coming soon
====================

The project is going step by step, But there's some items in the backlog to make It better:
* Cache request
* Aditional param for filter