<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="JqueryCascadeSelect.WebForms._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="jumbotron">
    <h1>FALS - Jquery Cascade Select Sample</h1>
    <p class="lead">Jquery extesion to allow developers to easily create cascade dependents html selects, that can be populated via services.</p>
    <p><a href="https://github.com/fals/jquery-cascadeselect" class="btn btn-primary btn-lg">Learn more &raquo;</a></p>
</div>

<div class="row">
  <form class="form-horizontal">
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
          <select id="state" name="state" class="input-xlarge"></select>
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
  </form>
</div>

</asp:Content>
