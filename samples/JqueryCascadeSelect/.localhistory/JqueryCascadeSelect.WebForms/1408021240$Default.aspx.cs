using JqueryCascadeSelect.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace JqueryCascadeSelect.WebForms
{
    public partial class _Default : Page
    {

        DataContext _dataBase = new DataContext();

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCountries()
        {
            var counties = _dataBase.Paises.Select(s => new
            {
                text = s.Nome,
                value = s.CodPais
            });

            return new JavaScriptSerializer().Serialize(counties);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetStates(int countyId)
        {
            var counties = _dataBase.Paises.Select(s => new
            {
                text = s.Nome,
                value = s.CodPais
            });

            return new JavaScriptSerializer().Serialize(counties);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCountries(string id)
        {
            var counties = _dataBase.Paises.Select(s => new
            {
                text = s.Nome,
                value = s.CodPais
            });

            return new JavaScriptSerializer().Serialize(counties);
        }
    }
}