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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, XmlSerializeString = false)]
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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, XmlSerializeString = false)]
        public string GetStates(int countyId)
        {
            var states = _dataBase.Estados.Where(s => s.CodPais == countyId).Select(s => new
            {
                text = s.Nome,
                value = s.CodEstado
            });

            return new JavaScriptSerializer().Serialize(states);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, XmlSerializeString = false)]
        public string GetCities(int stateId)
        {
            var cities = _dataBase.Cidades.Where(c => c.CodEstado == stateId).Select(s => new
            {
                text = s.Nome,
                value = s.CodCidade
            });

           return new JavaScriptSerializer().Serialize(cities);
        }
    }
}
