<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="JqueryCascadeSelect.WebForms._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

  <div class="jumbotron">
    <h1>FALS - Jquery Cascade Select Sample</h1>
    <p class="lead">Jquery extesion to allow developers to easily create cascade dependents html selects, that can be populated via services.</p>
    <p><a href="https://github.com/fals/jquery-cascadeselect" class="btn btn-primary btn-lg">Learn more &raquo;</a></p>
  </div>

  <div class="row">
      <fieldset>
        <!-- Form Name -->
        <legend>Select Something</legend>

        <!-- Select Basic -->
        <div class="control-group">
          <label class="control-label" for="country">County</label>
          <div class="controls">
            <select id="country" name="country" class="input-xlarge"></select>
          </div>
        </div>

        <!-- Select Basic -->
        <div class="control-group">
          <label class="control-label" for="state">State</label>
          <div class="controls">
            <asp:DropDownList ID="state" runat="server" CssClass="input-xlarge">

            </asp:DropDownList>
          </div>
        </div>

        <!-- Select Basic -->
        <div class="control-group">
          <label class="control-label" for="city">City</label>
          <div class="controls">
            <select id="city" name="city" class="input-xlarge"></select>
          </div>
        </div>

      </fieldset>
  </div>
  <script src="~/Scripts/jquery-cascadeselect-0.2.js"></script>
  <script>
    $("#country").cascadeselect({
      source: '/Home/GetCountries',
      selectText: "Select Something",
      loadingText: 'Loading...',
      noneResultText: 'No items found!'
    });

    $("#state").cascadeselect({
      source: '/Home/GetStates',
      selectText: "Select the State",
      loadingText: 'Loading States...',
      noneResultText: 'No States Found!',
      parentSelectId: 'country',
      paramName: 'countyId'
    });

    $("#city").cascadeselect({
      source: '/Home/GetCities',
      selectText: "Select the City",
      loadingText: 'Loading Cities...',
      noneResultText: 'No Cities Found!',
      parentSelectId: 'state',
      paramName: 'stateId'
    });
  </script>

</asp:Content>
