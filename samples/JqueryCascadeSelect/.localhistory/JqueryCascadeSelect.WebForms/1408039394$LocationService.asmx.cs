using JqueryCascadeSelect.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace JqueryCascadeSelect.WebForms
{

    [System.Web.Script.Services.ScriptService]
    public class LocationService : System.Web.Services.WebService
    {
        DataContext _dataBase = new DataContext();

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetCountries()
        {
            var counties = _dataBase.Paises.Select(s => new
            {
                text = s.Nome,
                value = s.CodPais
            });

            System.Web.HttpContext.Current.Response.Write(new JavaScriptSerializer().Serialize(counties));
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetStates(int countyId)
        {
            var states = _dataBase.Estados.Where(s => s.CodPais == countyId).Select(s => new
            {
                text = s.Nome,
                value = s.CodEstado
            });

            System.Web.HttpContext.Current.Response.Write(new JavaScriptSerializer().Serialize(states));
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetCities(int stateId)
        {
            var cities = _dataBase.Cidades.Where(c => c.CodEstado == stateId).Select(s => new
            {
                text = s.Nome,
                value = s.CodCidade
            });

            System.Web.HttpContext.Current.Response.Write(new JavaScriptSerializer().Serialize(cities));
        }
    }
}
